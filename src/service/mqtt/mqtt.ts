import mqtt, { MqttClient } from 'mqtt';
import WebsocketService from '../socket.io/sockeio';
import dotenv from 'dotenv';
import { SaveUseCase } from '../../heart_rate/application/saveUseCase';
import { HeartRate } from '../../heart_rate/domain/heart_rate';

dotenv.config();

export class MqttService {
  private client: MqttClient | null = null;
  private topic = process.env.MQTT_TOPIC as string;
  private onMessageCallback: ((message: string) => void) | null = null;

  constructor(
    private mqttServer: string,
    private mqttPort: number,
    private mqttUser: string,
    private mqttPassword: string,
    private saveHeartRateUseCase: SaveUseCase
  ) {}

  private externalWebsocket = new WebsocketService();

  public connect(): void {
    const options = {
      port: this.mqttPort,
      username: this.mqttUser,
      password: this.mqttPassword,
    };

    this.client = mqtt.connect(this.mqttServer, options);

    this.client.on('connect', () => {
      console.log('Conectado al broker MQTT');
      this.client?.subscribe(this.topic, (err) => {
        if (err) {
          console.error('Error al suscribirse al tema', err);
        } else {
          console.log('Suscrito al tema:', this.topic);
        }
      });
    });

    this.client.on('message', async (topic: string, message: Buffer) => {
      const messageString = message.toString();
      console.log('Mensaje recibido desde Arduino:', messageString);

      // Enviar datos al servidor WebSocket
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
