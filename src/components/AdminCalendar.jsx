import axios from "axios";
import { useState, useEffect } from "react";
import left from "../media/left.png";
import right from "../media/right.png";
import Loader from "./Loader";
import { api } from "./Url";

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

const AdminCalendar = () => {
  const [mothName, setMothName] = useState("");
  const [loading, setLoading] = useState(false);
  const [availableDays, setAvailableDays] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [daySelected, setDaySelected] = useState(1);
  const [updatedTime, setUpdatedTime] = useState(["10:00", "11:30", "12:23"]);
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth() + 1);
  const [timeSelected, setTimeSelected] = useState();
  const [daysInMonth, setDaysInMonth] = useState(
    new Date(currentYear, currentMonth + 1, 0).getDate()
  );
  const [availableTime, setAvailableTime] = useState([
    "10:00",
    "11:30",
    "12:23",
  ]);
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

  const selectDay = (e, day) => {
    e.target.backgorun;
    if (day >= 1 && day <= daysInMonth) setDaySelected(day);

    // if (day >= 1 && day <= daysInMonth)
    //   setAvailableDays([...availableDays, day]);
  };

  const toggleTime = (element) => {
    const index = updatedTime.indexOf(element);
    if (index === -1) setUpdatedTime([...updatedTime, element]);
    else setUpdatedTime(updatedTime.filter((el) => el !== element));
    console.log(updatedTime);
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
    // console.log(month, currentMonth);
  };

  const savechanges = () => {
    const changes = {
      month: currentMonth + 1,
      day: daySelected,
      times: availableTime,
      year: currentYear,
    };
    axios
      .post(`${api}/api/able`, changes)
      .then((res) => {
        if (res.status === 201) alert("Created");
      })
      .catch((err) => {
        alert(err.message);
        console.log(err);
      });
  };

  const updateTimes = () => {
    console.log(daySelected, currentMonth + 1, currentYear);
    axios
      .put(
        `${api}/api/able/${daySelected}/${currentMonth + 1}/${currentYear}`,
        { times: updatedTime }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getMonthName(currentDate.getMonth());
  }, []);
  useEffect(() => {
    console.log(currentMonth);
    getAvailableDays(currentYear, currentMonth + 1, [3, 6]);
  }, [currentMonth]);

  return (
    <>
      <div className="bg-gray-900 h-screen ">
        <div className="">
          <div className="text-3xl text-center">Admin calendar</div>
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
                    style={{
                      backgroundColor: day === daySelected && "#14A44D",
                      color: day === daySelected && "black",
                    }}
                    onClick={(e) => selectDay(e, day)}
                    className={`${
                      availableDays.includes(day)
                        ? "bg-gray-100 text-black"
                        : "bg-zinc-900 text-gray-500"
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
          Horarios disponibles del dia {daySelected} de {mothName}:
          <div className="flex gap-5 justify-center">
            {availableTime.map((time, i) => (
              <div className="bg-blue-800 text-white rounded-md w-16">
                <div>{time} </div>
                <input
                  type="checkbox"
                  readOnly
                  onChange={() => toggleTime(time)}
                  checked={updatedTime.includes(time) ? true : false}
                  className="checkbox checkbox-success"
                />
              </div>
            ))}
          </div>
        </div>

        {!loading ? (
          <div className="text-center mt-5 ">
            <button
              className={`${showMessage ? "hidden" : "btn btn-success"}`}
              onClick={savechanges}
            >
              Guardar cambios
            </button>
          </div>
        ) : (
          <Loader />
        )}
        <div className="btn" onClick={updateTimes}>
          Update
        </div>
      </div>
    </>
  );
};

export default AdminCalendar;
