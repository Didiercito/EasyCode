import { SensorHistory } from "../domain/history";
import { SensorHistoryRepository } from "../domain/historyRepository";

export class UpdateSensorHistoryUseCase {
    private sensorHistoryRepository: SensorHistoryRepository;

    constructor(sensorHistoryRepository: SensorHistoryRepository) {
        this.sensorHistoryRepository = sensorHistoryRepository;
    }

    public async execute(id: number, sensorType: string, data: any, userId: number): Promise<SensorHistory> {
        const updatedHistoryEvent = new SensorHistory(
            id,
            sensorType,
            data,
            userId,
            new Date(),  
            new Date()
        );

        return await this.sensorHistoryRepository.updateSensorHistory(id, updatedHistoryEvent);
    }
}
