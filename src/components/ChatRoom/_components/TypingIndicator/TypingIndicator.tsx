import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { UserEntity } from "@/gql/graphql";

function TypingIndicator({ typingUsers }: { typingUsers: UserEntity[] }) {
  if (typingUsers.length === 0) return null;
  return (
    <div className="absolute bottom-16 left-4 flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-md shadow-md">
      <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
        {typingUsers.map((user) => (
          <Avatar key={user.id}>
            <AvatarImage src={user.avatarUrl || ""} alt={user.fullname} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {user.fullname ? user.fullname.charAt(0).toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>
        ))}
      </div>

      <span className="text-sm text-muted-foreground italic">is typing...</span>
    </div>
  );
}
export default TypingIndicator;
