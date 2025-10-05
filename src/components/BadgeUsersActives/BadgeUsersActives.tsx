import { Badge } from "../ui/badge";

function BadgeUsersActives({ usersAvtives }: { usersAvtives?: number }) {
  return (
    <Badge
      variant="outline"
      className="gap-1.5 border-green-500/20 bg-green-500/10 text-green-500"
    >
      <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
      {usersAvtives} en línea
    </Badge>
  );
}
export default BadgeUsersActives;
