import { EmergencyContactsRepository } from "../domain/emergency_contacRepository";

export class DeleteUseCase {
    constructor(private emergencyContactsRepository: EmergencyContactsRepository) {}

    async execute(id: number): Promise<boolean> {
        return await this.emergencyContactsRepository.delete(id);
    }
}
