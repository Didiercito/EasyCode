import { AuthRepository } from "../domain/authRepository";
import { TokenService } from "../../middleware/auth";
import bcrypt from 'bcrypt';

export class LoginUseCase {
    constructor(
        private authRepository: AuthRepository,
    ) {}

    async execute(correo: string, contrasena: string): Promise<{ token: string, id: number } | Error> {
        const user = await this.authRepository.getByEmail(correo);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const validPassword = await bcrypt.compare(contrasena, user.contrasena);
        if (!validPassword) {
            throw new Error('Contraseña incorrecta');
        }

        const token = TokenService.generateToken(user.id);

        return { token, id: user.id };  
    }
}
