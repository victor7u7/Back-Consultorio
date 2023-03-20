import { Route, Routes } from "react-router-dom";
import AdminCalendar from "../components/AdminCalendar";
import Calendar from "../components/Calendar";
import Home from "../components/Home";
import NavBar from "../components/NavBar";

const MyRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/nav" element={<NavBar />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/admin-calendar" element={<AdminCalendar />} />
    </Routes>
  );
};

export default MyRouter;
