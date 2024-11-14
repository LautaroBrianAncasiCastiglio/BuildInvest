"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import type Project from "@/models/Project";
import { investProject } from "@/services/actions/investProject";
import { useFormState, useFormStatus } from "react-dom";

function InvestProjectForm(props: { project: Project }) {
    const { project } = props;

    const [state, formAction] = useFormState<InvestProjectFormState, FormData>(
        investProject.bind(null, project),
        {
            errors: {},
        },
    );

    const { errors } = state;

    return (
        <form className="grid gap-5 w-full max-w-sm" action={formAction}>
            <div className="flex flex-col gap-1">
                <div className="flex w-full justify-between">
                    <p className="text-primary font-bold">{project.total}$</p>
                    <p className="font-bold">{project.maxToInvest}$</p>
                </div>
                <Progress value={(project.total / project.maxToInvest) * 100} />
            </div>
            <AmountField project={project} error={errors?.amount} />
            <SubmitButton />
            {errors?.general && (
                <p className="text-sm text-destructive text-center w-full">
                    {errors?.general}
                </p>
            )}
        </form>
    );
}

function AmountField(props: { error?: string; project: Project }) {
    return (
        <div className="grid gap-2">
            <Label htmlFor="amount">Cantidad a invertir</Label>
            <Input id="amount" name="amount" type="number" required />
            <p className="text-sm">
                La cantidad mínima es de {props.project.minAmountRequired}$
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
        <Button type="submit" disabled={pending} size={"lg"}>
            {pending ? "Invirtiendo..." : "Invertir ahora"}
        </Button>
    );
}

export type InvestProjectFormState = {
    errors?: {
        amount?: string;
        general?: string;
    };
};

export default InvestProjectForm;
