import { Acelerometer } from "../../domain/acelerometer";
import { AcelerometerRepository } from "../../domain/acelerometerRepository";
import { pool } from "../../../db/config/config";

export class MySQLAcelerometerRepository implements AcelerometerRepository {
    async save(data: Acelerometer): Promise<void> {
        const connection = await pool.getConnection();
        const { id, x, y, z, create_at, update_at } = data;
        try {
            await connection.execute(
                `INSERT INTO acelerometer (id, x, y, z, create_at, update_at) VALUES (?, ?, ?, ?, ?, ?)
                 ON DUPLICATE KEY UPDATE x = VALUES(x), y = VALUES(y), z = VALUES(z), update_at = VALUES(update_at)`,
                [id, x, y, z, create_at, update_at]
            );
        } catch (error) {
            console.error("Error al guardar los datos del acelerómetro:", error);
            throw new Error("Error al guardar los datos del acelerómetro");
        } finally {
            connection.release();
        }
    }

    async getAll(): Promise<Acelerometer[]> {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute(`SELECT * FROM acelerometer`);
            return (rows as any[]).map(row => new Acelerometer(
                row.id,
                row.x,
                row.y,
                row.z,
                new Date(row.create_at),
                new Date(row.update_at)
            ));
        } catch (error) {
            console.error("Error al obtener los datos del acelerómetro:", error);
            return [];
        } finally {
            connection.release();
        }
    }

    async update(id: number, data: Partial<Acelerometer>): Promise<void> {
        const connection = await pool.getConnection();
        try {
            const fields = Object.keys(data).map(key => `${key} = ?`).join(", ");
            const values = Object.values(data);
            await connection.execute(
                `UPDATE acelerometer SET ${fields} WHERE id = ?`,
                [...values, id]
            );
        } catch (error) {
            console.error("Error al actualizar los datos del acelerómetro:", error);
            throw new Error("Error al actualizar los datos del acelerómetro");
        } finally {
            connection.release();
        }
    }
}
