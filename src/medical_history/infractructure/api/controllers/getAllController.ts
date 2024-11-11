import { Request, Response } from "express";
import { GetAllUseCase } from "../../../application/getAllUseCase";

export class GetAllController {
  constructor(private getAllUseCase: GetAllUseCase) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const medicalHistories = await this.getAllUseCase.execute();

      res.status(200).json({ data: medicalHistories });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al obtener los historiales médicos." });
    }
  }
}
