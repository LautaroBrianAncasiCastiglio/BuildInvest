import DefaultHeader from "@/components/header/DefaultHeader";
import SessionManager from "@/services/SessionManager";

export default async function Header() {
    const { isAuth } = await SessionManager.verifySession();

    if (!isAuth) return <DefaultHeader />;
}
