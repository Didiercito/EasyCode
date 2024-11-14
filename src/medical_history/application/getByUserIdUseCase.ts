import { MedicalHistoryRepository } from "../domain/medical_historyRepository";
import { MedicalHistory } from "../domain/medical_history";

export class GetByUserIdUseCase {
    private medicalHistoryRepository: MedicalHistoryRepository;

    constructor(medicalHistoryRepository: MedicalHistoryRepository) {
        this.medicalHistoryRepository = medicalHistoryRepository;
    }

    async execute(userId: number): Promise<MedicalHistory[]> {
        try {
            const medicalHistoryRecords = await this.medicalHistoryRepository.getByUserId(userId);

            if (!medicalHistoryRecords) {
                return [];
            }

            return medicalHistoryRecords;
        } catch (error) {
            console.error("Error while fetching medical history:", error);
            throw new Error("Error fetching medical history");
        }
    }
}
