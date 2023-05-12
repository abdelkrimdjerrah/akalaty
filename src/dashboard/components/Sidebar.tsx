import UserItem from "../shared/UserItem";
import SidebarItem from "../shared/SidebarItem";
import { House, Cookie } from "phosphor-react";
import { useLocation, useNavigate } from "react-router-dom";

function Sidebar() {

  let navigate = useNavigate();
  let location = useLocation();

  return (
    <div className="bg-white w-fit h-fit m-10 p-8 rounded-3xl">
      <div className="flex flex-col gap-2">
        <UserItem />
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
  );
}

export default Sidebar;
