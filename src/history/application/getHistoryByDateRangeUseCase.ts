import { SensorHistoryRepository } from "../domain/historyRepository";
import { SensorHistory } from "../domain/history";

export class GetHistoryByDateRangeUseCase {
    private sensorHistoryRepository: SensorHistoryRepository;

    constructor(sensorHistoryRepository: SensorHistoryRepository) {
        this.sensorHistoryRepository = sensorHistoryRepository;
    }

    public async execute(startDate: Date, endDate: Date): Promise<SensorHistory[]> {
        return await this.sensorHistoryRepository.getHistoryByDateRange(startDate, endDate);
    }
}
