import { Request, Response } from "express";
import { UpdateUseCase } from "../../../application/updateUseCase";

export class UpdateController {
    constructor(private updateUseCase: UpdateUseCase) {}

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const dataToUpdate = req.body;
            await this.updateUseCase.execute(Number(id), dataToUpdate);
             res.status(200).json({ message: "Data updated successfully" });
             return;
        } catch (error) {
             res.status(500).json({ message: "Error updating data" });
             return;
        }
    }
}
