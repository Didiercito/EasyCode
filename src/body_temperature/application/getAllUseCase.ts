import { BodyTemperature } from "../domain/body_temperature";
import { BodyTemperatureRepository } from "../domain/body_temperatureRepository";

export class GetAllUseCase {
    constructor(private repository: BodyTemperatureRepository) {}

    async execute(): Promise<BodyTemperature[]> {
        return await this.repository.getAll();
    }
}
