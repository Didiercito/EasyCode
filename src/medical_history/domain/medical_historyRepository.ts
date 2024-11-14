import { MedicalHistory } from "./medical_history";

export interface MedicalHistoryRepository {
    registrate(history: MedicalHistory): Promise<MedicalHistory>;
    getById(id: number): Promise<MedicalHistory | null>;
    getByUserId(id_usuario: number): Promise<MedicalHistory[]>;
    getAll(): Promise<MedicalHistory[]>;
    update(id: number, historyData: Partial<MedicalHistory>): Promise<MedicalHistory | null>;
    delete(id: number): Promise<boolean>;
}
