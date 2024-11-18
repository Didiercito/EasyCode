import { Oximeter } from "../domain/oximeter";
import { OximeterRepository } from "../domain/oximeterRepository";

export class GetAllUseCase {
    constructor(private oximeterRepository: OximeterRepository) {}

    async execute(): Promise<Oximeter[]> {
        return this.oximeterRepository.getAll();
    }
}
