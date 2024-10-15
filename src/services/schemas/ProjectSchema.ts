import {z} from "zod"

export const ProjectIdSchema = z.number()
.int()
.refine((v) => v > 0,{
    message: "El número de identificación debe ser mayor a cero",
});

export const ProjectNameSchema = z.string().max(70, {
    message: "El nombre del proyecto debe tener menos de 70 caracteres",
});

export const ProjectInterestRateSchema = z
.number()
.int()
.min(4, {
    message: "La tasa de interest no debe ser 0",
})

export const ProjectMinAmountRequired = z
.number()
.int()
// Reemplazar el min
.min(4, {
    message: "El monto mínimo debe ser mayor a 1",
})
 