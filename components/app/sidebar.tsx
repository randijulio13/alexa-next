import React from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar";

const AppSidebar = () => {
    return (
        <Sidebar>
            <SidebarHeader>
                <h4 className="m-0 font-cursive text-4xl text-center py-4">Alexa</h4>
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
