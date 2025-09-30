import type { IRoom } from "@/components/Sidebar/_components/ItemRoomList/ItemRoomList";
import { RoomCardHeader, RoomCardContent } from "./_components";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

function RoomCard({ room }: { room: IRoom }) {
  return (
    <Link key={room.id} to={`/room/${room.id}`}>
      <Card className="group cursor-pointer border-border bg-card transition-all hover:border-primary hover:shadow-lg">
        <RoomCardHeader room={room} />
        <RoomCardContent room={room} />
      </Card>
    </Link>
  );
}
export default RoomCard;
