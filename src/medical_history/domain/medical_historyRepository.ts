import { MedicalHistory } from "./medical_history";

export interface MedicalHistoryRepository {
    registrate(history: MedicalHistory): Promise<MedicalHistory>;
    getById(id: number): Promise<MedicalHistory | null>;
    getAll(): Promise<MedicalHistory[]>;
    update(id: number, historyData: Partial<MedicalHistory>): Promise<MedicalHistory | null>;
    delete(id: number): Promise<boolean>;
}
