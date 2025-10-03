import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGeneralStore } from "@/stores/generalStore";
import { LoginForm } from "../LoginForm";
import { RegisterForm } from "../RegisterForm";

function LoginModal() {
  const isLoginModalOpen = useGeneralStore((state) => state.isLoginModalOpen);
  const toggleLoginModal = useGeneralStore((state) => state.toggleLoginModal);
  console.log("DESDE EL MODAL", isLoginModalOpen);
  console.log("me movi?", toggleLoginModal);

  return (
    <Dialog onOpenChange={toggleLoginModal} open={isLoginModalOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Bienvenido</DialogTitle>
          <DialogDescription>
            Iniciá sesión o creá una cuenta para acceder al chat
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
            <TabsTrigger value="register">Registrarse</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="mt-4">
            <LoginForm />
          </TabsContent>

          <TabsContent value="register" className="mt-4">
            <RegisterForm />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export default LoginModal;
