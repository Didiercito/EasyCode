import { Request, Response } from "express";
import { UpdateUseCase } from "../../../application/updateUseCase";

export class UpdateController {
    constructor(private updateDoctorUseCase: UpdateUseCase) { }

    async run(req: Request, res: Response): Promise<void> {
        const id = Number(req.params.id);
        const doctorData = req.body;
        const result = await this.updateDoctorUseCase.execute(id, doctorData);
        result ? res.json(result) : res.status(404).json({ error: "Doctor not found" });
    }
}
