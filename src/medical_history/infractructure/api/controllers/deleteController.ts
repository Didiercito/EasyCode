import { Request, Response } from "express";
import { DeleteUseCase } from "../../../application/deleteUseCase";

export class DeleteController {
  constructor(private deleteUseCase: DeleteUseCase) {}

  async run(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const isDeleted = await this.deleteUseCase.execute(Number(id));

      if (isDeleted) {
        res.status(200).json({ message: `Historial médico con ID ${id} eliminado con éxito.` });
      } else {
        res.status(404).json({ message: `No se encontró el historial médico con ID ${id}.` });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al eliminar el historial médico." });
    }
  }
}
