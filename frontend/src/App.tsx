import './App.css'
import { Routes ,Route } from 'react-router-dom'
import  Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import  {Dashboard} from "./pages/Dashboard"
import SendMoney from './pages/SendMoney'
function App() {

  return (
    <Routes>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/send' element={<SendMoney/>}/>
    </Routes>

  )
}

export default App
