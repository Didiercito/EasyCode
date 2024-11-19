import { Request, Response } from "express";
import { AddSensorHistoryUseCase } from "../../../application/addSensorHistoryUseCase";

export class AddSensorHistoryController {
    constructor(private readonly addSensorHistoryUseCase: AddSensorHistoryUseCase) { }

    public async handle(req: Request, res: Response): Promise<void> {
        try {
            const { sensorType, data, userId } = req.body;

            if (!sensorType || !data || !userId) {
                res.status(400).json({ message: "Faltan datos requeridos: sensorType, data o userId" });
                return;
            }

            const sensorHistory = await this.addSensorHistoryUseCase.execute(sensorType, data, userId);

            res.status(201).json(sensorHistory);
            return;
        } catch (error) {
            console.error("Error al agregar historial de sensor:", error);
             res.status(500).json({ message: "Error al agregar historial de sensor" });
             return;
        }
    }
}
