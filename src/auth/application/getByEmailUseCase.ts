import { AuthRepository } from "../domain/authRepository";
import { User } from "../../user/domain/user";

export class GetByEmailUseCase {
    constructor(private authRepository: AuthRepository) {}

    async execute(email: string): Promise<User | null> {
        const user = await this.authRepository.getByEmail(email);
        return user;
    }
}
