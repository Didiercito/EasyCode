import { Request, Response } from "express";
import { GetByIdUseCase } from "../../../application/getAllUseCase";


export class GetByIdController {
    constructor(private getByIdUseCase: GetByIdUseCase) {}

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id, 10);
            const heartRate = await this.getByIdUseCase.execute(id);

            if (heartRate) {
                res.status(200).json(heartRate);
            } else {
                res.status(404).json({ error: "Heart rate data not found." });
            }
        } catch (error) {
            console.error("Error fetching heart rate data by ID:", error);
            res.status(500).json({ error: "Failed to fetch heart rate data by ID." });
        }
    }
}
