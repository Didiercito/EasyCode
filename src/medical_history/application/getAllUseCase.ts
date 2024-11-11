import { MedicalHistory } from "../domain/medical_history";
import { MedicalHistoryRepository } from "../domain/medical_historyRepository";

export class GetAllUseCase {
  private medicalHistoryRepository: MedicalHistoryRepository;

  constructor(medicalHistoryRepository: MedicalHistoryRepository) {
    this.medicalHistoryRepository = medicalHistoryRepository;
  }

  async execute(): Promise<MedicalHistory[]> {
    return await this.medicalHistoryRepository.getAll();
  }
}
