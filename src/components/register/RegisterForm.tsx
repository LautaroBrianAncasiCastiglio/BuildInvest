"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";

function RegisterForm() {
    const [state, formAction] = useFormState<RegisterFormState, FormData>(
        () => {},
        {
            errors: {},
        },
    );
    const errors = state?.errors;

    return (
        <form action={formAction} className="grid gap-5 w-full max-w-sm">
            <EmailField error={errors?.email} />
            <PasswordField error={errors?.password} />
            <SubmitButton />
            {errors?.general && (
                <p className="text-sm text-destructive w-full text-center">
                    {errors.general}
                </p>
            )}
            <Button variant="link" className="w-full text-blue-600" asChild>
                <Link href="/iniciar-sesion">
                    ¿Ya tenés cuenta? Iniciá sesión acá.
                </Link>
            </Button>
        </form>
    );
}

function EmailField(props: { error?: string }) {
    return (
        <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
                id="email"
                name="email"
                placeholder="Por ejemplo: lgaieta@example.com"
                minLength={6}
                maxLength={16}
                required
            />
            {props.error && (
                <p className="text-sm text-destructive">{props.error}</p>
            )}
        </div>
    );
}

function PasswordField(props: { error?: string }) {
    return (
        <div className="grid gap-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
                id="password"
                name="password"
                placeholder="••••••••"
                required
                minLength={8}
                maxLength={65}
                type="password"
            />
            <p className="text-sm text-muted-foreground">
                Debe contener al menos 8 caracteres.
            </p>
            {props.error && (
                <p className="text-sm text-destructive">{props.error}</p>
            )}
        </div>
    );
}
function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" disabled={pending}>
            {pending ? "Creando..." : "Crear"}
        </Button>
    );
}

export type RegisterFormState = {
    errors?: {
        general?: string;
        email?: string;
        password?: string;
    };
} | void;

export default RegisterForm;
