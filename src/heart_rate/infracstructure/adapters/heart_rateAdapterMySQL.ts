import { HeartRate } from '../../domain/heart_rate';
import { HeartRateRepository } from '../../domain/hate_rateRepository';
import { pool } from '../../../db/config/config';
import mysql2 from 'mysql2';

export class MySQLHeartRateRepository implements HeartRateRepository {
    public async save(data: HeartRate): Promise<void> {
        const connection = await pool.getConnection();
        try {
            const query = `
                INSERT INTO heart_rate (id, ECG, BPM, createdAt, updatedAt)
                VALUES (1, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE
                ECG = VALUES(ECG),
                BPM = VALUES(BPM),
                updatedAt = VALUES(updatedAt)
            `;
            await connection.execute(query, [
                data.ECG,            
                data.BPM,            
                data.createdAt,      
                data.updatedAt       
            ]);
        } catch (error) {
            console.error("Error al guardar o actualizar datos en la base de datos:", error);
            throw error;
        } finally {
            connection.release();
        }
    }

    public async getAll(): Promise<HeartRate[]> {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute('SELECT id, ECG, BPM, createdAt, updatedAt FROM heart_rate');
            return (rows as mysql2.RowDataPacket[]).map(
                (row) =>
                    new HeartRate(
                        row.id,
                        row.ECG,          
                        row.BPM,          
                        new Date(row.createdAt),
                        new Date(row.updatedAt)
                    )
            );
        } catch (error) {
            console.error("Error al obtener datos de la base de datos:", error);
            throw error;
        } finally {
            connection.release();
        }
    }

    public async update(id: number, data: Partial<HeartRate>): Promise<void> {
        const connection = await pool.getConnection();
        try {
            const query = `
                UPDATE heart_rate 
                SET 
                    ECG = ?, 
                    BPM = ?, 
                    updatedAt = ? 
                WHERE id = ?
            `;
            const now = new Date();
            await connection.execute(query, [
                data.ECG,            
                data.BPM,            
                now,                 
                id
            ]);
        } catch (error) {
            console.error("Error al actualizar datos en la base de datos:", error);
            throw error;
        } finally {
            connection.release();
        }
    }
}