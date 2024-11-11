import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import axios from 'axios';
import { Server as SocketIOServer } from 'socket.io';
import { HeartRateRouter } from './heart_rate/infracstructure/api/routes/heart_rateRouter';
import { MqttService } from './service/mqtt/mqtt';
import { SaveUseCase } from './heart_rate/application/saveUseCase';
import { MySQLHeartRateRepository } from './heart_rate/infracstructure/adapters/heart_rateAdapterMySQL';
import jwt from 'jsonwebtoken';
import { db } from './db/config/config';

const app = express();
const port = 8081;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1/heart_rate', HeartRateRouter);

const heartRateRepository = new MySQLHeartRateRepository();
const saveHeartRateUseCase = new SaveUseCase(heartRateRepository);

const mqttServer = process.env.MQTT_SERVER as string;
const mqttPort = parseInt(process.env.MQTT_PORT as string);
const mqttUser = process.env.MQTT_USER as string;
const mqttPassword = process.env.MQTT_PASSWORD as string;

const mqttService = new MqttService(mqttServer, mqttPort, mqttUser, mqttPassword, saveHeartRateUseCase);
mqttService.connect();

const server = app.listen(port, async () => {
  try {
    await db;
    console.log('MySQL connected');
    console.log(`Heart Rate Server is running on port ${port}`);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
});

const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
  },
});

io.use((socket, next) => {
  const token = socket.handshake.query.token;

  if (token) {
    jwt.verify(token as string, process.env.SECRET_KEY!, (err: any) => {
      if (err) return next(new Error('Authentication error'));
      next();
    });
  } else {
    next(new Error('Authentication error'));
  }
});

io.on('connection', (socket) => {
  console.log('Client authenticated and connected to Heart Rate');

  socket.on('disconnect', () => {
    console.log('Client disconnected from Heart Rate');
  });
});

async function sendHeartRateDataToClients() {
  try {
    const response = await axios.get('http://localhost:8081/api/v1/heart_rate/all');
    const { data } = response.data;

    if (!data) {
      console.error("No data found in response");
      return;
    }

    const filteredData = data.map((item: any) => ({
      heart_rate: item.heart_rate,
      timestamp: item.timestamp
    }));

    io.emit('heartRateData', filteredData);
  } catch (error) {
    console.error('Error fetching heart rate data or sending to WebSocket:', error);
  }
}

setInterval(sendHeartRateDataToClients, 3000);
