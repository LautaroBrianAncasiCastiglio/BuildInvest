import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
            <div className="flex flex-col items-center max-w-3xl w-full space-y-10">
                <Card className="flex flex-col gap-4 p-8 w-full rounded-[28px]">
                    <CardHeader className="w-full">
                        <header>
                            <h1 className="text-3xl font-bold">
                                {project?.name}
                            </h1>
                        </header>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="flex flex-col">
                            <p className="font-bold text-sm">
                                Tasa de interés anual
                            </p>
                            <p>{project.interestRate}%</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="font-bold text-sm">
                                Monto mínimo para invertir
                            </p>
                            <p>{project.minAmountRequired}$</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="font-bold text-sm">Fecha de inicio</p>
                            <p>{project.startDate.toLocaleDateString()}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="font-bold text-sm">
                                Fecha de finalización estimada
                            </p>
                            <p>
                                {project.estimatedEndDate.toLocaleDateString()}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}

export default ProjectDetails;
