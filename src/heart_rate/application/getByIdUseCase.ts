import { HeartRate } from "../domain/heart_rate";
import { HeartRateRepository } from "../domain/hate_rateRepository";

export class GetAllUseCase {
    constructor(private heartRateRepository: HeartRateRepository) {}

    async execute(): Promise<HeartRate[]> {
        return await this.heartRateRepository.getAll();
    }
}
