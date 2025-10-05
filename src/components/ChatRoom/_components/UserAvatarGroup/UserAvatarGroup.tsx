import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { UserEntity } from "@/gql/graphql";

interface UserAvatarGroupProps {
  users: Partial<UserEntity>[];
  maxDisplay?: number;
}

function UserAvatarGroup({ users, maxDisplay = 6 }: UserAvatarGroupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const displayUsers = users.slice(0, maxDisplay);
  const remainingCount = users.length - maxDisplay;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div
          className="flex items-center cursor-pointer"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {displayUsers.map((user, index) => (
            <Avatar
              key={user?.id}
              className="border-2 border-background transition-transform hover:scale-110 hover:z-10"
              style={{
                marginLeft: index > 0 ? "-0.75rem" : "0",
                zIndex: displayUsers.length - index,
              }}
            >
              <AvatarImage
                src={user?.avatarUrl || "/placeholder.svg"}
                alt={user?.fullname}
              />
              <AvatarFallback>
                {getInitials(user?.fullname || "")}
              </AvatarFallback>
            </Avatar>
          ))}
          {remainingCount > 0 && (
            <div
              className="flex items-center justify-center w-10 h-10 rounded-full bg-muted text-muted-foreground text-sm font-medium border-2 border-background"
              style={{
                marginLeft: "-0.75rem",
                zIndex: 0,
              }}
            >
              +{remainingCount}
            </div>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-64 p-2"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className="space-y-1">
          <h4 className="font-medium text-sm mb-2 px-2">
            {users.length} {users.length === 1 ? "Miembro" : "Miembros"}
          </h4>
          <div className="max-h-64 overflow-y-auto">
            {users.map((user) => (
              <div
                key={user?.id}
                className="flex items-center gap-3 p-2 rounded-md hover:bg-accent transition-colors"
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src={user?.avatarUrl || "/placeholder.svg"}
                    alt={user?.fullname}
                  />
                  <AvatarFallback className="text-xs">
                    {getInitials(user?.fullname || "")}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{user?.fullname}</span>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
export default UserAvatarGroup;
