"use client";

import { InterestChart } from "@/components/invest-project/InterestChart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import type Project from "@/models/Project";
import { investProject } from "@/services/actions/investProject";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

function InvestProjectForm(props: { project: Project }) {
    const { project } = props;

    const [amount, setAmount] = useState(0);

    const [state, formAction] = useFormState<InvestProjectFormState, FormData>(
        investProject.bind(null, project),
        {
            errors: {},
        },
    );

    const { errors } = state;

    return (
        <form
            className="grid gap-5 justify-items-center w-full max-w-3xl"
            action={formAction}
        >
            <div className="flex flex-col gap-1 w-full max-w-sm">
                <div className="flex w-full justify-between">
                    <p className="text-primary font-bold">{project.total}$</p>
                    <p className="font-bold">{project.maxToInvest}$</p>
                </div>
                <Progress value={(project.total / project.maxToInvest) * 100} />
            </div>
            <InterestChart project={project} amount={amount} />
            <AmountField
                value={String(amount)}
                onValueChange={(newAmount) => setAmount(Number(newAmount))}
                project={project}
                error={errors?.amount}
            />
            <SubmitButton />
            {errors?.general && (
                <p className="text-sm text-destructive text-center w-full">
                    {errors?.general}
                </p>
            )}
        </form>
    );
}

function AmountField(props: {
    error?: string;
    project: Project;
    value: string;
    onValueChange: (value: string) => void;
}) {
    return (
        <div className="grid gap-2  w-full max-w-sm">
            <Label htmlFor="amount">Cantidad a invertir</Label>
            <Input
                value={props.value}
                onChange={(e) => props.onValueChange(e.target.value)}
                id="amount"
                name="amount"
                type="number"
                required
            />
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
        <Button
            type="submit"
            disabled={pending}
            size={"lg"}
            className="w-full max-w-sm"
        >
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
