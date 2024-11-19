import { Request, Response } from "express";
import { GetAllUseCase } from "../../../application/getAllUseCase";

export class GetAllAcelerometerController {
    constructor(private getAllAcelerometerUseCase: GetAllUseCase) {}

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const acelerometers = await this.getAllAcelerometerUseCase.execute();
             res.status(200).json(acelerometers);
             return;
        } catch (error) {
            console.error("Error al obtener los datos del acelerómetro:", error);
             res.status(500).json({ message: "Error interno del servidor" });
             return;
        }
    }
}
