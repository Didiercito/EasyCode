import { Request, Response } from "express";
import { UpdateSensorHistoryUseCase } from "../../../application/updateSensorHistoryUseCase";

export class UpdateSensorHistoryController {
    constructor(private readonly updateSensorHistoryUseCase: UpdateSensorHistoryUseCase) {}

    public async handle(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { sensorType, data, userId } = req.body;

            if (!id || !sensorType || !data || !userId) {
                 res.status(400).json({ message: "Faltan datos requeridos: id, sensorType, data o userId" });
                 return;
            }

            const updatedSensorHistory = await this.updateSensorHistoryUseCase.execute(
                Number(id),
                sensorType,
                data,
                userId
            );

             res.status(200).json(updatedSensorHistory);
             return;
        } catch (error) {
            console.error("Error al actualizar historial de sensor:", error);
             res.status(500).json({ message: "Error al actualizar historial de sensor" });
             return;
        }
    }
}
