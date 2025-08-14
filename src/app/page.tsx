import { AppSidebar } from '@/components/layout/app-sidebar';
import { MainDashboard } from '@/components/dashboard/main-dashboard';
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
} from '@/components/ui/sidebar';

export default function Home() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar>
          <AppSidebar />
        </Sidebar>
        <SidebarInset>
          <MainDashboard />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
