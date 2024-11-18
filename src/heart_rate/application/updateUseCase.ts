import { HeartRate } from "../domain/heart_rate";
import { HeartRateRepository } from "../domain/hate_rateRepository";

export class UpdateUseCase {
  private heartRateRepository: HeartRateRepository;

  constructor(heartRateRepository: HeartRateRepository) {
      this.heartRateRepository = heartRateRepository;
  }

  async execute(id: number, data: Partial<HeartRate>): Promise<void> {
      if (!data.ECG) {
          throw new Error("ECG data is required to update heart rate.");
      }

      await this.heartRateRepository.update(id, data);
  }
}
