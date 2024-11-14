import { EmergencyContacts } from "./emergency_contacts";

export interface EmergencyContactsRepository {
    register(contact: EmergencyContacts): Promise<EmergencyContacts>;
    getById(id: number): Promise<EmergencyContacts | null>;
    getByUserId(id_usuario: number): Promise<EmergencyContacts[]>;  
    getAll(): Promise<EmergencyContacts[]>;
    update(id: number, contactData: Partial<EmergencyContacts>): Promise<EmergencyContacts | null>;
    delete(id: number): Promise<boolean>;
}
