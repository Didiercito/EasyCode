import { MedicalHistory } from "../domain/medical_history";
import { MedicalHistoryRepository } from "../domain/medical_historyRepository";

export class RegisterUseCase {
  private medicalHistoryRepository: MedicalHistoryRepository;

  constructor(medicalHistoryRepository: MedicalHistoryRepository) {
    this.medicalHistoryRepository = medicalHistoryRepository;
  }

  async execute(medicalHistoryData: MedicalHistory): Promise<MedicalHistory> {
    if (!medicalHistoryData.id_usuario) {
      throw new Error("El ID del paciente es obligatorio.");
    }
    if (!medicalHistoryData.condicion) {
      throw new Error("El diagnóstico es obligatorio.");
    }

    medicalHistoryData.date = new Date();

    const existingHistory = await this.medicalHistoryRepository.getById(medicalHistoryData.id);
    if (existingHistory) {
      throw new Error("Ya existe un historial médico con este ID.");
    }

    return await this.medicalHistoryRepository.create(medicalHistoryData);
  }
}
