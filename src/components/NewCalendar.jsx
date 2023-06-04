import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "./Url";
import MyModal from "./MyModal";

const myDays = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miercoles",
  "juves",
  "viernes",
  "sabado",
];
const NewCalendar = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so add 1 to get the correct month
  // const [startDay, setStartDay] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [startItems, setStartItems] = useState([]);
  const [allDays, setAllDays] = useState([]);
  const [dates, setDates] = useState({ currentYear, currentMonth });
  const [availableDates, setAvailableDates] = useState([]);
  const [daySelected, setDaySelected] = useState(0);
  const [dateSelected, setDateSelected] = useState({});
  const [hourSelected, setHourSelected] = useState("");
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
    // console.log(daysArr);

    // setStartDay(dayOfWeek);
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
      setDaySelected(day);
    }
  };

  const handleChangeMonth = (is_next) => {
    is_next
      ? setDates({ ...dates, currentMonth: dates.currentMonth + 1 })
      : setDates({ ...dates, currentMonth: dates.currentMonth - 1 });
  };
  const generateHumanDate = () => {
    const year = dates.currentYear;
    const month = dates.currentMonth - 1; // Month is zero-based, so 5 represents June
    const day = daySelected;

    const date = new Date(year, month, day);
    const formattedDate = date.toLocaleDateString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return formattedDate;
  };
  useEffect(() => {
    getFirstDayOfMonth(dates.currentYear, dates.currentMonth - 1);
    console.log(dates.currentYear, dates.currentMonth);
    axios
      .get(`${api}/api/able/${2023}/${dates.currentMonth}`)
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
      <div className="bg-gray-900 rounded-xl pt-10 text-white lg:p-5  w-full lg:w-1/2 mx-auto">
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
              className="text-center border border-gray-500 rounded-sm p-1"
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
                isDayAvailable(day)
                  ? daySelected === day
                    ? "bg-teal-500 text-black rounded-full"
                    : "border border-teal-500 rounded-md cursor-pointer hover:bg-teal-700"
                  : "border border-gray-600 "
              } p-3 text-center  transition-all duration-500 rounded-md`}
            >
              {day}
            </div>
          ))}
        </div>
        <div className="text-center mt-5">
          <select
            disabled={daySelected === 0}
            onChange={(e) => setHourSelected(e.target.value)}
            className="select text-center select-accent w-full max-w-xs"
          >
            <option disabled selected>
              Selecciona un horario
            </option>
            {dateSelected.times &&
              dateSelected.times.map((time, key) => (
                <option key={key}>{time}</option>
              ))}
          </select>
        </div>

        <div className="text-center">
          <button
            className={`btn btn-info w-1/4 mt-5`}
            disabled={daySelected === 0 || hourSelected.length === 0}
            onClick={() => setIsOpen(true)}
          >
            Reservar
          </button>
        </div>
        <MyModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          hour={hourSelected}
          noHumanDate={{
            year: dates.currentYear,
            month: dates.currentMonth,
            day: daySelected,
          }}
          date={generateHumanDate()}
        />
      </div>
    </div>
  );
};

export default NewCalendar;
