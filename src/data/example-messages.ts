import type { IMessage } from "@/components/ChatRoom/_components/Message/Message";

// Mensajes de ejemplo (placeholder - el usuario implementará la lógica real)
export const EXAMPLE_MESSAGES: IMessage[] = [
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
