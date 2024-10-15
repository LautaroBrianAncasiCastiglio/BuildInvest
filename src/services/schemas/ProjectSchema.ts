import {z} from "zod";

export const ProjectNameSchema = z.string().max(100, {
    message:"El nombre debe tener menos de 100 caracteres"
})

export const ProjectLatitudeSchema = z.string().max(25,{
    message:"La latitud debe tener menos de 25 caracteres"
})

export const ProjectLenghtCoordsSchema = z.string().max(25,{
    message:"Las cordenadas debe tener menos de 25 caracteres"
})

export const ProjectMinAmountRequired = z
.number()
.int()
// Reemplazar el min
.min(4, {
    message: "El monto mínimo debe ser mayor a 1",
})
 