import { useState } from "react";

export function useToggleList(intialList = []) {
  const [list, setList] = useState(intialList);
  const toggleList = (item) => {
    if (list.includes(item)) {
      const updateList = list.filter((id) => id !== item);
      setList(updateList);
    } else {
      setList([...list, item]);
    }
  };
  return {
    list,
    toggleList,
    setList,
  };
}
