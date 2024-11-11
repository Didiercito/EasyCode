import { Request, Response } from "express";
import { GetAllUseCase } from "../../../application/getAllUseCase";

export class GetAllController {
    constructor(private getAllUseCase: GetAllUseCase) {}

    async run(req: Request, res: Response): Promise<void> {
        try {
            const contacts = await this.getAllUseCase.execute();
             res.status(200).json(contacts);
        } catch (error) {
             res.status(500).json({ message: "An error occurred", error });
        }
    }
}
