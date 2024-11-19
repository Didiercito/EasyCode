import { Request, Response } from "express";
import { GetSensorHistoryByIdUseCase } from "../../../application/getSensorHistoryByIdUseCase";

export class GetSensorHistoryByIdController {
    constructor(private readonly getSensorHistoryByIdUseCase: GetSensorHistoryByIdUseCase) {}

    public async handle(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            if (!id) {
                 res.status(400).json({ message: "Se requiere el ID del historial" });
                 return;
            }

            const sensorHistory = await this.getSensorHistoryByIdUseCase.execute(Number(id));

            if (!sensorHistory) {
                 res.status(404).json({ message: "Historial no encontrado" });
            }

             res.status(200).json(sensorHistory);
             return;
        } catch (error) {
            console.error("Error al obtener historial de sensor por ID:", error);
             res.status(500).json({ message: "Error al obtener historial de sensor por ID" });
             return;
        }
    }
}
