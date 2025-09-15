import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets';
import { AuthContext } from '../../context/AuthContext';

const ProfilePage = () => {

  const {authUser, updateProfile} = useContext(AuthContext); 
  const [selectedImg, setSelectedimg] = useState(null)
  const navigate = useNavigate();
  const [name, setName] = useState(authUser.fullName);
  const [bio, setBio] = useState(authUser.bio)

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(!selectedImg){
      await updateProfile({fullName:name, bio});
      navigate('/');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedImg);
    reader.onload = async () =>{
      const base64Image = reader.result;
      await updateProfile({profilePic:base64Image, fullName:name, bio})
      navigate('/');
    }
  }

  return (
    <div className='min-h-screen bg-black flex items-center justify-center'>
      <div className='w-5/6 max-w-2xl backdrop-blur-xl bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white border-2
      border-yellow-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg p-6'>

        <form onSubmit={handleSubmit} className='flex flex-col gap-5 flex-1'>
          <h3 className='text-2xl font-semibold text-yellow-400'>Profile details</h3>

          <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer'>
            <input onChange={(e)=>setSelectedimg(e.target.files[0])} type="file" id='avatar' accept='.png, .jpg, .jpeg' hidden />
            <img src={selectedImg ? URL.createObjectURL(selectedImg) : assets.avatar_icon } 
                 alt="" className={`w-16 h-16 ${selectedImg && "rounded-full"} `} />
            <span className='text-white'>Upload profile image</span>
          </label>

          <input onChange={(e)=> setName(e.target.value)} value={name}
                 type="text" required placeholder='Your name' 
                 className='p-3 bg-black/20 text-white border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-md' />

          <textarea onChange={(e)=>setBio(e.target.value)} value={bio} required 
                    placeholder='Write profile bio' rows={4}
                    className='p-3 bg-black/20 text-white border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-md' />

          <button type='submit' 
                  className='py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold rounded-md shadow-lg hover:shadow-xl transition'>
            Save
          </button>
        </form>

        <img className={`max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10 ${selectedImg && "rounded-full"} border-2 border-yellow-500`}
             src={authUser?.profilePic || assets.logo_icon} alt="" />

      </div>
    </div>
  )
}

export default ProfilePage
