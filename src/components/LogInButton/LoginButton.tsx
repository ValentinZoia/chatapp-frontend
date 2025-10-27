import { LogIn } from 'lucide-react'
import { useGeneralStore } from '@/stores/generalStore'
export default function LoginButton() {
  const openLoginModal = useGeneralStore((state) => state.toggleLoginModal)

  return (
    <button className="w-fit md:w-full flex flex-col md:flex-row items-center md:justify-start cursor-pointer md:gap-3 md:border-1 md:p-1 md:rounded-md md:border-dashed bg-transparent hover:text-foreground transition-colors" aria-label="Perfil de usuario"
      onClick={openLoginModal}
    >

      <LogIn className="h-6 w-6" aria-hidden="true" />
      <span className="text-xs md:text-sm md:mt-0 mt-1">Iniciar Sesión</span>
    </button>
  )
}


