import bcrypt from 'bcrypt';
import { workerData, parentPort } from 'worker_threads';

const password = workerData.password;

async function hashPassword(password: string): Promise<string> {
    if (typeof password !== 'string') {
        throw new Error('La contraseña debe ser una cadena de texto.');
    }

    const salt = await bcrypt.genSalt(10);
    console.log(`Salt generado: ${salt}`);  

    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

hashPassword(password)
    .then((hashedPassword) => {
        console.log(`Contraseña hasheada: ${hashedPassword}`);
        parentPort?.postMessage(hashedPassword);
    })
    .catch((error) => {
        console.error('Error en el worker:', error); 
        parentPort?.postMessage(new Error('Error al hacer el hash'));
    });
