import ArchitectHeader from "@/components/header/ArchitectHeader";
import DefaultHeader from "@/components/header/DefaultHeader";
import InvestorHeader from "@/components/header/InvestorHeader";
import { UserType } from "@/models/User";
import SessionManager from "@/services/SessionManager";

export default async function Header() {
    const { isAuth, usertype } = await SessionManager.verifySession();

    if (!isAuth) return <DefaultHeader />;
    if (usertype === UserType.architect) return <ArchitectHeader />;
    return <InvestorHeader />;
}
