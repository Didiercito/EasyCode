import { User } from "../domain/user";
import { UserRepository } from "../domain/userRepository";

export class GetAllUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(): Promise<User[]> {
        return await this.userRepository.getAll();
    }
}
