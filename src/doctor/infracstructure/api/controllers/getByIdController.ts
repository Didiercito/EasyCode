import { Request, Response } from "express";
import { GetByIdUseCase } from "../../../application/getByIdUseCase";

export class GetByIdController {
    constructor(private getDoctorByIdUseCase: GetByIdUseCase) {}

    async run(req: Request, res: Response): Promise<void> {
        const id = Number(req.params.id);
        const result = await this.getDoctorByIdUseCase.execute(id);
         result ? res.json(result) : res.status(404).json({ error: "Doctor not found" });
    }
}
