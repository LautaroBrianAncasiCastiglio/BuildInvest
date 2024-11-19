import InvestProjectForm from "@/components/invest-project/InvestProjectForm";
import { Button } from "@/components/ui/button";
import type ProjectRepository from "@/models/ProjectRepository";
import MySQLProjectRepository from "@/services/repositories/MySQLProjectRepository";
import SessionManager from "@/services/SessionManager";
import Link from "next/link";
import { redirect } from "next/navigation";

async function InvestProject({ params }: { params: { id: string } }) {
    const { isAuth } = await SessionManager.verifySession();

    if (!isAuth) redirect("/iniciar-sesion");

    const projectRepository: ProjectRepository = new MySQLProjectRepository();
    const project = await projectRepository.findOne(Number(params.id));

    if (!project)
        return (
            <main className="flex gap-4 justify-center items-center h-full w-full py-12 lg:py-24 px-4">
                <div className="flex flex-col items-center w-full space-y-10">
                    <header className="max-w-sm flex flex-col gap-4 items-center text-center">
                        <p>El proyecto que estás buscando no existe.</p>
                        <Button asChild className="w-fit">
                            <Link href="/proyectos">Volver</Link>
                        </Button>
                    </header>
                </div>
            </main>
        );

    if (project.total >= project.maxToInvest)
        return redirect("/proyectos/detalles/" + project.id);

    return (
        <main className="flex flex-col gap-6 md:gap-12 justify-center items-center w-full py-16 px-4 md:py-24">
            <header className="flex justify-center">
                <h1 className="text-2xl font-bold sm:text-4xl">
                    Invertir en{" "}
                    <strong className="text-primary font-bold">
                        {project?.name}
                    </strong>
                </h1>
            </header>
            <InvestProjectForm project={project} />
        </main>
    );
}

export default InvestProject;
