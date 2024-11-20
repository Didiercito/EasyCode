import { SensorHistory } from "../domain/history";
import { SensorHistoryRepository } from "../domain/historyRepository";

export class AddSensorHistoryUseCase {
    private sensorHistoryRepository: SensorHistoryRepository;

    constructor(sensorHistoryRepository: SensorHistoryRepository) {
        this.sensorHistoryRepository = sensorHistoryRepository;
    }

    public async execute(sensorType: string, sensorValue: number, userId: number): Promise<SensorHistory> {
        if (!sensorType || typeof sensorType !== "string" || sensorType.trim() === "") {
            throw new Error("El tipo de sensor es obligatorio y debe ser una cadena no vacía.");
        }

        if (typeof sensorValue !== "number") {
            throw new Error("El valor del sensor es obligatorio y debe ser un número.");
        }

        if (!userId || typeof userId !== "number" || userId <= 0) {
            throw new Error("El ID de usuario es obligatorio y debe ser un número positivo.");
        }

        const newHistoryEvent = new SensorHistory(
            0, 
            sensorType,
            sensorValue,
            userId,
            new Date(),
            new Date()
        );

        try {
            return await this.sensorHistoryRepository.addSensorHistory(newHistoryEvent);
        } catch (error) {
            console.error("Error al agregar un evento de historial de sensor:", error);
            throw new Error("No se pudo agregar el historial del sensor.");
        }
    }
}

