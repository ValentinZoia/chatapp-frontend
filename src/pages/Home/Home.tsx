import { Footer } from "@/components/Footer";
import { HomeContent } from "@/components/Home/_components";
import { Image } from "@/components/Image";
import { NavBar } from "@/components/NavBar";
import { MenuBar } from "@/components/NavBar/_components/MenuBar";

const banner = {
  imageUrl: "/stadium-banner.png",
  title: "¡BIENVENIDO!",
  description: "Busca una sala y empezá a charlar con otros hinchas",
};

function Home() {

  return (
    <>

      <NavBar />

      <div className="flex h-full flex-col overflow-hidden bg-muted mb-2">
        <div className="relative w-full overflow-hidden">
          <Image
            src={banner.imageUrl || "/placeholder.svg"}
            alt={banner.title || "Banner"}
            className="object-cover"
            aspectRatio={16 / 5}
            lazy={true}
            placeholderSrc="https://placehold.co/1000x500"
            errorSrc="https://placehold.co/1000x500"
          />
          {banner.title && (
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex flex-col justify-center p-10 lg:p-14">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">
                {banner.title}
              </h2>
              <p className="text-white/90 text-lg md:text-xl mb-6 max-w-md">
                {banner.description}
              </p>
            </div>
          )}
        </div>

        {/* <SidebarTrigger /> */}
        {/* Header */}
        {/* <div className="border-b border-border bg-card px-8 py-6">
        <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Bienvenido al Chat de Fútbol Argentino
        </h1>
        <p className="text-muted-foreground">
        Elegí una sala y empezá a charlar con otros hinchas
        </p>
        </div>
        </div> */}

        {/* Content */}
        <HomeContent />
        <Footer />
      </div>
      <MenuBar className="sticky bottom-0 z-40 flex w-full justify-center items-center gap-12 border-t border-muted bg-background text-blue-500  py-6 md:hidden" />
    </>
  );
}
export default Home;
