import { DoctorRepository } from "../domain/doctorRepository";
import { Doctor } from "../domain/doctor";

export class RegisterDoctorUseCase {
    constructor(private doctorRepository: DoctorRepository) {}

    async execute(doctorData: {
        id_usuario: number;
        nombre: string;
        especialidad: string;
        telefono: string;
        correo: string;
    }): Promise<Doctor> {
        const newDoctor = new Doctor(
            0, // The ID will be assigned by the database
            doctorData.id_usuario,
            doctorData.nombre,
            doctorData.especialidad,
            doctorData.telefono,
            doctorData.correo
        );

        return await this.doctorRepository.register(newDoctor);
    }
}
