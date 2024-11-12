import LogoutButton from "@/components/header/LogoutButton";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetClose,
} from "@/components/ui/sheet";
import Link from "next/link";
import { LuMenu } from "react-icons/lu";

export default function ArchitectHeader() {
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
                    href="/proyectos"
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
                <Button asChild>
                    <Link href="/proyectos/nuevo">Nuevo proyecto</Link>
                </Button>
                <LogoutButton />
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
                        <span className="sr-only">
                            Abrir menú de navegación
                        </span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right">
                    <SheetHeader>
                        <SheetTitle>BuildInvest</SheetTitle>
                        <SheetDescription>Menu de navegación</SheetDescription>
                    </SheetHeader>
                    <div className="flex flex-col justify-end h-full gap-4 py-16 text-base font-medium">
                        <SheetClose asChild>
                            <Link
                                href="/proyectos"
                                className="text-foreground hover:text-foreground py-1"
                            >
                                Proyectos
                            </Link>
                        </SheetClose>
                        <SheetClose asChild>
                            <Link
                                href="#"
                                className="text-foreground hover:text-foreground py-1"
                            >
                                Sobre nosotros
                            </Link>
                        </SheetClose>
                        <SheetClose asChild>
                            <Link
                                href="#"
                                className="text-foreground hover:text-foreground py-1"
                            >
                                Preguntas frecuentes
                            </Link>
                        </SheetClose>
                        <SheetClose asChild>
                            <Button asChild>
                                <Link href="/proyectos/nuevo">
                                    Nuevo proyecto
                                </Link>
                            </Button>
                        </SheetClose>
                        <SheetClose asChild>
                            <LogoutButton className="w-full" />
                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>
        </nav>
    );
}
