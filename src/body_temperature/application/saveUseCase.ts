import { BodyTemperature } from "../domain/body_temperature";
import { BodyTemperatureRepository } from "../domain/body_temperatureRepository";

export class SaveUseCaseBodyTemperature {
    constructor(private repository: BodyTemperatureRepository) {}

    async execute(data: BodyTemperature): Promise<void> {
        await this.repository.save(data);
    }
}
