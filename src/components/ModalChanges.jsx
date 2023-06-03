import Modal from "react-modal";

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
const ModalChanges = ({ dates, open, changeOpen, accept, list }) => {
  const generateHumanDate = () => {
    const year = dates[0];
    const month = dates[1] - 1; // Month is zero-based, so 5 represents June
    const day = dates[2];

    const date = new Date(year, month, day);
    const formattedDate = date.toLocaleDateString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return formattedDate;
  };
  return (
    <div>
      <Modal
        isOpen={open}
        ariaHideApp={false}
        // onAfterOpen={afterOpenModal}
        // onRequestClose={closeModal}
        // className={"w-1/2"}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          <div>Se Harán los siguientes cambios: </div>
          <div>
            Fecha: <span className="font-bold">{generateHumanDate()}</span>{" "}
          </div>
          <div>
            horarios:{" "}
            <p className="font-bold whitespace-normal break-words">
              {list.length === 0 ? "Sin disponibilidad" : list.join(", ")}
            </p>{" "}
          </div>
          <div className="text-center">
            <p className="font-bold">¿Aceptar Cambios?</p>
            <div className="flex justify-center gap-2">
              <button
                className="btn btn-success w-1/4"
                onClick={() => {
                  accept();
                  changeOpen(false);
                }}
              >
                SI
              </button>
              <button
                className="btn btn-error w-1/4"
                onClick={() => changeOpen(false)}
              >
                NO
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalChanges;
