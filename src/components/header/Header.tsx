import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import Link from "next/link";
import { LuMenu } from "react-icons/lu";

export default function Header() {
    return (
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <HeaderNavigation />
            <ResponsiveHeaderNavigation />
        </header>
    );
}

function HeaderNavigation() {
    return (
        <nav className="hidden md:flex justify-between items-center w-full">
            <div className="flex gap-6 text-lg font-medium md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-lg font-bold md:text-base leading-none"
                >
                    BuildInvest
                </Link>
                <Link
                    href="#"
                    className="text-foreground transition-colors hover:text-foreground leading-none"
                >
                    Proyectos
                </Link>
                <Link
                    href="#"
                    className="text-foreground transition-colors hover:text-foreground leading-none"
                >
                    Sobre nosotros
                </Link>
                <Link
                    href="#"
                    className="text-foreground transition-colors hover:text-foreground leading-none"
                >
                    Preguntas frecuentes
                </Link>
            </div>
            <div className="flex gap-4">
                <Button asChild variant={"outline"}>
                    <Link href="/iniciar-sesion">Iniciar sesión</Link>
                </Button>
                <Button asChild>
                    <Link href="/crear-cuenta">Crear cuenta</Link>
                </Button>
            </div>
        </nav>
    );
}

function ResponsiveHeaderNavigation() {
    return (
        <nav className="flex justify-between items-center w-full md:hidden">
            <Link
                href="/"
                className="flex items-center gap-2 text-base font-bold md:text-base leading-none"
            >
                BuildInvest
            </Link>
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <LuMenu size={18} />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right">
                    <div className="grid gap-6 text-lg font-medium">
                        <Link
                            href="#"
                            className="text-foreground hover:text-foreground"
                        >
                            Proyectos
                        </Link>
                        <Link
                            href="#"
                            className="text-foreground hover:text-foreground"
                        >
                            Sobre nosotros
                        </Link>
                        <Link
                            href="#"
                            className="text-foreground hover:text-foreground"
                        >
                            Preguntas frecuentes
                        </Link>
                        <div className="flex flex-col mt-4 gap-4">
                            <Button asChild variant={"outline"}>
                                <Link href="/iniciar-sesion">
                                    Iniciar sesión
                                </Link>
                            </Button>
                            <Button asChild>
                                <Link href="/crear-cuenta">Crear cuenta</Link>
                            </Button>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </nav>
    );
}
