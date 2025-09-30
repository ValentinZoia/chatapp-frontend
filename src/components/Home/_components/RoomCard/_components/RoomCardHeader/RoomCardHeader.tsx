import type { IRoom } from "@/components/Sidebar/_components/ItemRoomList/ItemRoomList";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field } from "../Field";

function RoomCardHeader({ room }: { room: IRoom }) {
  return (
    <CardHeader>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Field room={room} />
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
  );
}
export default RoomCardHeader;
