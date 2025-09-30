import { MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface Props {
  title: string;
  p: string;
  numericData?: number | string;
}

function GenericStatsCard({ title, p, numericData }: Props) {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <MessageSquare className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{numericData}</div>
        <p className="text-xs text-muted-foreground">{p}</p>
      </CardContent>
    </Card>
  );
}
export default GenericStatsCard;
