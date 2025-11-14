import React from 'react'
import axiosInstance from '../lib/axios.js'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate('/');
  const handleLogout = ()=>{
    try{
      const res = axiosInstance.post('/logout');
      console.log(res.message);

      navigate('/login');
      
    }catch(error){
      console.log("error logging out", error);
      
    }
  }
  return (
    <div>
      Homepage
      <button onClick={()=>{handleLogout()}}>Logout</button>
    </div>

  )
}

export default Home;