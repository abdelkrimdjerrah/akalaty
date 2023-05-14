import UserItem from "../../shared/UserItem";
import SidebarItem from "./SidebarItem";
import { House, Cookie } from "phosphor-react";
import { useLocation, useNavigate } from "react-router-dom";
var Abdelkrim = require('../../../assets/Abdelkrim.png');

function Sidebar() {

  let navigate = useNavigate();
  let location = useLocation();

  return (
    <div className="bg-white min-w-[250px] h-fit p-5 rounded-2xl">
      <div className="flex flex-col gap-4">
        <UserItem name="Abdelkrim" text="Chief" picture={Abdelkrim}/>
        <div className="flex flex-col gap-2">
          <SidebarItem
            title="Home"
            Icon={House}
            active={location.pathname === "/"}
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
