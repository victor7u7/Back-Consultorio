import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { api } from "./Url";
import OutsideClickHandler from "react-outside-click-handler";

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

const ModalNotes = ({ isOpen, changeOpen, dateSelected }) => {
  const [text, setText] = useState(dateSelected.description);
  const [dateId, setDateId] = useState();
  useEffect(() => {
    setText(dateSelected.description);
    setDateId(dateSelected.id);
  }, [dateSelected.description]);
  const updateNotes = () => {
    axios
      .post(`${api}/api/notes/${dateId}`, { text })
      .then((res) => {
        console.log(res);
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
        // className={"w-1/2"}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <OutsideClickHandler onOutsideClick={() => changeOpen(false)}>
          <div>
            <div className="font-bold text-center text-lg">Notas</div>
            <div>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="textarea mt-5 textarea-info textarea-lg"
                placeholder="agrega tus pinches notas aqui"
              />
            </div>
            <div className="mt-2">
              <button
                disabled={
                  dateSelected.description &&
                  text &&
                  dateSelected.description === text
                }
                className="btn btn-sm btn-info"
                onClick={updateNotes}
              >
                Guardar
              </button>{" "}
            </div>
          </div>
        </OutsideClickHandler>
      </Modal>
    </div>
  );
};

export default ModalNotes;
