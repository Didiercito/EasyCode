import { Worker } from 'worker_threads';
import path from 'path'; 
import { User } from "../../user/domain/user";
import { AuthRepository } from "../domain/authRepository";

export class RegisterUseCase {
    constructor(
        private authRepository: AuthRepository,
    ) {}

    async execute(userData: User): Promise<{ user: User } | Error> {
        const existingUser = await this.authRepository.getByEmail(userData.correo);
        if (existingUser) {
            throw new Error('El correo electrónico ya está registrado');
        }

        const hashedPassword = await this.hashPassword(userData.contrasena);

        const newUser = {
            ...userData,
            contrasena: hashedPassword,
        };

        const savedUser = await this.authRepository.register(newUser);

        if (!savedUser) {
            throw new Error('Error al registrar el usuario');
        }

        return { user: savedUser };
    }

    private async hashPassword(password: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const workerPath = path.join(__dirname, '../../worker/passwordWorker.ts');
            const worker = new Worker(workerPath, { 
                workerData: { password },
                execArgv: ['-r', 'ts-node/register'], 
            });
            worker.on('message', resolve);
            worker.on('error', reject);
            worker.on('exit', (code) => {
                if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
            });
        });
    }
}