import { EmergencyContactsRepository } from "../domain/emergency_contacRepository";
import { EmergencyContacts } from "../domain/emergency_contacts";

export class GetByIdUseCase {
    constructor(private emergencyContactsRepository: EmergencyContactsRepository) {}

    async execute(id: number): Promise<EmergencyContacts | null> {
        return await this.emergencyContactsRepository.getById(id);
    }
}
