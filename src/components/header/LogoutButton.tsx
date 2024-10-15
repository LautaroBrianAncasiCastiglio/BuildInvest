import { Button } from "@/components/ui/button";
import { logoutUser } from "@/services/actions/logoutUser";

function LogoutButton() {
    return (
        <form action={logoutUser}>
            <Button variant={"destructive"}>Cerrar sesión</Button>
        </form>
    );
}

export default LogoutButton;
