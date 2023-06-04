import axios from "axios";
import Modal from "react-modal";
import { api } from "./Url";
import { toast } from "react-hot-toast";
import AuthContext from "../AuthContext/AuthContext";
import { useContext } from "react";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#141212",
  },
  overlay: { zIndex: 999, backgroundColor: "#18191ab1" },
};
const MyModal = ({ date, hour, noHumanDate, isOpen, setIsOpen }) => {
  const { user } = useContext(AuthContext);

  const sendDate = () => {
    axios
      .put(
        `${api}/api/able/${noHumanDate.year}/${noHumanDate.month}/${noHumanDate.day}/${user.id}`,
        { del_time: hour }
      )
      .then((res) => {
        console.log(res);
        toast.success("Reservada con Exito!, Buen día");
        setIsOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        ariaHideApp={false}
        // onAfterOpen={afterOpenModal}
        // onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="text-center">Tu cita será reservada para el: </div>
        <div className="font-bold text-cente m-2">
          {date} a las {hour}hrs{" "}
        </div>
        <div className="flex justify-center gap-5">
          <button className="btn btn-error" onClick={() => setIsOpen(false)}>
            Cancelar
          </button>
          <button className="btn btn-success" onClick={sendDate}>
            Aceptar
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default MyModal;
