import { Request, Response } from "express";
import { GetHistoryForUserUseCase } from "../../../application/getHistoryForUserUseCase";

export class GetHistoryForUserController {
    constructor(private readonly getHistoryForUserUseCase: GetHistoryForUserUseCase) {}

    public async handle(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.params;

            if (!userId) {
                 res.status(400).json({ message: "Se requiere el ID del usuario" });
                 return;
            }

            const history = await this.getHistoryForUserUseCase.execute(Number(userId));

             res.status(200).json(history);
             return;
        } catch (error) {
            console.error("Error al obtener historial de sensores por usuario:", error);
             res.status(500).json({ message: "Error al obtener historial de sensores por usuario" });
             return;
        }
    }
}
