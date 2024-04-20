import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }) => {
  const elRef = useRef(null); //useRef is used to store the reference of the element, same as document.getElementById
  if (!elRef.current) {
    const div = document.createElement("div");
    elRef.current = div;
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);

    return () => modalRoot.removeChild(elRef.current);
  }, []); //this will run only once

  return createPortal(<div>{children}</div>, elRef.current); //createPortal is used to render the children in the div
};

export default Modal;
