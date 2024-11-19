import { Request, Response } from "express";
import { GetHistoryBySensorTypeUseCase } from "../../../application/getHistoryBySensorTypeUseCase";

export class GetHistoryBySensorTypeController {
    constructor(private readonly getHistoryBySensorTypeUseCase: GetHistoryBySensorTypeUseCase) {}

    public async handle(req: Request, res: Response): Promise<void> {
        try {
            const { sensorType } = req.params;

            if (!sensorType) {
                 res.status(400).json({ message: "Se requiere el tipo de sensor" });
                 return;
            }

            const history = await this.getHistoryBySensorTypeUseCase.execute(sensorType);

             res.status(200).json(history);
             return;
        } catch (error) {
            console.error("Error al obtener historial por tipo de sensor:", error);
             res.status(500).json({ message: "Error al obtener historial por tipo de sensor" });
             return;
        }
    }
}
