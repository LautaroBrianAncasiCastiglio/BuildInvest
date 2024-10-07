import { z } from "zod";

export const ArchitectIdSchema = z
    .number()
    .int()
    .refine((v) => v > 0, {
        message: "El número de identificación debe ser mayor a cero",
    });

export const ArchitectNameSchema = z.string().max(70, {
    message: "El nombre del arquitecto debe tener menos de 70 caracteres",
});

export const ArchitectDniSchema = z.string().max(10, {
    message: "El DNI debe tener menos de 10 caracteres",
});

export const ArchitectRegistrationNumberSchema = z.string().max(45, {
    message: "El número de matrícula debe tener menos de 45 caracteres",
});

export const ArchitectEmailSchema = z
    .string()
    .email({
        message: "El correo electrónico debe tener un formato válido",
    })
    .max(255, {
        message: "El correo electrónico debe tener menos de 255 caracteres",
    });

const ArchitectSchema = z.object({
    id: ArchitectIdSchema,
    name: ArchitectNameSchema,
    dni: ArchitectDniSchema,
    registrationNumber: ArchitectRegistrationNumberSchema,
    email: ArchitectEmailSchema,
});

export default ArchitectSchema;
