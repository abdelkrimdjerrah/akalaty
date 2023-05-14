import { Outlet } from "react-router-dom"
import Navbar from "./navbar/Navbar"
import Sidebar from "./sidebar/Sidebar"
import Notification from "./notification/Notification"

function Layout() {
  return (
    <div className="h-[100vh] overflow-y-hidden bg-gray-100">
      <div className="">
        <Navbar />
        <div className="flex gap-5 justify-between mx-10 my-5 h-[100vh] overflow-y-hidden">
          <Sidebar />
          <div className="overflow-y-scroll scrollbar-hide">
            <div className="bg-white rounded-3xl w-full relative p-5">
                <Outlet />
            </div>
          </div>
          <Notification />
        </div>
      </div>
    </div>
  )
}

export default Layout
