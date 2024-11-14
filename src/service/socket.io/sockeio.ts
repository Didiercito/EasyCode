// src/service/socket/WebSocketService.ts
import { Socket, io } from "socket.io-client";
import dotenv from 'dotenv';

dotenv.config();

export default class WebSocketService {
  private socket: Socket;

  constructor() { 
    this.socket = io('http://localhost:8082', {
      extraHeaders: {
        'authorization': `Bearer ${process.env.WS_SECRET_KEY as string}`
      }
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
