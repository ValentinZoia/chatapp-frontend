

function Footer() {
  return (
    <footer className="bg-card border-t border-white/10">
      <div className="container mx-auto px-4 py-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">

        {/* Sobre Nosotros */}
        <div className="max-w-md space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Sobre Nosotros
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Futbol Chat es una aplicación de chat en tiempo real donde los hinchas del fútbol argentino pueden conversar en distintas salas.
            Creado como proyecto personal por Valentin Zoia.
          </p>
        </div>

        {/* Contacto */}
        <div className="text-sm text-muted-foreground space-y-1 sm:text-right">
          <p>valentinzoia@gmail.com</p>
          <a
            href="https://github.com/ValentinZoia"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Sígueme en GitHub →
          </a>
        </div>
      </div>

      <div className="border-t border-white/10 mt-8 pt-6 text-center text-sm text-muted-foreground">
        © 2025 Futbol Chat — Todos los derechos reservados.
      </div>
    </footer>
  )

}
export default Footer
