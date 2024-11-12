"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createProject } from "@/services/actions/createProject";
import { useFormState, useFormStatus } from "react-dom";

function NewProjectForm() {
    const [state, formAction] = useFormState<NewProjectFormState, FormData>(
        createProject,
        {
            errors: {},
        },
    );
    const { errors } = state;

    return (
        <form className="grid gap-5 w-full max-w-sm" action={formAction}>
            <NameField error={undefined} />
            <InterestRateField error={undefined} />
            <MinAmountRequiredField error={undefined} />
            <MaxToInvestField error={undefined} />
            <TotalField error={undefined} />
            <SubmitButton />
            {errors?.general && (
                <p className="text-sm text-destructive w-full text-center">
                    {errors?.general}
                </p>
            )}
        </form>
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

function InterestRateField(props: { error?: string }) {
    return (
        <div className="grid gap-2">
            <Label htmlFor="interestRate">Interes</Label>
            <Input
                id="interestRate"
                name="interestRate"
                type="interestRate"
                required
            />
            {props.error && (
                <p className="text-sm text-destructive">{props.error}</p>
            )}
        </div>
    );
}

function MinAmountRequiredField(props: { error?: string }) {
    return (
        <div className="grid gap-2">
            <Label htmlFor="minAmountRequired">
                Cantidad minima para invertir
            </Label>
            <Input
                id="minAmountRequired"
                name="minAmountRequired"
                type="minAmountRequired"
                required
            />
            {props.error && (
                <p className="text-sm text-destructive">{props.error}</p>
            )}
        </div>
    );
}

function MaxToInvestField(props: { error?: string }) {
    return (
        <div className="grid gap-2">
            <Label htmlFor="maxToInvest">Cantidad maxima de inversion</Label>
            <Input
                id="maxToInvest"
                name="maxToInvest"
                type="maxToInvest"
                required
            />
            {props.error && (
                <p className="text-sm text-destructive">{props.error}</p>
            )}
        </div>
    );
}

function TotalField(props: { error?: string }) {
    return (
        <div className="grid gap-2">
            <Label htmlFor="total">Total de presupuesto</Label>
            <Input id="total" name="total" type="total" required />
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
            {pending ? "Creando..." : "Crear proyecto"}
        </Button>
    );
}

export type NewProjectFormState = {
    errors?: {
        general?: string;
        name?: string;
        interestRate?: string;
        minAmountRequired?: string;
        maxToInvest?: string;
        total?: string;
    };
};

export default NewProjectForm;
