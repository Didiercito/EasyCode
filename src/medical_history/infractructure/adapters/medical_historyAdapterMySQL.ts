import { MedicalHistoryRepository } from "../../domain/medical_historyRepository";
import { MedicalHistory } from "../../domain/medical_history";
import { db } from "../../../db/config/config";

export class MySQLMedicalHistoryRepository implements MedicalHistoryRepository {
    
    async getAll(): Promise<MedicalHistory[]> {
        const [rows] = await db.execute(`SELECT * FROM medical_history`);
        return rows as MedicalHistory[];
    }

    async getById(id: number): Promise<MedicalHistory | null> {
        const [rows] = await db.execute(`SELECT * FROM medical_history WHERE id = ?`, [id]);
        const histories = rows as MedicalHistory[];
        return histories.length > 0 ? histories[0] : null;
    }

    async registrate(history: MedicalHistory): Promise<MedicalHistory> {
        const { id_usuario, condicion, date } = history;
        
        const [result] = await db.execute(
            `INSERT INTO medical_history (id_usuario, condicion, date) VALUES (?, ?, ?)`,
            [id_usuario, condicion, date]
        );
    
        const insertId = (result as any).insertId;
    
        const insertedHistory = await this.getById(insertId);
        return insertedHistory!;
    }

    async update(id: number, historyData: Partial<MedicalHistory>): Promise<MedicalHistory | null> {
        const fields = Object.keys(historyData).map(key => `${key} = ?`).join(', ');
        const values = Object.values(historyData);
        await db.execute(
            `UPDATE medical_history SET ${fields}, update_at = ? WHERE id = ?`,
            [...values, new Date(), id]
        );
        
        return this.getById(id); 
    }

    async delete(id: number): Promise<boolean> {
        const [result] = await db.execute(`DELETE FROM medical_history WHERE id = ?`, [id]);
        return (result as any).affectedRows > 0;
    }

    async getByUserId(userId: number): Promise<MedicalHistory[]> {
        const [rows] = await db.execute(`SELECT * FROM medical_history WHERE id_usuario = ?`, [userId]);
        return rows as MedicalHistory[];
    }
}
