import { User } from "../../../user/domain/user";
import { AuthRepository } from "../../domain/authRepository";
import { pool } from "../../../db/config/config";
export class AuthAdapterMySQL implements AuthRepository {
    
    async register(user: User): Promise<User | null> {
        const connection = await pool.getConnection();
        try {
            const [result] = await connection.execute(
                `INSERT INTO users (nombre, apellido_p, apellido_m, edad, genero, estado, municipio, correo, contrasena, telefono, peso, altura, create_at, update_at) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    user.nombre,
                    user.apellido_p,
                    user.apellido_m,
                    user.edad,
                    user.genero,
                    user.estado,
                    user.municipio,
                    user.correo,
                    user.contrasena,
                    user.telefono,
                    user.peso,
                    user.altura,
                    new Date(),
                    new Date()
                ]
            );
            const userId = (result as any).insertId;
            return { ...user, id: userId };
        } catch (error) {
            console.error("Error en el registro de usuario:", error);
            return null;
        } finally {
            connection.release();
        }
    }

    async login(correo: string, contrasena: string): Promise<User | null> {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute(
                `SELECT * FROM users WHERE correo = ? AND contrasena = ?`,
                [correo, contrasena]
            );
            const users = rows as User[];
            return users.length > 0 ? users[0] : null;
        } catch (error) {
            console.error("Error en el inicio de sesión:", error);
            return null;
        } finally {
            connection.release();
        }
    }

    async getByEmail(email: string): Promise<User | null> {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute(
                `SELECT * FROM users WHERE correo = ?`,
                [email]
            );
            const users = rows as User[];
            return users.length > 0 ? users[0] : null;
        } catch (error) {
            console.error("Error al obtener usuario por correo:", error);
            return null;
        } finally {
            connection.release();
        }
    }
}
