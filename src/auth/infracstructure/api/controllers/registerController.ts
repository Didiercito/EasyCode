import { Request, Response } from "express";
import { RegisterUseCase } from "../../../application/registerUseCase";
import { User } from "../../../../user/domain/user";

export class RegisterController {
    constructor(private registerUseCase: RegisterUseCase) {}

    async run(req: Request, res: Response): Promise<void> {
        try {
            const userData: User = req.body;
            const result = await this.registerUseCase.execute(userData);
            res.status(201).json(result);
            return; 
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
                return;
            } else {
                res.status(500).json({ message: "Error en el servidor" });
                return;
            }
        }
    }
}
