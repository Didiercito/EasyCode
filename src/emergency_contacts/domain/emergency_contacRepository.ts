import { EmergencyContacts } from "./emergency_contacts";

export interface EmergencyContactsRepository {
    register(contact: EmergencyContacts): Promise<EmergencyContacts>;
    getById(id: number): Promise<EmergencyContacts | null>;
    getAll(): Promise<EmergencyContacts[]>;
    update(id: number, contactData: Partial<EmergencyContacts>): Promise<EmergencyContacts | null>;
    delete(id: number): Promise<boolean>;
}
