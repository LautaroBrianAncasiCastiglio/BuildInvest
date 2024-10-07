import type User from "@/models/User";

interface UserRepository {
    create(user: User): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User | null>;
    update(user: User): Promise<User>;
    delete(id: number): Promise<void>;
}

export default UserRepository;
