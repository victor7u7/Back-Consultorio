import axios from "axios";
import { useEffect, useState } from "react";
import { api } from "./Url";
import ModalNotes from "./ModalNotes";
import { useToggleList } from "../Hooks/Lists";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const DatesList = () => {
  const [dates, setDates] = useState([]);
  const [dateSelected, setDateSelected] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [userData, setUserData] = useState({});
  const [viewUserInfo, setViewUserInfo] = useState(false);
  const { list, toggleList } = useToggleList();
  const getDates = () => {
    axios
      .get(`${api}/api/dates`)
      .then((res) => {
        console.log(res.data.data, "herrrrr");
        setDates(res.data.data);
      })
      .catch((err) => console.error(err));
  };

  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("es-mx", options);
  };

  const handleDetails = (date) => {
    setDateSelected(date);
    setOpenModal(true);
  };
  const getObjectsSelected = () => {
    const filteredObjects = dates.filter((obj) => list.includes(obj.id));
    console.log(filteredObjects);
    axios
      .post(`${api}/api/confirm`, { dates: filteredObjects })
      .then((res) => {
        console.log(res);
        toast.success("Citas confirmadas con éxtio");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Algo salio mal, intenta de nuevo");
      });
  };
  useEffect(() => {
    getDates();
  }, []);

  return (
    <div className="h-screen bg-gray-900 ">
      <div
        className={`absolute ${
          viewUserInfo ? "top-24" : "-top-24"
        } border left-1/2 transform -translate-x-1/2 transition-all   z-10 bg-slate-900 p-5 rounded-md`}
      >
        <div>
          Datos del paciente{" "}
          <span className="font-bold">{userData.pacient__username}</span>
        </div>
        <div>Correo: {userData.pacient__email}</div>
        <div>Celular: {userData.pacient__celular} </div>
        <div></div>
      </div>
      <div className="pt-28">
        {dates &&
          dates.map((date, i) => (
            <div
              key={i}
              className="max-w-lg mb-4 p-3 mx-auto rounded-md flex justify-evenly items-center gap-5 bg-slate-600"
            >
              <div
                className="flex flex-col  px-3 items-center"
                onClick={() => !date.confirm && toggleList(date.id)}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  height="1em"
                  width="1em"
                  className="w-10 h-10 text-white"
                >
                  <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z" />
                </svg>
                <input
                  type="checkbox"
                  defaultValue={true}
                  readOnly
                  checked={list.includes(date.id) || date.confirm}
                  className="checkbox checkbox-info"
                />
              </div>
              <div className="text-center border-r border-l  p-3 text-white">
                <p>{date.pacient__username}</p>
                <div>{formatDate(date.date)}</div>
                <div>{date.hour}</div>
              </div>
              <div className="flex gap-3">
                <Link
                  to={`${api}/admin/api/paciente/${date.pacient__id}/change`}
                >
                  <button id="pen">
                    <svg
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      height="1em"
                      width="1em"
                      className="text-white h-7 w-7"
                    >
                      <path d="M13.498.795l.149-.149a1.207 1.207 0 111.707 1.708l-.149.148a1.5 1.5 0 01-.059 2.059L4.854 14.854a.5.5 0 01-.233.131l-4 1a.5.5 0 01-.606-.606l1-4a.5.5 0 01.131-.232l9.642-9.642a.5.5 0 00-.642.056L6.854 4.854a.5.5 0 11-.708-.708L9.44.854A1.5 1.5 0 0111.5.796a1.5 1.5 0 011.998-.001z" />
                    </svg>
                  </button>
                </Link>
                <button id="mail" onClick={() => handleDetails(date)}>
                  <svg
                    viewBox="0 0 900 1000"
                    fill="currentColor"
                    height="1em"
                    width="1em"
                    className="text-white h-8 w-8"
                  >
                    <path d="M30 264C8.667 252-.667 238.667 2 224c1.333-9.333 10-14 26-14h846c25.333 0 32 10.667 20 32-5.333 9.333-13.333 16.667-24 22-9.333 4-73.333 38-192 102s-179.333 96.667-182 98c-10.667 6.667-26 10-46 10-18.667 0-34-3.333-46-10-2.667-1.333-63.333-34-182-98S39.333 268 30 264m850 100c13.333-6.667 20-3.333 20 10v368c0 10.667-5.667 21.333-17 32-11.333 10.667-22.333 16-33 16H50c-10.667 0-21.667-5.333-33-16-11.333-10.667-17-21.333-17-32V374c0-13.333 6.667-16.667 20-10l384 200c12 6.667 27.333 10 46 10s34-3.333 46-10l384-200" />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    setViewUserInfo(!viewUserInfo);
                    setUserData(date);
                  }}
                  id="add"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    height="1em"
                    width="1em"
                    className="text-white h-8 w-8"
                  >
                    <path d="M20 2H8c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM8 16V4h12l.002 12H8z" />
                    <path d="M4 8H2v12c0 1.103.897 2 2 2h12v-2H4V8zm11-2h-2v3h-3v2h3v3h2v-3h3V9h-3z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        <div className="text-center">
          <button onClick={getObjectsSelected} className="btn btn-success">
            Confirmar
          </button>
        </div>
      </div>

      <ModalNotes
        isOpen={openModal}
        changeOpen={setOpenModal}
        dateSelected={dateSelected}
      />
    </div>
  );
};

export default DatesList;
