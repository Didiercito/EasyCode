import { SensorHistory } from "../../domain/history";
import { SensorHistoryRepository } from "../../domain/historyRepository";
import { pool } from "../../../db/config/config";
import mysql2 from "mysql2";

export class MySQLSensorHistoryRepository implements SensorHistoryRepository {
    public async addSensorHistory(sensorHistory: SensorHistory): Promise<SensorHistory> {
        const connection = await pool.getConnection();
        try {
            const query = `
                INSERT INTO sensor_history (sensorType, sensorValue, userId, create_at, update_at)
                VALUES (?, ?, ?, ?, ?)
            `;
            const [result] = await connection.execute(query, [
                sensorHistory.sensorType,
                sensorHistory.sensorValue, // Insertamos el valor del sensor
                sensorHistory.userId,
                sensorHistory.create_at,
                sensorHistory.update_at,
            ]);

            const insertId = (result as mysql2.OkPacket).insertId;

            return new SensorHistory(
                insertId,
                sensorHistory.sensorType,
                sensorHistory.sensorValue,
                sensorHistory.userId,
                sensorHistory.create_at,
                sensorHistory.update_at
            );
        } catch (error) {
            console.error("Error al agregar un evento de historial de sensor en la base de datos:", error);
            throw new Error("Error al guardar el historial del sensor en la base de datos.");
        } finally {
            connection.release();
        }
    }

    public async updateSensorHistory(
        id: number,
        sensorHistory: SensorHistory
    ): Promise<SensorHistory> {
        const connection = await pool.getConnection();
        try {
            const query = `
                UPDATE sensor_history
                SET sensorType = ?, sensorValue = ?, userId = ?, update_at = ?
                WHERE id = ?
            `;
            const now = new Date();
            await connection.execute(query, [
                sensorHistory.sensorType,
                sensorHistory.sensorValue, // Actualizamos el valor del sensor
                sensorHistory.userId,
                now,
                id,
            ]);

            return new SensorHistory(
                id,
                sensorHistory.sensorType,
                sensorHistory.sensorValue,
                sensorHistory.userId,
                sensorHistory.create_at,
                now
            );
        } catch (error) {
            console.error("Error al actualizar un evento de historial de sensor en la base de datos:", error);
            throw error;
        } finally {
            connection.release();
        }
    }

    public async getSensorHistoryById(id: number): Promise<SensorHistory | null> {
        const connection = await pool.getConnection();
        try {
            const query = `SELECT * FROM sensor_history WHERE id = ?`;
            const [rows] = await connection.execute(query, [id]);

            if ((rows as mysql2.RowDataPacket[]).length === 0) {
                return null;
            }

            const row = (rows as mysql2.RowDataPacket[])[0];
            return new SensorHistory(
                row.id,
                row.sensorType,
                row.sensorValue, // Aquí ya obtenemos el valor como FLOAT
                row.userId,
                new Date(row.create_at),
                new Date(row.update_at)
            );
        } catch (error) {
            console.error("Error al obtener el historial de sensor por ID:", error);
            throw error;
        } finally {
            connection.release();
        }
    }

    public async getHistoryForUser(userId: number): Promise<SensorHistory[]> {
        const connection = await pool.getConnection();
        try {
            const query = `SELECT * FROM sensor_history WHERE userId = ?`;
            const [rows] = await connection.execute(query, [userId]);

            return (rows as mysql2.RowDataPacket[]).map((row) =>
                new SensorHistory(
                    row.id,
                    row.sensorType,
                    row.sensorValue, // Aquí también el valor del sensor es directamente un FLOAT
                    row.userId,
                    new Date(row.create_at),
                    new Date(row.update_at)
                )
            );
        } catch (error) {
            console.error("Error al obtener el historial de sensores para un usuario:", error);
            throw error;
        } finally {
            connection.release();
        }
    }

    public async getAllHistory(): Promise<SensorHistory[]> {
        const connection = await pool.getConnection();
        try {
            const query = `SELECT * FROM sensor_history`;
            const [rows] = await connection.execute(query);

            return (rows as mysql2.RowDataPacket[]).map((row) =>
                new SensorHistory(
                    row.id,
                    row.sensorType,
                    row.sensorValue, // Al obtener todos los registros también obtenemos el valor como FLOAT
                    row.userId,
                    new Date(row.create_at),
                    new Date(row.update_at)
                )
            );
        } catch (error) {
            console.error("Error al obtener todo el historial de sensores:", error);
            throw error;
        } finally {
            connection.release();
        }
    }

    public async deleteSensorHistory(id: number): Promise<void> {
        const connection = await pool.getConnection();
        try {
            const query = `DELETE FROM sensor_history WHERE id = ?`;
            await connection.execute(query, [id]);
        } catch (error) {
            console.error("Error al eliminar un evento de historial de sensor:", error);
            throw error;
        } finally {
            connection.release();
        }
    }

    public async getHistoryBySensorType(sensorType: string): Promise<SensorHistory[]> {
        const connection = await pool.getConnection();
        try {
            const query = `SELECT * FROM sensor_history WHERE sensorType = ?`;
            const [rows] = await connection.execute(query, [sensorType]);

            return (rows as mysql2.RowDataPacket[]).map((row) =>
                new SensorHistory(
                    row.id,
                    row.sensorType,
                    row.sensorValue, // Valor como FLOAT
                    row.userId,
                    new Date(row.create_at),
                    new Date(row.update_at)
                )
            );
        } catch (error) {
            console.error("Error al obtener historial de sensores por tipo de sensor:", error);
            throw error;
        } finally {
            connection.release();
        }
    }

    public async getHistoryByDateRange(startDate: Date, endDate: Date): Promise<SensorHistory[]> {
        const connection = await pool.getConnection();
        try {
            const query = `
                SELECT * FROM sensor_history
                WHERE create_at BETWEEN ? AND ?
            `;
            const [rows] = await connection.execute(query, [
                startDate.toISOString(),
                endDate.toISOString(),
            ]);

            return (rows as mysql2.RowDataPacket[]).map((row) =>
                new SensorHistory(
                    row.id,
                    row.sensorType,
                    row.sensorValue, // El valor es un FLOAT
                    row.userId,
                    new Date(row.create_at),
                    new Date(row.update_at)
                )
            );
        } catch (error) {
            console.error("Error al obtener historial de sensores por rango de fechas:", error);
            throw error;
        } finally {
            connection.release();
        }
    }
}
