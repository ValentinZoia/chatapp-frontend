import { FEATURED_ROOMS } from "@/data/featured-rooms";
import { RoomCard } from "../RoomCard";
import { RoomCardContent, RoomCardHeader } from "../RoomCard/_components";

function RoomsCardList() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {FEATURED_ROOMS.map((room) => (
        <RoomCard key={room.id} roomId={room.id}>
          <RoomCardHeader room={room} />
          <RoomCardContent room={room} />
        </RoomCard>
      ))}
    </div>
  );
}
export default RoomsCardList;
