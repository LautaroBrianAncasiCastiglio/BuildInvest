import type Investment from "@/models/Investment";
import type InvestmentRepository from "@/models/InvestmentRepository";
import MySQLInvestmentRepository from "@/services/repositories/MySQLInvestmentRepository";
import MySQLProjectRepository from "@/services/repositories/MySQLProjectRepository";
import SessionManager from "@/services/SessionManager";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { redirect } from "next/navigation";

async function InvestmentsPage() {
    const { isAuth, email } = await SessionManager.verifySession();

    if (!isAuth || !email) return redirect("/proyectos");

    const investmentRepository: InvestmentRepository =
        new MySQLInvestmentRepository();
    const investments = await investmentRepository.findByEmail(email!);

    return (
        <main className="flex gap-4 justify-center items-center h-full w-full py-12 px-4 lg:py-24">
            <div className="flex flex-col items-center w-full space-y-10">
                <header className="max-w-sm flex flex-col gap-2 text-center">
                    <h1 className="text-4xl font-bold">Mis inversiones</h1>
                </header>
                {investments.length < 1 ? (
                    <p>No hay inversiones realizadas.</p>
                ) : (
                    <ul className="flex flex-col gap-8 max-w-2xl w-full">
                        {investments.map((investment) => (
                            <InvestmentCard
                                key={investment.projectId}
                                investment={investment}
                            />
                        ))}
                    </ul>
                )}
            </div>
        </main>
    );
}

async function InvestmentCard(props: { investment: Investment }) {
    const project = await new MySQLProjectRepository().findOne(
        props.investment.projectId,
    );

    if (!project) return;

    return (
        <li className="flex flex-col p-8 rounded-2xl w-full border border-border shadow-lg">
            <article className="flex flex-col md:flex-row items-center justify-between gap-2">
                <h3 className="text-lg font-bold">{project.name}</h3>
                <p>
                    {format(props.investment.date, "dd 'de' LLLL, y", {
                        locale: es,
                    })}
                </p>
                <p className="text-primary font-bold">
                    {props.investment.amount}$
                </p>
            </article>
        </li>
    );
}

export default InvestmentsPage;
