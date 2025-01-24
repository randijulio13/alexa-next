import React from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar";
import Link from "next/link";

const AppSidebar = () => {
    return (
        <Sidebar>
            <SidebarHeader>
                <Link href="/" className="m-0 font-cursive text-4xl text-center py-4 tracking-wide">
                Alexa
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup />
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    );
};

export default AppSidebar;
