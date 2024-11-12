"use server";

import type { NewArchitectFormState } from "@/components/new-architect/NewArchitectForm";
import { UserType } from "@/models/User";
import type UserRepository from "@/models/UserRepository";
import MySQLArchitectRepository from "@/services/repositories/MySQLArchitectRepository";
import MySQLUserRepository from "@/services/repositories/MySQLUserRepository";
import {
    ArchitectDniSchema,
    ArchitectNameSchema,
    ArchitectRegistrationNumberSchema,
} from "@/services/schemas/ArchitectSchema";
import SessionManager from "@/services/SessionManager";
import { redirect } from "next/navigation";

export async function registerArchitect(
    prevState: NewArchitectFormState,
    formData: FormData,
) {
    const { dni, name, registrationNumber } = Object.fromEntries(formData);

    const validatedDni = ArchitectDniSchema.safeParse(dni);
    if (!validatedDni.success) {
        return {
            errors: {
                dni: validatedDni.error.issues[0].message,
            },
        };
    }

    const validatedName = ArchitectNameSchema.safeParse(name);
    if (!validatedName.success) {
        return {
            errors: {
                name: validatedName.error.issues[0].message,
            },
        };
    }

    const validatedRegistrationNumber =
        ArchitectRegistrationNumberSchema.safeParse(registrationNumber);
    if (!validatedRegistrationNumber.success) {
        return {
            errors: {
                registrationNumber:
                    validatedRegistrationNumber.error.issues[0].message,
            },
        };
    }

    try {
        const architectRepository = new MySQLArchitectRepository();
        const foundArchitect = await architectRepository.findByDni(
            validatedDni.data,
        );
        if (foundArchitect) {
            return {
                errors: {
                    general: "Ya existe un arquitecto registrado con este DNI.",
                },
            };
        }

        const { email } = await SessionManager.verifySession();

        if (!email)
            throw new Error(
                "No se puede registrar un arquitecto sin iniciar sesión.",
            );

        await architectRepository.create({
            id: 0,
            email,
            dni: validatedDni.data,
            name: validatedName.data,
            registrationNumber: validatedRegistrationNumber.data,
        });

        const userRepository: UserRepository = new MySQLUserRepository();

        await userRepository.updateUsertype(email, UserType.architect);

        await SessionManager.createSession(email, UserType.architect);
    } catch (e) {
        console.error(e);
        return {
            errors: {
                general: "Ha ocurrido un error.",
            },
        };
    }

    redirect("/");
}
