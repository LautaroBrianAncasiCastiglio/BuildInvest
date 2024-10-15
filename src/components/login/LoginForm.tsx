"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser } from "@/services/actions/loginUser";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";

function LoginForm() {
    const [state, formAction] = useFormState<LoginFormState, FormData>(
        loginUser,
        {
            errors: {},
        },
    );
    const { errors } = state;

    return (
        <form className="grid gap-5 w-full max-w-sm" action={formAction}>
            <EmailField error={errors.email} />
            <PasswordField error={errors.password} />
            <SubmitButton />
            {errors.general && (
                <p className="text-sm text-destructive w-full text-center">
                    {errors.general}
                </p>
            )}
            <Button variant="link" className="w-full text-blue-600" asChild>
                <Link href="/crear-cuenta">
                    ¿No tenés cuenta? Creá una acá.
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

export type LoginFormState = {
    errors: {
        general?: string;
        email?: string;
        password?: string;
    };
};

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" disabled={pending}>
            {pending ? "Ingresando..." : "Ingresar"}
        </Button>
    );
}

export default LoginForm;
