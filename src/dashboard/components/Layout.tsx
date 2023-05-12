import { Outlet } from "react-router-dom"
import Navbar from "./navbar/Navbar"
import Sidebar from "./sidebar/Sidebar"
import Notification from "./notification/Notification"

function Layout() {
  return (
    <div>
      <Navbar />
      <div className="flex gap-5 justify-between m-5">
        <Sidebar />
        <div className="bg-white h-fit p-5 rounded-3xl w-full">
          <Outlet />
        </div>
        <Notification />
      </div>
    </div>
  )
}

export default Layout