import { User } from "../domain/user";
import { UserRepository } from "../domain/userRepository";

export class GetByIdUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(id: number): Promise<User | null> {
        return await this.userRepository.getById(id);
    }
}
