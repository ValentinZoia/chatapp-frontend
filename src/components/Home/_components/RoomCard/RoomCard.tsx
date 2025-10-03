import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

interface Props {
  roomId: number;
  children: React.ReactNode;
}

function RoomCard({ roomId, children }: Props) {
  return (
    <Link key={roomId} to={`/room/${roomId}`}>
      <Card className="group cursor-pointer border-border bg-card transition-all hover:border-primary hover:shadow-lg">
        {children}
      </Card>
    </Link>
  );
}
export default RoomCard;
