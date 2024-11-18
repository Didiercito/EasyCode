import { Request, Response } from "express";
import { SaveUseCaseOximeter } from "../../../application/saveUseCase";

export class SaveController {
    constructor(private saveUseCase: SaveUseCaseOximeter) {}

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const oximeter = req.body;
            await this.saveUseCase.execute(oximeter);
             res.status(201).json({ message: "Data saved successfully" });
             return;
        } catch (error) {
             res.status(500).json({ message: "Error saving data"});
             return;
        }
    }
}
