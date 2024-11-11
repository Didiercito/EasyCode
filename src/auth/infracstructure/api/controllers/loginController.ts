import { Request, Response } from "express";
import { LoginUseCase } from "../../../application/loginUseCase";

export class LoginController {
    constructor(private loginUseCase: LoginUseCase) {}

    async run(req: Request, res: Response): Promise<void> {
        try {
            const { correo, contrasena } = req.body;

            const result = await this.loginUseCase.execute(correo, contrasena);

            if (result instanceof Error) {
                res.status(401).json({ message: result.message });
            } else {
                res.status(200).json(result);  
            }
        } catch (error) {
            res.status(500).json({ message: "Error en el servidor",});
        }
    }
}
