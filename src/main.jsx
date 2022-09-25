import React from 'react'
import ReactDOM from 'react-dom/client'
import WritePost from './components/writepost/WritePost'
import Login from './components/login/Login'
import Signup from './components/signup/Signup'
import App from './App'
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/new' element={cookies.get('token')?<WritePost/>:<Navigate to='/login' />}/>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
