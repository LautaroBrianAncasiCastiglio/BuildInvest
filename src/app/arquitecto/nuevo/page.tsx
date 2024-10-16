import NewArchitectPage from "@/components/new-architect/NewArchitectPage";
import SessionManager from "@/services/SessionManager";
import { redirect } from "next/navigation";

async function NewArchitect() {
    const { isAuth } = await SessionManager.verifySession();
    if (!isAuth) redirect("/iniciar-sesion");
    return <NewArchitectPage />;
}

export default NewArchitect;
