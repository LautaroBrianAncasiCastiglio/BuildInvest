import { z } from "zod";

export const ProjectNameSchema = z.string().max(100, {
    message: "El nombre debe tener menos de 100 caracteres",
});

export const ProjectLatitudeSchema = z.string().max(25, {
    message: "La latitud debe tener menos de 25 caracteres",
});

export const ProjectLenghtCoordsSchema = z.string().max(25, {
    message: "Las cordenadas debe tener menos de 25 caracteres",
});

export const ProjectInterestRateSchema = z.number().min(0, {
    message: "La tasa de interés debe ser mayor o igual a 0",
});

export const ProjectMinAmountRequiredSchema = z.number().int().min(1, {
    message: "El monto mínimo debe ser mayor a 1",
});

export const ProjectMaxToInvestSchema = z.number().min(0, {
    message: "El monto máximo a invertir debe ser mayor o igual a 0",
});

export const ProjectStartDateSchema = z.date({
    message: "La fecha de inicio debe ser una fecha válida",
});

export const ProjectEstimatedEndDateSchema = z.date({
    message: "La fecha de fin estimada debe ser una fecha válida",
});

export const ProjectTotalSchema = z.number().min(0, {
    message: "El total debe ser mayor o igual a 0",
});

export const ProjectSchema = z.object({
    id: z.number(),
    architectId: z.number(),
    name: ProjectNameSchema,
    latitude: ProjectLatitudeSchema,
    lengthCoord: ProjectLenghtCoordsSchema,
    interestRate: ProjectInterestRateSchema,
    minAmountRequired: ProjectMinAmountRequiredSchema,
    maxToInvest: ProjectMaxToInvestSchema,
    startDate: ProjectStartDateSchema,
    estimatedEndDate: ProjectEstimatedEndDateSchema,
    total: ProjectTotalSchema,
});

export default ProjectSchema;
