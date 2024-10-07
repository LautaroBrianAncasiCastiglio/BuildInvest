export type UserUsername = string;
export type UserEmail = string;
export type UserPassword = string;
export type UserCreatedAt = Date;

interface User {
    username: UserUsername;
    email: UserEmail;
    password: UserPassword;
    createdAt: UserCreatedAt;
}

export default User;
