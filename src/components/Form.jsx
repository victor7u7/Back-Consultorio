import axios from "axios";
import { useState } from "react";
import Modal from "react-modal";
import OutsideClickHandler from "react-outside-click-handler";
import { api } from "./Url";
import eye from "../media/eye.png";
import closeye from "../media/closeye.png";
const customStyles = {
  content: {
    outline: "none",
  },
  overlay: { zIndex: 999, backgroundColor: "#18191ab1" },
};
const Form = ({ isOpen, setIsOpen }) => {
  const [data, setData] = useState({});
  const [isEntire, setIsEntire] = useState(false);
  const [hidePass, setHidePass] = useState(true);
  const Login = () => {
    axios
      .post(`${api}/api/login`, {
        email: data.email,
        contrasena: data.password,
      })
      .then((respuesta) => {
        if (respuesta.status === 200) {
          alert("login exitoso");
          /* window.location.href = "http://127.0.0.1:8000/admin/"; */
          window.location.href = "ejemplo.html";
        } else if (respuesta.status === 201) {
          window.location.href = "http://127.0.0.1:8000/admin/";
        } else {
          alert("algo mal");
        }
        console.log(respuesta);
      })
      .catch((error) => {
        // console.log(error)
        alert("ocurrio un error");
      });
  };

  const manejarEnvio = () => {
    axios
      .post(`${api}/api/signup`, {
        nombres: data.nombres,
        apPaterno: data.ap_paterno,
        apMaterno: data.ap_materno,
        email: data.email,
        celular: data.celular,
        contrasena: data.password,
      })
      .then((respuesta) => {
        if (respuesta.status === 200) {
          alert("login exitoso");
        } else {
          alert("algo mal");
        }
        console.log(respuesta);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Modal
        ariaHideApp={false}
        style={customStyles}
        className="z"
        isOpen={isOpen}
      >
        <div className="">
          <div className="w-full max-w-xs  mx-auto mt-16">
            <OutsideClickHandler
              onOutsideClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              <form className="bg-white transition ease-in-out duration-300   shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
                <div className={`${isEntire ? "" : "hidden"}  mb-6`}>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Nombre(s)
                  </label>
                  <input
                    name="nombres"
                    className="shadow bg-white appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    onChange={(e) =>
                      setData({ ...data, nombres: e.target.value })
                    }
                    placeholder="introduce tus nombres"
                  />
                </div>
                <div className={`${isEntire ? "" : "hidden"}  mb-6`}>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Apellido Paterno
                  </label>
                  <input
                    name="ap-paterno"
                    className="shadow bg-white appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="text"
                    type="text"
                    placeholder="primer Apellido"
                    onChange={(e) =>
                      setData({ ...data, ap_paterno: e.target.value })
                    }
                  />
                </div>
                <div className={`${isEntire ? "" : "hidden"}  mb-6`}>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Apellido Materno
                  </label>
                  <input
                    name="ap-materno"
                    className="shadow bg-white appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="text"
                    type="text"
                    placeholder="segundo Apellido"
                    onChange={(e) =>
                      setData({ ...data, ap_materno: e.target.value })
                    }
                  />
                </div>
                <div id="prueba" className="mb-6">
                  <label
                    className="block text-black text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Correo electronico
                  </label>
                  <input
                    name="email"
                    className="shadow bg-white appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="text"
                    placeholder="ejemplo@gmail.com"
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                  />
                </div>
                <div
                  id="prueba"
                  className={`${isEntire ? "" : "hidden"}  mb-6`}
                >
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Numero telefonico
                  </label>
                  <input
                    name="telefono"
                    className={`shadow bg-white appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                    id="password"
                    type="text"
                    placeholder="numero celular"
                    onChange={(e) =>
                      setData({ ...data, celular: e.target.value })
                    }
                  />
                </div>
                <div id="prueba" className="mb-6 relative">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Contraseña
                  </label>
                  <input
                    name="contrasena"
                    className="shadow bg-white appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type={hidePass ? "password" : "text"}
                    placeholder="******************"
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                  />
                  <img
                    onClick={() => setHidePass(!hidePass)}
                    src={hidePass ? eye : closeye}
                    alt=""
                    className="w-5 absolute right-2 -mt-10"
                  />

                  <p className="text-red-500 text-xs italic">
                    introduce una contraseña
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    id="btnIniciar"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={() => {
                      isEntire ? manejarEnvio() : Login();
                    }}
                  >
                    {isEntire ? "Registrar" : "Iniciar sesion"}
                  </button>

                  <div
                    id="pregunta"
                    onClick={() => setIsEntire(!isEntire)}
                    className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                  >
                    {isEntire ? "Iniciar sesion" : "Registrar"}
                  </div>
                </div>
              </form>

              <div>
                <p className="text-center text-gray-500 text-xs">
                  &copy;2023 victorMG. Reservados todos los derechos.
                </p>
              </div>
            </OutsideClickHandler>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Form;
