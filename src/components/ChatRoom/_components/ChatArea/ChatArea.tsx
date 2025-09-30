import { ScrollArea } from "@/components/ui/scroll-area";
import { Message } from "../Message";
import { EXAMPLE_MESSAGES } from "@/data/example-messages";

function ChatArea() {
  return (
    <ScrollArea className="flex-1 p-6">
      <div className="space-y-4">
        {EXAMPLE_MESSAGES.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${
              msg.isOwn ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <Message msg={msg} />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
export default ChatArea;
