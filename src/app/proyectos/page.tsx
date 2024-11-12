import MySQLProjectRepository from "@/services/repositories/MySQLProjectRepository";

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
                    <ul className="flex flex-col gap-4 max-w-xl w-full">
                        {projects.map((project) => (
                            <li
                                key={project.architectId}
                                className="flex flex-col p-8 rounded-2xl w-full border border-border"
                            >
                                <article>
                                    <h3>{project.name}</h3>
                                    <p>
                                        {project.interestRate}% de interés anual
                                    </p>
                                    <p>
                                        Mínimo de inversión:{" "}
                                        {project.minAmountRequired}$
                                    </p>
                                    <p>
                                        Presupuesto total de: {project.total}$
                                    </p>
                                </article>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </main>
    );
}

export default ProjectsPage;