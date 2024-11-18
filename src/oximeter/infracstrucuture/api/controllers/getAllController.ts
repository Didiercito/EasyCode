import { Request, Response } from "express";
import { GetAllUseCase } from "../../../application/getAllUseCase";

export class GetAllController {
    constructor(private getAllUseCase: GetAllUseCase) {}

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const oximeters = await this.getAllUseCase.execute();
             res.status(200).json(oximeters);
             return;
        } catch (error) {
             res.status(500).json({ message: "Error fetching data"});
             return;
        }
    }
}
