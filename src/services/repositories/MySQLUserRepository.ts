import { UserType, type UserEmail } from "@/models/User";
import type User from "@/models/User";
import type UserRepository from "@/models/UserRepository";
import MySQLPool from "@/services/MySQLPool";
import type { RowDataPacket } from "mysql2";

/**
 * The database user that is retrieved from queries.
 */
interface DBUser extends RowDataPacket {
    username: string;
    email: string;
    password: string;
    create_time: Date;
    usertype: number;
    balance: string;
}

class MySQLUserRepository implements UserRepository {
    /**
     * Create a user in the database.
     *
     * @param user The user to create.
     * @returns The created user.
     * @throws If the underlying MySQL operation fails.
     */
    async create(user: User): Promise<User> {
        try {
            await MySQLPool.execute(
                "INSERT INTO users (`username`, `email`, `password`, `usertype`) VALUES (?, ?, ?, ?)",
                [
                    user.username,
                    user.email,
                    user.password,
                    user.usertype === UserType.investor ? 1 : 2,
                ],
            );
            return user;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Retrieve all users from the database.
     *
     * @returns An array of all users in the database.
     * @throws If the underlying MySQL operation fails.
     */
    async findAll(): Promise<User[]> {
        try {
            const [rows] = await MySQLPool.execute<DBUser[]>(
                "SELECT * FROM users",
            );
            return rows.map((row) => ({
                username: row.username,
                email: row.email,
                password: row.password,
                createdAt: row.create_time,
                usertype:
                    row.usertype === 1 ? UserType.investor : UserType.architect,
                balance: parseFloat(row.balance),
            }));
        } catch (err) {
            throw err;
        }
    }

    /**
     * Find a user by their email address.
     *
     * @param email The user's email address.
     * @returns The user if found, or null if not found.
     * @throws If the underlying MySQL operation fails.
     */
    async findOne(email: UserEmail): Promise<User | null> {
        try {
            const [row] = await MySQLPool.execute<DBUser[]>(
                "SELECT * FROM users WHERE `email` = ? LIMIT 1",
                [email],
            );
            const [foundUser] = row;

            if (!foundUser) {
                return null;
            }

            return {
                username: foundUser.username,
                email: foundUser.email,
                password: foundUser.password,
                createdAt: foundUser.create_time,
                usertype:
                    foundUser.usertype === 1
                        ? UserType.investor
                        : UserType.architect,
                balance: parseFloat(foundUser.balance),
            };
        } catch (err) {
            throw err;
        }
    }
    /**
     * Update a user.
     *
     * @param user The user with the updates. The `email` property must be the same as the one in the database.
     * @returns The updated user.
     * @throws If the underlying MySQL operation fails.
     */
    async update(user: Partial<User> & Pick<User, "email">): Promise<void> {
        try {
            const preparedUser = {
                username: user.username,
                password: user.password,
                usertype:
                    user.usertype === undefined
                        ? undefined
                        : user.usertype === UserType.architect
                        ? 2
                        : 1,
                balance: user.balance,
            };

            const filteredUser = Object.fromEntries(
                Object.entries(preparedUser).filter(
                    ([_, value]) => value !== undefined,
                ),
            );

            await MySQLPool.query("UPDATE users SET ? WHERE `email` = ?", [
                filteredUser,
                user.email,
            ]);
        } catch (err) {
            throw err;
        }
    }

    /**
     * Delete a user by email.
     *
     * @throws If the underlying MySQL operation fails.
     */
    async delete(email: UserEmail): Promise<void> {
        try {
            await MySQLPool.execute("DELETE FROM users WHERE `email` = ?", [
                email,
            ]);
        } catch (err) {
            throw err;
        }
    }

    async updateUsertype(email: UserEmail, usertype: UserType): Promise<void> {
        try {
            await MySQLPool.execute(
                "UPDATE users SET `usertype` = ? WHERE `email` = ?",
                [usertype === UserType.architect ? 2 : 1, email],
            );
        } catch (err) {
            throw err;
        }
    }

    async addBalance(email: UserEmail, amount: number): Promise<void> {
        try {
            await MySQLPool.execute(
                "UPDATE users SET `balance` = `balance` + ? WHERE `email` = ?",
                [amount, email],
            );
        } catch (err) {
            throw err;
        }
    }
}

export default MySQLUserRepository;
