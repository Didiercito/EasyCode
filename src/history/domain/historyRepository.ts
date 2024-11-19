import { SensorHistory } from "./history";  


export interface SensorHistoryRepository {

    addSensorHistory(sensorHistory: SensorHistory): Promise<SensorHistory>;
    updateSensorHistory(id: number, sensorHistory: SensorHistory): Promise<SensorHistory>;
    getSensorHistoryById(id: number): Promise<SensorHistory | null>;
    getHistoryForUser(userId: number): Promise<SensorHistory[]>;
    getAllHistory(): Promise<SensorHistory[]>;
    deleteSensorHistory(id: number): Promise<void>;
    getHistoryBySensorType(sensorType: string): Promise<SensorHistory[]>;
    getHistoryByDateRange(startDate: Date, endDate: Date): Promise<SensorHistory[]>;
}
