import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type Project from "@/models/Project";
import MySQLProjectRepository from "@/services/repositories/MySQLProjectRepository";
import Link from "next/link";
import { Suspense } from "react";

function RecentProjects() {
    return (
        <section className="relative flex flex-col items-center w-full bg-zinc-50">
            <div className="max-w-4xl flex flex-col gap-12 items-start w-full py-24 lg:py-30 px-4">
                <h2 className="w-full text-center text-2xl md:text-3xl font-bold">
                    Proyectos recientes
                </h2>
                <Suspense fallback={<ProjectsSkeleton />}>
                    <Projects />
                </Suspense>
            </div>
        </section>
    );
}

async function Projects() {
    const projectRepository = new MySQLProjectRepository();
    const [firstProject, secondProject] = await projectRepository.findLimited(
        2,
    );

    return (
        <Card className="w-full flex flex-col md:flex-row gap-10 border-transparent rounded-[24px] bg-background p-6 sm:p-12">
            {firstProject ? (
                <ProjectCard project={firstProject} />
            ) : (
                <ProjectCardSkeleton />
            )}
            {secondProject ? (
                <ProjectCard project={secondProject} />
            ) : (
                <ProjectCardSkeleton />
            )}
        </Card>
    );
}

function ProjectsSkeleton() {
    return (
        <Card className="w-full flex flex-col md:flex-row gap-10 border-transparent rounded-[24px] bg-background p-6 sm:p-12">
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
        </Card>
    );
}

function ProjectCard(props: { project: Project }) {
    const { project } = props;
    return (
        <Link href={`/proyectos/detalles/${project.id}`} className="w-full">
            <article className="flex flex-col w-full gap-4">
                <Skeleton className="w-full aspect-[4/3] rounded-2xl" />
                <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-bold">{project.name}</h3>
                    <p className="text-muted-foreground line-clamp-2">
                        {project.description}
                    </p>
                </div>
            </article>
        </Link>
    );
}

function ProjectCardSkeleton() {
    return (
        <Link href="#" className="w-full">
            <article className="flex flex-col w-full gap-4">
                <Skeleton className="w-full aspect-[4/3] rounded-2xl" />
                <div className="flex flex-col gap-1">
                    <Skeleton className="w-[200px] h-4"></Skeleton>
                    <Skeleton className="w-full h-4"></Skeleton>
                    <Skeleton className="w-[250px] h-4"></Skeleton>
                </div>
            </article>
        </Link>
    );
}

export default RecentProjects;
