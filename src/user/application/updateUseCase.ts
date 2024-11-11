import { User } from "../domain/user";
import { UserRepository } from "../domain/userRepository";

export class UpdateUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(id: number, userData: Partial<User>): Promise<User | null> {
        return await this.userRepository.update(id, userData);
    }
}
