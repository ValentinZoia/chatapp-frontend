import { FEATURED_ROOMS } from "@/data/featured-rooms";
import { RoomCard } from "../RoomCard";

function RoomsCardList() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {FEATURED_ROOMS.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
}
export default RoomsCardList;
