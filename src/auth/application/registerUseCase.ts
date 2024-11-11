import { User } from "../../user/domain/user";
import { AuthRepository } from "../domain/authRepository";
import { TokenService } from "../../middleware/auth";
import bcrypt from 'bcrypt';


export class RegisterUseCase {
    constructor(
        private authRepository: AuthRepository,
    ) {}

    async execute(userData: User): Promise<{ user: User, token: string } | Error> {
        const existingUser = await this.authRepository.getByEmail(userData.correo);
        if (existingUser) {
            throw new Error('El correo electrónico ya está registrado');
        }

        const hashedPassword = await bcrypt.hash(userData.contrasena, 10);

        const newUser = {
            ...userData,
            contrasena: hashedPassword, 
        };

        const savedUser = await this.authRepository.register(newUser);

        if (!savedUser) {
            throw new Error('Error al registrar el usuario');
        }

        const token = TokenService.generateToken(savedUser.id);

        return { user: savedUser, token };
    }
}