import Home from "../pages/home/Home";
import Recipes from "../pages/recipes/Recipes";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Layout from "./Layout";
import { Route, Routes } from "react-router-dom";
import { selectUserData } from "../redux/userSlice";
import { useSelector } from "react-redux";

function Router() {
  const user = useSelector(selectUserData);
  return (
    <Routes>
      {user ? (
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="recipes" element={<Recipes />} />
        </Route>
      ) : (
        <Route path="/">
          <Route index path="/" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      )}
    </Routes>
  );
}

export default Router;
