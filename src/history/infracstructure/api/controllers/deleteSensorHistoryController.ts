import { Request, Response } from "express";
import { DeleteSensorHistoryUseCase } from "../../../application/deleteSensorHistoryUseCase";

export class DeleteSensorHistoryController {
    constructor(private readonly deleteSensorHistoryUseCase: DeleteSensorHistoryUseCase) {}

    public async handle(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            if (!id) {
                 res.status(400).json({ message: "Se requiere el ID del historial" });
                 return
            }

            await this.deleteSensorHistoryUseCase.execute(Number(id));

             res.status(204).send();
             return
        } catch (error) {
            console.error("Error al eliminar historial de sensor:", error);
             res.status(500).json({ message: "Error al eliminar historial de sensor" });
             return
        }
    }
}
