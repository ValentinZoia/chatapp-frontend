import { SidebarGroup, SidebarSeparator } from "@/components/ui/sidebar";
import { useGetChatroomsForUser } from "@/data/Chatrooms/useGetChatroomsForUser";
import { useUserStore } from "@/stores/userStore";
import { ItemRoomList } from "../ItemRoomList";

function UserRooms() {
  const userId = useUserStore((state) => state.id);

  const { data: userRooms, error } = useGetChatroomsForUser(userId as number);
  if (error) {
    console.log(error);
    return null;
  }

  return (
    <>
      {userRooms && userRooms.getChatroomsForUser.length > 0 && (
        <>
          <SidebarSeparator />
          <SidebarGroup>
            <ItemRoomList
              rooms={userRooms.getChatroomsForUser}
              title="Mis Salas"
            />
          </SidebarGroup>
        </>
      )}
    </>
  );
}
export default UserRooms;
