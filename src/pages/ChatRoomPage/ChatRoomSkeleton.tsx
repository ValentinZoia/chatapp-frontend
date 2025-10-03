const ChatRoomSkeleton = () => (
  <div className="flex h-full items-center justify-center">
    <div className="flex flex-col items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4" />
      <span className="text-muted-foreground">Cargando sala de chat...</span>
    </div>
  </div>
);

export default ChatRoomSkeleton;
