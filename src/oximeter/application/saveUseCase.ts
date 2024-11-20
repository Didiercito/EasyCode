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

    async execute(oximeterData: Oximeter): Promise<void> {
        const percentage = this.calculatePercentage(oximeterData.valor);

        const updatedOximeterData = new Oximeter(
            oximeterData.id, 
            percentage, 
            oximeterData.create_at, 
            new Date()
        );

        await this.oximeterRepository.save(updatedOximeterData);
    }
}
