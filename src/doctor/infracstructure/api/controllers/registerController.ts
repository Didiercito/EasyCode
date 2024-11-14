import { Request, Response } from 'express';
import { RegisterDoctorUseCase } from '../../../application/registerUseCase';

export class RegisterDoctorController {
    private registerDoctorUseCase: RegisterDoctorUseCase;

    constructor(registerDoctorUseCase: RegisterDoctorUseCase) {
        this.registerDoctorUseCase = registerDoctorUseCase;
    }

    async run(req: Request, res: Response): Promise<void> {
        const id_usuario = (req.user as any)?.id; // Adjust based on your authentication setup
        
        if (!id_usuario) {
            res.status(401).json({ message: "Usuario no autenticado" });
            return;
        }

        // Extract the doctor data from the request body
        const { nombre, especialidad, telefono, correo } = req.body;

        // Validate required fields
        if (!nombre || !especialidad || !telefono || !correo) {
            res.status(400).json({ message: "Todos los campos son requeridos" });
            return;
        }

        try {
            // Execute the use case to register the doctor
            const newDoctor = await this.registerDoctorUseCase.execute({
                id_usuario,
                nombre,
                especialidad,
                telefono,
                correo
            });

            // Respond with the newly created doctor object
            res.status(201).json(newDoctor);
        } catch (error) {
            res.status(500).json({ message: "Ocurrió un error", error });
        }
    }
}
