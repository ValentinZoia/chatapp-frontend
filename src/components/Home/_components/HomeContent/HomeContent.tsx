import { FEATURED_ROOMS } from "@/data/featured-rooms";
import { RoomsBox } from "../RoomsBox";
import { Suspense } from "react";
import { UserRoomBox } from "../UserRoomsBox";

function HomeContent() {
  return (
    <div className="flex-1 overflow-y-auto ">
      <div className="p-4 flex flex-col gap-8">
        {/* Public Rooms Grid */}
        <RoomsBox rooms={FEATURED_ROOMS} title="Salas Principales" />

        {/* User Private Rooms Grid */}
        <Suspense fallback={<>Cargando...</>}>
          <UserRoomBox />
        </Suspense>
      </div>
    </div>
  );
}
export default HomeContent;
