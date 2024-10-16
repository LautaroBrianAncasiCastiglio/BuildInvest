"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerArchitect } from "@/services/actions/registerArchitect";
import { useFormState, useFormStatus } from "react-dom";

function NewArchitectForm() {
    const [state, formAction] = useFormState<NewArchitectFormState, FormData>(
        registerArchitect,
        {
            errors: {},
        },
    );
    const { errors } = state;

    return (
        <form className="grid gap-5 w-full max-w-sm" action={formAction}>
            <DniField error={errors?.dni} />
            <NameField error={errors?.name} />
            <RegistrationNumberField error={errors?.registrationNumber} />
            <SubmitButton />
            {errors?.general && (
                <p className="text-sm text-destructive w-full text-center">
                    {errors?.general}
                </p>
            )}
        </form>
    );
}

function DniField(props: { error?: string }) {
    return (
        <div className="grid gap-2">
            <Label htmlFor="dni">DNI</Label>
            <Input id="dni" name="dni" type="dni" required />
            {props.error && (
                <p className="text-sm text-destructive">{props.error}</p>
            )}
        </div>
    );
}

function NameField(props: { error?: string }) {
    return (
        <div className="grid gap-2">
            <Label htmlFor="name">Nombre completo</Label>
            <Input id="name" name="name" type="name" required />
            {props.error && (
                <p className="text-sm text-destructive">{props.error}</p>
            )}
        </div>
    );
}

function RegistrationNumberField(props: { error?: string }) {
    return (
        <div className="grid gap-2">
            <Label htmlFor="registrationNumber">Número de matrícula</Label>
            <Input
                id="registrationNumber"
                name="registrationNumber"
                type="registrationNumber"
                required
            />
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
            {pending ? "Registrando..." : "Registrarme"}
        </Button>
    );
}

export type NewArchitectFormState = {
    errors?: {
        general?: string;
        dni?: string;
        name?: string;
        registrationNumber?: string;
    };
};

export default NewArchitectForm;
