import { Doctor } from "./doctor";

export interface DoctorRepository {
    register(doctor: Doctor): Promise<Doctor>;
    getById(id: number): Promise<Doctor | null>;
    getByUserId(id_usuario: number): Promise<Doctor[]>;
    getAll(): Promise<Doctor[]>;
    update(id: number, doctorData: Partial<Doctor>): Promise<Doctor | null>;
    delete(id: number): Promise<boolean>;
}
