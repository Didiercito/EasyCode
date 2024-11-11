import { MedicalHistory } from "../domain/medical_history";
import { MedicalHistoryRepository } from "../domain/medical_historyRepository";

export class GetByIdUseCase {
  private medicalHistoryRepository: MedicalHistoryRepository;

  constructor(medicalHistoryRepository: MedicalHistoryRepository) {
    this.medicalHistoryRepository = medicalHistoryRepository;
  }

  async execute(id: number): Promise<MedicalHistory | null> {
    if (!id) {
      throw new Error("El ID del historial médico es obligatorio.");
    }

    const medicalHistory = await this.medicalHistoryRepository.getById(id);
    if (!medicalHistory) {
      throw new Error("No se encontró el historial médico con el ID proporcionado.");
    }

    return medicalHistory;
  }
}
