import mqtt, { MqttClient } from "mqtt";
import dotenv from "dotenv";
import { SaveUseCase } from "../../heart_rate/application/saveUseCase";
import { SaveUseCaseBodyTemperature } from "../../body_temperature/application/saveUseCase";
import { AddSensorHistoryUseCase } from "../../history/application/addSensorHistoryUseCase";
import { SaveUseCaseOximeter } from "../../oximeter/application/saveUseCase";
import { HeartRate } from "../../heart_rate/domain/heart_rate";
import { BodyTemperature } from "../../body_temperature/domain/body_temperature";
import { Oximeter } from "../../oximeter/domain/oximeter";
import WebSocketService from "../socket.io/sockeio";

dotenv.config();

export class MqttService {
  private client: MqttClient | null = null;
  private topics = [
    process.env.MQTT_TOPIC1 as string, 
    process.env.MQTT_TOPIC2 as string, 
    process.env.MQTT_TOPIC3 as string, 
  ];
  private webSocketService: WebSocketService;

  constructor(
    private saveHeartRateUseCase: SaveUseCase,
    private saveBodyTemperatureUseCase: SaveUseCaseBodyTemperature,
    private saveOximeterUseCase: SaveUseCaseOximeter,
    private addSensorHistoryUseCase: AddSensorHistoryUseCase
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

    this.client.on("connect", () => {
      console.log("Conectado al broker MQTT");
      this.client?.subscribe(this.topics, (err) => {
        if (err) {
          console.error("Error al suscribirse a los temas:", err);
        } else {
          console.log("Suscrito a los temas:", this.topics.join(", "));
        }
      });
    });

    this.client.on("message", async (topic: string, message: Buffer) => {
      try {
        const data = JSON.parse(message.toString());
        switch (topic) {
          case process.env.MQTT_TOPIC1:
            await this.handleHeartRate(data);
            break;
          case process.env.MQTT_TOPIC2:
            await this.handleBodyTemperature(data);
            break;
          case process.env.MQTT_TOPIC3:
            await this.handleOximeter(data);
            break;
          default:
            console.warn("Mensaje de un tópico desconocido:", topic);
        }
      } catch (error) {
        console.error("Error al procesar el mensaje MQTT:", error);
      }
    });
  }

  private async handleHeartRate(data: any) {
    if (data.heart_rate !== undefined) {
      const now = new Date();
      const userId = 1;
      const heartRateData = new HeartRate(0, data.heart_rate, 0, now, now);
      const sensorType = "HeartRate";
  
      try {
        await this.saveHeartRateUseCase.execute(heartRateData);
        await this.addSensorHistoryUseCase.execute(sensorType, data.heart_rate, userId);
        console.log("Ritmo cardíaco y historial guardados correctamente");
        
        this.webSocketService.sendData("heartRateData", { ECG: data.heart_rate });
      } catch (error) {
        console.error("Error al guardar datos de ritmo cardíaco:", error);
      }
    } else if (data.ECG !== undefined) {
      const now = new Date();
      const userId = 1;
      const heartRateData = new HeartRate(0, data.ECG, 0, now, now);
      const sensorType = "HeartRate";
  
      try {
        await this.saveHeartRateUseCase.execute(heartRateData);
        await this.addSensorHistoryUseCase.execute(sensorType, data.ECG, userId);
        console.log("Ritmo cardíaco y historial guardados correctamente");
        this.webSocketService.sendData("heartRateData", { ECG: data.ECG });
      } catch (error) {
        console.error("Error al guardar datos de ritmo cardíaco:", error);
      }
    }
  }
  
  private async handleBodyTemperature(data: any) {
    const temp = data.temperature !== undefined ? data.temperature : data.valor;
    
    if (temp !== undefined) {
      const now = new Date();
      const userId = 1;
      const bodyTemperatureData = new BodyTemperature(0, temp, now, now);
      const sensorType = "BodyTemperature";
  
      try {
        await this.saveBodyTemperatureUseCase.execute(bodyTemperatureData);
        await this.addSensorHistoryUseCase.execute(sensorType, temp, userId);
        console.log("Temperatura corporal y historial guardados correctamente");
        
        // El servidor espera "valor", pero usamos "temperature" por consistencia
        this.webSocketService.sendData("bodyTemperatureData", { temperature: temp });
      } catch (error) {
        console.error("Error al guardar temperatura corporal:", error);
      }
    }
  }
  
  private async handleOximeter(data: any) {
    // Adaptar el formato del mensaje MQTT al formato esperado por el servidor WebSocket  
    const oxygenLevel = data.valor !== undefined ? data.valor : 
                        data.oxygenLevel !== undefined ? data.oxygenLevel : 
                        data.oxygen_level;
    
    if (typeof oxygenLevel === "number") {
      const now = new Date();
      const userId = 1;
      const oximeterData = new Oximeter(0, oxygenLevel, now, now);
      const sensorType = "Oximeter";
  
      try {
        await this.saveOximeterUseCase.execute(oximeterData);
        await this.addSensorHistoryUseCase.execute(sensorType, oxygenLevel, userId);
        console.log("Nivel de oxígeno y historial guardados correctamente");
        
        // Usamos el formato esperado por el WebSocketService
        this.webSocketService.sendData("oximeterData", { oxygenLevel });
      } catch (error) {
        console.error("Error al guardar datos del oxímetro:", error);
      }
    }
  }
}
