"use server";

import ProjectRepository from "@/models/ProjectRepository";
import MySQLProjectRepository from "../repositories/MySQLProjectRepository";
import {
    ProjectNameSchema,
    ProjectLatitudeSchema,
    ProjectLenghtCoordsSchema,
    ProjectMinAmountRequired,
} from "../schemas/ProjectSchema";

export async function createProject(formData: FormData) {
    try {
        const { name, latitude, length, minAmountRequired } =
            Object.fromEntries(formData);

        const validatedName = ProjectNameSchema.safeParse(name);
        if (!validatedName.success) {
            return {
                errros: {
                    name: validatedName.error.issues[0].message,
                },
            };
        }
        const validatedLatitude = ProjectLatitudeSchema.safeParse(latitude);
        if (!validatedLatitude.success) {
            return {
                erros: {
                    latitude: validatedLatitude.error.issues[0].message,
                },
            };
        }

        const validatedLengthCoords =
            ProjectLenghtCoordsSchema.safeParse(length);
        if (!validatedLengthCoords.success) {
            return {
                errors: {
                    length: validatedLengthCoords.error.issues[0].message,
                },
            };
        }

        const validatedMinAmountRequired =
            ProjectMinAmountRequired.safeParse(minAmountRequired);
        if (!validatedMinAmountRequired.success) {
            return {
                errors: {
                    minAmountRequired:
                        validatedMinAmountRequired.error.issues[0].message,
                },
            };
        }

        const projectRepository: ProjectRepository =
            new MySQLProjectRepository();

        await projectRepository.create({
            name: validatedName.data,
            latitude: validatedLatitude.data,
            lengthCoord: validatedLengthCoords.data,
        });
    } catch (e) {
        console.log(e);
        return {
            errors: {
                general: "Ha ocurrido un error al crear el proyecto",
            },
        };
    }
}
