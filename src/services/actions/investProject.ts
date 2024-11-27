"use server";

import SessionManager from "@/services/SessionManager";
import { UserType } from "@/models/User";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { InvestProjectFormState } from "@/components/invest-project/InvestProjectForm";
import type Project from "@/models/Project";
import type InvestmentRepository from "@/models/InvestmentRepository";
import MySQLInvestmentRepository from "@/services/repositories/MySQLInvestmentRepository";
import MySQLUserRepository from "@/services/repositories/MySQLUserRepository";
import type UserRepository from "@/models/UserRepository";

export async function investProject(
    project: Project,
    prevState: InvestProjectFormState,
    formData: FormData,
) {
    try {
        const amount = Number(Object.fromEntries(formData).amount);

        if (!amount || amount <= 0)
            return { errors: { amount: "La cantidad es requerida" } };
        if (project.total + amount > project.maxToInvest)
            return {
                errors: {
                    amount: "La cantidad no puede superar el límite de inversión",
                },
            };
        if (amount < project.minAmountRequired)
            return {
                errors: {
                    amount: "La cantidad debe ser mayor o igual al monto mínimo",
                },
            };

        if (project.total >= project.maxToInvest)
            return {
                errors: {
                    general: "El proyecto alcanzó su límite",
                },
            };

        const InvestmentRepository: InvestmentRepository =
            new MySQLInvestmentRepository();

        const { isAuth, email, usertype } =
            await SessionManager.verifySession();

        if (!isAuth) return { errors: { general: "Acción no autorizada." } };

        if (usertype === UserType.architect)
            return {
                errors: {
                    general: "Los arquitectos no pueden invertir en proyectos.",
                },
            };

        const userRepository: UserRepository = new MySQLUserRepository();
        const currentUser = await userRepository.findOne(email!);

        if (!currentUser?.balance || currentUser?.balance! < amount)
            return {
                errors: {
                    general: "No tienes suficiente dinero para invertir",
                },
            };

        await InvestmentRepository.investProject(project, email!, amount);

        console.log(currentUser);

        await userRepository.update({
            email: email!,
            balance: currentUser?.balance! - amount,
        });

        revalidatePath(`/proyectos`);
        revalidatePath(`/proyectos/detalles/${project.id}`);
        revalidatePath(`/cuenta`);
    } catch (e) {
        console.error(e);
        return {
            errors: {
                general: "Ha ocurrido un error al crear el proyecto",
            },
        };
    }
    redirect(`/cuenta`);
}
