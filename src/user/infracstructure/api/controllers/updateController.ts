import { Request, Response } from "express";
import { UpdateUserUseCase } from "../../../application/updateUseCase";

export class UpdateController {
    constructor(private updateUserUseCase: UpdateUserUseCase) {}

    async run(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const userData = req.body;

        try {
            const updatedUser = await this.updateUserUseCase.execute(Number(id), userData);

            if (updatedUser) {
                 res.status(200).json(updatedUser);
            } else {
                 res.status(404).json({ message: "Usuario no encontrado." });
            }
        } catch (error) {
            console.log(error)
             res.status(500).json({ message: "Error al actualizar el usuario."});
        }
    }
}
