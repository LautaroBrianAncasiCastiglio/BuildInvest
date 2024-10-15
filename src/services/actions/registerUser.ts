"use server";

import type { RegisterFormState } from "@/components/register/RegisterForm";
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
        const { email, password } = Object.fromEntries(formData);

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

        // const encryptedPassword = await PasswordEncrypter.encrypt(
        //     validatedPassword.data,
        // );

        // const userRepository: UserRepository = new MySQLUserRepository();

        // await userRepository.create({
        //     email: validatedEmail.data,
        //     password: encryptedPassword,
        //     username: "",
        //     createdAt: new Date(),
        // });

        await SessionManager.createSession(validatedEmail.data);
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
