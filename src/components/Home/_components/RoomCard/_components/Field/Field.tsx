import type { IRoom } from "@/components/Sidebar/_components/ItemRoomList/ItemRoomList";
import { Image } from "@/components/Image";
function Field({ room }: { room: IRoom }) {
  return (
    <div
      className={`flex h-12 w-12 items-center justify-center rounded-lg ${room.color}`}
    >
      <Image
        src={`/escudos/${room.id}.png`}
        alt={`Escudo de ${room.name}`}
        className="h-12 w-12"
        lazy={true}
        placeholderSrc="https://placehold.co/30"
        errorSrc="https://placehold.co/30"
        aspectRatio={1}
        threshold={0.1}
      />
      {/* <MessageSquare className="h-6 w-6 text-white" /> */}
    </div>
  );
}
export default Field;
