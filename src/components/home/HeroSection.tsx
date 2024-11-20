import { Button } from "@/components/ui/button";
import Link from "next/link";

function HeroSection() {
    return (
        <section className="relative flex flex-col items-center w-full bg-zinc-800">
            <div className="max-w-4xl flex flex-col gap-4 items-start w-full py-24 lg:py-32 xl:py-40 px-4">
                <h1 className="text-3xl text-white max-w-md font-bold tracking-tighter sm:text-4xl text-foreground text-balance">
                    Comenzá a invertir en proyectos inmobiliarios con sumas
                    pequeñas
                </h1>
                <Button size={"lg"} asChild className="font-bold">
                    <Link href="/proyectos">Ver proyectos</Link>
                </Button>
            </div>
        </section>
    );
}

export default HeroSection;
