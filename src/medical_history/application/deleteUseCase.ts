import { MedicalHistoryRepository } from "../domain/medical_historyRepository";

export class DeleteUseCase {
  private medicalHistoryRepository: MedicalHistoryRepository;

  constructor(medicalHistoryRepository: MedicalHistoryRepository) {
    this.medicalHistoryRepository = medicalHistoryRepository;
  }

  async execute(id: number): Promise<boolean> {
    if (!id) {
      throw new Error("El ID del historial médico es obligatorio.");
    }

    const deleted = await this.medicalHistoryRepository.delete(id);
    if (!deleted) {
      throw new Error("No se pudo eliminar el historial médico con el ID proporcionado.");
    }

    return deleted;
  }
}
