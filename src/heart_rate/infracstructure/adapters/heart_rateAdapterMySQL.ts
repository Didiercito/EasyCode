import { HeartRateRepository } from "../../domain/hate_rateRepository";
import { HeartRate } from "../../domain/heart_rate";
import { db } from "../../../db/config/config";

export class MySQLHeartRateRepository implements HeartRateRepository {
    
    async getAll(): Promise<HeartRate[]> {
        const [rows] = await db.execute(`SELECT * FROM heart_rate`);
        return rows as HeartRate[];
    }

    async getDataById(id: number): Promise<HeartRate | null> {
        const [rows] = await db.execute(`SELECT * FROM heart_rate WHERE id = ?`, [id]);
        const heartRates = rows as HeartRate[];
        return heartRates.length > 0 ? heartRates[0] : null;
    }

    async save(data: HeartRate): Promise<void> {
        const { id_usuario, BPM: heartRateData } = data;
        
        await db.execute(
            `INSERT INTO heart_rate (id_usuario, data) VALUES (?, ?)`,
            [id_usuario, heartRateData]
        );
        
        console.log('Datos de frecuencia cardíaca guardados correctamente:', {
            id_usuario,
            heartRateData
        });
    }
}
