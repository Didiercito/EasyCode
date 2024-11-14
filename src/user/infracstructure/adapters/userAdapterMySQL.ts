import { UserRepository } from "../../domain/userRepository";
import { User } from "../../domain/user";
import { db } from "../../../db/config/config";

export class MySQLUserRepository implements UserRepository {
    
    async getAll(): Promise<User[]> {
        const [rows] = await db.execute(`SELECT * FROM users`);
        return rows as User[];
    }

    async getById(id: number): Promise<User | null> {
        const [rows] = await db.execute(`SELECT * FROM users WHERE id = ?`, [id]);
        const users = rows as User[];
        return users.length > 0 ? users[0] : null;
    }

    async update(id: number, userData: Partial<User>): Promise<User | null> {
        const fields = Object.keys(userData).map(key => `${key} = ?`).join(', ');
        const values = Object.values(userData);
        await db.execute(`UPDATE users SET ${fields}, update_at = ? WHERE id = ?`, [...values, new Date(), id]);
        return this.getById(id); 
    }

    async delete(id: number): Promise<boolean> {
        const [result] = await db.execute(`DELETE FROM users WHERE id = ?`, [id]);
        return (result as any).affectedRows > 0;
    }
}
