import { z } from "zod";

export const UserUsernameSchema = z
    .string()
    .min(4, {
        message: "El nombre de usuario debe tener al menos 4 caracteres",
    })
    .max(16, {
        message: "El nombre de usuario debe tener menos de 16 caracteres",
    });

export const UserEmailSchema = z.string().email({
    message: "El correo electrónico debe tener un formato válido",
});

export const UserPasswordSchema = z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" });

export const UserCreatedAtSchema = z.date();

export const UserSchema = z.object({
    username: UserUsernameSchema,
    email: UserEmailSchema,
    password: UserPasswordSchema,
    createdAt: UserCreatedAtSchema,
});

export default UserSchema;
