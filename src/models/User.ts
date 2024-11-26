export type UserUsername = string;
export type UserEmail = string;
export type UserPassword = string;
export type UserCreatedAt = Date;
export type UserBalance = number;

interface User {
    username: UserUsername;
    email: UserEmail;
    password: UserPassword;
    createdAt: UserCreatedAt;
    usertype: UserType;
    balance: UserBalance;
}

export enum UserType {
    architect = "architect",
    investor = "investor",
}

export default User;
