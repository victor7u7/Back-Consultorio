import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import NavBar from "../components/NavBar";

const MyRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/nav" element={<NavBar />} />
    </Routes>
  );
};

export default MyRouter;
