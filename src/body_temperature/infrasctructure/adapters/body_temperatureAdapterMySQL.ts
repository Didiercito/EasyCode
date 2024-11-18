import { BodyTemperature } from "../../domain/body_temperature";
import { BodyTemperatureRepository } from "../../domain/body_temperatureRepository";
import { pool } from "../../../db/config/config";

export class MySQLBodyTemperatureRepository implements BodyTemperatureRepository {
    async save(data: BodyTemperature): Promise<void> {
        const connection = await pool.getConnection();
        const { valor, create_at, update_at } = data;
        try {
            await connection.execute(
                `INSERT INTO body_temperature (id, valor, create_at, update_at) VALUES (?, ?, ?, ?)
                 ON DUPLICATE KEY UPDATE valor = VALUES(valor), update_at = VALUES(update_at)`,
                [data.id, valor, create_at, update_at]
            );
        } catch (error) {
            console.error("Error al guardar la temperatura corporal:", error);
            throw new Error("Error al guardar la temperatura corporal");
        } finally {
            connection.release();
        }
    }


    async getAll(): Promise<BodyTemperature[]> {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute(`SELECT * FROM body_temperature`);
            return rows as BodyTemperature[];
        } catch (error) {
            console.error("Error al obtener las temperaturas corporales:", error);
            return [];
        } finally {
            connection.release();
        }
    }


    async update(id: number, data: Partial<BodyTemperature>): Promise<void> {
        const connection = await pool.getConnection();
        try {
            const fields = Object.keys(data).map(key => `${key} = ?`).join(", ");
            const values = Object.values(data);
            await connection.execute(`UPDATE body_temperature SET ${fields} WHERE id = ?`, [...values, id]);
        } catch (error) {
            console.error("Error al actualizar los datos de la temperatura corporal:", error);
            throw new Error("Error al actualizar los datos de la temperatura corporal");
        } finally {
            connection.release();
        }
    }
}
