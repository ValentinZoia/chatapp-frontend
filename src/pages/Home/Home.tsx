import { Link } from "react-router-dom";
import { MessageSquare, Users, TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Rooms principales con información adicional
const FEATURED_ROOMS = [
  {
    id: "general",
    name: "General",
    description: "Hablá de todo el fútbol argentino",
    color: "bg-chart-1",
    members: 1247,
    active: 89,
  },
  {
    id: "boca",
    name: "Boca Juniors",
    description: "La mitad más uno",
    color: "bg-blue-600",
    members: 892,
    active: 67,
  },
  {
    id: "river",
    name: "River Plate",
    description: "El más grande",
    color: "bg-red-600",
    members: 856,
    active: 54,
  },
  {
    id: "racing",
    name: "Racing Club",
    description: "La Academia",
    color: "bg-sky-500",
    members: 423,
    active: 31,
  },
  {
    id: "independiente",
    name: "Independiente",
    description: "Rey de Copas",
    color: "bg-red-700",
    members: 398,
    active: 28,
  },
  {
    id: "san-lorenzo",
    name: "San Lorenzo",
    description: "El Ciclón",
    color: "bg-blue-800",
    members: 367,
    active: 24,
  },
];

function Home() {
  // const { loading, error, data } = useQuery<{ hello: string }>(GET_HELLO);
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error : {error.message}</p>;
  // console.log(data);
  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header */}
      <div className="border-b border-border bg-card px-8 py-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Bienvenido al Chat de Fútbol Argentino
          </h1>
          <p className="text-muted-foreground">
            Elegí una sala y empezá a charlar con otros hinchas
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Stats */}
          <div className="mb-8 grid gap-4 md:grid-cols-3">
            <Card className="border-border bg-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Salas
                </CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {FEATURED_ROOMS.length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Salas principales activas
                </p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Usuarios Activos
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {FEATURED_ROOMS.reduce((acc, room) => acc + room.active, 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Conectados ahora
                </p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Más Popular
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">General</div>
                <p className="text-xs text-muted-foreground">
                  {FEATURED_ROOMS[0].active} usuarios activos
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Rooms Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">
                Salas Disponibles
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {FEATURED_ROOMS.map((room) => (
                <Link key={room.id} to={`/room/${room.id}`}>
                  <Card className="group cursor-pointer border-border bg-card transition-all hover:border-primary hover:shadow-lg">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-12 w-12 items-center justify-center rounded-lg ${room.color}`}
                          >
                            <MessageSquare className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-lg group-hover:text-primary">
                              {room.name}
                            </CardTitle>
                            <CardDescription className="text-sm">
                              {room.description}
                            </CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{room.members}</span>
                          </div>
                          <Badge variant="secondary" className="gap-1">
                            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                            {room.active} activos
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
