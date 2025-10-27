import { Footer, NavBar, AppSidebar } from './_components'
import { MenuBar } from "./_components/NavBar/_components";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";


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
