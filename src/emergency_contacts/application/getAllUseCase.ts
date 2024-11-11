import { EmergencyContactsRepository } from "../domain/emergency_contacRepository";
import { EmergencyContacts } from "../domain/emergency_contacts";

export class GetAllUseCase {
    constructor(private emergencyContactsRepository: EmergencyContactsRepository) {}

    async execute(): Promise<EmergencyContacts[]> {
        return await this.emergencyContactsRepository.getAll();
    }
}
