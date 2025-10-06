import { ChatroomAccess } from "@/gql/graphql";
// Rooms principales con información adicional
export const FEATURED_ROOMS = [
  {
    id: 1,
    name: "General",
    description: "Hablá de todo el fútbol argentino",
    colorHex: "#F97316",
    members: 1247,
    access: ChatroomAccess.Public,
    active: 89,
  },
  {
    id: 2,
    name: "Boca Juniors",
    description: "La mitad más uno",
    colorHex: "#2563EB",
    access: ChatroomAccess.Public,
    members: 892,
    active: 67,
  },
  {
    id: 3,
    name: "River Plate",
    description: "El más grande",
    colorHex: "#DC2626",
    access: ChatroomAccess.Public,
    members: 856,
    active: 54,
  },
  {
    id: 4,
    name: "Independiente",
    description: "Rey de Copas",
    colorHex: "#B91C1C",
    access: ChatroomAccess.Public,
    members: 398,
    active: 28,
  },
  {
    id: 5,
    name: "Racing Club",
    description: "La Academia",
    colorHex: "#0EA5E9",
    access: ChatroomAccess.Public,
    members: 423,
    active: 31,
  },

  {
    id: 6,
    name: "San Lorenzo",
    description: "El Ciclón",
    colorHex: "#1E40AF",
    access: ChatroomAccess.Public,
    members: 367,
    active: 24,
  },
];
