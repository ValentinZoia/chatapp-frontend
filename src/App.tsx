import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes";
// import { LoginModal } from "./components/LoginModal";
// import CreateRoomModal from "./components/CreateRoomModal/CreateRoomModal";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      {/* <LoginModal />
      <CreateRoomModal /> */}
    </>
  );
}

export default App;
