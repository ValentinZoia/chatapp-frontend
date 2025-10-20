import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import type { GetUsersOfChatroomQuery } from "@/gql/graphql";

function RoomCardHeader({
  roomName,
  roomDescription,
  children,
}: {
  roomName: GetUsersOfChatroomQuery["getChatroomById"]["name"] | undefined;
  roomDescription: GetUsersOfChatroomQuery["getChatroomById"]["description"];
  children?: React.ReactNode;
}) {
  return (
    <CardHeader>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {children}
          <div>
            <CardTitle className="text-lg group-hover:text-primary">
              {roomName}
            </CardTitle>
            <CardDescription className="text-sm">
              {roomDescription}
            </CardDescription>
          </div>
        </div>
      </div>
    </CardHeader>
  );
}
export default RoomCardHeader;
