import { MedicalHistory } from "../domain/medical_history";
import { MedicalHistoryRepository } from "../domain/medical_historyRepository";

export class UpdateUseCase {
  private medicalHistoryRepository: MedicalHistoryRepository;

  constructor(medicalHistoryRepository: MedicalHistoryRepository) {
    this.medicalHistoryRepository = medicalHistoryRepository;
  }

  async execute(id: number, historyData: Partial<MedicalHistory>): Promise<MedicalHistory | null> {
    if (!id) {
      throw new Error("El ID del historial médico es obligatorio.");
    }
    if (!historyData) {
      throw new Error("Los datos de actualización son obligatorios.");
    }

    const updatedHistory = await this.medicalHistoryRepository.update(id, historyData);
    if (!updatedHistory) {
      throw new Error("No se pudo actualizar el historial médico.");
    }

    return updatedHistory;
  }
}
