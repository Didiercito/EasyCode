import { parentPort, workerData } from 'worker_threads';
import { MySQLHeartRateRepository } from '../heart_rate/infracstructure/adapters/heart_rateAdapterMySQL';

const heartRateRepository = new MySQLHeartRateRepository();

console.log("Datos recibidos del worker:", workerData);

const data = JSON.parse(workerData.heartRate);

(async () => {
    try {
        await heartRateRepository.save(data);
        parentPort?.postMessage(`Heart rate saved successfully (PID: ${process.pid})`);
    } catch (error: any) {
        parentPort?.postMessage(`Error saving heart rate: ${error.message}`);
    }
})();
