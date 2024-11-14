import { Request, Response } from 'express';
import { RegisterUseCase } from '../../../application/registerUseCase';
import { TokenService } from "../../../../middleware/auth"; 

export class RegisterController {
    private registerUseCase: RegisterUseCase;

    constructor(registerUseCase: RegisterUseCase) {
        this.registerUseCase = registerUseCase;
    }

    async run(req: Request, res: Response): Promise<void> {
        const id_usuario = (req.user as any)?.id; 
        
        if (!id_usuario) {
            res.status(401).json({ message: "Usuario no autenticado" });
            return; 
        }

        const { nombre, apellido_p, apellido_m, telefono, relacion, correo } = req.body;

        if (!nombre || !apellido_p || !apellido_m || !telefono || !relacion || !correo) {
            res.status(400).json({ message: "Todos los campos son requeridos" });
            return;
        }

        try {
            const newContact = await this.registerUseCase.execute({
                id_usuario,
                nombre,
                apellido_p,
                apellido_m,
                telefono,
                relacion,
                correo
            });
            res.status(201).json(newContact);
        } catch (error) {
            res.status(500).json({ message: "An error occurred", error });
        }
    }
}
