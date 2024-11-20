"use server";

import ProjectRepository from "@/models/ProjectRepository";
import MySQLProjectRepository from "../repositories/MySQLProjectRepository";
import MySQLArchitectRepository from "@/services/repositories/MySQLArchitectRepository";
import type ArchitectRepository from "@/models/ArchitectRepository";
import SessionManager from "@/services/SessionManager";
import { UserType } from "@/models/User";
import type { NewProjectFormState } from "@/components/new-project/NewProjectForm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProject(
    prevState: NewProjectFormState,
    formData: FormData,
    dates: { from: Date; to: Date },
) {
    try {
        const {
            name,
            description,
            interestRate,
            minAmountRequired,
            maxToInvest,
        } = Object.fromEntries(formData);

        const projectRepository: ProjectRepository =
            new MySQLProjectRepository();

        const architectRepository: ArchitectRepository =
            new MySQLArchitectRepository();

        const { email, usertype } = await SessionManager.verifySession();
        if (usertype !== UserType.architect)
            return {
                errors: {
                    general: "Debes ser un arquitecto para crear un proyecto",
                },
            };

        const architect = await architectRepository.findByEmail(email!);

        if (!architect)
            return {
                errors: {
                    general: "Cuenta inválida",
                },
            };

        await projectRepository.create({
            id: 0,
            architectId: architect.id,
            interestRate: Number(interestRate),
            name: name as string,
            description: description as string,
            minAmountRequired: Number(minAmountRequired),
            maxToInvest: Number(maxToInvest),
            latitude: "4",
            startDate: dates.from,
            estimatedEndDate: dates.to,
            lengthCoord: "4",
            total: 0,
        });

        revalidatePath("/proyectos");
    } catch (e) {
        console.error(e);
        return {
            errors: {
                general: "Ha ocurrido un error al crear el proyecto",
            },
        };
    }
    redirect("/proyectos");
}
