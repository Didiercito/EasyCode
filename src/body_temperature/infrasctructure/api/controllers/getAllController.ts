import { Request, Response } from "express";
import { GetAllUseCase } from "../../../application/getAllUseCase";

export class GetAllController {
    constructor(private getAllUseCase: GetAllUseCase) {}

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const bodyTemperatures = await this.getAllUseCase.execute();
             res.status(200).json(bodyTemperatures);
             return;
        } catch (error) {
             res.status(500).json({message: 'Internar error '});
             return;
        }
    }
}
