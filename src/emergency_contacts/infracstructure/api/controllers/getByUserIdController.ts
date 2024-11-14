import { Request, Response } from 'express';
import { GetByUserIdUseCase } from "../../../application/getByUserIdUseCase";

export class GetByUserIdController {
    private getByUserIdUseCase: GetByUserIdUseCase;

    constructor(getByUserIdUseCase: GetByUserIdUseCase) {
        this.getByUserIdUseCase = getByUserIdUseCase;
    }

    async handle(req: Request, res: Response): Promise<void> {
        // Obtener el id_usuario desde los parámetros de la URL
        const userId = parseInt(req.params.id); // 'id' es el nombre del parámetro en la URL

        if (isNaN(userId)) {
             res.status(400).json({ message: "ID de usuario inválido" });
        }

        try {
            // Obtener los contactos de emergencia asociados al id_usuario
            const emergencyContacts = await this.getByUserIdUseCase.execute(userId);

            if (!emergencyContacts || emergencyContacts.length === 0) {
                 res.status(404).json({ message: "No se encontraron contactos de emergencia para este usuario" });
            }

            // Si todo va bien, enviamos la respuesta con los contactos de emergencia
             res.status(200).json(emergencyContacts);
        } catch (error) {
            console.error("Error en el controlador:", error); // Para depuración

            // Solo respondemos si no hemos enviado ya una respuesta
            if (!res.headersSent) {
                 res.status(500).json({ message: 'Error interno del servidor' });
            }
        }
    }
}
