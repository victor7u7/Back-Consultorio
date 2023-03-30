import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Loader2 from "./Loader2";
import { api } from "./Url";

const VerifyEmail = () => {
  const paramsUrl = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const sendValidation = () => {
    setIsLoading(true);
    axios
      .post(`${api}/api/verify`, {
        token: paramsUrl.token,
        user_id: paramsUrl.user_id,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setIsLoading(false);
          toast.success("Correo verificado exitosamente", { duration: 2400 });
          setTimeout(() => {
            navigate("/");
          }, 2500);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    sendValidation();
  }, []);

  return (
    <div className="h-screen bg-gray-900">
      <Toaster />
      <div></div>
      {isLoading && <Loader2 />}
    </div>
  );
};

export default VerifyEmail;
