import { HomeContent } from "@/components/Home/_components";
import { SidebarTrigger } from "@/components/ui/sidebar";

function Home() {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <SidebarTrigger />
      {/* Header */}
      <div className="border-b border-border bg-card px-8 py-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Bienvenido al Chat de Fútbol Argentino
          </h1>
          <p className="text-muted-foreground">
            Elegí una sala y empezá a charlar con otros hinchas
          </p>
        </div>
      </div>

      {/* Content */}
      <HomeContent />
    </div>
  );
}
export default Home;
