import { HeartRate } from "../domain/heart_rate";
import { HeartRateRepository } from "../domain/hate_rateRepository"

export class GetByIdUseCase {
    constructor(private heartRateRepository: HeartRateRepository) {}

    async execute(id: number): Promise<HeartRate | null> {
        return await this.heartRateRepository.getDataById(id);
    }
}
