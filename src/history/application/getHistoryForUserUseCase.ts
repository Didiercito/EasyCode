import { SensorHistoryRepository } from "../domain/historyRepository";
import { SensorHistory } from "../domain/history";

export class GetHistoryForUserUseCase {
    private sensorHistoryRepository: SensorHistoryRepository;

    constructor(sensorHistoryRepository: SensorHistoryRepository) {
        this.sensorHistoryRepository = sensorHistoryRepository;
    }

    public async execute(userId: number): Promise<SensorHistory[]> {
        return await this.sensorHistoryRepository.getHistoryForUser(userId);
    }
}
