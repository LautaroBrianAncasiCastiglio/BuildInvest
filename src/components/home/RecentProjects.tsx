import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

function RecentProjects() {
    return (
        <section className="relative flex flex-col items-center w-full bg-zinc-50">
            <div className="max-w-4xl flex flex-col gap-12 items-start w-full py-24 lg:py-30 px-4">
                <h2 className="w-full text-center text-2xl md:text-3xl font-bold">
                    Proyectos recientes
                </h2>
                <Card className="w-full flex flex-col md:flex-row gap-10 border-transparent rounded-[24px] bg-background p-6 sm:p-12">
                    <ProjectCard />
                    <ProjectCard />
                </Card>
            </div>
        </section>
    );
}

function ProjectCard() {
    return (
        <Link href="#" className="w-full">
            <article className="flex flex-col w-full gap-4">
                <Skeleton className="w-full aspect-[4/3] rounded-2xl" />
                <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-bold">Proyecto de ejemplo</h3>
                    <p className="text-muted-foreground">Proyecto de ejemplo</p>
                </div>
            </article>
        </Link>
    );
}

export default RecentProjects;
