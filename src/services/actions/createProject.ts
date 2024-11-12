"use server";

import ProjectRepository from "@/models/ProjectRepository";
import MySQLProjectRepository from "../repositories/MySQLProjectRepository";
import MySQLArchitectRepository from "@/services/repositories/MySQLArchitectRepository";
import type ArchitectRepository from "@/models/ArchitectRepository";
import SessionManager from "@/services/SessionManager";
import { UserType } from "@/models/User";
import type { NewProjectFormState } from "@/components/new-project/NewProjectForm";

export async function createProject(
    prevState: NewProjectFormState,
    formData: FormData,
) {
    try {
        const { name, interestRate, minAmountRequired, maxToInvest, total } =
            Object.fromEntries(formData);

        console.log(Object.fromEntries(formData));

        const projectRepository: ProjectRepository =
            new MySQLProjectRepository();

        const architectRepository: ArchitectRepository =
            new MySQLArchitectRepository();

        const { email, usertype } = await SessionManager.verifySession();
        if (usertype !== UserType.architect)
            return {
                errors: {
                    general: "Ha ocurrido un error al crear el proyecto",
                },
            };

        const architect = await architectRepository.findByEmail(email!);
        console.log(architect);
        if (!architect)
            return {
                errors: {
                    general: "Ha ocurrido un error al crear el proyecto",
                },
            };

        await projectRepository.create({
            id: 0,
            architectId: architect.id,
            interestRate: Number(interestRate),
            name: name as string,
            minAmountRequired: Number(minAmountRequired),
            maxToInvest: Number(maxToInvest),
            latitude: "4",
            startDate: new Date(),
            estimatedEndDate: new Date(),
            lengthCoord: "4",
            total: Number(total),
        });

        return {};
    } catch (e) {
        console.log(e);
        return {
            errors: {
                general: "Ha ocurrido un error al crear el proyecto",
            },
        };
    }
}
