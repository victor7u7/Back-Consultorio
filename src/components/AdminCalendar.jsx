import axios from "axios";
import { useState, useEffect } from "react";
import left from "../media/left.png";
import right from "../media/right.png";
import Loader from "./Loader";
import { api } from "./Url";

import convertTime from "convert-time";
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const days = ["D", "L", "M", "X", "J", "V", "S"];
const normalTime = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const normalMinutes = ["00", "10", "20", "30", "40", "50"];
const getDayOfWeek = (date) => {
  const dayIndex = date.getDay();
  return days[dayIndex];
};
const AdminCalendar = () => {
  const [mothName, setMothName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAddTime, setIsAddTime] = useState(false);
  const [availableDays, setAvailableDays] = useState([]);
  const [addDay, setAddDay] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [daysFromServer, setDaysFromServer] = useState();
  const [hourToAdd, setHourToAdd] = useState();
  const [minutesToAdd, setMinutesToAdd] = useState();
  const [dayTime, setDayTime] = useState("AM");
  const [daySelected, setDaySelected] = useState(1);
  const [updatedTime, setUpdatedTime] = useState(["10:00", "11:30", "12:23"]);
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth() + 1);
  // const [timeSelected, setTimeSelected] = useState();
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

  const selectDay = (day) => {
    if (day >= 1 && day <= daysInMonth) {
      setDaySelected(day);
      setAddDay(false);
    }
    if (day >= 1 && day <= daysInMonth && !availableDays.includes(day))
      setAddDay(true);

    if (day >= 1 && day <= daysInMonth && availableDays.includes(day)) {
      const itemFound = daysFromServer.find((item) => item.day === day);
      setAvailableTime(itemFound.times);
      setUpdatedTime(itemFound.times);
    }
  };

  const toggleTime = (element) => {
    const index = updatedTime.indexOf(element);
    if (index === -1) setUpdatedTime([...updatedTime, element]);
    else setUpdatedTime(updatedTime.filter((el) => el !== element));
  };

  const addTimes = () => {
    if (dayTime === "PM") {
      let convertedHour = convertTime(`${hourToAdd}pm`);
      convertedHour = convertedHour.split(":")[0];
      const timeToAdd = `${convertedHour}:${minutesToAdd}`;
      if (!availableTime.includes(timeToAdd)) {
        setAvailableTime([...availableTime, timeToAdd]);
        setUpdatedTime([...updatedTime, timeToAdd]);
      }
    } else {
      const timeToAdd = `${hourToAdd}:${minutesToAdd}`;
      if (!availableTime.includes(timeToAdd)) {
        setAvailableTime([...availableTime, timeToAdd]);
        setUpdatedTime([...availableTime, timeToAdd]);
      }
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

    setAvailableDays([...availableDays, daySelected]);
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

  const delDay = () => {
    const updateDays = availableDays.filter((day) => day != daySelected);
    console.log(updateDays);
    setAvailableDays(updateDays);
    setDaySelected();
    axios
      .delete(
        `${api}/api/able/${daySelected}/${currentMonth + 1}/${currentYear}`
      )
      .then((res) => {
        if (res.status === 200) alert("Deleted");
      })
      .catch((err) => {
        console.log(err);
        alert("err");
      });
  };

  const getDaysServer = () => {
    console.log(currentMonth);
    axios
      .get(`${api}/api/able/${currentMonth}`)
      .then((res) => {
        let myDays = [];
        setDaysFromServer(res.data.availability);
        res.data.availability.forEach((day) => {
          myDays.push(day.day);
        });
        setAvailableDays(myDays);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getMonthName(currentDate.getMonth());
    getDaysServer();
  }, []);
  useEffect(() => {
    console.log(currentMonth);
    getAvailableDays(currentYear, currentMonth + 1, [3, 6]);
    // getDaysServer();
  }, [currentMonth]);
  console.log(convertTime("3:12 pm"));
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
                    onClick={(e) => selectDay(day)}
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
          {addDay
            ? `Se agregaran los siguientes horarios disponibles el dia ${daySelected} de ${mothName} `
            : ` Horarios disponibles del dia ${daySelected} de ${mothName}:`}
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
            <div className="bg-blue-900 rounded-md p-1">
              <div>Añadir hora</div>
              <input
                type="checkbox"
                className="toggle"
                onChange={() => setIsAddTime(!isAddTime)}
              />
            </div>
          </div>
          {/* selects */}
          {isAddTime && (
            <div className="flex justify-center gap-4">
              <select
                onChange={(e) => setHourToAdd(e.target.value)}
                className="select select-primary w-24 max-w-xs"
              >
                <option disabled selected>
                  Hora:
                </option>
                {normalTime.map((time, i) => (
                  <option key={i} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              <select
                onChange={(e) => setMinutesToAdd(e.target.value)}
                className="select select-primary w-24 max-w-xs"
              >
                <option disabled selected>
                  Minutos:
                </option>
                {normalMinutes.map((minute, i) => {
                  return <option key={i}>{minute}</option>;
                })}
              </select>
              <select
                onChange={(e) => setDayTime(e.target.value)}
                className="select select-primary w-24 max-w-xs"
              >
                <option disabled selected>
                  AM/PM
                </option>
                <option>AM</option>
                <option>PM</option>
              </select>
              <div className="btn btn-success btn-sm" onClick={addTimes}>
                Agregar
              </div>
            </div>
          )}
          {/* selects */}
        </div>

        {/* {addDay && <div className="btn">Agregar Disponibilidad</div>} */}

        {!loading ? (
          <div className="text-center mt-5 ">
            <button
              className={`${showMessage ? "hidden" : "btn btn-success"}`}
              onClick={() => (addDay ? savechanges() : updateTimes())}
            >
              {addDay ? "Agregar disponibilidad" : "Guardar cambios"}
            </button>
          </div>
        ) : (
          <Loader />
        )}
        {!addDay && (
          <div className="text-center mt-2">
            <button className="btn btn-error" onClick={delDay}>
              Quitar Disponibilidad del dia {daySelected} de {mothName}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminCalendar;
