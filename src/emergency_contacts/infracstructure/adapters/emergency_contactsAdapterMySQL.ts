import { EmergencyContactsRepository } from "../../domain/emergency_contacRepository";
import { EmergencyContacts } from "../../domain/emergency_contacts";
import { db } from "../../../db/config/config";

export class MySQLEmergencyContactsRepository implements EmergencyContactsRepository {
    
    async getAll(): Promise<EmergencyContacts[]> {
        const [rows] = await db.execute(`SELECT * FROM contactos_emergencia`);
        return rows as EmergencyContacts[];
    }

    async getById(id: number): Promise<EmergencyContacts | null> {
        const [rows] = await db.execute(`SELECT * FROM contactos_emergencia WHERE id = ?`, [id]);
        const contacts = rows as EmergencyContacts[];
        return contacts.length > 0 ? contacts[0] : null;
    }

    async register(contact: EmergencyContacts): Promise<EmergencyContacts> {
        const { id_usuario, nombre, apellido_p, apellido_m, telefono, ralacion, correo } = contact;
        
        const [result] = await db.execute(
            `INSERT INTO contactos_emergencia (id_usuario, nombre, apellido_p, apellido_m, telefono, ralacion, correo) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [id_usuario, nombre, apellido_p, apellido_m, telefono, ralacion, correo]
        );

        const insertId = (result as any).insertId;
        const insertedContact = await this.getById(insertId);
        return insertedContact!;
    }

    async update(id: number, contactData: Partial<EmergencyContacts>): Promise<EmergencyContacts | null> {
        const fields = Object.keys(contactData).map(key => `${key} = ?`).join(', ');
        const values = Object.values(contactData);
        
        await db.execute(
            `UPDATE contactos_emergencia SET ${fields}, update_at = ? WHERE id = ?`,
            [...values, new Date(), id]
        );

        return this.getById(id);
    }

    async delete(id: number): Promise<boolean> {
        const [result] = await db.execute(`DELETE FROM contactos_emergencia WHERE id = ?`, [id]);
        return (result as any).affectedRows > 0;
    }
}
