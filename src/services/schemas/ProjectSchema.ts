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

export const ProyectIntestRateSchema = z.int().max(12,{
    message:"El interes es muy alto debe tener menos de 12 caracteres"
})
