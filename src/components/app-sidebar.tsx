"use client";

import * as React from "react";
import { Bot, Cross, SquareTerminal } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { SidebarLogo } from "@/components/sidebar-head";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Hanan",
    email: "hananbaig22@gmail.com",
  },
  header: {
    name: "IDC Pvt Ltd",
    logo: Cross,
    plan: "Islamabad, Pakistan",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/dashboard",
          icon: SquareTerminal,
        },
        {
          title: "Users",
          url: "/dashboard/users",
        },
        {
          title: "Permissions",
          isActive: true,
          url: "/dashboard/permissions",
        },
        {
          title: "Roles",
          url: "/dashboard/roles",
        },
      ],
    },
    {
      title: "Configuration",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Vendor",
          url: "/vendor",
        },
        {
          title: "Authority",
          url: "/authority",
        },
        {
          title: "Location",
          url: "/location",
        },
      ],
    },
    {
      title: "Service Payment Order",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Generate SPO",
          url: "/generatespo",
        },
        {
          title: "Receive SPO",
          url: "/receivespo",
        },
        {
          title: "Received SPO",
          url: "receivedspo",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarLogo header={data.header} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
