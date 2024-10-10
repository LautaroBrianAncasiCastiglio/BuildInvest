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
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Link
                href="#"
                className="flex items-center gap-2 text-lg font-bold md:text-base leading-none"
            >
                BuildInvest
            </Link>
            <Link
                href="#"
                className="text-foreground transition-colors hover:text-foreground leading-none"
            >
                Dashboard
            </Link>
            <Link
                href="#"
                className="text-foreground transition-colors hover:text-foreground leading-none"
            >
                Orders
            </Link>
            <Link
                href="#"
                className="text-foreground transition-colors hover:text-foreground leading-none"
            >
                Products
            </Link>
            <Link
                href="#"
                className="text-foreground transition-colors hover:text-foreground leading-none"
            >
                Customers
            </Link>
            <Link
                href="#"
                className="text-foreground transition-colors hover:text-foreground leading-none"
            >
                Settings
            </Link>
        </nav>
    );
}

function ResponsiveHeaderNavigation() {
    return (
        <div className="flex justify-between items-center w-full md:hidden">
            <Link
                href="#"
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
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link
                            href="#"
                            className="flex items-center gap-2 text-lg font-semibold"
                        >
                            <span className="sr-only">Acme Inc</span>
                        </Link>
                        <Link
                            href="#"
                            className="text-foreground hover:text-foreground"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href="#"
                            className="text-foreground hover:text-foreground"
                        >
                            Orders
                        </Link>
                        <Link
                            href="#"
                            className="text-foreground hover:text-foreground"
                        >
                            Products
                        </Link>
                        <Link
                            href="#"
                            className="text-foreground hover:text-foreground"
                        >
                            Customers
                        </Link>
                        <Link href="#" className="hover:text-foreground">
                            Settings
                        </Link>
                    </nav>
                </SheetContent>
            </Sheet>
        </div>
    );
}
