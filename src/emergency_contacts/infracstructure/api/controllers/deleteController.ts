import { Request, Response } from "express";
import { DeleteUseCase } from "../../../application/deleteUseCase";

export class DeleteController {
    constructor(private deleteUseCase: DeleteUseCase) {}

    async run(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const result = await this.deleteUseCase.execute(Number(id));
            if (!result) {
                 res.status(404).json({ message: "Contact not found" });
            }
             res.status(200).json({ message: "Contact deleted successfully" });
        } catch (error) {
             res.status(500).json({ message: "An error occurred", error });
        }
    }
}
