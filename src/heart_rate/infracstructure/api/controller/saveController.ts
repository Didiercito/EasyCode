import { Request, Response } from "express";
import { SaveUseCase } from "../../../application/saveUseCase";
import { HeartRate } from "../../../domain/heart_rate";

export class SaveController {
    constructor(private saveUseCase: SaveUseCase) {}

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const { data } = req.body;

            if (!data) {
                res.status(400).json({ error: "Invalid request data." });
                return;
            }

            console.log("Datos recibidos en SaveController:", data);  

            const rawECG = data;
            const bpm = this.convertToBPM(rawECG);

            const now = new Date();

            const heartRateData = new HeartRate(0, bpm, now, now);
            await this.saveUseCase.execute(heartRateData);

            res.status(201).json({ message: "Heart rate data saved successfully." });
        } catch (error) {
            console.error("Error saving heart rate data:", error);
            res.status(500).json({ error: "Failed to save heart rate data." });
        }
    }

    private convertToBPM(rawECG: number): number {
        const minRawECG = 0;
        const maxRawECG = 1023;
        const minBPM = 60;
        const maxBPM = 100;

        return ((rawECG - minRawECG) * (maxBPM - minBPM)) / (maxRawECG - minRawECG) + minBPM;
    }
}
