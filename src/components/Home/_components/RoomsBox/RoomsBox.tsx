import type { GetChatroomsForUserQuery } from "@/gql/graphql";
import { RoomsCardList } from "../RoomsCardList";

interface Props {
  title: string;
  rooms: GetChatroomsForUserQuery["getChatroomsForUser"];
}

function RoomsBox({ title, rooms }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      </div>
      <RoomsCardList rooms={rooms} />
    </div>
  );
}
export default RoomsBox;
