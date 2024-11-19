import { Acelerometer } from "../domain/acelerometer";
import { AcelerometerRepository } from "../domain/acelerometerRepository";

export class SaveAcelerometerUseCase {
  private repository: AcelerometerRepository;

  constructor(repository: AcelerometerRepository) {
    this.repository = repository;
  }

  async execute(data: Acelerometer): Promise<void> {
    if (!data || !data.id || data.x === undefined || data.y === undefined || data.z === undefined) {
      throw new Error("Invalid data: Missing required fields.");
    }
    await this.repository.save(data);
  }
}
