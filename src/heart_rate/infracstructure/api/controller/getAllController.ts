import { Request, Response } from "express";
import { GetAllUseCase } from "../../../application/getByIdUseCase";

export class GetAllController {
    constructor(private getAllUseCase: GetAllUseCase) {}

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const heartRates = await this.getAllUseCase.execute();
            res.status(200).json(heartRates);
        } catch (error) {
            console.error("Error fetching all heart rate data:", error);
            res.status(500).json({ error: "Failed to fetch heart rate data." });
        }
    }
}
