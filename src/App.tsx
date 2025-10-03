import "./App.css";
import router from "./routes";
import { LoginModal } from "./components/Auth/LoginModal";
import CreateRoomModal from "./components/CreateRoomModal/CreateRoomModal";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <LoginModal />
      <CreateRoomModal />
    </>
  );
}

export default App;
