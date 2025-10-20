import { SidebarHeader, SidebarTrigger } from "@/components/ui/sidebar";
import { MessageSquare } from "lucide-react";

function HomeSidebarHeader() {
  return (
    <SidebarHeader className="border-b border-sidebar-border">
      <div className="w-full flex items-center justify-between gap-3 px-2 py-2">
        <div className="flex gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <MessageSquare className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold leading-none text-sidebar-foreground">
              Fútbol Chat
            </h1>
            <p className="text-xs text-muted-foreground">Argentina</p>
          </div>
        </div>
        <SidebarTrigger />
      </div>
    </SidebarHeader>
  );
}
export default HomeSidebarHeader;
