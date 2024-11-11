import { DoctorRepository } from "../domain/doctorRepository";
import { Doctor } from "../domain/doctor";

export class RegisterUseCase {
    constructor(private doctorRepository: DoctorRepository) {}

    async execute(doctor: Doctor): Promise<Doctor> {
        return this.doctorRepository.register(doctor);
    }
}
