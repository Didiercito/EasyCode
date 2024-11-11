import { Doctor } from "../domain/doctor";
import { DoctorRepository } from "../domain/doctorRepository";

export class UpdateUseCase {
    constructor(private doctorRepository: DoctorRepository) {}

    async execute(id: number, doctorData: Partial<Doctor>): Promise<Doctor | null> {
        return this.doctorRepository.update(id, doctorData);
    }
}
