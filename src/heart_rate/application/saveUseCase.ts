import { HeartRate } from "../domain/heart_rate";
import { HeartRateRepository } from "../domain/hate_rateRepository";

export class SaveUseCase {
    constructor(private heartRateRepository: HeartRateRepository) {}

    async execute(rawData: { ECG: number }): Promise<void> {
        const { ECG } = rawData;
       
        const BPM = this.convertToBPM(ECG);
     
        const heartRate = new HeartRate(
            1,  
            ECG, 
            BPM, 
            new Date(),  
            new Date()   
        );

        await this.heartRateRepository.save(heartRate);
    }

    private convertToBPM(ECG: number): number {
        const minECG = 200; 
        const maxECG = 5000; 
        const minBPM = 50;   
        const maxBPM = 200;  

        if (ECG < minECG) ECG = minECG;
        if (ECG > maxECG) ECG = maxECG;

        const BPM = minBPM + ((ECG - minECG) * (maxBPM - minBPM)) / (maxECG - minECG);
        
        return Math.round(BPM); 
    }
}