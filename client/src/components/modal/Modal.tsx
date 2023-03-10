import React from "react";
import ReactDOM from "react-dom";
import ModalCSS from "../../assets/Modal.module.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/authentication/store/authenticationSlice";

interface ModalProps {
  open: boolean;
  setIsModalOpen: (open: boolean) => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, setIsModalOpen, children }) => {
  const user = useSelector((state: any) => state.session);
  useEffect(() => {
    if (user?.id) setIsModalOpen(false);
  }, [user]);

  if (!open) {
    // navigate("/");
    return null;
  }
  return ReactDOM.createPortal(
    <div>
      <div className={ModalCSS.overlay} onClick={() => setIsModalOpen(false)} />
      <div className={ModalCSS.modal}>{children}</div>
    </div>,
    document.getElementById("portal")
  );
};

export default Modal;
