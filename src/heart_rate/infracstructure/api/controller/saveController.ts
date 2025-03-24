import { Request, Response } from "express";
import { SaveUseCase } from "../../../application/saveUseCase";

export class SaveController {
    constructor(private saveUseCase: SaveUseCase) {}

    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const { ECG } = req.body;

            if (ECG === undefined || ECG === null || typeof ECG !== "number" || ECG < 200 || ECG > 5000) {
                console.error("Invalid or missing ECG value:", ECG);
                return res.status(400).json({ error: "Invalid or missing ECG value." });
            }


            await this.saveUseCase.execute({ ECG });

            const BPM = this.saveUseCase.convertToBPM(ECG);

            return res.status(201).json({ 
                message: "Heart rate data saved successfully.",
                ECG,
                BPM
            });
        } catch (error) {
            console.error("Error saving heart rate data:", error);

            return res.status(500).json({ error: "Failed to save heart rate data." });
        }
    }
}
