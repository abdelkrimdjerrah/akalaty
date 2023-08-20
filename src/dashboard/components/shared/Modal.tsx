import { useEffect } from "react";

interface Props {
  closeModal: (e: any) => void;
  children: React.ReactNode;
}

const Modal: React.FC<Props> = ({ closeModal, children }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div
      onClick={closeModal}
      className="z-50  bg-gray-900 bg-opacity-10 backdrop-blur-[1px] fixed h-screen left-0 right-0 bottom-0 flex items-center justify-center"
    >
      {children}
    </div>
  );
};

export default Modal;
