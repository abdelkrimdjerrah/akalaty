import Home from '../pages/home/Home';
import Recipes from '../pages/home/Recipes';
import Layout from './Layout';
import { Route, Routes } from 'react-router-dom';

function Router() {
  return (
    <Routes>
        <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="recipes" element={<Recipes />} />
        </Route>
    </Routes>
  )
}

export default Router