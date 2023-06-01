import { useState } from "react";

export const useModal = () => {
  const [is_modal, set_modal] = useState(false);

  const toggleModal = () => {
    if (is_modal) {
      set_modal(false);
    } else {
      set_modal(true);
    }
  };

  return [is_modal, toggleModal];
};
