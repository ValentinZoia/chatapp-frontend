import { Lazy } from "@/components/Lazy";
import { RoomCard } from "../RoomCard";
import {
  Field,
  RoomCardContent,
  RoomCardHeader,
} from "../RoomCard/_components";
import type { GetChatroomsForUserQuery } from "@/gql/graphql";

interface RoomsCardListProps {
  rooms: GetChatroomsForUserQuery["getChatroomsForUser"];
}

function RoomsCardList({ rooms }: RoomsCardListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {rooms.map((room) => (
        <Lazy
          key={room.id}
          placeholder={<div></div>} /* ajustá a tu card - skeleton */
        >


          <RoomCard roomId={room.id as number}>
            <RoomCardHeader
              roomName={room.name}
              roomDescription={room.description}
            >
              <Field
                room={{
                  name: room.name,
                  colorHex: room.colorHex,
                  image: room.image,
                }}
              />
            </RoomCardHeader>
            <RoomCardContent
              totalMembers={room.users?.length as number}
              chatroomId={room.id as number}
            />
          </RoomCard>
        </Lazy>
      ))}
    </div>
  );
}
export default RoomsCardList;
