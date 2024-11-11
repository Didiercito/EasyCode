import { Request, Response } from "express";
import { SaveUseCase } from "../../../application/saveUseCase";
import { HeartRate } from "../../../domain/heart_rate";

export class SaveController {
    constructor(private saveUseCase: SaveUseCase) {}

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const { id_usuario, data, id } = req.body; 
            const heartRateData = new HeartRate(id,id_usuario, data);

            await this.saveUseCase.execute(heartRateData);

            res.status(201).json({ message: "Heart rate data saved successfully." });
        } catch (error) {
            console.error("Error saving heart rate data:", error);
            res.status(500).json({ error: "Failed to save heart rate data." });
        }
    }
}
