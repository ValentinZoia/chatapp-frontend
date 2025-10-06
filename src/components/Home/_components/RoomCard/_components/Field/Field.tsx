import { Image } from "@/components/Image";
import type { GetUsersOfChatroomQuery } from "@/gql/graphql";

interface Props {
  room: {
    name: GetUsersOfChatroomQuery["getChatroomById"]["name"];
    colorHex: GetUsersOfChatroomQuery["getChatroomById"]["colorHex"];
    image: GetUsersOfChatroomQuery["getChatroomById"]["image"];
  };
}

function Field({ room }: Props) {
  return (
    <div
      className={`flex h-12 w-12 items-center justify-center rounded-lg`}
      style={{ backgroundColor: room?.colorHex as string }}
    >
      <Image
        src={
          room?.image ||
          `/escudos/${room?.name
            ?.toLocaleLowerCase()
            .trim()
            .replace(/ /g, "")}.png`
        }
        alt={`Logo de ${room?.name}`}
        className="h-12 w-12 rounded-lg"
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
