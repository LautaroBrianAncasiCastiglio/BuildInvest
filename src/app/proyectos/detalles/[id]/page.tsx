import { Button } from "@/components/ui/button";
import type ProjectRepository from "@/models/ProjectRepository";
import MySQLProjectRepository from "@/services/repositories/MySQLProjectRepository";
import Link from "next/link";

async function ProjectDetails({ params }: { params: { id: string } }) {
    const projectRepository: ProjectRepository = new MySQLProjectRepository();
    const project = await projectRepository.findOne(Number(params.id));

    if (!project)
        return (
            <main className="flex gap-4 justify-center items-center h-full w-full py-12 lg:py-24">
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

    return (
        <main className="flex gap-4 justify-center items-center h-full w-full py-12 lg:py-24">
            <div className="flex flex-col items-center w-full space-y-10">
                <header className="max-w-sm flex flex-col gap-2 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold">
                        {project?.name}
                    </h1>
                </header>
                <ul className="flex flex-col gap-2 text-center">
                    <li>
                        <strong>Tasa de interés anual:</strong>{" "}
                        {project?.interestRate}%
                    </li>
                    <li>
                        <strong>Monto mínimo para invertir:</strong>{" "}
                        {project?.minAmountRequired}$
                    </li>
                    <li>
                        <strong>Monto máximo para invertir:</strong>{" "}
                        {project?.maxToInvest}$
                    </li>
                    <li>
                        <strong>Total del proyecto:</strong> {project?.total}$
                    </li>
                    <li>
                        <strong>Fecha de inicio:</strong>{" "}
                        {project?.startDate.toLocaleDateString()}
                    </li>
                    <li>
                        <strong>Fecha de fin estimada:</strong>{" "}
                        {project?.estimatedEndDate.toLocaleDateString()}
                    </li>
                </ul>
            </div>
        </main>
    );
}

export default ProjectDetails;
