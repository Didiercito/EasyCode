import { SensorHistoryRepository } from "../domain/historyRepository";
import { SensorHistory } from "../domain/history";

export class GetSensorHistoryByIdUseCase {
    private sensorHistoryRepository: SensorHistoryRepository;

    constructor(sensorHistoryRepository: SensorHistoryRepository) {
        this.sensorHistoryRepository = sensorHistoryRepository;
    }

    public async execute(id: number): Promise<SensorHistory | null> {
        return await this.sensorHistoryRepository.getSensorHistoryById(id);
    }
}
