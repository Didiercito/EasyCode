import { Request, Response } from "express";
import { GetHistoryForUserUseCase } from "../../../application/getHistoryForUserUseCase";
import dotenv from 'dotenv';
dotenv.config();
import jwt from "jsonwebtoken"; 

export class GetHistoryForUserController {
    constructor(private readonly getHistoryForUserUseCase: GetHistoryForUserUseCase) {}

    public async handle(req: Request, res: Response): Promise<void> {
        try {
            const token = req.headers["authorization"]?.split(" ")[1];

            if (!token) {
                res.status(401).json({ message: "Token de autenticación no proporcionado" });
                return;
            }

            const jwtSecret = process.env.JWT;
            if (!jwtSecret) {
                res.status(500).json({ message: "La clave JWT no está definida en las variables de entorno" });
                return;
            }

            const decoded: any = jwt.verify(token, jwtSecret); 

            if (!decoded || !decoded.id) {
                res.status(401).json({ message: "Token no válido o expirado" });
                return;
            }

            const history = await this.getHistoryForUserUseCase.execute(decoded.id);

            res.status(200).json(history);
        } catch (error) {
            console.error("Error al obtener historial de sensores por usuario:", error);
            res.status(500).json({ message: "Error al obtener historial de sensores por usuario" });
        }
    }
}
