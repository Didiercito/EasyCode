import { Oximeter } from "../domain/oximeter";
import { OximeterRepository } from "../domain/oximeterRepository";

export class SaveUseCaseOximeter {
    constructor(private oximeterRepository: OximeterRepository) {}

    private calculatePercentage(rawValue: number): number {
        const maxRawValue = 36000; 
        const minRawValue = 0;     

        let percentage = ((rawValue - minRawValue) / (maxRawValue - minRawValue)) * 100;
        percentage = Math.max(0, Math.min(percentage, 100));
        return parseFloat(percentage.toFixed(2)); 
    }

    async execute(rawValue: number): Promise<void> {
        const percentage = this.calculatePercentage(rawValue);

        const data: Oximeter = {
            id: 1,  
            valor: percentage, 
            create_at: new Date(),
            update_at: new Date(),
        };

        await this.oximeterRepository.save(data);
    }
}

