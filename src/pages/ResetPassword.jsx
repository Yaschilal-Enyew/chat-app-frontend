import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
 

function ResetPassword() {

    const { sendOtp, handleReset} = useContext(AuthContext);

    const [email , setEmail] = useState('')
    const [newPassword, setNewPassword]= useState('');
    const [isEmailSent, setIsEmailSent] = useState(false)

    const [isOtpSubmited, setIsOtpSubmited] = useState(false)
    const navigate = useNavigate();



    const inputRefs = React.useRef([]);
    const [parOtp, setParOtp] = useState(Array(6).fill(''));
    const [otp, setOtp] = useState('')

      // Handle input change for a single OTP field
    const handleOtpChange = (e, index) => {
        const { value } = e.target;
        const newOtp = [...parOtp];
        if (!/^\d*$/.test(value)) {
            return;
        }
        newOtp[index] = value;
        setParOtp(newOtp);
        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };
    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };
    
    const handlePaste = (e) => {
        const pasteData = e.clipboardData.getData('text').slice(0, 6);
        const newOtp = Array(6).fill('');

        for (let i = 0; i < pasteData.length; i++) {
            if (/\d/.test(pasteData[i])) {
                newOtp[i] = pasteData[i];
            }
        }
        setParOtp(newOtp);
        
        if (newOtp.join('').length === 6) {
            inputRefs.current[5].focus();
        } else {
            const nextEmptyIndex = newOtp.findIndex(char => char === '');
            if (nextEmptyIndex !== -1) {
                inputRefs.current[nextEmptyIndex].focus();
            }
        }
    };


     const onSubmitEmail = async(e)=>{
        e.preventDefault();
        try {
            const res = await sendOtp(email);
         if (res.success) {
         setIsEmailSent(true);
         toast.success("OTP sent successfully!");
            } else {
         toast.error(res.message || "Failed to send OTP");
           }
        } catch (error) {
            toast.error(error.message);
        }
     }

     const onSubmitNewPassword= async (e) => {
        e.preventDefault()
        try {
            const res = await handleReset(email, otp, newPassword);
            if(res.success){
                toast.success(res.message);
                navigate('/login')
            }
        } catch (error) {
            toast.error(error.message)
        }
        
     }

     // Handle form submission for the OTP input
  const onSubmitOtp = async (e) => {
  e.preventDefault();
  const fullOtp = parOtp.join('');
  if (fullOtp.length !== 6) {
    toast.error("Please enter the full 6-digit OTP.");
    return;
  }
  setOtp(fullOtp);   // ✅ update otp state
  setIsOtpSubmited(true);
};


     useEffect(() => {
        if (isEmailSent && inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, [isEmailSent]);


  return (
    
    <div className={`  border w-full h-screen sm:px-[15%] sm:py-[5%] backdrop-blur-2xl`}>
      {!isEmailSent && (
         <form onSubmit={onSubmitEmail} className='border-2 w-100 m-auto bg-white/8 text-white border-gray-500 p-6 flex justify-center 
      flex-col gap-6 rounded-lg shadow-lg backdrop-blur-2xl' >

        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100">Provide Email</h2>
        <p className="text-center text-gray-600 dark:text-gray-400">Enter your email address</p>
        <input onChange={(e)=>setEmail(e.target.value)} value={email}
        type="email" placeholder='Email Address' required className='
        p-2 border border-gray-500 rounded-md
        focus:outline-none focus:ring-2
        focus:ring-indigo-500'/>
        <button
                            type="submit"
                            className="w-full py-3 text-white transition duration-300 rounded-md cursor-pointer bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700"
                        >   Submit
                        </button>
      </form>
      )}


{/* otp submitt */}
{!isOtpSubmited && isEmailSent && 
 // OTP verification form
                    <form onSubmit={onSubmitOtp} onPaste={handlePaste} className="border-2 w-100 m-auto bg-white/8 text-white border-gray-500 p-6 flex justify-center 
      flex-col gap-6 rounded-lg shadow-lg backdrop-blur-2xl">
                        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100">Verify OTP</h2>
                        <p className="text-center text-gray-600 dark:text-gray-400">Enter the 6-digit code sent to your email.</p>
                        <div className="flex justify-center flex-wrap gap-2">
                            {parOtp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={el => inputRefs.current[index] = el}
                                    value={digit}
                                    onChange={(e) => handleOtpChange(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    type="text"
                                    maxLength={1}
                                    className="flex-1 w-0 h-12 text-2xl text-center text-gray-800 bg-gray-100 border border-gray-300 rounded-lg outline-none min-w-[40px] max-w-[50px] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:focus:border-indigo-400"
                                    required
                                />
                            ))}
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 text-white transition duration-300 rounded-md cursor-pointer bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700"
                        >
                            Verify Code
                        </button>
                    </form>
      }

    
{isEmailSent && isOtpSubmited &&
<form onSubmit={onSubmitNewPassword} className='border-2 w-100 m-auto bg-white/8 text-white border-gray-500 p-6 flex justify-center 
      flex-col gap-6 rounded-lg shadow-lg backdrop-blur-2xl' >

        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100">New Password</h2>
        <p className="text-center text-gray-600 dark:text-gray-400">Enter new password below.</p>
        <input onChange={(e)=>setNewPassword(e.target.value)} value={newPassword}
        type="password" placeholder='Enter New Password' required className='
        p-2 border border-gray-500 rounded-md
        focus:outline-none focus:ring-2
        focus:ring-indingo-500'/>
        <button
                            type="submit"
                            className="w-full py-3 text-white transition duration-300 rounded-md cursor-pointer bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700"
                        >
                            Submit
                        </button>
      </form>
      }    
     
    </div>
  )
}

export default ResetPassword
