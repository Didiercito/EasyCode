import { Request, Response } from "express";
import { UpdateUseCase } from "../../../application/updateUseCase";

export class UpdateAcelerometerController {
    constructor(private updateAcelerometerUseCase: UpdateUseCase) { }

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { x, y, z } = req.body;

            if (!id) {
                res.status(400).json({ message: "ID es obligatorio" });
                return
            }

            await this.updateAcelerometerUseCase.execute(Number(id), { x, y, z });

             res.status(200).json({ message: "Acelerómetro actualizado correctamente" });
             return
        } catch (error) {
            console.error("Error al actualizar el acelerómetro:", error);
             res.status(500).json({ message: "Error interno del servidor" });
             return
        }
    }
}
