import { Progress } from "@/components/ui/progress";
import type Project from "@/models/Project";
import MySQLProjectRepository from "@/services/repositories/MySQLProjectRepository";
import Link from "next/link";

async function ProjectsPage() {
    const projectRepository = new MySQLProjectRepository();
    const projects = await projectRepository.findAll();

    return (
        <main className="flex gap-4 justify-center items-center h-full w-full py-12 lg:py-24">
            <div className="flex flex-col items-center w-full space-y-10">
                <header className="max-w-sm flex flex-col gap-2 text-center">
                    <h1 className="text-3xl font-bold">Proyectos</h1>
                </header>
                {projects.length < 1 ? (
                    <p>No hay proyectos creados.</p>
                ) : (
                    <ul className="flex flex-col gap-4 max-w-2xl w-full">
                        {projects.map((project) => (
                            <ProjectCard key={project.id} {...project} />
                        ))}
                    </ul>
                )}
            </div>
        </main>
    );
}

function ProjectCard(project: Project) {
    return (
        <li
            key={project.architectId}
            className="flex flex-col p-8 rounded-2xl w-full border border-border"
        >
            <Link href={`/proyectos/detalles/${project.id}`}>
                <article className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <h3 className="text-2xl font-bold self-center">
                        {project.name}
                    </h3>
                    <div className="flex flex-col items-end gap-1 self-center justify-self-end">
                        <p className="text-lg text-primary">
                            {project.interestRate}% de interés anual
                        </p>
                        <p className="text-muted-foreground">
                            Mínimo de inversión: {project.minAmountRequired}$
                        </p>
                    </div>
                    <div className="flex flex-col gap-1 col-span-2 pt-3">
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
            </Link>
        </li>
    );
}

export default ProjectsPage;
