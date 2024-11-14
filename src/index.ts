import express from 'express';
import cors from 'cors'
import { userRouter } from './user/infracstructure/api/router/userRouter';
import { authRouter } from './auth/infracstructure/api/routes/authRoutes';
import { doctorRoutes } from './doctor/infracstructure/api/routes/docterRoutes';
import { emergencyContactsRoutes } from './emergency_contacts/infracstructure/api/routes/emergency_contactsRoutes';
import { medicalHistoryRoutes } from './medical_history/infractructure/api/routes/medical_history';
import { HeartRateRouter } from './heart_rate/infracstructure/api/routes/heart_rateRouter';
import { SaveUseCase } from './heart_rate/application/saveUseCase';
import { MySQLHeartRateRepository } from './heart_rate/infracstructure/adapters/heart_rateAdapterMySQL';
import { MqttService } from './service/mqtt/mqtt';
import { db } from './db/config/config';

const app = express();
const port = 8081;

app.use(cors());
app.use(express.json())

const heartRateRepository = new MySQLHeartRateRepository();
const saveHeartRateUseCase = new SaveUseCase(heartRateRepository);
const mqttService = new MqttService(saveHeartRateUseCase);


app.use('/api/v1/user', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/doctor', doctorRoutes);
app.use('/api/v1/emergency-contacts', emergencyContactsRoutes);
app.use('/api/v1/medical-history', medicalHistoryRoutes);
app.use('/api/v1/heart-rate', HeartRateRouter);


const server = app.listen(port, async () => {
  try {
    await db;
    console.log('MySQL connected');
    console.log(`Server running in port:  http://localhost:${port}`);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
});

