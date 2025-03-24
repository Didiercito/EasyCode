import { HeartRate } from "./heart_rate";

export interface HeartRateRepository {
    getAll(): Promise<HeartRate[]>;
    save(data: HeartRate): Promise<HeartRate>;
    update(id: number, data: Partial<HeartRate>): Promise<HeartRate>;
}
