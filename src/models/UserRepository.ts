import type { UserEmail, UserType } from "@/models/User";
import type User from "@/models/User";

interface UserRepository {
    create(user: User): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(email: UserEmail): Promise<User | null>;
    update(user: Partial<User> & Pick<User, "email">): Promise<void>;
    updateUsertype(email: UserEmail, usertype: UserType): Promise<void>;
    addBalance(userEmail: UserEmail, amount: number): Promise<void>;
    delete(email: UserEmail): Promise<void>;
}

export default UserRepository;
