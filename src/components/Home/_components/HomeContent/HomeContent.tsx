import { GenericStatsCard } from "@/components/GenericStatsCard";
import { FEATURED_ROOMS } from "@/data/featured-rooms";
import { RoomsBox } from "../RoomsBox";

function HomeContent() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-8">
        {/* Stats */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <GenericStatsCard
            title="Total Salas"
            p="Salas principales activas"
            numericData={FEATURED_ROOMS.length}
          />
          <GenericStatsCard
            title="Usuarios Activos"
            p="Conectados ahora"
            numericData={FEATURED_ROOMS.reduce(
              (acc, room) => acc + room.active,
              0
            )}
          />
          <GenericStatsCard
            title="Más Popular"
            p={`${FEATURED_ROOMS[0].active} usuarios activos`}
            numericData="General"
          />
        </div>

        {/* Rooms Grid */}
        <RoomsBox />
      </div>
    </div>
  );
}
export default HomeContent;
