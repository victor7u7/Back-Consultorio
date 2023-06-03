import axios from "axios";
import { useState, useEffect, useContext } from "react";
import left from "../media/left.png";
import right from "../media/right.png";
import Loader from "./Loader";
import { api } from "./Url";
import AuthContext from "../AuthContext/AuthContext";

const days = ["D", "L", "M", "X", "J", "V", "S"];
const unavailableDays = [];
const currentDate = new Date();
const currentYear = currentDate.getFullYear();

const getDayOfWeek = (date) => {
  const dayIndex = date.getDay();
  return days[dayIndex];
};

const dates = {
  client: "yair",
  day: "",
};
const Calendar = () => {
  const { user } = useContext(AuthContext);
  const [serverDate, setServerDate] = useState();
  const [mothName, setMothName] = useState("");
  const [loading, setLoading] = useState(false);
  const [availableDays, setAvailableDays] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [daySelected, setDaySelected] = useState(1);
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth() + 1);
  const [timeSelected, setTimeSelected] = useState();
  const [daysInMonth, setDaysInMonth] = useState(
    new Date(currentYear, currentMonth + 1, 0).getDate()
  );
  const [availableTime, setAvailableTime] = useState(["10:00", "11:30"]);
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const firstDayOfWeekIndex = days.indexOf(getDayOfWeek(firstDayOfMonth));
  const startIndex = firstDayOfWeekIndex === -1 ? 0 : firstDayOfWeekIndex;

  function getMonthName(monthNumber) {
    setDaySelected();
    const monthsInSpanish = new Intl.DateTimeFormat("es-ES", { month: "long" });
    const monthNameInSpanish = monthsInSpanish.format(
      new Date(2000, monthNumber, 1)
    );
    setCurrentMonth(monthNumber);
    setMothName(monthNameInSpanish);
    setDaysInMonth(new Date(currentYear, monthNumber + 1, 0).getDate());
  }

  const selectDay = (day) => {
    if (availableDays.includes(day)) {
      setDaySelected(day);
      // setDaySelected(res.data.date);
    }
  };

  const getAvailableDays = (year, month, weekdays) => {
    const days = [];
    const date = new Date(year, month - 1, 1); // Set the date to the first day of the month
    while (date.getMonth() === month - 1) {
      // Loop over all days in the month
      if (weekdays.includes(date.getDay())) {
        // Check if the current day matches the desired weekday
        days.push(date.getDate()); // Add the day to the result array
      }
      date.setDate(date.getDate() + 1); // Move to the next day
    }
    setAvailableDays([...days]);
    console.log(month, currentMonth);
  };
  const sendDate = () => {
    const myDate = `${currentDate.getFullYear()}-${currentMonth}-${daySelected}`;
    const date = { pacient_id: 19, date: myDate, hour: timeSelected };
    setLoading(true);
    axios
      .post(`${api}/api/dates`, date)
      .then((res) => {
        if (res.status === 201) {
          console.log(res);
          setShowMessage(true);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    axios.get(`${api}/api/dates/${user.id}`).then((res) => {
      if (res.status === 200) {
        setShowMessage(true);
        setServerDate(res.data.date);
      }
    });
    getMonthName(currentDate.getMonth());
  }, []);
  useEffect(() => {
    getAvailableDays(currentYear, currentMonth + 1, [3, 6]);
  }, [currentMonth]);

  return (
    <>
      <div className="bg-gray-900 h-screen ">
        <div className="">
          <h1 className="text-4xl font-bold text-center">{mothName}</h1>
        </div>
        <table className="table mx-auto">
          <thead>
            <tr>
              {days.map((day) => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from(
              { length: Math.ceil((daysInMonth + startIndex) / 7) },
              (_, i) => i * 7
            ).map((rowIndex) => (
              <tr key={rowIndex}>
                {Array.from(
                  { length: 7 },
                  (_, i) => i + rowIndex - startIndex + 1
                ).map((day) => (
                  <td
                    key={day}
                    onClick={() => selectDay(day)}
                    className={`  ${
                      daySelected === day ? "bg-success text-black" : ""
                    }${
                      availableDays.includes(day)
                        ? "bg-gray-100 text-black hover:bg-success cursor-pointer"
                        : "bg-zinc-900"
                    } 
                      text-center border border-gray-700  
                    `}
                  >
                    {day <= daysInMonth ? (day > 0 ? day : "") : ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>

          <tfoot className="bg-black">
            <tr>
              <td colSpan="6">
                <img
                  src={left}
                  onClick={() => getMonthName(currentMonth - 1)}
                  className="w-10"
                  alt=""
                />
              </td>
              <td>
                <img
                  onClick={() => getMonthName(currentMonth + 1)}
                  src={right}
                  className="w-10"
                />
              </td>
            </tr>
          </tfoot>
        </table>
        <div className="text-center mt-10">
          <select
            onChange={(e) => setTimeSelected(e.target.value)}
            defaultValue={"jaja"}
            className="select select-primary w-full max-w-xs text-center "
          >
            <option disabled selected>
              Horarios disponibles:
            </option>
            {availableTime.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
        {daySelected && mothName && timeSelected && (
          <div className="text-center mt-10 font-bold">
            Cita programada: <br />
            <span>
              {daySelected} de {mothName} a las {timeSelected}
            </span>
          </div>
        )}
        {!loading ? (
          <div className="text-center mt-5 ">
            <button
              className={`${showMessage ? "hidden" : "btn btn-success"}`}
              onClick={sendDate}
            >
              Confirmar cita
            </button>
          </div>
        ) : (
          <Loader />
        )}
        {showMessage && (
          <div className="alert alert-success shadow-lg max-w-[300px] mx-auto">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                cita apartada, ya solo falta ser confirmada por la Dra, ten un
                buen dia!
              </span>
            </div>
          </div>
        )}
        {serverDate && <div className="text-center">{serverDate}</div>}
      </div>
    </>
  );
};

export default Calendar;
