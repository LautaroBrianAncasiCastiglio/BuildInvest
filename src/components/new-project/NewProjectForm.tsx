"use client";
import ProjectDateSelector from "@/components/new-project/ProjectDateSelector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createProject } from "@/services/actions/createProject";
import { addDays } from "date-fns";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { useFormState, useFormStatus } from "react-dom";

function NewProjectForm() {
    const [dateRange, setDateRange] = useState<DateRange>({
        from: new Date(),
        to: addDays(new Date(), 30),
    });

    const createProjectWithDate = async (
        prevState: NewProjectFormState,
        formData: FormData,
    ) => {
        return await createProject(prevState, formData, {
            from: dateRange.from!,
            to: dateRange.to!,
        });
    };

    const [state, formAction] = useFormState<NewProjectFormState, FormData>(
        createProjectWithDate,
        {
            errors: {},
        },
    );
    const { errors } = state;

    return (
        <form className="grid gap-5 w-full max-w-sm" action={formAction}>
            <NameField />
            <DescriptionField />
            <InterestRateField />
            <MinAmountRequiredField />
            <MaxToInvestField />
            <ProjectDateSelector date={dateRange} onDateChange={setDateRange} />
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
            <Label htmlFor="name">Nombre completo del proyecto</Label>
            <Input id="name" name="name" required />
            {props.error && (
                <p className="text-sm text-destructive">{props.error}</p>
            )}
        </div>
    );
}

function DescriptionField(props: { error?: string }) {
    return (
        <div className="grid gap-2">
            <Label htmlFor="name">Descripción</Label>
            <Input id="name" name="name" required />
            {props.error && (
                <p className="text-sm text-destructive">{props.error}</p>
            )}
        </div>
    );
}

function InterestRateField(props: { error?: string }) {
    return (
        <div className="grid gap-2">
            <Label htmlFor="interestRate">Interés</Label>
            <Input
                id="interestRate"
                name="interestRate"
                type="number"
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
                Cantidad mínima para invertir
            </Label>
            <Input
                id="minAmountRequired"
                name="minAmountRequired"
                type="number"
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
            <Label htmlFor="maxToInvest">Presupuesto máximo</Label>
            <Input id="maxToInvest" name="maxToInvest" type="number" required />
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
    };
};

export default NewProjectForm;
