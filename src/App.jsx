import { AuthProvider } from "./AuthContext/AuthContext";
import MyRouter from "./routes/MyRouter";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <AuthProvider>
        <Toaster />
        <MyRouter />
      </AuthProvider>
    </>
  );
}

export default App;
