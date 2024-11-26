"use server";

import type { AddBalanceFormState } from "@/components/add-balance/AddBalanceForm";
import type UserRepository from "@/models/UserRepository";
import MySQLUserRepository from "@/services/repositories/MySQLUserRepository";
import SessionManager from "@/services/SessionManager";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addBalance(_: AddBalanceFormState, formData: FormData) {
    try {
        const { balance } = Object.fromEntries(formData);

        if (!balance || Number(balance) <= 0 || balance instanceof File)
            return { errors: { balance: "La cantidad es requerida" } };

        const { isAuth, email } = await SessionManager.verifySession();

        if (!isAuth)
            return {
                errors: {
                    general: "No autorizado",
                },
            };

        const userRepository: UserRepository = new MySQLUserRepository();

        await userRepository.addBalance(email!, parseFloat(balance));
    } catch (error) {
        console.error(error);
        return {
            errors: {
                general: "Error al agregar fondos",
            },
        };
    }

    revalidatePath("/cuenta");
    redirect("/cuenta");
}
