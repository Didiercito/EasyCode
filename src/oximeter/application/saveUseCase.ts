import { Oximeter } from "../domain/oximeter";
import { OximeterRepository } from "../domain/oximeterRepository";

export class SaveUseCaseOximeter {
    constructor(private oximeterRepository: OximeterRepository) {}

    async execute(data: Oximeter): Promise<void> {
        await this.oximeterRepository.save(data);
    }
}
