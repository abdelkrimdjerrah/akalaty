import UserItem from "../../shared/UserItem";
import SidebarItem from "./SidebarItem";
import { House, Cookie } from "phosphor-react";
import { useLocation, useNavigate } from "react-router-dom";
import { selectUserData } from "../../redux/userSlice";
import { useSelector } from "react-redux";
var Abdelkrim = require("../../../assets/Abdelkrim.png");




function Sidebar() {
  let navigate = useNavigate();
  let location = useLocation();
  const userData = useSelector(selectUserData);
  return (
    <div className="bg-white min-w-[180px] h-fit lg:p-5 rounded-2xl">
      <div className="flex flex-col gap-4">
        <UserItem name={userData?.username ? userData?.username : 'test'} text={userData?.role ? userData?.role : 'test'} picture={Abdelkrim} />
        <div className="flex flex-col gap-2">
          <SidebarItem
            title="Home"
            Icon={House}
            active={location.pathname === "/" || location.pathname.startsWith("/posts/")}
            onClick={() => {
              navigate("/");
            }}
          />
          <SidebarItem
            title="Recipes"
            Icon={Cookie}
            active={location.pathname.startsWith("/recipes")}
            onClick={() => {
              navigate("/recipes");
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
