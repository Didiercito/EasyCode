import { BodyTemperature } from "../domain/body_temperature";
import { BodyTemperatureRepository } from "../domain/body_temperatureRepository";

export class UpdateUseCase {
    constructor(private repository: BodyTemperatureRepository) {}

    async execute(id: number, data: Partial<BodyTemperature>): Promise<void> {
        await this.repository.update(id, data);
    }
}
