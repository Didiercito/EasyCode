import { EmergencyContactsRepository } from "../domain/emergency_contacRepository";
import { EmergencyContacts } from "../domain/emergency_contacts";

export class GetByUserIdUseCase {
    private emergencyContactsRepository: EmergencyContactsRepository;

    constructor(emergencyContactsRepository: EmergencyContactsRepository) {
        this.emergencyContactsRepository = emergencyContactsRepository;
    }

    async execute(id_usuario: number): Promise<EmergencyContacts[]> {
        return this.emergencyContactsRepository.getByUserId(id_usuario);
    }
}
