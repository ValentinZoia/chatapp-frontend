import { Link, useLoaderData } from "react-router-dom";
import { ArrowLeft, Users, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Información de las salas
const ROOM_INFO: Record<
  string,
  { name: string; color: string; description: string }
> = {
  general: {
    name: "General",
    color: "bg-chart-1",
    description: "Chat general de fútbol argentino",
  },
  boca: {
    name: "Boca Juniors",
    color: "bg-blue-600",
    description: "La mitad más uno",
  },
  river: {
    name: "River Plate",
    color: "bg-red-600",
    description: "El más grande",
  },
  racing: {
    name: "Racing Club",
    color: "bg-sky-500",
    description: "La Academia",
  },
  independiente: {
    name: "Independiente",
    color: "bg-red-700",
    description: "Rey de Copas",
  },
  "san-lorenzo": {
    name: "San Lorenzo",
    color: "bg-blue-800",
    description: "El Ciclón",
  },
};

// Mensajes de ejemplo (placeholder - el usuario implementará la lógica real)
const EXAMPLE_MESSAGES = [
  {
    id: "1",
    username: "JuanHincha",
    message: "Qué partidazo el de ayer!",
    timestamp: "10:30",
    isOwn: false,
  },
  {
    id: "2",
    username: "MariaFutbol",
    message: "Increíble el gol del minuto 90",
    timestamp: "10:32",
    isOwn: false,
  },
  {
    id: "3",
    username: "Tu",
    message: "No lo puedo creer todavía",
    timestamp: "10:33",
    isOwn: true,
  },
];

function ChatRoomPage() {
  const { roomId } = useLoaderData() as {
    roomId: string;
  };
  if (!roomId) {
    throw new Response("Invalid room ID", { status: 400 });
  }
  console.log(roomId);
  const roomInfo = roomId ? ROOM_INFO[roomId] : null;
  if (!roomInfo) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">
            Sala no encontrada
          </h2>
          <p className="mt-2 text-muted-foreground">
            La sala que buscás no existe
          </p>
          <Link to="/">
            <Button className="mt-4">Volver al inicio</Button>
          </Link>
        </div>
      </div>
    );
  }
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    // El usuario implementará la lógica de envío
    console.log("[v0] Send message - User will implement this");
  };
  return (
    <div className="flex h-full flex-col">
      {/* Room Header */}
      <div className="flex items-center justify-between border-b border-border bg-card px-6 py-4">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div
              className={`h-10 w-10 rounded-lg ${roomInfo.color} flex items-center justify-center`}
            >
              <span className="text-lg font-bold text-white">
                {roomInfo.name.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">
                {roomInfo.name}
              </h1>
              <p className="text-sm text-muted-foreground">
                {roomInfo.description}
              </p>
            </div>
          </div>
        </div>
        <Badge variant="secondary" className="gap-2">
          <Users className="h-4 w-4" />
          <span>89 en línea</span>
        </Badge>
      </div>

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-6">
        <div className="space-y-4">
          {EXAMPLE_MESSAGES.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${
                msg.isOwn ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <Avatar className="h-9 w-9 shrink-0">
                <AvatarFallback
                  className={
                    msg.isOwn
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }
                >
                  {msg.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div
                className={`flex flex-col gap-1 ${
                  msg.isOwn ? "items-end" : "items-start"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">
                    {msg.username}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {msg.timestamp}
                  </span>
                </div>
                <div
                  className={`rounded-lg px-4 py-2 ${
                    msg.isOwn
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Message Input */}
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
    </div>
  );
}
export default ChatRoomPage;
