import { AuthProvider } from "./AuthContext/AuthContext";
import MyRouter from "./routes/MyRouter";

function App() {
  return (
    <>
      <AuthProvider>
        <MyRouter />
      </AuthProvider>
    </>
  );
}

export default App;
