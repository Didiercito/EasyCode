import { User } from "../../../user/domain/user";
import { AuthRepository } from "../../domain/authRepository";
import { db } from "../../../db/config/config"; 

export class AuthAdapterMySQL implements AuthRepository {
    
    async register(user: User): Promise<User | null> {
        try {
            const [result] = await db.execute(
                `INSERT INTO usuarios (nombre, apellido_p, apellido_m, edad, genero, estado, municipio, correo, contrasena, telefono, peso, altura, create_at, update_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
        }
    }

    async login(correo: string, contrasena: string): Promise<User | null> {
        try {
            const [rows] = await db.execute(
                `SELECT * FROM usuarios WHERE correo = ? AND contrasena = ?`,
                [correo, contrasena]
            );

            const users = rows as User[];
            return users.length > 0 ? users[0] : null;
        } catch (error) {
            console.error("Error en el inicio de sesión:", error);
            return null;
        }
    }

    async getByEmail(email: string): Promise<User | null> {
        try {
            const [rows] = await db.execute(
                `SELECT * FROM usuarios WHERE correo = ?`,
                [email]
            );

            const users = rows as User[];
            return users.length > 0 ? users[0] : null;
        } catch (error) {
            console.error("Error al obtener usuario por correo:", error);
            return null;
        }
    }
}
