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
import { FaUser } from "react-icons/fa";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { logoutUser } from "@/services/actions/logoutUser";

export default function InvestorHeader() {
    return (
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-[999]">
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
                    href="/sobre-nosotros"
                    className="text-foreground transition-colors hover:text-foreground leading-none"
                >
                    Sobre nosotros
                </Link>
                <Link
                    href="/preguntas-frecuentes"
                    className="text-foreground transition-colors hover:text-foreground leading-none"
                >
                    Preguntas frecuentes
                </Link>
            </div>
            <div className="flex gap-4">
                <AccountButton />
            </div>
        </nav>
    );
}

function AccountButton() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" variant={"outline"}>
                    <FaUser size={20} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-[99999]">
                <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/inversiones">
                    <DropdownMenuItem>Mis inversiones</DropdownMenuItem>
                </Link>
                <Link href="/arquitecto/nuevo">
                    <DropdownMenuItem>
                        Registrarme como arquitecto
                    </DropdownMenuItem>
                </Link>
                <form action={logoutUser}>
                    <button type="submit" className="w-full h-full">
                        <DropdownMenuItem className="bg-destructive/10 text-destructive">
                            Cerrar sesión
                        </DropdownMenuItem>
                    </button>
                </form>
            </DropdownMenuContent>
        </DropdownMenu>
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
                <SheetContent side="right" className="z-[9999]">
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
                            <ResponsiveAccountButton />
                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>
        </nav>
    );
}

function ResponsiveAccountButton() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    className="w-full flex gap-2 justify-start text-base py-3"
                    size={"lg"}
                    variant={"outline"}
                >
                    <FaUser size={16} />
                    Mi cuenta
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-[99999]">
                <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/inversiones">
                    <DropdownMenuItem>Mis inversiones</DropdownMenuItem>
                </Link>
                <Link href="/arquitecto/nuevo">
                    <DropdownMenuItem>
                        Registrarme como arquitecto
                    </DropdownMenuItem>
                </Link>
                <form action={logoutUser}>
                    <button type="submit" className="w-full h-full">
                        <DropdownMenuItem className="bg-destructive/10 text-destructive">
                            Cerrar sesión
                        </DropdownMenuItem>
                    </button>
                </form>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
