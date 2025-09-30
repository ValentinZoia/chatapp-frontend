import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useGeneralStore } from "@/stores/generalStore";

function LoginModal() {
  const isLoginModalOpen = useGeneralStore((state) => state.isLoginModalOpen);
  const toggleLoginModal = useGeneralStore((state) => state.toggleLoginModal);
  console.log(isLoginModalOpen, toggleLoginModal);
  return (
    <Dialog onOpenChange={toggleLoginModal} open={isLoginModalOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Iniciar Sesión</DialogTitle>
          <DialogDescription>
            Ingresá a tu cuenta para acceder al chat
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center py-8">
          <div className="rounded-lg border border-dashed border-border bg-muted p-8 text-center">
            <p className="text-sm text-muted-foreground">
              El usuario implementará el formulario de login aquí
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Este es un placeholder para el diseño del modal
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default LoginModal;
