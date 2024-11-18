import { Oximeter } from "../../domain/oximeter";
import { OximeterRepository } from "../../domain/oximeterRepository";
import { pool } from "../../../db/config/config";

export class MySQLOximeterRepository implements OximeterRepository {

    async save(data: Oximeter): Promise<void> {
        const connection = await pool.getConnection();
        const { id, valor, create_at, update_at } = data;
        try {
            await connection.execute(
                `INSERT INTO oximeter (id, valor, create_at, update_at) 
                 VALUES (?, ?, ?, ?)
                 ON DUPLICATE KEY UPDATE valor = VALUES(valor), update_at = VALUES(update_at)`,
                [id, valor, create_at, update_at]
            );
        } catch (error) {
            console.error("Error al guardar o actualizar los datos del oxímetro:", error);
            throw new Error("Error al guardar o actualizar los datos del oxímetro");
        } finally {
            connection.release();
        }
    }

    // Obtener todos los oxímetros
    async getAll(): Promise<Oximeter[]> {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute(`SELECT * FROM oximeter`);
            return rows as Oximeter[];
        } catch (error) {
            console.error("Error al obtener los oxímetros:", error);
            return [];
        } finally {
            connection.release();
        }
    }

    // Actualizar los datos de un oxímetro
    async update(id: number, data: Partial<Oximeter>): Promise<void> {
        const connection = await pool.getConnection();
        try {
            const fields = Object.keys(data).map(key => `${key} = ?`).join(", ");
            const values = Object.values(data);
            await connection.execute(
                `UPDATE oximeter SET ${fields} WHERE id = ?`,
                [...values, id]
            );
        } catch (error) {
            console.error("Error al actualizar los datos del oxímetro:", error);
            throw new Error("Error al actualizar los datos del oxímetro");
        } finally {
            connection.release();
        }
    }
}
