import { Request, Response } from "express";
import { DeleteUserUseCase } from "../../../application/deleteUseCase";

export class DeleteController {
    constructor(private deleteUserUseCase: DeleteUserUseCase) {}

    async run(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const isDeleted = await this.deleteUserUseCase.execute(Number(id));

            if (isDeleted) {
                 res.status(200).json({ message: "Usuario eliminado con éxito." });
            } else {
                 res.status(404).json({ message: "Usuario no encontrado." });
            }
        } catch (error) {
            console.log(error);
             res.status(500).json({ message: "Error al eliminar el usuario."});
        }
    }
}
