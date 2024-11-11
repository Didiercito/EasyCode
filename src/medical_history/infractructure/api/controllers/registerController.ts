import { Request, Response } from "express";
import { RegisterUseCase } from "../../../application/registrateUseCase";

export class RegisterController {
  constructor(private registerUseCase: RegisterUseCase) {}

  async run(req: Request, res: Response): Promise<void> {
    const medicalHistoryData = req.body;

    try {
      const newMedicalHistory = await this.registerUseCase.execute(medicalHistoryData);

      res.status(201).json({
        message: "Historial médico creado con éxito.",
        data: newMedicalHistory
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al crear el historial médico." });
    }
  }
}
