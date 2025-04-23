import Home from './Home'
import Login from  './Login'
import UserHome from './UserHome'
import Create from './Createtodo'
import Edit from './Edittodo'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/:user' element={<Navigate to='home' replace />} />
      <Route path='/:user/home/' element={<UserHome />}></Route>
      <Route path='/:user/create' element={<Create />}></Route>
      <Route path='/:user/edit/:index' element={<Edit />}></Route>
      
      </Routes>
    </BrowserRouter>
  )
}

export default App
