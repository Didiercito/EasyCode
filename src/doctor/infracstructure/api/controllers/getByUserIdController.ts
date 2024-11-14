import { Request, Response } from "express";
import { GetByUserIdUseCase } from "../../../application/getByUserIdUseCase";
import { Doctor } from "../../../domain/doctor";

export class GetByUserIdController {
    private getByUserIdUseCase: GetByUserIdUseCase;

    constructor(getByUserIdUseCase: GetByUserIdUseCase) {
        this.getByUserIdUseCase = getByUserIdUseCase;
    }

    async handle(req: Request, res: Response): Promise<void> {
        const userId = parseInt(req.params.id); // 'id' es el nombre del parámetro en la URL

        if (isNaN(userId)) {
            res.status(400).json({ message: "ID de usuario inválido" });
            return;
        }

        try {
            // Obtener los doctores asociados al id_usuario
            const doctors: Doctor[] = await this.getByUserIdUseCase.execute(userId);

            if (!doctors || doctors.length === 0) {
                res.status(404).json({ message: "No se encontraron doctores para este usuario" });
                return;
            }

            // Si todo va bien, enviamos la respuesta con los doctores
            res.status(200).json(doctors);
        } catch (error) {
            console.error("Error en el controlador:", error); // Para depuración

            // Solo respondemos si no hemos enviado ya una respuesta
            if (!res.headersSent) {
                res.status(500).json({ message: 'Error interno del servidor' });
            }
        }
    }
}
