import Logo from "../../../assets/logo.svg";
import { SignOut } from "phosphor-react";
import Searchbar from "./Searchbar";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios  from "../../api/axios";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout, setLogout] = useState(false);
  
    const handleLogout = async () => {
      try {
        dispatch(logoutUser());
        navigate("/");
        const { data } = await axios.post(`/api/auth/logout`);   
      } catch (err) {}      
    };
 


  return (
    <div className="bg-white w-full px-16 pt-2 pb-2 flex items-center justify-between">
      <div onClick={() => navigate('/')} className="cursor-pointer">
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
