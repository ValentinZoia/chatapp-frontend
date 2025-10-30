
import { DocumentHead } from "@/components/DocumentHead";
import { HomeContent } from "@/components/Home/_components";
import { Image } from "@/components/Image";


const banner = {
  imageUrl: "/stadium-banner.png",
  title: "¡BIENVENIDO!",
  description: "Busca una sala y empezá a charlar con otros hinchas",
};

function Home() {

  return (
    <>
      <article>
        <DocumentHead
          title="Inicio"
          description="Página de Inicio de Futbol Chat"
        />
      </article>




      <div className="flex h-full flex-col overflow-hidden bg-muted mb-2">


        {/* Header */}
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

        {/* Content */}
        <HomeContent />

      </div>
    </>

  );
}
export default Home;
