import { BodyTemperature } from "./body_temperature";

export interface BodyTemperatureRepository {
    save(data: BodyTemperature): Promise<void>; 
    getAll(): Promise<BodyTemperature[]>; 
    update(id: number, data: Partial<BodyTemperature>): Promise<void>; 
}
