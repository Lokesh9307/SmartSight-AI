"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LayoutDashboard, MessageSquare, Lightbulb, FileText, BarChart2 } from "lucide-react"

import { LiveTelemetry } from "./live-telemetry"
import { RagChat } from "./rag-chat"
import { Recommendations } from "./recommendations"
import { Documents } from "./documents"
import { Evaluation } from "./evaluation"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function MainDashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="md:hidden" />
          <h1 className="text-3xl font-bold tracking-tight">SmartSight AI Dashboard</h1>
        </div>
      </div>
      <Tabs defaultValue="telemetry" className="space-y-4">
        <ScrollArea>
          <TabsList>
            <TabsTrigger value="telemetry"><LayoutDashboard className="mr-2 h-4 w-4" />Live Telemetry</TabsTrigger>
            <TabsTrigger value="rag-chat"><MessageSquare className="mr-2 h-4 w-4" />RAG Chat</TabsTrigger>
            <TabsTrigger value="recommendations"><Lightbulb className="mr-2 h-4 w-4" />Recommendations</TabsTrigger>
            <TabsTrigger value="documents"><FileText className="mr-2 h-4 w-4" />Documents</TabsTrigger>
            <TabsTrigger value="evaluation"><BarChart2 className="mr-2 h-4 w-4" />Evaluation</TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <TabsContent value="telemetry" className="space-y-4">
          <LiveTelemetry />
        </TabsContent>
        <TabsContent value="rag-chat" className="space-y-4">
          <RagChat />
        </TabsContent>
        <TabsContent value="recommendations" className="space-y-4">
          <Recommendations />
        </TabsContent>
        <TabsContent value="documents" className="space-y-4">
          <Documents />
        </TabsContent>
        <TabsContent value="evaluation" className="space-y-4">
          <Evaluation />
        </TabsContent>
      </Tabs>
    </div>
  )
}
