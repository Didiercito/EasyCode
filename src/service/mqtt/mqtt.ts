import mqtt, { MqttClient } from 'mqtt';
import dotenv from 'dotenv';
import { SaveUseCase } from '../../heart_rate/application/saveUseCase';
import { SaveUseCaseBodyTemperature } from '../../body_temperature/application/saveUseCase';
import { SaveUseCaseOximeter } from '../../oximeter/application/saveUseCase';
import { SaveAcelerometerUseCase } from '../../accelerometer/application/saveUseCase'; // Cambiar al caso de uso
import { HeartRate } from '../../heart_rate/domain/heart_rate';
import { BodyTemperature } from '../../body_temperature/domain/body_temperature';
import { Oximeter } from '../../oximeter/domain/oximeter';
import { Acelerometer } from '../../accelerometer/domain/acelerometer';
import WebSocketService from '../socket.io/sockeio';

dotenv.config();

export class MqttService {
  private client: MqttClient | null = null;
  private topics = [
    process.env.MQTT_TOPIC1 as string, // Ritmo cardíaco
    process.env.MQTT_TOPIC2 as string, // Temperatura
    process.env.MQTT_TOPIC3 as string, // Oximetro
    process.env.MQTT_TOPIC4 as string, // Acelerómetro
  ];
  private webSocketService: WebSocketService;

  constructor(
    private saveHeartRateUseCase: SaveUseCase,
    private saveBodyTemperatureUseCase: SaveUseCaseBodyTemperature,
    private saveOximeterUseCase: SaveUseCaseOximeter,
    private saveAcelerometerUseCase: SaveAcelerometerUseCase // Actualización aquí
  ) {
    const mqttServer = process.env.MQTT_SERVER as string;
    const mqttPort = parseInt(process.env.MQTT_PORT as string);
    const mqttUser = process.env.MQTT_USER as string;
    const mqttPassword = process.env.MQTT_PASSWORD as string;

    const options = {
      port: mqttPort,
      username: mqttUser,
      password: mqttPassword,
      reconnectPeriod: 1000,
    };

    this.client = mqtt.connect(mqttServer, options);
    this.webSocketService = new WebSocketService();

    // Conexión al broker MQTT
    this.client.on('connect', () => {
      console.log('Conectado al broker MQTT');
      this.client?.subscribe(this.topics, (err) => {
        if (err) {
          console.error('Error al suscribirse a los temas:', err);
        } else {
          console.log('Suscrito a los temas:', this.topics.join(', '));
        }
      });
    });

    // Manejo de mensajes de los temas
    this.client.on('message', async (topic: string, message: Buffer) => {
      const messageString = message.toString();

      try {
        const data = JSON.parse(messageString);

        if (topic === process.env.MQTT_TOPIC1) {
          await this.handleHeartRate(data);
        } else if (topic === process.env.MQTT_TOPIC2) {
          await this.handleBodyTemperature(data);
        } else if (topic === process.env.MQTT_TOPIC3) {
          await this.handleOximeter(data);
        } else if (topic === process.env.MQTT_TOPIC4) {
          await this.handleAcelerometer(data);
        }
      } catch (error) {
        console.error('Error al procesar el mensaje MQTT:', error);
      }
    });
  }

  private async handleHeartRate(data: any) {
    if (data.ECG !== undefined) {
      console.log(`Dato crudo de ECG recibido: ${data.ECG}`);
      const bpm = this.convertToBPM(data.ECG);
      console.log(`Ritmo cardíaco recibido: ${bpm} BPM`);
      const now = new Date();
      const heartRateData = new HeartRate(1, bpm, now, now);
      await this.saveHeartRateUseCase.execute(heartRateData);
      console.log('Frecuencia cardíaca guardada correctamente en la base de datos');
      this.webSocketService.sendData('heartRateData', { ECG: bpm });
    } else {
      console.warn('Datos incompletos recibidos para frecuencia cardíaca:', data);
    }
  }

  private async handleBodyTemperature(data: any) {
    if (data.temperature !== undefined) {
      console.log(`Temperatura corporal recibida: ${data.temperature}°C`);
      const now = new Date();
      const bodyTemperatureData = new BodyTemperature(1, data.temperature, now, now);
      await this.saveBodyTemperatureUseCase.execute(bodyTemperatureData);
      console.log('Temperatura corporal guardada correctamente en la base de datos');
      this.webSocketService.sendData('bodyTemperatureData', { valor: data.temperature });
    } else {
      console.warn('Datos incompletos recibidos para temperatura corporal:', data);
    }
  }


  private async handleOximeter(data: any) {
    if (data.oxygenLevel !== undefined) {
        console.log(`Nivel de oxígeno recibido: ${data.oxygenLevel}`);

        // Convertir el nivel de oxígeno a un porcentaje si es necesario
        const oxygenLevel = parseFloat(data.oxygenLevel.toFixed(2)); 
        
        if (isNaN(oxygenLevel)) {
            console.error('Error: El nivel de oxígeno no es un número válido');
            return;
        }

        // Guardar el porcentaje de oxígeno en la base de datos
        const now = new Date();
        const oximeterData = new Oximeter(1, oxygenLevel, now, now); // Crear el objeto Oximeter
        
        await this.saveOximeterUseCase.execute(oxygenLevel); // Pasar el valor crudo (no el objeto)
        
        console.log('Nivel de oxígeno guardado correctamente en la base de datos');
        
        // Enviar los datos a través de WebSocket (enviar el porcentaje de oxígeno)
        this.webSocketService.sendData('oximeterData', { valor: oxygenLevel });
    } else {
        console.warn('Datos incompletos recibidos para oxímetro:', data);
    }
}




  

  private async handleAcelerometer(data: any) {
    if (data.x !== undefined && data.y !== undefined && data.z !== undefined) {
        console.log(`Datos de acelerómetro recibidos: x=${data.x}, y=${data.y}, z=${data.z}`);
        const now = new Date();
        const acelerometerData = new Acelerometer(1, data.x, data.y, data.z, now, now);
        
        // Llama al caso de uso correcto para guardar los datos
        await this.saveAcelerometerUseCase.execute(acelerometerData);
        
        console.log('Datos del acelerómetro guardados correctamente en la base de datos');
        this.webSocketService.sendData('acelerometerData', { x: data.x, y: data.y, z: data.z });
    } else {
        console.warn('Datos incompletos recibidos para acelerómetro:', data);
    }
  }

  private convertToBPM(rawECG: number): number {
    const minRawECG = 0;
    const maxRawECG = 1023;
    const minBPM = 60;
    const maxBPM = 100;
    return ((rawECG - minRawECG) * (maxBPM - minBPM)) / (maxRawECG - minRawECG) + minBPM;
  }
}
