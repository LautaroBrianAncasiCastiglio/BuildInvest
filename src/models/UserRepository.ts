import type { UserEmail, UserType } from "@/models/User";
import type User from "@/models/User";

interface UserRepository {
    create(user: User): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(email: UserEmail): Promise<User | null>;
    update(user: User): Promise<User>;
    updateUsertype(email: UserEmail, usertype: UserType): Promise<void>;
    delete(email: UserEmail): Promise<void>;
}

export default UserRepository;
