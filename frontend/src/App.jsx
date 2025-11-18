import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Admin from './pages/Admin.jsx'
import './App.css'

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path='/signup' element={<Signup/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/admin' element={<Admin/>} />
        <Route path='/' element={<Home/>} />
      </Routes>
    </div>
  )
}

export default App;