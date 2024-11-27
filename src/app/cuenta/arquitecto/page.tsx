import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type Project from "@/models/Project";
import MySQLArchitectRepository from "@/services/repositories/MySQLArchitectRepository";
import MySQLProjectRepository from "@/services/repositories/MySQLProjectRepository";
import SessionManager from "@/services/SessionManager";
import { redirect } from "next/navigation";

async function ArchitectPage() {
    const { isAuth, email } = await SessionManager.verifySession();

    if (!isAuth) redirect("/iniciar-sesion");

    const architectRepository = new MySQLArchitectRepository();
    const architect = await architectRepository.findByEmail(email!);
    if (!architect) redirect("/");

    const projectRepository = new MySQLProjectRepository();
    const projects = await projectRepository.findByArchitect(architect?.id);

    return (
        <main className="flex gap-4 justify-center items-center h-full w-full py-12 px-4 lg:py-24">
            <div className="flex flex-col items-center w-full space-y-10">
                <header className="max-w-sm flex flex-col gap-2 text-center">
                    <h1 className="text-4xl font-bold">Mi proyectos</h1>
                </header>
                <div className="flex w-full max-w-2xl flex-col gap-4">
                    {projects.length < 1 ? (
                        <p>No hay proyectos creados.</p>
                    ) : (
                        projects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))
                    )}
                </div>
            </div>
        </main>
    );
}
function ProjectCard(props: { project: Project }) {
    const { project } = props;

    return (
        <li
            key={project.architectId}
            className="flex flex-col p-8 sm:p-12 rounded-[24px] w-full border border-border shadow-lg"
        >
            <article className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <h3 className="text-2xl font-bold">{project.name}</h3>
                <div className="flex flex-col md:items-end gap-1 self-center md:justify-self-end">
                    <p className="text-lg text-primary">
                        {project.interestRate}% de interés anual
                    </p>
                    <p className="text-muted-foreground">
                        Mínimo de inversión: {project.minAmountRequired}$
                    </p>
                </div>
                <div className="flex flex-col gap-1 md:col-span-2 pt-3">
                    <div className="flex w-full justify-between">
                        <p className="text-primary font-bold">
                            {project.total}$
                        </p>
                        <p className="font-bold">{project.maxToInvest}$</p>
                    </div>
                    <Progress
                        value={(project.total / project.maxToInvest) * 100}
                    />
                </div>
            </article>
        </li>
    );
}

export default ArchitectPage;
