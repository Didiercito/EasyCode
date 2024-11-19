import { SensorHistoryRepository } from "../domain/historyRepository";
import { SensorHistory } from "../domain/history";

export class GetAllHistoryUseCase {
    private sensorHistoryRepository: SensorHistoryRepository;

    constructor(sensorHistoryRepository: SensorHistoryRepository) {
        this.sensorHistoryRepository = sensorHistoryRepository;
    }

    public async execute(): Promise<SensorHistory[]> {
        return await this.sensorHistoryRepository.getAllHistory();
    }
}
