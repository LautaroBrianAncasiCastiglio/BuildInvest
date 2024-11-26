import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type InvestmentRepository from "@/models/InvestmentRepository";
import type User from "@/models/User";
import type UserRepository from "@/models/UserRepository";
import MySQLInvestmentRepository from "@/services/repositories/MySQLInvestmentRepository";
import MySQLUserRepository from "@/services/repositories/MySQLUserRepository";
import SessionManager from "@/services/SessionManager";
import Link from "next/link";
import { redirect } from "next/navigation";
import type Investment from "@/models/Investment";
import MySQLProjectRepository from "@/services/repositories/MySQLProjectRepository";
import { format } from "date-fns";
import { es } from "date-fns/locale";

async function AccountPage() {
    const { isAuth, email } = await SessionManager.verifySession();

    if (!isAuth) return redirect("/iniciar-sesion");

    const userRepository: UserRepository = new MySQLUserRepository();
    const user = await userRepository.findOne(email!);

    if (!user) return redirect("/iniciar-sesion");

    return (
        <main className="flex gap-4 justify-center items-center h-full w-full py-12 px-4 lg:py-24">
            <div className="flex flex-col items-center w-full space-y-10">
                <header className="max-w-sm flex flex-col gap-2 text-center">
                    <h1 className="text-4xl font-bold">Mi cuenta</h1>
                </header>
                <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="flex flex-col items-center p-6 gap-4 max-w-md w-full h-fit">
                        Saldo: {user.balance || 0}$
                        <Button asChild className="w-full">
                            <Link href="/recargar">Recargar saldo</Link>
                        </Button>
                    </Card>
                    <Card className="flex flex-col items-center p-6 md:col-span-2 gap-4 max-w-md w-full h-fit">
                        <h2 className="w-full text-start font-bold">
                            Mis inversiones
                        </h2>
                        <InvestmentList email={email!} />
                    </Card>
                </div>
            </div>
        </main>
    );
}

async function InvestmentList(props: { email: User["email"] }) {
    const investmentRepository: InvestmentRepository =
        new MySQLInvestmentRepository();
    const investments = await investmentRepository.findByEmail(props.email);

    if (investments.length < 1) return <p>No hay inversiones realizadas.</p>;
    return (
        <ul className="flex flex-col gap-8 max-w-2xl w-full">
            {investments.map((investment) => (
                <InvestmentCard
                    key={investment.projectId}
                    investment={investment}
                />
            ))}
        </ul>
    );
}

async function InvestmentCard(props: { investment: Investment }) {
    const project = await new MySQLProjectRepository().findOne(
        props.investment.projectId,
    );

    if (!project) return;

    return (
        <li className="flex flex-col p-4 rounded-2xl w-full border border-border shadow-lg">
            <article className="flex flex-col md:flex-row items-center justify-between gap-2">
                <h3 className="text-lg font-bold">{project.name}</h3>
                <p className="text-primary font-bold">
                    {props.investment.amount}$
                </p>
            </article>
        </li>
    );
}

export default AccountPage;
