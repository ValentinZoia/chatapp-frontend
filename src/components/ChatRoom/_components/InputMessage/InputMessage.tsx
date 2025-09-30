import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

function InputMessage() {
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    // El usuario implementará la lógica de envío
    console.log("[v0] Send message - User will implement this");
  };
  return (
    <div className="border-t border-border bg-card p-4">
      <form onSubmit={handleSendMessage} className="flex gap-2">
        <Input
          placeholder="Escribí tu mensaje..."
          className="flex-1 bg-background"
        />
        <Button type="submit" size="icon" className="h-10 w-10 shrink-0">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
export default InputMessage;
