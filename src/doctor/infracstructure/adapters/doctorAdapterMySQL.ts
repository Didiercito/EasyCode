import { Doctor } from "../../domain/doctor";
import { DoctorRepository } from "../../domain/doctorRepository";
import { pool } from "../../../db/config/config";

export class MySQLDoctorRepository implements DoctorRepository {
    // Registrar un nuevo doctor
    async register(doctor: Doctor): Promise<Doctor> {
        const connection = await pool.getConnection();
        const { id_usuario, nombre, especialidad, telefono, correo } = doctor;
        try {
            const [result] = await connection.execute(
                `INSERT INTO doctors (id_usuario, nombre, especialidad, telefono, correo) VALUES (?, ?, ?, ?, ?)`,
                [id_usuario, nombre, especialidad, telefono, correo]
            );
            const insertId = (result as any).insertId;
            const newDoctor = await this.getById(insertId, connection);

            if (!newDoctor) {
                throw new Error("Failed to retrieve the newly created doctor.");
            }

            return newDoctor;
        } catch (error) {
            console.error("Error en el registro del doctor:", error);
            throw error;
        } finally {
            connection.release();
        }
    }

    // Obtener doctor por ID
    async getById(id: number, connection?: any): Promise<Doctor | null> {
        const conn = connection || (await pool.getConnection());
        try {
            const [rows] = await conn.execute(`SELECT * FROM doctors WHERE id = ?`, [id]);
            const doctors = rows as Doctor[];
            return doctors.length > 0 ? doctors[0] : null;
        } catch (error) {
            console.error("Error al obtener doctor por ID:", error);
            return null;
        } finally {
            if (!connection) conn.release();
        }
    }

    // Obtener doctores por ID de usuario
    async getByUserId(id_usuario: number): Promise<Doctor[]> {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute(
                `SELECT * FROM doctors WHERE id_usuario = ?`,
                [id_usuario]
            );
            return rows as Doctor[];
        } catch (error) {
            console.error("Error al obtener doctores por id_usuario:", error);
            return [];
        } finally {
            connection.release();
        }
    }

    // Obtener todos los doctores
    async getAll(): Promise<Doctor[]> {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute(`SELECT * FROM doctors`);
            return rows as Doctor[];
        } catch (error) {
            console.error("Error al obtener todos los doctores:", error);
            return [];
        } finally {
            connection.release();
        }
    }

    // Actualizar un doctor
    async update(id: number, doctorData: Partial<Doctor>): Promise<Doctor | null> {
        const connection = await pool.getConnection();
        const fields = Object.keys(doctorData).map(key => `${key} = ?`).join(", ");
        const values = Object.values(doctorData);
        try {
            await connection.execute(`UPDATE doctors SET ${fields} WHERE id = ?`, [...values, id]);
            return this.getById(id, connection);
        } catch (error) {
            console.error("Error al actualizar el doctor:", error);
            return null;
        } finally {
            connection.release();
        }
    }

    // Eliminar un doctor
    async delete(id: number): Promise<boolean> {
        const connection = await pool.getConnection();
        try {
            const [result] = await connection.execute(`DELETE FROM doctors WHERE id = ?`, [id]);
            return (result as any).affectedRows > 0;
        } catch (error) {
            console.error("Error al eliminar el doctor:", error);
            return false;
        } finally {
            connection.release();
        }
    }
}
