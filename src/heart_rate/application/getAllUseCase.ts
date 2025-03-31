import { HeartRate } from "../domain/heart_rate";
import { HeartRateRepository } from "../domain/hate_rateRepository";


export class GetAllUseCase {
    private heartRateRepository: HeartRateRepository;

    constructor(heartRateRepository: HeartRateRepository) {
        this.heartRateRepository = heartRateRepository;
    }

    async execute(): Promise<HeartRate[]> {
        try {
            const heartRates = await this.heartRateRepository.getAll();
            return heartRates;
        } catch (error) {
            console.error("Error al obtener las frecuencias cardíacas:", error);
            throw new Error("Error al obtener las frecuencias cardíacas");
        }
    }
}