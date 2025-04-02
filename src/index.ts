import express from 'express';
import cors from 'cors'
import { userRouter } from './user/infracstructure/api/router/userRouter';
import { authRouter } from './auth/infracstructure/api/routes/authRoutes';
import { doctorRoutes } from './doctor/infracstructure/api/routes/docterRoutes';
import { emergencyContactsRoutes } from './emergency_contacts/infracstructure/api/routes/emergency_contactsRoutes';
import { medicalHistoryRoutes } from './medical_history/infractructure/api/routes/medical_history';
import { HeartRateRouter } from './heart_rate/infracstructure/api/routes/heart_rateRouter';
import { bodyTemperatureRouter } from './body_temperature/infrasctructure/api/routes/boyd_temperatureRoutes';
import { oximeterRouter } from './oximeter/infracstrucuture/api/routes/oximeterRouter';
import { acelerometerRouter } from './accelerometer/infrancstructure/api/routes/acelerometerRoutes';
import { historyRouter } from './history/infracstructure/api/routes/historyRoutes';
import { SaveUseCase } from './heart_rate/application/saveUseCase';
import { AddSensorHistoryUseCase } from './history/application/addSensorHistoryUseCase';
import { MySQLHeartRateRepository } from './heart_rate/infracstructure/adapters/heart_rateAdapterMySQL';
import { MySQLBodyTemperatureRepository } from './body_temperature/infrasctructure/adapters/body_temperatureAdapterMySQL';
import { MySQLOximeterRepository } from './oximeter/infracstrucuture/adapters/oximeterAdapterMySQL';
import { MySQLAcelerometerRepository } from './accelerometer/infrancstructure/adapters/acelerometerAdaptersMySQL';
import { MySQLSensorHistoryRepository } from './history/infracstructure/adapters/historyAdapterMySQL';
import { SaveUseCaseBodyTemperature } from './body_temperature/application/saveUseCase';
import { SaveUseCaseOximeter } from './oximeter/application/saveUseCase';
import { MqttService } from './service/mqtt/mqtt';
import { pool } from './db/config/config';


const app = express();
const port = 8081;

app.use(cors());
app.use(express.json())

const heartRateRepository = new MySQLHeartRateRepository();
const bodyTemperatureRepository = new MySQLBodyTemperatureRepository();
const oximeterRepository = new MySQLOximeterRepository();
const acelerometerRepository = new MySQLAcelerometerRepository()
const historyRepository = new MySQLSensorHistoryRepository()

const saveHeartRateUseCase = new SaveUseCase(heartRateRepository);
const saveBodyTemperatureUseCase = new SaveUseCaseBodyTemperature(bodyTemperatureRepository);
const saveOximeterUseCase = new SaveUseCaseOximeter(oximeterRepository);
const addSensorHistoryUseCase = new AddSensorHistoryUseCase(historyRepository)

export const mqttService = new MqttService(
  saveHeartRateUseCase,
  saveBodyTemperatureUseCase,
  saveOximeterUseCase, 
  addSensorHistoryUseCase
);



app.use('/api/v1/user', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/doctor', doctorRoutes);
app.use('/api/v1/emergency-contacts', emergencyContactsRoutes);
app.use('/api/v1/medical-history', medicalHistoryRoutes);
app.use('/api/v1/heart-rate', HeartRateRouter);
app.use('/api/v1/body-temperature', bodyTemperatureRouter);
app.use('/api/v1/oximeter', oximeterRouter);
app.use('/api/v1/acelerometer', acelerometerRouter);
app.use('/api/v1/sensor-history', historyRouter)

export const startServer = async () => {
    try {
      await pool;
      console.log('MySQL connected');
      console.log(`Server running in port:  http://localhost:${port}`);
      app.listen(port);
    } catch (error) {
      console.error('Error initializing database:', error);
      process.exit(1);
    }
  };
