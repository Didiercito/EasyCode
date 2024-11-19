import { SensorHistory } from "../domain/history";
import { SensorHistoryRepository } from "../domain/historyRepository";

export class AddSensorHistoryUseCase {
    private sensorHistoryRepository: SensorHistoryRepository;

    constructor(sensorHistoryRepository: SensorHistoryRepository) {
        this.sensorHistoryRepository = sensorHistoryRepository;
    }

    public async execute(sensorType: string, data: any, userId: number): Promise<SensorHistory> {
        const newHistoryEvent = new SensorHistory(
            0, 
            sensorType,
            data,
            userId,
            new Date(), 
            new Date()  
        );

        return await this.sensorHistoryRepository.addSensorHistory(newHistoryEvent);
    }
}
