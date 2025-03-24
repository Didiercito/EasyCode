import { HeartRate } from "../domain/heart_rate";
import { HeartRateRepository } from "../domain/hate_rateRepository";
import os from "os";

/*
 Acá utilice concurencia asincrona para obtener las frecuencias cardiacas de forma asíncrona.
*/

export class GetAllUseCase {
    private heartRateRepository: HeartRateRepository;

    constructor(heartRateRepository: HeartRateRepository) {
        this.heartRateRepository = heartRateRepository;
    }

    async execute(): Promise<HeartRate[]> {
        try {
            console.time("ExecutionTime");  // Iniciar el temporizador

            logCpuUsage();  // Log de uso de CPU antes de ejecutar la consulta
            logMemoryUsage();  // Log de uso de memoria antes de ejecutar la consulta

            const heartRates = await this.heartRateRepository.getAll();

            logCpuUsage();  // Log de uso de CPU después de la consulta
            logMemoryUsage();  // Log de uso de memoria después de la consulta

            console.timeEnd("ExecutionTime");  // Finalizar el temporizador

            return heartRates;  
        } catch (error) {
            console.error("Error al obtener las frecuencias cardíacas:", error);
            throw new Error("Error al obtener las frecuencias cardíacas");
        }
    }
}

function logMemoryUsage() {
    const memoryUsage = process.memoryUsage();
    console.log("Memory Usage:");
    console.log(`Heap Used: ${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Heap Total: ${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`);
    console.log(`External: ${(memoryUsage.external / 1024 / 1024).toFixed(2)} MB`);
}

function logCpuUsage() {
    const cpus = os.cpus();
    cpus.forEach((cpu, index) => {
        console.log(`CPU ${index}:`);
        console.log(`  Idle Time: ${cpu.times.idle}`);
        console.log(`  User Time: ${cpu.times.user}`);
        console.log(`  Sys Time: ${cpu.times.sys}`);
    });
}
