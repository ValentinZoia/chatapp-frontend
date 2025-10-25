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
        <MenuBar className="sticky bottom-0 z-40 flex w-full justify-center items-center gap-12 border-t border-muted bg-background text-blue-500  py-6 md:hidden" />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainLayout;
