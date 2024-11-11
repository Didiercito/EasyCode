import { DoctorRepository } from "../domain/doctorRepository";

export class DeleteUseCase {
    constructor(private doctorRepository: DoctorRepository) {}

    async execute(id: number): Promise<boolean> {
        return this.doctorRepository.delete(id);
    }
}
