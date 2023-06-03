import { useState } from "react";
import Modal from "react-modal";
import TimeKeeper from "react-timekeeper";

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
const ModalTime = ({
  list,
  open,
  changeOpen,
  toggleList,
  changeDate,
  dateSelected,
}) => {
  const [time, setTime] = useState("12:33");
  const [isOpen, setIsOpen] = useState(false);
  const handleTime = () => {
    toggleList(time);
    changeDate({ ...dateSelected, times: dateSelected.times, time });
    const updatedTimes = Array.isArray(dateSelected.times)
      ? [...dateSelected.times, time]
      : [time];
    changeDate({ ...dateSelected, times: updatedTimes });
  };
  return (
    <div>
      <Modal
        isOpen={open}
        ariaHideApp={false}
        // onAfterOpen={afterOpenModal}
        // onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <TimeKeeper
          time={time}
          onChange={(data) => {
            console.log(list.includes(data.formatted24));
            setTime(data.formatted24);
          }}
        />
        <div className="text-center pt-4">
          <button
            onClick={() => {
              handleTime();
              changeOpen(false);
            }}
            disabled={list.includes(time)}
            className="btn btn-info"
          >
            Agregar
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ModalTime;
