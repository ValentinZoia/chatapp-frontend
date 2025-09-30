import type { IRoom } from "@/components/Sidebar/_components/ItemRoomList/ItemRoomList";

// Información de las salas
export const ROOM_INFO: Record<string, IRoom> = {
  general: {
    id: "general",
    image: "/escudos/general.png",
    name: "General",
    color: "bg-chart-1",
    description: "Chat general de fútbol argentino",
  },
  boca: {
    id: "boca",
    image: "/escudos/boca.png",
    name: "Boca Juniors",
    color: "bg-blue-600",
    description: "La mitad más uno",
  },
  river: {
    id: "river",
    image: "/escudos/river.png",
    name: "River Plate",
    color: "bg-red-600",
    description: "El más grande",
  },
  racing: {
    id: "racing",
    image: "/escudos/racing.png",
    name: "Racing Club",
    color: "bg-sky-500",
    description: "La Academia",
  },
  independiente: {
    id: "independiente",
    image: "/escudos/independiente.png",
    name: "Independiente",
    color: "bg-red-700",
    description: "Rey de Copas",
  },
  "san-lorenzo": {
    id: "san-lorenzo",
    image: "/escudos/san-lorenzo.png",
    name: "San Lorenzo",
    color: "bg-blue-800",
    description: "El Ciclón",
  },
};
