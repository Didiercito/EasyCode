import { User } from "../../user/domain/user";

export interface AuthRepository {
    register(user: User): Promise<User | null>; 
    login(correo: string, contrasena: string): Promise<User | null>; 
    getByEmail(email: string): Promise<User | null>;
}
