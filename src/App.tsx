import Layout from './dashboard/components/Layout'
import Router from './dashboard/components/Router'
import { BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <div className="bg-gray-100 h-[100vh]">
      <BrowserRouter>
        <Router /> 
      </BrowserRouter>
    </div>
  )
}

export default App