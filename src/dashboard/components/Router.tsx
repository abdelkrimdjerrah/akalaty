import Home from '../pages/home/Home';
import Recipes from '../pages/recipes/Recipes';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import Layout from './Layout';
import { Route, Routes } from 'react-router-dom';

function Router() {
  return (
    <Routes>
        <Route path="signin" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="/" element={<Layout />}>
            <Route index path="/" element={<Home />} />
            <Route path="recipes" element={<Recipes />} />
        </Route>
    </Routes>
  )
}

export default Router