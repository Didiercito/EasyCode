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

    this.socket.on("temperatura", (data) => {
      console.log("Datos recibidos en WebSocket (Temperatura):", data);
    });

    this.socket.on("ritmoCardiaco", (data) => {
      console.log("Datos recibidos en WebSocket (Ritmo Cardiaco):", data);
    });

    this.socket.on("oxigenacion", (data) => {
      console.log("Datos recibidos en WebSocket (Oxigenación):", data);
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
