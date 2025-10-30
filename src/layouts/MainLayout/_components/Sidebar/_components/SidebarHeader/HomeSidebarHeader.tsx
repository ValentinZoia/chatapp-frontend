import { SidebarHeader } from "@/components/ui/sidebar";


function HomeSidebarHeader() {
  return (
    <SidebarHeader className="border-b border-sidebar-border">
      <div className="w-full flex items-center justify-between gap-3 px-2 py-2">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg">
            <img
              src="/icon0.svg"
              alt="logo"
              className="aspect-auto object-cover"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold leading-none text-sidebar-foreground">
              Futbol Chat
            </h1>
            <p className="text-xs text-muted-foreground">Argentina</p>
          </div>
        </div>

      </div>
    </SidebarHeader>
  );
}
export default HomeSidebarHeader;
