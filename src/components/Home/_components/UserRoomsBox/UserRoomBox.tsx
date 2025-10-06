import { useUserStore } from "@/stores/userStore";
import { RoomsBox } from "../RoomsBox";
import { useGetChatroomsForUser } from "@/data/Chatrooms/useGetChatroomsForUser";

function UserRoomBox() {
  const userId = useUserStore((state) => state.id);

  const { data: userRooms, error } = useGetChatroomsForUser(userId as number);
  if (error) {
    console.log(error);
    return null;
  }
  if (!userRooms) return null;
  if (userRooms && userRooms.getChatroomsForUser.length === 0) return null;

  return <RoomsBox rooms={userRooms.getChatroomsForUser} title="Tus Salas" />;
}
export default UserRoomBox;
