import { MedicalHistoryRepository } from "../domain/medical_historyRepository";
import { MedicalHistory } from "../domain/medical_history";

export class RegisterUseCase {
    constructor(private medicalHistoryRepository: MedicalHistoryRepository) {}

    async execute(historyData: {
        id_usuario: number;
        condicion: string;
        date?: Date;
    }): Promise<MedicalHistory> {
        const newHistory = new MedicalHistory(
            0, 
            historyData.id_usuario,
            historyData.condicion,
            historyData.date || new Date() 
        );

        return await this.medicalHistoryRepository.registrate(newHistory);
    }
}
