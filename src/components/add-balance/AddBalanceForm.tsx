"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addBalance } from "@/services/actions/addBalance";
import { useFormState, useFormStatus } from "react-dom";

function AddBalanceForm() {
    const [state, formAction] = useFormState<AddBalanceFormState, FormData>(
        addBalance,
        {
            errors: {},
        },
    );
    const { errors } = state;

    return (
        <form className="grid gap-5 w-full max-w-sm" action={formAction}>
            <BalanceField error={errors?.balance} />
            <SubmitButton />
            {errors?.general && (
                <p className="text-sm text-destructive w-full text-center">
                    {errors?.general}
                </p>
            )}
        </form>
    );
}

export type AddBalanceFormState = {
    errors?: {
        general?: string;
        balance?: string;
    };
};

function BalanceField(props: { error?: string }) {
    return (
        <div className="grid gap-2">
            <Label htmlFor="balance">Cantidad de dinero a cargar</Label>
            <Input id="balance" name="balance" type="number" min={0} required />
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
            {pending ? "Cargando..." : "Cargar saldo"}
        </Button>
    );
}

export default AddBalanceForm;
