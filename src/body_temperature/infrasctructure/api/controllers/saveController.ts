import { Request, Response } from "express";
import { SaveUseCaseBodyTemperature } from "../../../application/saveUseCase";
import { BodyTemperature } from "../../../domain/body_temperature";

export class SaveControllerBodyTemperature {
    constructor(private saveUseCase: SaveUseCaseBodyTemperature) {}

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const { valor } = req.body;
            const now = new Date();
            const bodyTemperature = new BodyTemperature(1, parseFloat(valor), now, now);
            await this.saveUseCase.execute(bodyTemperature);
            res.status(201).json({ message: "Body temperature saved successfully." });
        } catch (error) {
            console.error("Error saving body temperature:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}
