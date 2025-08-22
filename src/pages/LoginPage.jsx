import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'
import {  useNavigate } from 'react-router-dom'

const LoginPage = () => {

  const [currState, setCurrState] = useState("Sign up")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const [agree, setAgree] = useState(false);


  const {login} = useContext(AuthContext);
  const navigate = useNavigate();

 const onSubmitHandler = (e)=>{
  e.preventDefault();

  if (currState === "Sign up" && !agree) {
    alert("You must agree to the terms to continue.");
    return;
  }

  if(currState === "Sign up" && !isDataSubmitted){
    setIsDataSubmitted(true)
    return;
  }

  login(currState==="Sign up" ? "signup" : "login", {fullName, email,password, bio})
 }



  return (
    <div className='min-h-screen bg-cover bg-center flex items-center
    justify-center gap-5 sm:justify-evenly max-sm:flex-col '>

      {/* --------- left  --------- */}
      <img src={assets.aura} alt="" className='w-[min(60vw,450px)] backdrop-blur-2xl' />

      {/* ---------  right ----------- */}

      <form onSubmit={onSubmitHandler} className='border-2 bg-white/8 text-white border-gray-500 p-6 flex
      flex-col gap-6 rounded-lg shadow-lg backdrop-blur-2xl' >
        <h2 className='font-medium text-2xl flex justify-between items-center'> 
          {currState}
          {isDataSubmitted && <img onClick={()=>setIsDataSubmitted(false)} src=
          {assets.arrow_icon} alt="" className='w-5 cursor-pointer' />
          }
          
        </h2>
        {currState === "Sign up" && !isDataSubmitted && (
        <input onChange={(e)=>setFullName(e.target.value)} value={fullName}
         type="text" className='p-2 border border-gray-500 rounded-md
        focus:outline-none focus:ring-2
        focus:ring-indingo-500' placeholder='Full Name' required />
        )}

      {!isDataSubmitted && (
        <>
        <input onChange={(e)=>setEmail(e.target.value)} value={email}
        type="email" placeholder='Email Address' required className='
        p-2 border border-gray-500 rounded-md
        focus:outline-none focus:ring-2
        focus:ring-indingo-500'/>
        <input onChange={(e)=>setPassword(e.target.value)} value={password}
        type="password" placeholder='Password' required className='
        p-2 border border-gray-500 rounded-md
        focus:outline-none focus:ring-2
        focus:ring-indingo-500'/>
        </>
      )}

      {
        currState === "Sign up" && isDataSubmitted && (
          <textarea onChange={(e)=>setBio(e.target.value)} value={bio}
           rows={4} className='p-2 border border-gray-500 rounded-md
        focus:outline-none focus:ring-2
        focus:ring-indingo-500' 
        placeholder='provide a short bio...' required></textarea>
        )
      }

      <button className='py-3 bg-gradient-to-r from-green-400 to-green-650  text-white rounded-md cursor-pointer'>
        {currState === 'Sign up' ? "Create Account" : "Login Now"}
      </button>

      <div className='flex items-center gap-2 text-sm text-white'>
        <input type="checkbox" value={agree} onChange={(e) => setAgree(e.target.checked)}
    required />
        <p>Agree to the terms of use & privacy policy.</p>
      </div>
     
     <div className='flex flex-col gap-2'>
      {currState === 'Sign up' ? (
       
         <div>
          <p className='text-sm text-white'>Already have an account? <span
         onClick={()=>{setCurrState('Login'); setIsDataSubmitted(false)} } className='
        font-medium text-green-500 cursor-pointer'>login here <br /> 
        
        </span>  </p>
        <p className='text-xs mt-3 flex ml-12'>© 2025 Developed by Yaschilal</p>

        </div>
       
        
      ) : ( <div className='flex flex-col gap-4'>
        <span onClick={()=>{navigate('/reset-password')}}
          className='font-medium text-green-500 cursor-pointer'>Forgot password?
        </span>
        <p className='text-sm text-gray-600'>create an account <span onClick={()=>{
          setCurrState('Sign up')}} className=' font-medium text-violet-500 
          cursor-pointer'>click here</span></p>
          
          </div>
      )}

     </div>
     
      </form>
    </div>
  )
}

export default LoginPage