"use server";

import type { RegisterFormState } from "@/components/register/RegisterForm";
import { UserType } from "@/models/User";
import type UserRepository from "@/models/UserRepository";
import PasswordEncrypter from "@/services/PasswordEncrypter";
import MySQLUserRepository from "@/services/repositories/MySQLUserRepository";
import {
    UserEmailSchema,
    UserPasswordSchema,
} from "@/services/schemas/UserSchema";
import SessionManager from "@/services/SessionManager";
import { redirect } from "next/navigation";

export async function registerUser(
    prevState: RegisterFormState,
    formData: FormData,
) {
    try {
        const { email, password, repeatedPassword } =
            Object.fromEntries(formData);

        const validatedEmail = UserEmailSchema.safeParse(email);
        if (!validatedEmail.success) {
            return {
                errors: {
                    email: validatedEmail.error.issues[0].message,
                },
            };
        }

        const validatedPassword = UserPasswordSchema.safeParse(password);
        if (!validatedPassword.success) {
            return {
                errors: {
                    password: validatedPassword.error.issues[0].message,
                },
            };
        }

        const validatedRepeatedPassword =
            UserPasswordSchema.safeParse(repeatedPassword);
        if (!validatedRepeatedPassword.success) {
            return {
                errors: {
                    repeatedPassword:
                        validatedRepeatedPassword.error.issues[0].message,
                },
            };
        }

        if (validatedPassword.data !== validatedRepeatedPassword.data) {
            return {
                errors: {
                    password: "Las contraseñas no coinciden.",
                },
            };
        }

        const encryptedPassword = await PasswordEncrypter.encrypt(
            validatedPassword.data,
        );

        const userRepository: UserRepository = new MySQLUserRepository();

        await userRepository.create({
            email: validatedEmail.data,
            password: encryptedPassword,
            username: "",
            createdAt: new Date(),
            usertype: UserType.investor,
        });

        await SessionManager.createSession(
            validatedEmail.data,
            UserType.investor,
        );
    } catch (e) {
        console.error(e);

        return {
            errors: {
                general: "Ha ocurrido un error al registrar al usuario.",
            },
        };
    }

    redirect("/");
}
