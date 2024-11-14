import { Doctor } from "../../domain/doctor";
import { DoctorRepository } from "../../domain/doctorRepository";
import { db } from "../../../db/config/config";

export class MySQLDoctorRepository implements DoctorRepository {
    async register(doctor: Doctor): Promise<Doctor> {
        const { id_usuario, nombre, especialidad, telefono, correo } = doctor;
        const [result] = await db.execute(
            `INSERT INTO doctors (id_usuario, nombre, especialidad, telefono, correo) VALUES (?, ?, ?, ?, ?)`,
            [id_usuario, nombre, especialidad, telefono, correo]
        );
        const insertId = (result as any).insertId;
        const newDoctor = await this.getById(insertId);
    
        if (!newDoctor) {
            throw new Error("Failed to retrieve the newly created doctor.");
        }
    
        return newDoctor;
    }
    

    async getById(id: number): Promise<Doctor | null> {
        const [rows] = await db.execute(`SELECT * FROM doctors WHERE id = ?`, [id]);
        const doctors = rows as Doctor[];
        return doctors.length > 0 ? doctors[0] : null;
    }

    async getByUserId(id_usuario: number): Promise<Doctor[]> {
        const [rows] = await db.execute(
            `SELECT * FROM doctors WHERE id_usuario = ?`,
            [id_usuario]
        );
        return rows as Doctor[];
    }

    async getAll(): Promise<Doctor[]> {
        const [rows] = await db.execute(`SELECT * FROM doctors`);
        return rows as Doctor[];
    }

    async update(id: number, doctorData: Partial<Doctor>): Promise<Doctor | null> {
        const fields = Object.keys(doctorData).map(key => `${key} = ?`).join(", ");
        const values = Object.values(doctorData);
        await db.execute(`UPDATE doctors SET ${fields} WHERE id = ?`, [...values, id]);
        return this.getById(id);
    }

    async delete(id: number): Promise<boolean> {
        const [result] = await db.execute(`DELETE FROM doctors WHERE id = ?`, [id]);
        return (result as any).affectedRows > 0;
    }
}
