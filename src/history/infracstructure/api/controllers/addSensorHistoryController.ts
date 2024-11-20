import { Request, Response } from "express";
import { AddSensorHistoryUseCase } from "../../../application/addSensorHistoryUseCase";

export class AddSensorHistoryController {
    constructor(private readonly addSensorHistoryUseCase: AddSensorHistoryUseCase) {}

    public async handle(req: Request, res: Response): Promise<void> {
        try {
            const { sensorType, sensorValue, userId } = req.body;

            if (!sensorType || typeof sensorType !== "string" || sensorType.trim() === "") {
                res.status(400).json({ message: "El campo 'sensorType' es obligatorio y debe ser una cadena no vacía." });
                return;
            }

            if (sensorValue === undefined || sensorValue === null) {
                res.status(400).json({ message: "El campo 'sensorValue' es obligatorio." });
                return;
            }

            if (!userId || typeof userId !== "number" || userId <= 0) {
                res.status(400).json({ message: "El campo 'userId' es obligatorio y debe ser un número positivo." });
                return;
            }

            const sensorHistory = await this.addSensorHistoryUseCase.execute(sensorType, sensorValue, userId);

            res.status(201).json(sensorHistory);
        } catch (error: unknown) {
            console.error("Error al agregar historial de sensor:", error);

            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: "Error inesperado al procesar la solicitud." });
            }
        }
    }
}
