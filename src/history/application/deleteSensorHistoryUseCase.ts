import { SensorHistoryRepository } from "../domain/historyRepository";

export class DeleteSensorHistoryUseCase {
    private sensorHistoryRepository: SensorHistoryRepository;

    constructor(sensorHistoryRepository: SensorHistoryRepository) {
        this.sensorHistoryRepository = sensorHistoryRepository;
    }

    public async execute(id: number): Promise<void> {
        await this.sensorHistoryRepository.deleteSensorHistory(id);
    }
}
