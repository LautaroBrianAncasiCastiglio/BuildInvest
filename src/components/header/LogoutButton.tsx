import { Button } from "@/components/ui/button";
import { logoutUser } from "@/services/actions/logoutUser";

function LogoutButton(props: { className?: string }) {
    return (
        <form action={logoutUser}>
            <Button variant={"destructive"} className={props.className || ""}>
                Cerrar sesión
            </Button>
        </form>
    );
}

export default LogoutButton;
