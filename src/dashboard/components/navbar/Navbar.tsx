import Logo from "../../../assets/logo.svg";
import { SignOut, X } from "phosphor-react";
import Searchbar from "./Searchbar";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import { BellRinging } from "phosphor-react";
import { useEffect, useState } from "react";
import Notifications from "../notification/Notifications";
import axios from "../../api/axios";
import Modal from "../../shared/Modal";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout, setLogout] = useState(false);
  const [showModalNotif, setShowModalNotif] = useState(false);

  const handleLogout = async () => {
    try {
      dispatch(logoutUser());
      navigate("/");
      const { data } = await axios.post(`/api/auth/logout`);
    } catch (err) {}
  };

  return (
    <div className="bg-white w-full px-16 pt-2 pb-2 flex items-center justify-between">
      <div onClick={() => navigate("/")} className="cursor-pointer">
        <img src={Logo} alt="" className="h-[40px]" />
      </div>
      <div className="hidden md:inline w-[35%]">
        <Searchbar />
      </div>
      <div
        className="flex gap-3 items-center"
        
      >
        <div className="inline lg:hidden " onClick={() => setShowModalNotif(true)}>
          <BellRinging size={21} />
        </div>

        <div className="cursor-pointer flex gap-1 items-center" onClick={handleLogout}>
          <p className="text-sm">Logout</p>
          <SignOut size={23} />
        </div>
      </div>

      <div className="inline lg:hidden fixed ">
      {showModalNotif && (
        <Modal
          closeModal={() => {
            setShowModalNotif(false);
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-[500px]  max-h-[80%] overflow-y-scroll bg-white w-[95%] md:min-w-[500px]   p-5 rounded-2xl relative"
          >
            <div onClick={() => setShowModalNotif(false)}>
              <X
                size={21}
                className="text-gray-400 cursor-pointer hover:text-black absolute right-5 top-5"
              />
            </div>
            
            <div>
              <Notifications widthfull/>
            </div>

          </div>
        </Modal>
      )}
      </div>
     

    </div>
  );
}

export default Navbar;
