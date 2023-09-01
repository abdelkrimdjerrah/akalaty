import Home from "../pages/home/Home";
import Recipes from "../pages/recipes/Recipes";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Layout from "./Layout";
import OnePost from "./post/OnePost";
import Notifications from "../pages/notifications/Notifications";
import { Route, Routes } from "react-router-dom";
import { selectUserData } from "../redux/userSlice";
import { useSelector } from "react-redux";
import OneRecipe from "./recipe/OneRecipe";
import CreateRecipe from "./recipe/create/CreateRecipe";

function Router() {
  const user = useSelector(selectUserData);
  return (
    <Routes>
      {user ? (
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="posts/:id" element={<OnePost />} />
          <Route path="recipes" element={<Recipes />} />
          <Route path="recipes/create" element={<CreateRecipe />} />
          <Route path="recipes/:id" element={<OneRecipe />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
      ) : (
        <Route path="/">
          <Route  path="/" element={<Login />} />
          <Route  path="signin" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      )}
    </Routes>
  );
}

export default Router;
