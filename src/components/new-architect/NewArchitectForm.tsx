"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormStatus } from "react-dom";

function NewArchitectForm() {
    return (
        <form className="grid gap-5 w-full max-w-sm">
            <DniField />
            <NameField />
            <RegistrationNumberField />
            <SubmitButton />
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
            <Label htmlFor="name">Email</Label>
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
            {pending ? "Ingresando..." : "Ingresar"}
        </Button>
    );
}

export default NewArchitectForm;
