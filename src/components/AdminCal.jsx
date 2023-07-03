import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "./Url";
import { useToggleList } from "../Hooks/Lists";
import ModalTime from "./ModalTime";
import ModalChanges from "./ModalChanges";
import { toast } from "react-hot-toast";
import OutsideClickHandler from "react-outside-click-handler";

const myDays = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miercoles",
  "juves",
  "viernes",
  "sabado",
];
const AdminCal = () => {
  const currentDate = new Date();
  const [openClock, setOpenClock] = useState(false);
  const { list, toggleList, setList } = useToggleList();
  const [aceptChanges, setAceptChanges] = useState(false);
  const [modalChanges, setModalChanges] = useState(false);
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so add 1 to get the correct month
  const [startItems, setStartItems] = useState([]);
  const [allDays, setAllDays] = useState([]);
  const [dates, setDates] = useState({ currentYear, currentMonth });
  const [availableDates, setAvailableDates] = useState([]);
  const [daySelected, setDaySelected] = useState(0);
  const [dateSelected, setDateSelected] = useState({});
  const [monthName, setMonthName] = useState("n");
  function getFirstDayOfMonth(year, month) {
    const date = new Date(year, month, 1);
    // console.log(date.getDate());
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const numDaysInMonth = lastDayOfMonth.getDate();
    // console.log(numDaysInMonth);
    const dayOfWeek = date.getDay();
    let daysArr = [];
    for (let i = 1; i <= numDaysInMonth; i++) {
      daysArr.push(i);
    }
    setAllDays(daysArr);
    const array = Array.from({ length: dayOfWeek }, () => "*");
    setStartItems(array);
    const monthName = date.toLocaleString("es-MX", { month: "long" }); // Get the month name
    setMonthName(monthName);
  }
  const isDayAvailable = (day) => {
    const formattedDay = day.toString().padStart(2, "0"); // Format day as two digits (e.g., '01')
    return availableDates.some((date) =>
      date.available_date.endsWith(formattedDay)
    );
  };

  const getDayTimes = (day) => {
    setDaySelected("");
    const formattedDay = day.toString().padStart(2, "0");
    const matchingDate = availableDates.find((date) => {
      return date.available_date.endsWith(formattedDay);
    });
    if (matchingDate) {
      setDateSelected(matchingDate);
      setList(matchingDate.times);
      //   setDaySelected(day);
    } else {
      setList([]);
      setDateSelected({});
    }
    setDaySelected(day);
  };

  const handleChangeMonth = (is_next) => {
    is_next
      ? setDates({ ...dates, currentMonth: dates.currentMonth + 1 })
      : setDates({ ...dates, currentMonth: dates.currentMonth - 1 });
  };

  const handleChanges = () => {
    // setModalChanges(true);
    axios
      .put(
        `${api}/api/adminCal/${dates.currentYear}/${dates.currentMonth}/${daySelected}`,
        { new_times: list }
      )
      .then((res) => {
        console.log(res);
        console.log("cal");
        toast.success("Cambios realizados con éxito!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Algo salió mal, intentalo de nuevo...");
      });
  };

  useEffect(() => {
    getFirstDayOfMonth(dates.currentYear, dates.currentMonth - 1);
    // console.log(dates.scurrentYear, dates.currentMonth);
    axios
      .get(`${api}/api/able/${dates.currentYear}/${dates.currentMonth}`)
      .then((res) => {
        // console.log(res.data.availability);
        setAvailableDates(res.data.availability);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dates]);
  return (
    <div className="bg-gray-800 h-screen ">
      <div className="bg-gray-900 rounded-xl pt-28 text-white   w-full lg:w-1/2 mx-auto">
        <div className="mb-10 text-center font-bold text-2xl">
          <div className="flex  justify-around items-center">
            <button
              className="btn btn-circle"
              onClick={() => handleChangeMonth(false)}
            >
              <svg
                viewBox="0 0 1024 1024"
                fill="currentColor"
                height="1em"
                width="1em"
                className="w-7 h-7"
              >
                <path d="M689 165.1L308.2 493.5c-10.9 9.4-10.9 27.5 0 37L689 858.9c14.2 12.2 35 1.2 35-18.5V183.6c0-19.7-20.8-30.7-35-18.5z" />
              </svg>
            </button>
            <div>{monthName}</div>
            <button
              className="btn btn-circle"
              onClick={() => handleChangeMonth(true)}
            >
              <svg
                viewBox="0 0 1024 1024"
                fill="currentColor"
                height="1em"
                width="1em"
                className="w-7 h-7"
              >
                <path d="M715.8 493.5L335 165.1c-14.2-12.2-35-1.2-35 18.5v656.8c0 19.7 20.8 30.7 35 18.5l380.8-328.4c10.9-9.4 10.9-27.6 0-37z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2 mb-5">
          {myDays.map((day, key) => (
            <div
              key={key}
              className="text-center truncate border border-gray-500 rounded-sm p-1"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {startItems.map((item, key) => (
            <div key={key} className="bg-transparent p-4"></div>
          ))}
          {allDays.map((day, key) => (
            <div
              key={key}
              onClick={() => getDayTimes(day)}
              className={`${
                daySelected === day
                  ? "bg-teal-500 text-black rounded-full"
                  : isDayAvailable(day)
                  ? "border border-teal-500 rounded-md hover:bg-teal-700"
                  : "border border-gray-600"
              } p-3 text-center transition-all duration-500 rounded-md cursor-pointer`}
            >
              {day}
            </div>
          ))}
        </div>
        <div className="text-center mt-5 flex flex-wrap gap-2 justify-center">
          {dateSelected.times &&
            dateSelected.times.map((time, key) => (
              <div
                className="bg-blue-800 px-3 py-1 rounded-lg cursor-pointer"
                onClick={() => toggleList(time)}
                key={key}
              >
                <div>{time}</div>
                <input
                  type="checkbox"
                  readOnly
                  checked={list.includes(time)}
                  className="checkbox checkbox-success rounded-full"
                />
              </div>
            ))}
          <div className="flex">
            <button
              disabled={daySelected === 0}
              onClick={() => setOpenClock(true)}
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                height="1em"
                width="1em"
                className={`w-12 h-12 ${
                  daySelected === 0 ? "text-gray-900" : "text-gray-100"
                }`}
              >
                <path d="M12 4c-4.879 0-9 4.121-9 9s4.121 9 9 9 9-4.121 9-9-4.121-9-9-9zm0 16c-3.794 0-7-3.206-7-7s3.206-7 7-7 7 3.206 7 7-3.206 7-7 7z" />
                <path d="M13 8h-2v4H7v2h4v4h2v-4h4v-2h-4zm7.292-1.292l-3.01-3 1.412-1.417 3.01 3zM5.282 2.294L6.7 3.706l-2.99 3-1.417-1.413z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="text-center">
          <button
            className={`btn btn-info w-1/4 mt-5`}
            disabled={daySelected === 0}
            onClick={() => setModalChanges(true)}
          >
            Guardar cambios
          </button>
        </div>

        <ModalTime
          toggleList={toggleList}
          open={openClock}
          changeDate={setDateSelected}
          dateSelected={dateSelected}
          changeOpen={setOpenClock}
          list={list}
        />
        <ModalChanges
          open={modalChanges}
          changeOpen={setModalChanges}
          accept={handleChanges}
          dates={[dates.currentYear, dates.currentMonth, daySelected]}
          list={list}
        />
      </div>
    </div>
  );
};

export default AdminCal;
