"use server";

import ProjectRepository from "@/models/ProjectRepository";
import MySQLProjectRepository from "../repositories/MySQLProjectRepository";
import SessionManager from "@/services/SessionManager";
import { UserType } from "@/models/User";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { InvestProjectFormState } from "@/components/invest-project/InvestProjectForm";
import type Project from "@/models/Project";

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

        const projectRepository: ProjectRepository =
            new MySQLProjectRepository();

        const { isAuth, email, usertype } =
            await SessionManager.verifySession();

        if (!isAuth) return { errors: { general: "Acción no autorizada." } };

        if (usertype === UserType.architect)
            return {
                errors: {
                    general: "Los arquitectos no pueden invertir en proyectos.",
                },
            };

        await projectRepository.investProject(project, email!, amount);

        revalidatePath(`/proyectos`);
        revalidatePath(`/proyectos/detalles/${project.id}`);
    } catch (e) {
        console.error(e);
        return {
            errors: {
                general: "Ha ocurrido un error al crear el proyecto",
            },
        };
    }
    redirect(`/proyectos/detalles/${project.id}`);
}
