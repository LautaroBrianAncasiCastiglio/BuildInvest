"use server";

import type { UpdateFormState } from "@/components/update/UpdateForm";
import type projectRepository from "@/models/ProjectRepository";
import PasswordEncrypter from "@/services/PasswordEncrypter";
import MySQLProjectRepository from "@/services/repositories/MySQLProjectRepository";
import {
    ProjectEmailSchema,
    ProjectPasswordSchema,
} from "@/services/schemas/UserSchema";
import SessionManager from "@/services/SessionManager";
import { redirect } from "next/navigation";

export async function projectUser(prevState: ProjectFormState, formData: FormData) {
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

        const userRepository: UserRepository = new MySQLUserRepository();
        const user = await userRepository.findOne(validatedEmail.data);
        if (!user) {
            return {
                errors: {
                    general: "Credenciales inválidas.",
                },
            };
        }

        if (
            !(await PasswordEncrypter.compare(
                validatedPassword.data,
                user.password,
            ))
        ) {
            return {
                errors: {
                    general: "Credenciales inválidas.",
                },
            };
        }

        await SessionManager.createSession(user.email);
    } catch (error) {
        console.error(error);
        return {
            errors: {
                general: "Ocurrio un error inesperado.",
            },
        };
    }

    redirect("/");
}
