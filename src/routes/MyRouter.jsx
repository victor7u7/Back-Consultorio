import { Route, Routes } from "react-router-dom";
import AdminCalendar from "../components/AdminCalendar";
import Calendar from "../components/Calendar";
import DatesList from "../components/DatesList";
import Home from "../components/Home";
import Loader2 from "../components/Loader2";
import NavBar from "../components/NavBar";
import VerifyEmail from "../components/VerifyEmail";
import NewCalendar from "../components/NewCalendar";

const MyRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/nav" element={<NavBar />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/admin-calendar" element={<AdminCalendar />} />
      <Route path="/dates" element={<DatesList />} />
      <Route path="/verify/:token/:user_id" element={<VerifyEmail />} />
      <Route path="/loader2" element={<Loader2 />} />
      <Route path="/ca" element={<NewCalendar />} />
    </Routes>
  );
};

export default MyRouter;
