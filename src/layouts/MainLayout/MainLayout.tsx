import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";


const MainLayout = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset>

        <Outlet />

      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainLayout;
