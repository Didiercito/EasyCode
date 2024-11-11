import { AuthRepository } from "../domain/authRepository";
import { TokenService } from "../../middleware/auth";
import bcrypt from 'bcrypt';
import { User } from "../../user/domain/user";

export class LoginUseCase {
    constructor(private authRepository: AuthRepository) {}

    async execute(correo: string, contrasena: string): Promise<{ user: User; token: string } | Error> {
        const user = await this.authRepository.getByEmail(correo);
        
        if (!user) {
            throw new Error("Usuario no encontrado");
        }

        const isPasswordValid = await bcrypt.compare(contrasena, user.contrasena);
        if (!isPasswordValid) {
            throw new Error("Contraseña incorrecta");
        }

        const token = TokenService.generateToken(user.id);
        return { user, token };
    }
}
