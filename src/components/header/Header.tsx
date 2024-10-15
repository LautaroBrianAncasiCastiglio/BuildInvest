import DefaultHeader from "@/components/header/DefaultHeader";
import InvestorHeader from "@/components/header/InvestorHeader";
import SessionManager from "@/services/SessionManager";

export default async function Header() {
    const { isAuth } = await SessionManager.verifySession();

    if (!isAuth) return <DefaultHeader />;
    return <InvestorHeader />;
}
