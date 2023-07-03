import { AuthProvider } from "./AuthContext/AuthContext";
import NavBar from "./components/NavBar";
import MyRouter from "./routes/MyRouter";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <AuthProvider>
        <Toaster />
        <MyRouter />
        <NavBar />
      </AuthProvider>
    </>
  );
}

export default App;
