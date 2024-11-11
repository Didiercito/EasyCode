import { Request, Response } from "express";
import { GetAllUseCase } from "../../../application/getAllUseCase";

export class GetAllController {
    constructor(private getAllDoctorsUseCase: GetAllUseCase) {}

    async run(req: Request, res: Response): Promise<void> {
        const result = await this.getAllDoctorsUseCase.execute();
         res.json(result);
    }
}
