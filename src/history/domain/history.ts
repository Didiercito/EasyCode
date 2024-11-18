import { Oximeter } from "../../oximeter/domain/oximeter";
import { BodyTemperature } from "../../body_temperature/domain/body_temperature";
import { Accelerometer } from "../../accelerometer/domain/accelerometer";
import { HeartRate } from "../../heart_rate/domain/heart_rate";


export class HistorialSensores {
  id: number;
  usuario_id: number;
  tipo_sensor: string;
  valor: number;
  fecha_hora: Date;

  constructor(
    id: number,
    usuario_id: number,
    tipo_sensor: string,
    valor: number,
    fecha_hora: Date
  ) {
    this.id = id;
    this.usuario_id = usuario_id;
    this.tipo_sensor = tipo_sensor;
    this.valor = valor;
    this.fecha_hora = fecha_hora;
  }

  static fromSensorData(sensorData: Oximeter | HeartRate | Accelerometer | BodyTemperature): HistorialSensores {
    let tipo_sensor = '';
    let valor = 0;

    if (sensorData instanceof Oximeter) {
      tipo_sensor = 'oximeter';
      valor = sensorData.valor;
    } else if (sensorData instanceof HeartRate) {
      tipo_sensor = 'heart_rate';
      valor = sensorData.BPM;
    } else if (sensorData instanceof Accelerometer) {
      tipo_sensor = 'accelerometer';
      valor = Math.sqrt(
        sensorData.valor_x ** 2 + sensorData.valor_y ** 2 + sensorData.valor_z ** 2
      ); 
    } else if (sensorData instanceof BodyTemperature) {
      tipo_sensor = 'body_temperature';
      valor = sensorData.valor;
    }

    return new HistorialSensores(
      0, 
      sensorData.id_usuario,
      tipo_sensor,
      valor,
      new Date()
    );
  }
}
