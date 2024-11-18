import { EmergencyContactsRepository } from "../../domain/emergency_contacRepository";
import { EmergencyContacts } from "../../domain/emergency_contacts";
import { pool } from "../../../db/config/config";

export class MySQLEmergencyContactsRepository implements EmergencyContactsRepository {
    // Obtener todos los contactos de emergencia
    async getAll(): Promise<EmergencyContacts[]> {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute(`SELECT * FROM emergency_contacts`);
            return rows as EmergencyContacts[];
        } catch (error) {
            console.error("Error al obtener todos los contactos de emergencia:", error);
            return [];
        } finally {
            connection.release();
        }
    }

    // Obtener un contacto de emergencia por ID
    async getById(id: number): Promise<EmergencyContacts | null> {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute(`SELECT * FROM emergency_contacts WHERE id = ?`, [id]);
            const contacts = rows as EmergencyContacts[];
            return contacts.length > 0 ? contacts[0] : null;
        } catch (error) {
            console.error("Error al obtener contacto de emergencia por ID:", error);
            return null;
        } finally {
            connection.release();
        }
    }

    // Obtener contactos de emergencia por ID de usuario
    async getByUserId(id_usuario: number): Promise<EmergencyContacts[]> {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute(
                `SELECT * FROM emergency_contacts WHERE id_usuario = ?`,
                [id_usuario]
            );
            return rows as EmergencyContacts[];
        } catch (error) {
            console.error("Error al obtener contactos de emergencia por id_usuario:", error);
            return [];
        } finally {
            connection.release();
        }
    }

    // Registrar un nuevo contacto de emergencia
    async register(contact: EmergencyContacts): Promise<EmergencyContacts> {
        const { id_usuario, nombre, apellido_p, apellido_m, telefono, ralacion, correo } = contact;
        const connection = await pool.getConnection();
        try {
            const [result] = await connection.execute(
                `INSERT INTO emergency_contacts (id_usuario, nombre, apellido_p, apellido_m, telefono, relacion, correo) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [id_usuario, nombre, apellido_p, apellido_m, telefono, ralacion, correo]
            );
            const insertId = (result as any).insertId;
            const newContact = await this.getById(insertId); // Cambiado aquí

            if (!newContact) {
                throw new Error("Failed to retrieve the newly created contact.");
            }

            return newContact;
        } catch (error) {
            console.error("Error al registrar el contacto de emergencia:", error);
            throw error;
        } finally {
            connection.release();
        }
    }

    // Actualizar un contacto de emergencia
    async update(id: number, contactData: Partial<EmergencyContacts>): Promise<EmergencyContacts | null> {
        const connection = await pool.getConnection();
        const fields = Object.keys(contactData).map(key => `${key} = ?`).join(', ');
        const values = Object.values(contactData);
        try {
            await connection.execute(
                `UPDATE emergency_contacts SET ${fields}, update_at = ? WHERE id = ?`,
                [...values, new Date(), id]
            );
            return this.getById(id); // Cambiado aquí
        } catch (error) {
            console.error("Error al actualizar el contacto de emergencia:", error);
            return null;
        } finally {
            connection.release();
        }
    }

    async delete(id: number): Promise<boolean> {
        const connection = await pool.getConnection();
        try {
            const [result] = await connection.execute(`DELETE FROM emergency_contacts WHERE id = ?`, [id]);
            return (result as any).affectedRows > 0;
        } catch (error) {
            console.error("Error al eliminar el contacto de emergencia:", error);
            return false;
        } finally {
            connection.release();
        }
    }
}
