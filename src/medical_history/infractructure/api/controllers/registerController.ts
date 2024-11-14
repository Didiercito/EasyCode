import { Request, Response } from 'express';
import { RegisterUseCase } from '../../../application/registrateUseCase';

export class RegisterController {
    private registerMedicalHistoryUseCase: RegisterUseCase;

    constructor(registerMedicalHistoryUseCase: RegisterUseCase) {
        this.registerMedicalHistoryUseCase = registerMedicalHistoryUseCase;
    }

    async run(req: Request, res: Response): Promise<void> {
        const id_usuario = (req.user as any)?.id; // Adjust based on your authentication setup
        
        if (!id_usuario) {
            res.status(401).json({ message: "Usuario no autenticado" });
            return;
        }

        // Extract the medical history data from the request body
        const { condicion, date } = req.body;

        // Validate required fields
        if (!condicion) {
            res.status(400).json({ message: "El campo 'condición' es requerido" });
            return;
        }

        try {
            // Execute the use case to register the medical history
            const newMedicalHistory = await this.registerMedicalHistoryUseCase.execute({
                id_usuario,
                condicion,
                date
            });

            // Respond with the newly created medical history object
            res.status(201).json({
                message: "Historial médico creado con éxito.",
                data: newMedicalHistory
            });
        } catch (error) {
            res.status(500).json({ message: "Ocurrió un error al crear el historial médico", error });
        }
    }
}
