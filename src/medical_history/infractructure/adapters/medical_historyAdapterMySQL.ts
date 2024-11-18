import { MedicalHistoryRepository } from "../../domain/medical_historyRepository";
import { MedicalHistory } from "../../domain/medical_history";
import { pool } from "../../../db/config/config";


export class MySQLMedicalHistoryRepository implements MedicalHistoryRepository {

    // Obtener todos los historiales médicos
    async getAll(): Promise<MedicalHistory[]> {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute(`SELECT * FROM medical_history`);
            return rows as MedicalHistory[];
        } catch (error) {
            console.error("Error al obtener los historiales médicos:", error);
            return [];
        } finally {
            connection.release();
        }
    }

    // Obtener historial médico por ID
    async getById(id: number): Promise<MedicalHistory | null> {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute(`SELECT * FROM medical_history WHERE id = ?`, [id]);
            const histories = rows as MedicalHistory[];
            return histories.length > 0 ? histories[0] : null;
        } catch (error) {
            console.error("Error al obtener el historial médico por ID:", error);
            return null;
        } finally {
            connection.release();
        }
    }

    async registrate(history: MedicalHistory): Promise<MedicalHistory> {
        const connection = await pool.getConnection();
        try {
            const { id_usuario, condicion, date } = history;
            const [result] = await connection.execute(
                `INSERT INTO medical_history (id_usuario, condicion, date) VALUES (?, ?, ?)`,
                [id_usuario, condicion, date]
            );
            const insertId = (result as any).insertId;
    
            // Obtener el historial médico recién insertado
            const insertedHistory = await this.getById(insertId);
            
            if (!insertedHistory) {
                throw new Error("Error al obtener el historial médico recién insertado.");
            }
    
            return insertedHistory;
        } catch (error) {
            console.error("Error al registrar el historial médico:", error);
            throw new Error("Error al registrar el historial médico");
        } finally {
            connection.release();
        }
    }
    

    async update(id: number, historyData: Partial<MedicalHistory>): Promise<MedicalHistory | null> {
        const connection = await pool.getConnection();
        try {
            const fields = Object.keys(historyData).map(key => `${key} = ?`).join(', ');
            const values = Object.values(historyData);
            await connection.execute(
                `UPDATE medical_history SET ${fields}, update_at = ? WHERE id = ?`,
                [...values, new Date(), id]
            );
            return this.getById(id);  // Obtener el historial médico actualizado
        } catch (error) {
            console.error("Error al actualizar el historial médico:", error);
            return null;
        } finally {
            connection.release();
        }
    }

    // Eliminar un historial médico
    async delete(id: number): Promise<boolean> {
        const connection = await pool.getConnection();
        try {
            const [result] = await connection.execute(`DELETE FROM medical_history WHERE id = ?`, [id]);
            return (result as any).affectedRows > 0;
        } catch (error) {
            console.error("Error al eliminar el historial médico:", error);
            return false;
        } finally {
            connection.release();
        }
    }

    // Obtener historiales médicos por ID de usuario
    async getByUserId(userId: number): Promise<MedicalHistory[]> {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute(`SELECT * FROM medical_history WHERE id_usuario = ?`, [userId]);
            return rows as MedicalHistory[];
        } catch (error) {
            console.error("Error al obtener los historiales médicos por ID de usuario:", error);
            return [];
        } finally {
            connection.release();
        }
    }
}
