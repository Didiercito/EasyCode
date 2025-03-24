import { Worker } from 'worker_threads';
import { HeartRate } from "../domain/heart_rate";
import { HeartRateRepository } from "../domain/hate_rateRepository";
import path from 'path';
/*
Acá no sé si aplique correctamente la concurrencia paralela con Hilos de Trabajo (Worker Threads) para guardar el ritmo cardiaco de forma asíncrona.
Que se encuentra en Worker
*/
export class SaveUseCase {
    constructor(private heartRateRepository: HeartRateRepository) {}

    async execute(rawData: { ECG: number }): Promise<void> {
        let { ECG } = rawData;

        console.log("ECG recibido en SaveUseCase:", ECG);

        const minECG = 200;
        const maxECG = 5000;
        const minBPM = 50;
        const maxBPM = 200;

        ECG = Math.max(minECG, Math.min(ECG, maxECG));

        const BPM = minBPM + ((ECG - minECG) * (maxBPM - minBPM)) / (maxECG - minECG);

        const heartRate = new HeartRate(
            1,
            ECG,
            Math.round(BPM),
            new Date(),
            new Date()
        );

        const workerPath = path.join(__dirname, '../../worker/saveHeartRateWorker.ts');
        const worker = new Worker(workerPath, {
            workerData: { 
                heartRate: JSON.parse(JSON.stringify(heartRate)) 
            },
            execArgv: ['-r', 'ts-node/register']
        });        

        return new Promise((resolve, reject) => {
            worker.on('message', resolve);
            worker.on('error', reject);
            worker.on('exit', (code) => {
                if (code !== 0) {
                    reject(new Error(`Worker stopped with exit code ${code}. Please check worker logs.`));
                }
            });
        });
    }

    public convertToBPM(ECG: number): number {
        const minECG = 200;
        const maxECG = 5000;
        const minBPM = 50;
        const maxBPM = 200;

        ECG = Math.max(minECG, Math.min(ECG, maxECG));

        const BPM = minBPM + ((ECG - minECG) * (maxBPM - minBPM)) / (maxECG - minECG);
        return Math.round(BPM);
    }
}
