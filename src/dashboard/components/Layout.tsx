import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";
import Notification from "./notification/Notification";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "../api/axios";



function Layout() {
  
  return (
    <div>
      <div className=" flex justify-center">
        <div className="fixed top-0 right-0 left-0 z-20">
          <div className="sticky top-0 right-0 left-0 z-20">
            <Navbar />
          </div>
        </div>

        <div className="fixed left-10 top-20 z-20 w-fit hidden lg:inline">
          <div className="sticky left-10 top-20 z-20 w-fit">
            <Sidebar />
          </div>
        </div>

        <div className="fixed right-10 top-20 z-20 w-fit hidden lg:inline">
          <div className="sticky right-10 top-20 z-20 w-fit">
            <Notification />
          </div>
        </div>

        {/* margin right 50px to center the outlet properly, because the sidebar width is less than notification by 50px */}
        <div className="my-20 w-[80%] lg:w-2/5 mr-0 lg:mr-[50px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
