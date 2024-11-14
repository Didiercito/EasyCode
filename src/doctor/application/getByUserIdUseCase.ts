import { Doctor } from "../domain/doctor";
import { DoctorRepository } from "../domain/doctorRepository";

export class GetByUserIdUseCase {
    private doctorRepository: DoctorRepository;

    constructor(doctorRepository: DoctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    async execute(id_usuario: number): Promise<Doctor[]> {
        return await this.doctorRepository.getByUserId(id_usuario);
    }
}
