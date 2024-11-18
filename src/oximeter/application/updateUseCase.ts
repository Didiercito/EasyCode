import { Oximeter } from "../domain/oximeter";
import { OximeterRepository } from "../domain/oximeterRepository";

export class UpdateUseCase {
    constructor(private oximeterRepository: OximeterRepository) {}

    async execute(id: number, data: Partial<Oximeter>): Promise<void> {
        await this.oximeterRepository.update(id, data);
    }
}
