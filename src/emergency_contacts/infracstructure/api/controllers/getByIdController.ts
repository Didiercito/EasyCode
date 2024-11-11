import { Request, Response } from "express";
import { GetByIdUseCase } from "../../../application/getByIdUseCase";

export class GetByIdController {
    constructor(private getByIdUseCase: GetByIdUseCase) {}

    async run(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const contact = await this.getByIdUseCase.execute(Number(id));
            if (!contact) {
                 res.status(404).json({ message: "Contact not found" });
            }
             res.status(200).json(contact);
        } catch (error) {
             res.status(500).json({ message: "An error occurred", error });
        }
    }
}
