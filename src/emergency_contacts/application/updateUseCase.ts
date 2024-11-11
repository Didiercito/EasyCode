import { EmergencyContactsRepository } from "../domain/emergency_contacRepository";
import { EmergencyContacts } from "../domain/emergency_contacts";

export class UpdateUseCase {
    constructor(private emergencyContactsRepository: EmergencyContactsRepository) {}

    async execute(id: number, contactData: Partial<EmergencyContacts>): Promise<EmergencyContacts | null> {
        return await this.emergencyContactsRepository.update(id, contactData);
    }
}
