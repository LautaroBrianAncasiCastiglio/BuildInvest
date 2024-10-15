import LoginPage from "@/components/login/LoginPage";
import SessionManager from "@/services/SessionManager";
import { redirect } from "next/navigation";

export const metadata = {
    title: "Iniciar sesión - BuildInvest",
    description:
        "Inicia sesión para acceder a nuestra plataforma BuildInvest. Crea una cuenta para comenzar a invertir.",
};

async function Login() {
    const { isAuth } = await SessionManager.verifySession();

    if (isAuth) redirect("/");

    return <LoginPage />;
}

export default Login;
