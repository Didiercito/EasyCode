import { Request, Response } from "express";
import { SaveAcelerometerUseCase } from "../../../application/saveUseCase";

export class SaveAcelerometerController {
    constructor(private saveAcelerometerUseCase: SaveAcelerometerUseCase) {}

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const { id, x, y, z, create_at, update_at } = req.body;

            if (!id || x === undefined || y === undefined || z === undefined) {
                 res.status(400).json({ message: "Datos incompletos" });
                 return;
            }

            await this.saveAcelerometerUseCase.execute({
                id,
                x,
                y,
                z,
                create_at: create_at || new Date(),
                update_at: update_at || new Date(),
            });

             res.status(201).json({ message: "Acelerómetro guardado correctamente" });
             return;
        } catch (error) {
            console.error("Error al guardar el acelerómetro:", error);
             res.status(500).json({ message: "Error interno del servidor" });
             return;
        }
    }
}
