import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { api } from "../components/Url";
import toast, { Toaster } from "react-hot-toast";
import { host } from "../components/host";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isOpenAuth, setIsOpenAuth] = useState(true);
  let [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const updateData = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  const loginUser = (credentials) => {
    axios
      .post(`${api}/api/login`, credentials)
      .then((res) => {
        if (res.status === 202) {
          //   console.log(res.data.success);
          setUser(res.data.user);
          //   setIsOpenAuth(false);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          window.location.href = `${host}/admin-calendar`;
        }
        if (res.status === 200) {
          setUser(res.data.user);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          window.location.href = `${host}/calendar`;
        }
        // setIsOpen(false);
        console.log(res);
      })
      .catch((err) => {
        // alert(err);
        setIsOpenAuth(true);
        toast.error("Ups algo salió mal, intentalo de nuevo", {
          duration: 2500,
        });

        // setTimeout(() => {
        //   setIsError(false);
        // }, 2500);
      });
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const contextData = {
    loginUser,
    user,
    updateData,
    logoutUser,
    isOpenAuth,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
