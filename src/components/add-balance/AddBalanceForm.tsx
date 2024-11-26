import { Button } from "@/components/ui/button";
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

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" disabled={pending}>
            {pending ? "Cargando..." : "Cargar saldo"}
        </Button>
    );
}

export default AddBalanceForm;
