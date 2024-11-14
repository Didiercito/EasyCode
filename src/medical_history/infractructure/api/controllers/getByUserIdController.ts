import { Request, Response } from "express";
import { GetByUserIdUseCase } from "../../../application/getByUserIdUseCase"; 
import { MedicalHistory } from "../../../domain/medical_history";  

export class GetByUserIdController {
    private getByUserIdUseCase: GetByUserIdUseCase;

    constructor(getByUserIdUseCase: GetByUserIdUseCase) {
        this.getByUserIdUseCase = getByUserIdUseCase;
    }

    async handle(req: Request, res: Response): Promise<void> {
        const userId = parseInt(req.params.id); // 'id' is the name of the parameter in the URL

        if (isNaN(userId)) {
            res.status(400).json({ message: "ID de usuario inválido" });
            return;
        }

        try {
            // Fetch medical history associated with the userId
            const medicalHistory: MedicalHistory[] = await this.getByUserIdUseCase.execute(userId);

            if (!medicalHistory || medicalHistory.length === 0) {
                res.status(404).json({ message: "No se encontró historial médico para este usuario" });
                return;
            }

            // If successful, send the response with the medical history data
            res.status(200).json(medicalHistory);
        } catch (error) {
            console.error("Error en el controlador:", error); // For debugging

            // Only respond if no response has been sent yet
            if (!res.headersSent) {
                res.status(500).json({ message: 'Error interno del servidor' });
            }
        }
    }
}
