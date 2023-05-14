import Layout from './dashboard/components/Layout'
import Router from './dashboard/components/Router'
import { BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Router /> 
      </BrowserRouter>
    </div>
  )
}

export default App