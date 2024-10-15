import RegisterPage from "@/components/register/RegisterPage";
import SessionManager from "@/services/SessionManager";
import { redirect } from "next/navigation";

export const metadata = {
    title: "Crear cuenta - BuildInvest",
    description:
        "Crea una cuenta para comenzar a invertir en la plataforma BuildInvest",
};

async function Register() {
    const { isAuth } = await SessionManager.verifySession();

    if (isAuth) redirect("/");

    return <RegisterPage />;
}

export default Register;
