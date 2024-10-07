import type { UserEmail } from "@/models/User";
import type User from "@/models/User";

interface UserRepository {
    create(user: User): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(email: UserEmail): Promise<User | null>;
    update(user: User): Promise<User>;
    delete(email: UserEmail): Promise<void>;
}

export default UserRepository;
