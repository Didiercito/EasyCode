import { Oximeter } from "./oximeter";

export interface OximeterRepository {
    save(data: Oximeter): Promise<void>;
    getAll(): Promise<Oximeter[]>; 
    update(id: number, data: Partial<Oximeter>): Promise<void>; 
}
