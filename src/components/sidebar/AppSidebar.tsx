import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarGroup,
    SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { FaUser } from "react-icons/fa";

function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>
                <p className="p-2 w-full font-bold text-lg">BuildInvest</p>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup />
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant={"outline"}
                            className="flex justify-start items-center gap-4 py-3 h-fit"
                        >
                            <FaUser size={20} />
                            <p className="text-base !leading-none">Mi cuenta</p>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem className="bg-destructive/10 text-destructive">
                            <p>Cerrar sesión</p>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarFooter>
        </Sidebar>
    );
}

export default AppSidebar;
