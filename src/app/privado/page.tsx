import SessionManager from "@/services/SessionManager";
import { redirect } from "next/navigation";

export default async function Private() {
    const { isAuth } = await SessionManager.verifySession();

    if (!isAuth) redirect("/iniciar-sesion");

    return (
        <div className="p-18">
            <h1 className="font-bold text-3xl">
                Esta pagina es solo para usuarios
            </h1>
        </div>
    );
}
