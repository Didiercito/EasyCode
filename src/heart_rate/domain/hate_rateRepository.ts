import { HeartRate } from "./heart_rate";


export interface HeartRateRepository {
    save(data: HeartRate): Promise<void>;
    getAll(): Promise<HeartRate[]>;
    getDataById(id: number): Promise<HeartRate | null>;
}