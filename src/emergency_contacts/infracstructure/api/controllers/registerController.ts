import { Request, Response } from "express";
import { RegisterUseCase } from "../../../application/registerUseCase";

export class RegisterController {
    constructor(private registerUseCase: RegisterUseCase) {}

    async run(req: Request, res: Response): Promise<void> {
        const { id_usuario, nombre, apellido_p, apellido_m, telefono, relacion, correo } = req.body;

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
