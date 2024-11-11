import { User } from "./user";

export interface UserRepository {
    getById(id: number): Promise<User | null>;
    getAll(): Promise<User[]>;                 
    update(id: number, user: Partial<User>): Promise<User | null>;
    delete(id: number): Promise<boolean>;     
}

