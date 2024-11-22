import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type ProjectRepository from "@/models/ProjectRepository";
import MySQLProjectRepository from "@/services/repositories/MySQLProjectRepository";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Link from "next/link";

async function ProjectDetails({ params }: { params: { id: string } }) {
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

    return (
        <main className="flex gap-4 justify-center items-center h-full w-full py-12 lg:py-24 px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start max-w-5xl w-full">
                <Card className="flex flex-col gap-4 md:col-span-2 p-4 sm:p-8 w-full rounded-[28px]">
                    <CardHeader className="w-full">
                        <header>
                            <h1 className="text-3xl font-bold text-primary">
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
                            <p>
                                {format(project.startDate, "dd 'de' LLLL, y", {
                                    locale: es,
                                })}
                            </p>
                        </div>
                        <div className="flex flex-col">
                            <p className="font-bold text-sm">
                                Fecha de finalización estimada
                            </p>
                            <p>
                                {format(
                                    project.estimatedEndDate,
                                    "dd 'de' LLLL, y",
                                    {
                                        locale: es,
                                    },
                                )}
                            </p>
                        </div>
                        {project.description && (
                            <div className="sm:col-span-2">
                                <p className="text-base leading-relaxed">
                                    {project.description}
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
                <Card className="flex flex-col gap-4 p-2 w-full rounded-[28px]">
                    <CardHeader className="w-full pb-0">
                        <header>
                            <h2 className="text-xl font-bold">
                                Inversión actual
                            </h2>
                        </header>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                        <div className="flex flex-col gap-1">
                            <div className="flex w-full justify-between">
                                <p className="text-primary font-bold">
                                    {project.total}$
                                </p>
                                <p className="font-bold">
                                    {project.maxToInvest}$
                                </p>
                            </div>
                            <Progress
                                value={
                                    (project.total / project.maxToInvest) * 100
                                }
                            />
                        </div>
                        {project.total < project.maxToInvest ? (
                            <Button
                                className="w-full text-base font-bold"
                                size={"lg"}
                            >
                                <Link
                                    href={`/proyectos/invertir/${project.id}`}
                                >
                                    Invertir ahora
                                </Link>
                            </Button>
                        ) : (
                            <p className="text-destructive">
                                El proyecto ha llegado a su límite de inversión
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}

export default ProjectDetails;
