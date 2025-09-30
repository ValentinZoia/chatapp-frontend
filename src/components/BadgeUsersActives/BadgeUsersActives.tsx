import { Badge } from "../ui/badge";

function BadgeUsersActives({ usersAvtives }: { usersAvtives?: number }) {
  return (
    <Badge variant="secondary" className="gap-1">
      <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
      {usersAvtives || 0} en línea
    </Badge>
  );
}
export default BadgeUsersActives;
