import { parentPort, workerData } from 'worker_threads';
import bcrypt from 'bcrypt';

const { password } = workerData;

const hashPassword = async () => {
    const hashedPassword = await bcrypt.hash(password, 10);
    parentPort?.postMessage(hashedPassword);
};

hashPassword();