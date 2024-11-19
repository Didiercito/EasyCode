import { Acelerometer } from "../domain/acelerometer";
import { AcelerometerRepository } from "../domain/acelerometerRepository";

export class UpdateUseCase {
  private repository: AcelerometerRepository;

  constructor(repository: AcelerometerRepository) {
    this.repository = repository;
  }

  async execute(id: number, data: Partial<Acelerometer>): Promise<void> {
    if (!id || Object.keys(data).length === 0) {
      throw new Error("Invalid input: ID and update data are required.");
    }
    if (data.x === undefined && data.y === undefined && data.z === undefined) {
      throw new Error("Invalid update data: At least one axis (x, y, z) must be provided.");
    }
    await this.repository.update(id, data);
  }
}
