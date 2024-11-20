export class SensorHistory {
    public id: number;
    public sensorType: string;
    public sensorValue: number;  // Almacena el valor del sensor
    public userId: number;
    public create_at: Date;
    public update_at: Date;

    constructor(
        id: number,
        sensorType: string,
        sensorValue: number,  // El valor del sensor es obligatorio
        userId: number,
        create_at: Date,
        update_at: Date
    ) {
        if (!sensorType || typeof sensorType !== "string" || sensorType.trim() === "") {
            throw new Error("El tipo de sensor es obligatorio y debe ser una cadena no vacía.");
        }

        if (typeof sensorValue !== "number") {
            throw new Error("El valor del sensor debe ser un número.");
        }

        if (!userId || typeof userId !== "number" || userId <= 0) {
            throw new Error("El ID de usuario es obligatorio y debe ser un número positivo.");
        }

        this.id = id;
        this.sensorType = sensorType;
        this.sensorValue = sensorValue;
        this.userId = userId;
        this.create_at = create_at;
        this.update_at = update_at;
    }
}
