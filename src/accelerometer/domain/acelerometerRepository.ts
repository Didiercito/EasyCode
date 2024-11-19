import { Acelerometer } from "./acelerometer";


export interface AcelerometerRepository {
    save(data: Acelerometer): Promise<void>; 
    getAll(): Promise<Acelerometer[]>; 
    update(id: number, data: Partial<Acelerometer>): Promise<void>; 
}