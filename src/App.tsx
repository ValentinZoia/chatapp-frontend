import "./App.css";
import router from "./routes";
import { LoginModal } from "./components/Auth/LoginModal";
import CreateRoomModal from "./components/CreateRoomModal/CreateRoomModal";
import { RouterProvider } from "react-router-dom";
import { EditProfileModal } from "./components/EditProfileModal";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <LoginModal />
      <CreateRoomModal />
      <EditProfileModal />
    </>
  );
}

export default App;
