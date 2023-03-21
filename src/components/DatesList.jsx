import axios from "axios";
import convertTime from "convert-time";
import { useEffect, useState } from "react";
import { api } from "./Url";

const DatesList = () => {
  const [dates, setDates] = useState([]);
  const [confirm, setConfirm] = useState([]);
  const getDates = () => {
    axios
      .get(`${api}/api/dates`)
      .then((res) => {
        console.log(res);
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

  const toggleConfirm = (data) => {
    const foundItemIndex = confirm.findIndex((item) => item.id === data.id);
    if (foundItemIndex === -1) {
      setConfirm([...confirm, data]);
    } else {
      const updatedConfirm = [...confirm];
      updatedConfirm.splice(foundItemIndex, 1);
      setConfirm(updatedConfirm);
    }
  };

  const handleAllValues = (e) => {
    console.log(e.target.checked);
    // if (e.target.checked) {
    //   setConfirm(dates);
    // } else {
    //   setConfirm();
    // }
  };
  useEffect(() => {
    getDates();
  }, []);

  return (
    <div className="h-screen bg-gray-900">
      <div>Citas 7u7</div>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input
                    onChange={(e) => handleAllValues(e)}
                    type="checkbox"
                    className="checkbox"
                  />
                </label>
              </th>
              <th>Paciente</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Celular</th>
              <th>Correo</th>
              <th>Notas</th>
              {/* <th></th> */}
            </tr>
          </thead>
          <tbody>
            {dates.map((date, i) => (
              <tr key={i}>
                <th>
                  <label>
                    <input
                      onChange={() => toggleConfirm(date)}
                      type="checkbox"
                      //   checked={confirm.findIndex((item) => item.id === data.id)&&true}
                      className="checkbox"
                    />
                  </label>
                  {/*  //TODO CHECKBOX  */}
                </th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{date.pacient__username}</div>
                      <div className="text-sm opacity-50">United States</div>
                    </div>
                  </div>
                </td>
                <td>
                  {formatDate(date.date)}
                  <br />
                  <span className="badge badge-ghost badge-sm">xd</span>
                </td>
                <td>{date.hour}</td>
                <td>{date.pacient__celular}</td>
                <td>{date.pacient__email}</td>
                <td>
                  <button className="btn btn-ghost btn-xs">details</button>
                </td>
              </tr>
            ))}
          </tbody>
          {/* foot */}
          {/* <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </tfoot> */}
        </table>
      </div>
      <div>Confirmar cita del paciente(s)</div>
      <div>
        {confirm.length > 0 &&
          confirm.map((date, i) => <div key={i}>{date.pacient__username}</div>)}
      </div>
      <button className="btn">confirmar</button>
    </div>
  );
};

export default DatesList;
