import { Request, Response } from "express";
import { UpdateUseCase } from "../../../application/updateUseCase";

export class UpDateController {
  constructor(private updateUseCase: UpdateUseCase) {}

  async run(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const historyData = req.body;

    try {
      const updatedHistory = await this.updateUseCase.execute(Number(id), historyData);

      if (updatedHistory) {
        res.status(200).json({
          message: `Historial médico con ID ${id} actualizado con éxito.`,
          data: updatedHistory
        });
      } else {
        res.status(404).json({ message: `Historial médico con ID ${id} no encontrado.` });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al actualizar el historial médico." });
    }
  }
}
