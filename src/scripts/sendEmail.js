import cron from 'node-cron';
import { EmailService } from '../service/email';  
import { User } from './path/to/user/domain/user';      
import { HeartRate } from './path/to/heart_rate/domain/heart_rate';
import { BodyTemperature } from './path/to/body_temperature/domain/body_temperature';
import { Acelerometer } from './path/to/accelerometer/domain/acelerometer';
import { Oximeter } from './path/to/oximeter/domain/oximeter';

const emailService = new EmailService();

cron.schedule('0 */8 * * *', async () => {
  console.log('Iniciando envío de correos...');

  try {
    const users = await getUsersFromDatabase();
    for (let user of users) {
      const heartRate = await getHeartRate(user.id);     
      const bodyTemp = await getBodyTemperature(user.id); 
      const oximeter = await getOximeter(user.id);         
      const accelerometer = await getAccelerometer(user.id); 

      await emailService.sendEmail(user, heartRate, bodyTemp, oximeter, accelerometer);
    }

    console.log('Correos enviados correctamente.');
  } catch (error) {
    console.error('Error al enviar correos:', error);
  }
});

// Funciones de ejemplo para obtener datos de los usuarios (estas funciones deberían implementar la lógica de acceso a base de datos)
async function getUsersFromDatabase() {
  // Simulación de obtener los usuarios desde la base de datos
  return [
    { id: 1, correo: 'user@example.com', nombre: 'Juan' },
    { id: 2, correo: 'user2@example.com', nombre: 'Ana' },
    // Agrega más usuarios según sea necesario
  ];
}

async function getHeartRate(userId) {
  return { ECG: 75 }; // Ejemplo de datos de frecuencia cardiaca
}

async function getBodyTemperature(userId) {
  return { valor: 36.5 }; // Ejemplo de datos de temperatura
}

async function getOximeter(userId) {
  return { valor: 98 }; // Ejemplo de datos de oxímetro
}

async function getAccelerometer(userId) {
  return { x: 0.5, y: 0.2, z: 0.8 }; // Ejemplo de datos de acelerómetro
}
