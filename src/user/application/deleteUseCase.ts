import { UserRepository } from "../domain/userRepository";

export class DeleteUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(id: number): Promise<boolean> {
        return await this.userRepository.delete(id);
    }
}
