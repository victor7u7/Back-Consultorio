import { Route, Routes } from "react-router-dom";
// import AdminCalendar from "../components/AdminCalendar";
// import Calendar from "../components/Calendar";
import DatesList from "../components/DatesList";
import Home from "../components/Home";
import Loader2 from "../components/Loader2";
import NavBar from "../components/NavBar";
import VerifyEmail from "../components/VerifyEmail";
import NewCalendar from "../components/NewCalendar";
import AdminCal from "../components/AdminCal";

const MyRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/nav" element={<NavBar />} />
      <Route path="/calendar" element={<NewCalendar />} />
      <Route path="/admin-calendar" element={<AdminCal />} />
      <Route path="/dates" element={<DatesList />} />
      <Route path="/verify/:token/:user_id" element={<VerifyEmail />} />
      <Route path="/loader2" element={<Loader2 />} />
      <Route path="/ca" element={<NewCalendar />} />
      <Route path="/adminca" element={<AdminCal />} />
    </Routes>
  );
};

export default MyRouter;
