import { EmergencyContactsRepository } from "../../domain/emergency_contacRepository";
import { EmergencyContacts } from "../../domain/emergency_contacts";
import { db } from "../../../db/config/config";

export class MySQLEmergencyContactsRepository implements EmergencyContactsRepository {
    async getAll(): Promise<EmergencyContacts[]> {
        const [rows] = await db.execute(`SELECT * FROM emergency_contacts`);
        return rows as EmergencyContacts[];
    }

    async getById(id: number): Promise<EmergencyContacts | null> {
        const [rows] = await db.execute(`SELECT * FROM emergency_contacts WHERE id = ?`, [id]);
        const contacts = rows as EmergencyContacts[];
        return contacts.length > 0 ? contacts[0] : null;
    }

    async getByUserId(id_usuario: number): Promise<EmergencyContacts[]> {
        const [rows] = await db.execute(
            `SELECT * FROM emergency_contacts WHERE id_usuario = ?`,
            [id_usuario]
        );

        return rows as EmergencyContacts[];
    }

    async register(contact: EmergencyContacts): Promise<EmergencyContacts> {
        const { id_usuario, nombre, apellido_p, apellido_m, telefono, ralacion, correo } = contact;
        const [result] = await db.execute(
            `INSERT INTO emergency_contacts (id_usuario, nombre, apellido_p, apellido_m, telefono, relacion, correo) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [id_usuario, nombre, apellido_p, apellido_m, telefono, ralacion, correo]
        );
        const insertId = (result as any).insertId;
        const newContact = await this.getById(insertId);

        if (!newContact) {
            throw new Error("Failed to retrieve the newly created contact.");
        }

        return newContact;
    }

    async update(id: number, contactData: Partial<EmergencyContacts>): Promise<EmergencyContacts | null> {
        const fields = Object.keys(contactData).map(key => `${key} = ?`).join(', ');
        const values = Object.values(contactData);

        // Ejecuta la actualización del contacto de emergencia con el id proporcionado
        await db.execute(
            `UPDATE emergency_contacts SET ${fields}, update_at = ? WHERE id = ?`,
            [...values, new Date(), id]
        );

        // Retorna el contacto actualizado
        return this.getById(id);
    }

    async delete(id: number): Promise<boolean> {
        const [result] = await db.execute(`DELETE FROM emergency_contacts WHERE id = ?`, [id]);
        return (result as any).affectedRows > 0;
    }
}
