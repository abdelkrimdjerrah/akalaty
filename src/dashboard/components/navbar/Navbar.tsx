import Logo from "../../../assets/logo.svg";
import { SignOut, X, List } from "phosphor-react";
import Searchbar from "./Searchbar";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import { BellRinging } from "phosphor-react";
import { useEffect, useState } from "react";
import Notifications from "../notification/Notifications";
import axios from "../../api/axios";
import Modal from "../shared/Modal";
import Sidebar from "../sidebar/Sidebar";
import { useLocation } from "react-router-dom";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout, setLogout] = useState(false);
  const [showModalNotif, setShowModalNotif] = useState(false);
  const [showModalMenu, setShowModalMenu] = useState(false);

  const handleLogout = async () => {
    try {
      dispatch(logoutUser());
      navigate("/");
      const { data } = await axios.post(`/api/auth/logout`);
    } catch (err) {}
  };

  let location = useLocation();

  useEffect(() => {
    //when user change the route, we close the modal
    setShowModalMenu(false)
  }
  , [location.pathname]);

  return (
    <div className="bg-white w-full px-9 pt-2 pb-2 flex items-center justify-between relative">
      <div onClick={() => navigate("/")} className="cursor-pointer">
        <img src={Logo} alt="" className="h-[40px]" />
      </div>

      <div className="flex gap-3 items-center">
        <div
          className="inline 2lg:hidden "
          onClick={() => setShowModalNotif(true)}
        >
          <BellRinging size={21} />
        </div>

        <div
          className="inline 2lg:hidden "
          onClick={() => setShowModalMenu(true)}
        >
          <List size={21} />
        </div>

        <div
          className="cursor-pointer hidden 2lg:flex gap-1 items-center"
          onClick={handleLogout}
        >
          <p className="text-sm">Logout</p>
          <SignOut size={23} />
        </div>
      </div>

      {/* for notification modal */}
      <div className="inline 2lg:hidden fixed ">
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
                <Notifications />
              </div>
            </div>
          </Modal>
        )}
      </div>

      {/* for menu modal */}
        {showModalMenu && (
          <>
          
            <div onClick={() => {
                setShowModalMenu(false);
              }}
              className="  bg-gray-900 bg-opacity-10 backdrop-blur-[1px] absolute top-0 left-0 h-screen w-full"
            />

            <div className="lg:hidden absolute z-40 top-0 bg-white h-screen w-[75%] md:w-1/2 left-0 p-5">
                <div onClick={() => setShowModalMenu(false)}>
                  <X
                    size={21}
                    className="text-gray-400 cursor-pointer hover:text-black absolute right-5 top-[17px]"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  
                  <Sidebar />

                  <div className="fixed bottom-8 pr-11 w-[75%] md:w-1/2 ">
                    <hr className="w-full"/>
                    <div
                      className="cursor-pointer flex gap-1 pl-3 mt-5"
                      onClick={handleLogout}
                    >
                      <SignOut size={23} />
                      <p className="text-sm font-medium">Logout</p>
                    </div>
                  </div>

                </div>
              </div>
          
          </>
        )}
      </div>
  );
}

export default Navbar;
