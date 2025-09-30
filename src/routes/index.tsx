import { MainLayout } from "@/layouts/MainLayout";
import { createBrowserRouter } from "react-router-dom";
import { Error, Home, ChatRoomPage } from "@/pages";
// import { AuthGuard } from "@/guards";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      // <AuthGuard>
      <MainLayout />
      // </AuthGuard>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "room",
        children: [
          {
            index: true,
            element: <ChatRoomPage />,
          },
          {
            path: ":roomId",
            element: <ChatRoomPage />,
            loader: async ({ params }) => {
              if (!params.roomId) {
                throw new Response("Invalid room ID", { status: 400 });
              }
              return { roomId: params.roomId };
            },
          },
        ],
      },
    ],
  },
]);

export default router;
