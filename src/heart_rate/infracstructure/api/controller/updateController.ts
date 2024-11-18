import { Request, Response } from "express";
import { UpdateUseCase } from "../../../application/updateUseCase";

export class UpdateController {
    private updateUseCase: UpdateUseCase;

    constructor(updateUseCase: UpdateUseCase) {
        this.updateUseCase = updateUseCase;
    }

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const data = req.body;

            if (!id || isNaN(Number(id))) {
                 res.status(400).json({ error: "Invalid or missing ID parameter" });
                 return;
            }

            await this.updateUseCase.execute(Number(id), data);
             res.status(200).json({ message: "Heart rate data updated successfully" });
             return;
        } catch (error) {
            console.error(error);
             res.status(500).json({ error: "An error occurred while updating heart rate data" });
             return;
        }
    }
}
