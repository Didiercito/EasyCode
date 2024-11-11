import { DoctorRepository } from "../domain/doctorRepository";
import { Doctor } from "../domain/doctor";

export class GetByIdUseCase {
    constructor(private doctorRepository: DoctorRepository) {}

    async execute(id: number): Promise<Doctor | null> {
        return this.doctorRepository.getById(id);
    }
}
