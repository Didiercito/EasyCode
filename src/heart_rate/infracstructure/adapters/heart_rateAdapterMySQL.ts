import { HeartRate } from '../../domain/heart_rate';
import { HeartRateRepository } from '../../domain/hate_rateRepository';
import { pool } from '../../../db/config/config';
import mysql2 from 'mysql2';

export class MySQLHeartRateRepository implements HeartRateRepository {
    public async save(data: HeartRate): Promise<HeartRate> {
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

            // Devolver el objeto HeartRate actualizado o creado
            return new HeartRate(
                1,              // Suponiendo que ID es 1, si es auto-incremental cambia esto según lo necesites.
                data.ECG,      
                data.BPM,      
                data.createdAt,  
                data.updatedAt  
            );

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
            
            // Mapeamos los resultados a objetos HeartRate y los devolvemos
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

    public async update(id: number, data: Partial<HeartRate>): Promise<HeartRate> {
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

            // Devolver el objeto HeartRate actualizado
            return new HeartRate(
                id,              // ID del objeto actualizado
                data.ECG || 0,  // Si no se actualiza ECG, se mantiene el valor anterior
                data.BPM  || 0, // Si no se actualiza BPM, se mantiene el valor anterior
                now,            // Usamos el timestamp actual para updatedAt
                now             // Usamos el timestamp actual para updatedAt
            );
        } catch (error) {
            console.error("Error al actualizar datos en la base de datos:", error);
            throw error;
        } finally {
            connection.release();
        }
    }
}
