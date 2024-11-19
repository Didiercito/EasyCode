import { SensorHistoryRepository } from "../domain/historyRepository";
import { SensorHistory } from "../domain/history";

export class GetHistoryBySensorTypeUseCase {
    private sensorHistoryRepository: SensorHistoryRepository;

    constructor(sensorHistoryRepository: SensorHistoryRepository) {
        this.sensorHistoryRepository = sensorHistoryRepository;
    }

    public async execute(sensorType: string): Promise<SensorHistory[]> {
        return await this.sensorHistoryRepository.getHistoryBySensorType(sensorType);
    }
}
