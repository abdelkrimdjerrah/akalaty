import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface Props {
  closeModal: (e: any) => void;
  children: React.ReactNode;
}

const Modal: React.FC<Props> = ({ closeModal, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    setIsOpen(true);

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <AnimatePresence  onExitComplete={() => closeModal}>
      {isOpen && (
        <motion.div
          className="z-50 bg-gray-900 bg-opacity-10 backdrop-blur-[1px] fixed h-screen left-0 right-0 bottom-0 flex items-center justify-center"
          onClick={()=> closeModal(true)}
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            initial={{ y: 30 }}
            animate={{ y: 0 }}
            
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;