import { Request, Response } from "express";
import { UpdateUseCase } from "../../../application/updateUseCase";

export class UpdateController {
    constructor(private updateUseCase: UpdateUseCase) {}

    async run(req: Request, res: Response): Promise<void> {
        const { id } = req.params; // id del contacto de emergencia
        const contactData = req.body; // Nuevos datos para el contacto

        try {
            // Llamar al caso de uso con el id del contacto
            const updatedContact = await this.updateUseCase.execute(Number(id), contactData);

            if (!updatedContact) {
                res.status(404).json({ message: "Contacto de emergencia no encontrado" });
                return;
            }

            // Retornamos el contacto actualizado
            res.status(200).json(updatedContact);
        } catch (error) {
            res.status(500).json({ message: "Ocurrió un error", error });
        }
    }
}
