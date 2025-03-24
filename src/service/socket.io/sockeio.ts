import { Socket, io } from "socket.io-client";
import dotenv from 'dotenv';

dotenv.config();

export default class WebSocketService {
  private socket: Socket;

  constructor() {
    console.log('Token de autorización:', process.env.WS_SECRET_KEY);  

    this.socket = io(process.env.WEBSOCKET_URL as string, {
      extraHeaders: {
        'Authorization': `Bearer ${process.env.WS_SECRET_KEY}`,
      },
    });

    this.socket.on('connect', () => {
      console.log('Conectado al servidor WS');
    });

    this.socket.on('connect_error', (error) => {
      console.error('Error de conexión al servidor WS:', error);
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor WebSocket');
    });

    this.socket.on('heartRate', (data) => {
      console.log('Datos recibidos en WebSocket (Heart Rate):', data);
    });

    this.socket.on('bodyTemperature', (data) => {
      console.log('Datos recibidos en WebSocket (Body Temperature):', data);
    });

    this.socket.on('oximeter', (data) => {
      console.log('Datos recibidos en WebSocket (Oximeter):', data);
    });

    this.socket.on('acelerometer', (data) => {
      console.log('Datos recibidos en WebSocket (Acelerómetro):', data);
    });
  }

  async sendData(event: string, data: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket.emit(event, data, (error: any) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
}
