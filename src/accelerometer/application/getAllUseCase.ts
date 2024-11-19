import { Acelerometer } from "../domain/acelerometer";
import { AcelerometerRepository } from "../domain/acelerometerRepository";

export class GetAllUseCase {
  private repository: AcelerometerRepository;

  constructor(repository: AcelerometerRepository) {
    this.repository = repository;
  }

  async execute(): Promise<Acelerometer[]> {
    return await this.repository.getAll();
  }
}
