import NewArchitectPage from "@/components/new-architect/NewArchitectPage";
import { UserType } from "@/models/User";
import SessionManager from "@/services/SessionManager";
import { redirect } from "next/navigation";

async function NewArchitect() {
    const { isAuth, usertype } = await SessionManager.verifySession();
    if (!isAuth) redirect("/iniciar-sesion");
    if (usertype === UserType.architect) redirect("/cuenta/arquitecto");
    return <NewArchitectPage />;
}

export default NewArchitect;
