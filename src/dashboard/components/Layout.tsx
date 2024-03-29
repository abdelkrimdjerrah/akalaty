import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";
import Notifications from "./notification/Notifications";

function Layout() {
  
  return (
    <div>
      <div className=" flex justify-center">
        <div className="fixed top-0 right-0 left-0 z-20">
          <div className="sticky top-0 right-0 left-0 z-20">
            <Navbar />
          </div>
        </div>

        <div className="fixed left-3 top-20 z-50 w-fit hidden 2lg:inline">
          <div className="sticky left-3 top-20 z-50 w-fit">
            <Sidebar />
          </div>
        </div>

        <div className="fixed right-3 top-20 z-20 w-fit hidden 2lg:inline">
          <div className="sticky right-3 top-20 z-20 w-fit">
            <Notifications />
          </div>
        </div>

        {/* margin right 50px to center the outlet properly, because the sidebar width is less than notification by 50px */}
        <div className="my-20 w-[95%] 2md:w-[80%] 2lg:w-[52%] mr-0 2lg:mr-[90px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
