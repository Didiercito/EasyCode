import { Request, Response } from "express";
import { UpdateUseCase } from "../../../application/updateUseCase";

export class UpdateController {
    constructor(private updateUseCase: UpdateUseCase) {}

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await this.updateUseCase.execute(Number(id), req.body);
             res.status(200).json({ message: "Body temperature updated successfully." });
             return;
        } catch (error) {
             res.status(500).json({ error: 'Internal Error' });
             return;
        }
    }
}
