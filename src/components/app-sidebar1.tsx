import * as React from "react"
import { MessagesSquare } from 'lucide-react';

import {
  AudioWaveform,
  UserPlus ,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  ThumbsUp ,
} from "lucide-react"

import { NavMain } from "./nav-main"
import { NavProjects } from "./nav-projects"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Dashboard",
      logo: GalleryVerticalEnd,
      plan: "Counselor",
    },
  ],
  navMain: [
    {
      title: "Chat",
      url: "#",
      icon: MessagesSquare,
      isActive: true,
      items: [
        {
          title: "AI Chatbot",
          url: "/chatbot",
        },
        {
          title: "Normal",
          url: "/chatconfirm",
        },
      ],
    },
    
  ],
  projects: [
    {
      name: "Appointments",
      url: "/appointmentC",
      icon: Frame,
    },
    {
      name: "Forum",
      url: "/forumconfirm",
      icon: PieChart,
    },
    {
      name: "Feedback",
      url: "/feedback",
      icon: Map,
    },
  ],
}
//{
//  name: "Student Profiles",
//  url: "/profile",
//  icon: Bot,
//},
export function AppSidebar1({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
