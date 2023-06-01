import * as React from "react";

import { close_svg } from "./elements_modal";

export function withModal(
  Component: React.FC | React.ComponentClass,
  props: object,
  control: { has_modal: boolean; toggleModal: () => void }
): React.ComponentClass {
  return class x extends React.Component {
    render() {
      return (
        <div className={`o-modal ${control.has_modal ? "" : "o-modal--hidden"}`}>
          <div className={"m-modal__container"}>
            <div className={"m-modal__header"}>
              <span onClick={control.toggleModal}>{close_svg} </span>
            </div>
            <div className={"m-modal__component"}>
              <Component {...props} />
            </div>
          </div>
        </div>
      );
    }
  };
}
