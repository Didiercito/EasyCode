import { HeartRate } from "../domain/heart_rate";
import { HeartRateRepository } from "../domain/hate_rateRepository";

export class SaveUseCase {
    constructor(private heartRateRepository: HeartRateRepository) {}

    async execute(data: HeartRate): Promise<void> {


        await this.heartRateRepository.save(data);
    }
}
