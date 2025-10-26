import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import { MenuBar } from "@/components/NavBar/_components";
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";


const MainLayout = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset>
        <NavBar />
        <Outlet />
        <Footer />
        <MenuBar />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainLayout;
