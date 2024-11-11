import { db } from "./config/config";

export async function connectToDatabase() {
    try {
        const connection = await db.getConnection();
        console.log("Conexión exitosa a la base de datos MySQL");
        connection.release();
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
        process.exit(1);
    }
}