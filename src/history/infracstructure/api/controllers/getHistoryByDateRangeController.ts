import { Request, Response } from "express";
import { GetHistoryByDateRangeUseCase } from "../../../application/getHistoryByDateRangeUseCase";

export class GetHistoryByDateRangeController {
    constructor(private readonly getHistoryByDateRangeUseCase: GetHistoryByDateRangeUseCase) {}

    public async handle(req: Request, res: Response): Promise<void> {
        try {
            const { startDate, endDate } = req.query;

            if (!startDate || !endDate) {
                 res.status(400).json({ message: "Se requieren las fechas de inicio y fin" });
                 return
            }

            const history = await this.getHistoryByDateRangeUseCase.execute(
                new Date(startDate as string),
                new Date(endDate as string)
            );

             res.status(200).json(history);
             return
        } catch (error) {
            console.error("Error al obtener historial por rango de fechas:", error);
             res.status(500).json({ message: "Error al obtener historial por rango de fechas" });
             return
        }
    }
}
