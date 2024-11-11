import { Doctor } from "../../domain/doctor";
import { DoctorRepository } from "../../domain/doctorRepository";
import { db } from "../../../db/config/config";

export class MySQLDoctorRepository implements DoctorRepository {
    
    async register(doctor: Doctor): Promise<Doctor> {
        const { nombre, especialidad, telefono, correo } = doctor;
        const [result] = await db.execute(
            `INSERT INTO doctores (nombre, apellido, especialidad, telefono) VALUES (?, ?, ?, ?)`,
            [nombre, especialidad, telefono, correo]
        );
        const insertId = (result as any).insertId;
        return this.getById(insertId) as Promise<Doctor>;
    }

    async getById(id: number): Promise<Doctor | null> {
        const [rows] = await db.execute(`SELECT * FROM doctores WHERE id = ?`, [id]);
        const doctors = rows as Doctor[];
        return doctors.length > 0 ? doctors[0] : null;
    }

    async getAll(): Promise<Doctor[]> {
        const [rows] = await db.execute(`SELECT * FROM doctores`);
        return rows as Doctor[];
    }

    async update(id: number, doctorData: Partial<Doctor>): Promise<Doctor | null> {
        const fields = Object.keys(doctorData).map(key => `${key} = ?`).join(", ");
        const values = Object.values(doctorData);
        await db.execute(`UPDATE doctores SET ${fields} WHERE id = ?`, [...values, id]);
        return this.getById(id);
    }

    async delete(id: number): Promise<boolean> {
        const [result] = await db.execute(`DELETE FROM doctores WHERE id = ?`, [id]);
        return (result as any).affectedRows > 0;
    }
}
