import { Request, Response } from "express";
import { GetByIdUseCase } from "../../../application/getByIdUseCase";

export class GetByIdController {
  constructor(private getByIdUseCase: GetByIdUseCase) {}

  async run(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const medicalHistory = await this.getByIdUseCase.execute(Number(id));

      if (medicalHistory) {
        res.status(200).json({ data: medicalHistory });
      } else {
        res.status(404).json({ message: `Historial médico con ID ${id} no encontrado.` });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al obtener el historial médico." });
    }
  }
}
