const ChatRoomSkeleton = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <div className="flex flex-col items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4" />
      <span className="text-blue-500">Cargando sala de chat...</span>
    </div>
  </div>
);

export default ChatRoomSkeleton;
