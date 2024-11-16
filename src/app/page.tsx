import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
    title: "BuildInvest",
    description:
        "Comenzá a invertir en proyectos inmobiliarios sin complicaciones técnicas, no necesitás una gran suma de dinero.",
};

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex flex-col items-center">
                <section className="flex flex-col items-center space-y-8 text-center w-full py-12 md:py-24 lg:py-32 xl:py-48 px-4">
                    <div className="space-y-8">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">
                            Inversiones fáciles
                        </h1>
                        <p className="mx-auto max-w-[700px] text-foreground/90 text-balance md:text-lg">
                            Comenzá a invertir en proyectos inmobiliarios sin
                            complicaciones técnicas, no necesitás una gran suma
                            de dinero.
                        </p>
                    </div>
                    <div className="space-x-4">
                        <Button size={"lg"} asChild>
                            <Link href="/proyectos">Invertir ahora</Link>
                        </Button>
                    </div>
                </section>
            </main>
        </div>
    );
}
