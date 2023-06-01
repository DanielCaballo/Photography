import { useState } from "react";

export const useModal2 = () => {
  const [is_modal2, set_modal2] = useState(false);

  const toggleModal2 = () => {
    if (is_modal2) {
      set_modal2(false);
    } else {
      set_modal2(true);
    }
  };

  return [is_modal2, toggleModal2];
};
