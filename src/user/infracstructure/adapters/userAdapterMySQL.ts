import { UserRepository } from "../../domain/userRepository";
import { User } from "../../domain/user";
import { pool } from '../../../db/config/config'
import mysql from 'mysql2/promise';

export class MySQLUserAdapter implements UserRepository {

    public async getAll(): Promise<User[]> {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute('SELECT * FROM users');
            return (rows as mysql.RowDataPacket[]).map(
                (row) =>
                    new User(
                        row.id,
                        row.nombre,
                        row.apellido_p,
                        row.apellido_m,
                        row.edad,
                        row.genero,
                        row.estado,
                        row.municipio,
                        row.correo,
                        row.contrasena,
                        row.telefono,
                        row.peso,
                        row.altura,
                        new Date(row.create_at),
                        new Date(row.update_at)
                    )
            );
        } finally {
            connection.release();
        }
    }

    public async getById(id: number): Promise<User | null> {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute('SELECT * FROM users WHERE id = ?', [id]);
            const users = rows as mysql.RowDataPacket[];
            return users.length > 0
                ? new User(
                    users[0].id,
                    users[0].nombre,
                    users[0].apellido_p,
                    users[0].apellido_m,
                    users[0].edad,
                    users[0].genero,
                    users[0].estado,
                    users[0].municipio,
                    users[0].correo,
                    users[0].contrasena,
                    users[0].telefono,
                    users[0].peso,
                    users[0].altura,
                    new Date(users[0].create_at),
                    new Date(users[0].update_at)
                )
                : null;
        } finally {
            connection.release();
        }
    }

    public async update(id: number, userData: Partial<User>): Promise<User | null> {
        const connection = await pool.getConnection();
        try {
            const fields = Object.keys(userData).map(key => `${key} = ?`).join(', ');
            const values = Object.values(userData);
            await connection.execute(`UPDATE users SET ${fields}, update_at = ? WHERE id = ?`, [
                ...values, 
                new Date(),
                id
            ]);
            return this.getById(id);
        } finally {
            connection.release();
        }
    }

    public async delete(id: number): Promise<boolean> {
        const connection = await pool.getConnection();
        try {
            const [result] = await connection.execute('DELETE FROM users WHERE id = ?', [id]);
            return (result as any).affectedRows > 0;
        } finally {
            connection.release();
        }
    }
}
