import { Request, Response } from "express";
import { GetAllHistoryUseCase } from "../../../application/getAllHistoryUseCase";

export class GetAllSensorHistoryController {
    constructor(private readonly getAllSensorHistoryUseCase: GetAllHistoryUseCase) {}

    public async handle(req: Request, res: Response): Promise<void> {
        try {
            const allHistory = await this.getAllSensorHistoryUseCase.execute();
             res.status(200).json(allHistory);
             return;
        } catch (error) {
            console.error("Error al obtener todo el historial de sensores:", error);
             res.status(500).json({ message: "Error al obtener todo el historial de sensores" });
             return;
        }
    }
}
