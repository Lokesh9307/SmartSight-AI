// src/components/layout/app-sidebar.tsx
import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { BuildingSelector } from "@/components/common/building-selector"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LogOut, Settings, BarChart3 } from "lucide-react"

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <BarChart3 className="h-7 w-7 text-primary" />
      <h2 className="text-lg font-bold tracking-tight">
        SmartSight AI
      </h2>
    </div>
  )
}

export function AppSidebar() {
  return (
    <>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Building</SidebarGroupLabel>
          <BuildingSelector />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="mt-auto">
        <SidebarSeparator />
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">John Doe</span>
          </div>
          <Button variant="ghost" size="icon">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </>
  )
}
