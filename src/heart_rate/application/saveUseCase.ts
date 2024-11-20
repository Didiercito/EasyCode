import { HeartRate } from "../domain/heart_rate";
import { HeartRateRepository } from "../domain/hate_rateRepository";

export class SaveUseCase {
    constructor(private heartRateRepository: HeartRateRepository) {}

    async execute(rawData: { ECG: number }): Promise<void> {
        const { ECG } = rawData;

        // Convertir el valor de ECG a BPM utilizando la nueva fórmula
        const BPM = this.convertToBPM(ECG);

        // Crear la instancia de HeartRate con los datos convertidos
        const heartRate = new HeartRate(
            1,  // ID fijo
            ECG, // Valor de ECG recibido
            BPM, // BPM calculado
            new Date(),  // createdAt
            new Date()   // updatedAt
        );

        await this.heartRateRepository.save(heartRate);
    }

    private convertToBPM(ECG: number): number {
        // Mapeo lineal para convertir ECG a BPM
        const minECG = 200; // Valor mínimo de ECG posible
        const maxECG = 5000; // Valor máximo de ECG posible
        const minBPM = 50;   // Valor mínimo de BPM
        const maxBPM = 200;  // Valor máximo de BPM

        if (ECG < minECG) ECG = minECG;
        if (ECG > maxECG) ECG = maxECG;

        const BPM = minBPM + ((ECG - minECG) * (maxBPM - minBPM)) / (maxECG - minECG);
        
        return Math.round(BPM); 
    }
}
