import { Request, Response } from "express";
import { RegisterUseCase } from "../../../application/registerUseCase";

export class RegisterController {
    constructor(private registerDoctorUseCase: RegisterUseCase) {}

    async run(req: Request, res: Response): Promise<void> {
        const doctor = req.body;
        const result = await this.registerDoctorUseCase.execute(doctor);
         res.status(201).json(result);
    }
}
