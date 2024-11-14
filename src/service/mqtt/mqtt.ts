import mqtt, { MqttClient } from 'mqtt';
import dotenv from 'dotenv';
import { SaveUseCase } from '../../heart_rate/application/saveUseCase';
import { HeartRate } from '../../heart_rate/domain/heart_rate';
import WebSocketService from '../socket.io/sockeio';

dotenv.config();

export class MqttService {
  private client: MqttClient | null = null;
  private topic = process.env.MQTT_TOPIC as string;
  private externalWebsocket = new WebSocketService();
  private onMessageCallback: ((message: string) => void) | null = null;

  constructor(
    private saveHeartRateUseCase: SaveUseCase
  ) {
    // Mueve la configuración aquí
    const mqttServer = process.env.MQTT_SERVER as string;
    const mqttPort = parseInt(process.env.MQTT_PORT as string);
    const mqttUser = process.env.MQTT_USER as string;
    const mqttPassword = process.env.MQTT_PASSWORD as string;

    const options = {
      port: mqttPort,
      username: mqttUser,
      password: mqttPassword,
    };

    this.client = mqtt.connect(mqttServer, options);
    this.connect();
  }

  private connect(): void {
    this.client?.on('connect', () => {
      console.log('Conectado al broker MQTT');
      this.client?.subscribe(this.topic, (err) => {
        if (err) {
          console.error('Error al suscribirse al tema', err);
        } else {
          console.log('Suscrito al tema:', this.topic);
        }
      });
    });

    this.client?.on('message', async (topic: string, message: Buffer) => {
      const messageString = message.toString();
      console.log('Mensaje recibido desde Arduino:', messageString);

      await this.externalWebsocket.sendData("heartRateData", messageString);

      if (this.onMessageCallback) {
        this.onMessageCallback(messageString);
      }

      try {
        const data = JSON.parse(messageString);

        if (data.BPM !== undefined && data.id_usuario !== undefined) {
          const heartRateData = new HeartRate(0, data.id_usuario, data.BPM);
          await this.saveHeartRateUseCase.execute(heartRateData);
          console.log('Frecuencia cardíaca guardada correctamente en la base de datos');
        } else {
          console.warn('Datos incompletos recibidos:', data);
        }
      } catch (error) {
        console.error('Error al procesar el mensaje MQTT:', error);
      }
    });
  }

  public onMessage(callback: (message: string) => void): void {
    this.onMessageCallback = callback;
  }
}
