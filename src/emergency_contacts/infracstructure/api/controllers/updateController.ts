import { Request, Response } from "express";
import { UpdateUseCase } from "../../../application/updateUseCase";

export class UpdateController {
    constructor(private updateUseCase: UpdateUseCase) {}

    async run(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const contactData = req.body;

        try {
            const updatedContact = await this.updateUseCase.execute(Number(id), contactData);
            if (!updatedContact) {
                 res.status(404).json({ message: "Contact not found" });
            }
             res.status(200).json(updatedContact);
        } catch (error) {
             res.status(500).json({ message: "An error occurred", error });
        }
    }
}
