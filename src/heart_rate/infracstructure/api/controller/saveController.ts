import { Request, Response } from "express";
import { SaveUseCase } from "../../../application/saveUseCase";

export class SaveController {
    constructor(private saveUseCase: SaveUseCase) {}

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const { ECG } = req.body;

            if (typeof ECG !== "number" || ECG <= 0) {
                res.status(400).json({ error: "Invalid or missing ECG value." });
                return;
            }

            console.log("ECG recibido en SaveController:", ECG);

            await this.saveUseCase.execute({ ECG });

            res.status(201).json({ message: "Heart rate data saved successfully." });
        } catch (error) {
            console.error("Error saving heart rate data:", error);
            res.status(500).json({ error: "Failed to save heart rate data." });
        }
    }
}