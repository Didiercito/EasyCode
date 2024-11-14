import { EmergencyContactsRepository } from "../domain/emergency_contacRepository";
import { EmergencyContacts } from "../domain/emergency_contacts";

export class UpdateUseCase {
    constructor(private emergencyContactsRepository: EmergencyContactsRepository) {}

    async execute(id: number, contactData: Partial<EmergencyContacts>): Promise<EmergencyContacts | null> {
        // Llamamos al método de actualización directamente con el `id` del contacto
        const updatedContact = await this.emergencyContactsRepository.update(id, contactData);
        return updatedContact;
    }
}

