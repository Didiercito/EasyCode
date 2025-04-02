import { Socket, io } from "socket.io-client";
import dotenv from "dotenv";

dotenv.config();

export default class WebSocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(process.env.WEBSOCKET_URL as string, {
      extraHeaders: {
        Authorization: `Bearer ${process.env.WS_SECRET_KEY}`,
      },
    });

    this.socket.on("connect", () => {
      console.log("Conectado al servidor WS");
    });

    this.socket.on("connect_error", (error) => {
      console.error("Error de conexión al servidor WS:", error);
    });

    this.socket.on("disconnect", () => {
      console.log("Desconectado del servidor WebSocket");
    });

    // Escuchar eventos emitidos por el servidor WebSocket
    this.socket.on("bodyTemperature", (data) => {
      console.log("Datos recibidos en WebSocket (Temperatura):", data);
    });

    this.socket.on("heartRate", (data) => {
      console.log("Datos recibidos en WebSocket (Ritmo Cardiaco):", data);
    });

    this.socket.on("oximeter", (data) => {
      console.log("Datos recibidos en WebSocket (Oxigenación):", data);
    });
  }

  async sendData(event: string, data: any): Promise<void> {
    return new Promise((resolve, reject) => {
      console.log(`Enviando datos al servidor WS (${event}):`, data);
      this.socket.emit(event, data, (error: any) => {
        if (error) {
          console.error(`Error al enviar datos (${event}):`, error);
          reject(error);
        } else {
          console.log(`Datos enviados con éxito (${event})`);
          resolve();
        }
      });
    });
  }
}