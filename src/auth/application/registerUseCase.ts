import { Worker } from 'worker_threads';
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
            const worker = new Worker('../../worker/passwordWorker.ts', { workerData: { password } });
            worker.on('message', resolve);
            worker.on('error', reject);
            worker.on('exit', (code) => {
                if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
            });
        });
    }
}