import { Request, Response } from "express";
import { GetByEmailUseCase } from "../../../application/getByEmailUseCase";


export class GetByEmailController {
    constructor(private getByEmailUseCase: GetByEmailUseCase) {}

    async run(req: Request, res: Response): Promise<void> {
        try {
            const { email } = req.params;
            const user = await this.getByEmailUseCase.execute(email);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "Usuario no encontrado" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error en el servidor" });
        }
    }
}
