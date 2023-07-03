import { useContext, useEffect, useState } from "react";
import Form from "./Form";
import tooth from "../media/tooth.png";
import AuthContext from "../AuthContext/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import OutsideClickHandler from "react-outside-click-handler";
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logoutUser } = useContext(AuthContext);
  const [openDrodown, setOpenDrodown] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);
  console.log(user);

  return (
    <nav className="bg-blue-500 top-0 border-gray-200 px-2 sm:px-4 py-2.5 fixed  w-screen z-10">
      <div className="relative container flex flex-wrap items-center justify-between mx-auto">
        <a href="#" className="flex items-center">
          <img src={tooth} className="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Consultorio Mayra
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-white rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={() => setMenuVisible(!menuVisible)}
        >
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
        <div
          className={` ${!menuVisible && "hidden"}  w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="flex flex-col p-4 mt-4  border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white  dark:bg-gray-700 md:dark:bg-blue-500 dark:border-gray-700">
            {/* <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-white md:p-0 dark:text-white"
                aria-current="page"
              >
                Inicio
              </a>
            </li> */}
            <li onClick={() => setMenuVisible(false)}>
              <a
                href="/#servicios"
                className="block py-2 pl-3 pr-4 text-white md:text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Servicios
              </a>
            </li>
            <li onClick={() => setMenuVisible(false)}>
              <a
                href="/#ubicacion"
                className="block py-2 pl-3 pr-4 text-white md:text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Ubicacion
              </a>
            </li>
            <Link to={user ? "/calendar" : ""}>
              <li
                onClick={() => {
                  !user && setIsOpen(!isOpen);
                  setMenuVisible(false);
                }}
              >
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-700 md:text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Agendar cita
                </a>
              </li>
            </Link>
            <li className="">
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-700 md:text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                <OutsideClickHandler
                  onOutsideClick={() => setOpenDrodown(false)}
                >
                  <div class="relative" data-te-dropdown-ref>
                    <button
                      type="button"
                      id="dropdownMenuButton1"
                      data-te-dropdown-toggle-ref
                      aria-expanded="false"
                      data-te-ripple-init
                      data-te-ripple-color="light"
                      onClick={() => setOpenDrodown(!openDrodown)}
                    >
                      {user && user.username}
                    </button>
                    <ul
                      class={`absolute z-[1000] float-left m-0 ${
                        !openDrodown && "hidden"
                      } min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block`}
                      aria-labelledby="dropdownMenuButton1"
                      data-te-dropdown-menu-ref
                    >
                      {user && user.admin && (
                        <li
                          onClick={() => {
                            navigate("/dates");
                            setMenuVisible(false);
                          }}
                        >
                          <div className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600">
                            <div className="flex items-center gap-2">
                              <span>Agenda de citas</span>
                              <svg
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                height="1em"
                                width="1em"
                                className="w-5 h-5"
                              >
                                <path d="M6 1v2H5c-1.11 0-2 .89-2 2v14a2 2 0 002 2h6.1c1.26 1.24 2.99 2 4.9 2 3.87 0 7-3.13 7-7 0-1.91-.76-3.64-2-4.9V5a2 2 0 00-2-2h-1V1h-2v2H8V1M5 5h14v2H5m0 2h14v.67c-.91-.43-1.93-.67-3-.67-3.87 0-7 3.13-7 7 0 1.07.24 2.09.67 3H5m11-7.85c2.68 0 4.85 2.17 4.85 4.85 0 2.68-2.17 4.85-4.85 4.85-2.68 0-4.85-2.17-4.85-4.85 0-2.68 2.17-4.85 4.85-4.85M15 13v3.69l3.19 1.84.75-1.3-2.44-1.41V13z" />
                              </svg>
                            </div>
                          </div>
                        </li>
                      )}{" "}
                      {user && user.admin && (
                        <li
                          onClick={() => {
                            navigate("/admin-calendar");
                            setMenuVisible(false);
                          }}
                        >
                          <div className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600">
                            <div className="flex items-center gap-2">
                              <span>Calendario</span>
                              <svg
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                height="1em"
                                width="1em"
                                className="w-5 h-5"
                              >
                                <path d="M6 1v2H5c-1.11 0-2 .89-2 2v14a2 2 0 002 2h6.1c1.26 1.24 2.99 2 4.9 2 3.87 0 7-3.13 7-7 0-1.91-.76-3.64-2-4.9V5a2 2 0 00-2-2h-1V1h-2v2H8V1M5 5h14v2H5m0 2h14v.67c-.91-.43-1.93-.67-3-.67-3.87 0-7 3.13-7 7 0 1.07.24 2.09.67 3H5m11-7.85c2.68 0 4.85 2.17 4.85 4.85 0 2.68-2.17 4.85-4.85 4.85-2.68 0-4.85-2.17-4.85-4.85 0-2.68 2.17-4.85 4.85-4.85M15 13v3.69l3.19 1.84.75-1.3-2.44-1.41V13z" />
                              </svg>
                            </div>
                          </div>
                        </li>
                      )}
                      <li
                        onClick={() => {
                          logoutUser();
                          setOpenDrodown(false);
                          navigate("/");
                          setMenuVisible(false);
                        }}
                      >
                        <a
                          class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                          href="#"
                          data-te-dropdown-item-ref
                        >
                          <div className="flex  items-center gap-2">
                            <span>Cerrar Sesion</span>
                            <svg
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              viewBox="0 0 24 24"
                              height="1em"
                              width="1em"
                              className="w-4 h-4 text-white"
                            >
                              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
                            </svg>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                </OutsideClickHandler>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <Form isOpen={isOpen} setIsOpen={setIsOpen} />
    </nav>
  );
};

export default NavBar;
