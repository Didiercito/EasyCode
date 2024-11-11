import { Request, Response } from "express";
import { DeleteUseCase } from "../../../application/deleteUseCase";

export class DeleteController {
    constructor(private deleteDoctorUseCase: DeleteUseCase) {}

    async run(req: Request, res: Response): Promise<void> {
        const id = Number(req.params.id);
        const result = await this.deleteDoctorUseCase.execute(id);
         result ? res.status(204).send() : res.status(404).json({ error: "Doctor not found" });
    }
}
