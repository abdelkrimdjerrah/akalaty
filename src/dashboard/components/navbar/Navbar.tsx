import Logo from "../../../assets/logo.svg";
import { SignOut } from "phosphor-react";
import Searchbar from "./Searchbar";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/userSlice";
import { useDispatch } from "react-redux";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/signin");
  };
  return (
    <div className="bg-white w-full px-16 pt-2 pb-2 flex items-center justify-between">
      <div>
        <img src={Logo} alt="" className="h-[40px]" />
      </div>
      <div className="hidden md:inline w-[35%]">
        <Searchbar />
      </div>
      <div
        className="cursor-pointer flex gap-1 items-center"
        onClick={handleLogout}
      >
        <p className="text-sm">Logout</p>
        <SignOut size={23} />
      </div>
    </div>
  );
}

export default Navbar;
