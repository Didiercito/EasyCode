import { DoctorRepository } from "../domain/doctorRepository";
import { Doctor } from "../domain/doctor";

export class GetAllUseCase {
    constructor(private doctorRepository: DoctorRepository) {}

    async execute(): Promise<Doctor[]> {
        return this.doctorRepository.getAll();
    }
}
