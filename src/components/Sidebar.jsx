import React, { useContext, useEffect, useState } from "react";
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'

const Sidebar = () => {

  const {getUsers, users, selectedUser, setSelectedUser,
    unseenMessages, setUnseenMessages  } = useContext(ChatContext);

  const {logout, onlineUsers} = useContext(AuthContext)

  const [input, setInput] = useState(false);
  const [isOptionClicked, setIsOptionClicked] = useState(false);

  const navigate = useNavigate();

  const filteredUsers = input ? users.filter((user)=>user.fullName.toLowerCase().includes(input.toLowerCase())) : users;

  useEffect(()=>{
    getUsers();
  },[onlineUsers])

  return (
    <div className={`flex flex-col bg-gradient-to-b from-black via-gray-900 to-black h-full p-5 text-white shadow-xl ${selectedUser ? "max-md:hidden" : ""}`}>

      {/* Logo and Options */}
      <div className='pb-5'>
        <div className='flex justify-between items-center'>
          <img src="/logo.svg" alt='logo' className='max-w-40' />
          <div onClick={()=>setIsOptionClicked(!isOptionClicked)} className="relative py-2 group">
            <img src={assets.menu_icon} alt="Menu" className='max-h-5 cursor-pointer' />
            <div className={`${isOptionClicked ? "block" : "hidden"} absolute top-full right-0 z-20 w-36 p-5 rounded-md bg-black/80 border border-yellow-600 text-yellow-300`}>
              <p onClick={()=>navigate('/profile')} className='cursor-pointer text-sm hover:text-yellow-500 transition'>Edit Profile</p>
              <hr className='my-2 border-yellow-700' />
              <p onClick={()=> logout()} className='cursor-pointer text-sm hover:text-yellow-500 transition'>Logout</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className='bg-black/60 border border-yellow-600 rounded-full flex items-center gap-2 py-3 px-4 mt-5'>
          <img src={assets.search_icon} alt="search" className='w-3' />
          <input onChange={(e)=> setInput(e.target.value) } type="text" className='bg-transparent border-none outline-none 
          text-sm placeholder-yellow-400 flex-1' placeholder='Search User...' />
        </div>
      </div>

      {/* User List */}
      <div className='mt-5 flex-1 overflow-y-auto'>
        {filteredUsers.map((user, index)=>(
          <div key={index} 
            onClick={()=>{
              setSelectedUser(user); 
              setUnseenMessages(prev=>({...prev, [user._id]:0}))
            }}
            className={`flex items-center gap-3 p-3 cursor-pointer transition
            ${selectedUser?._id === user._id ? 'bg-yellow-900/30' : 'hover:bg-yellow-800/20'}`}>
            
            <img src={user?.profilePic || assets.avatar_icon} alt=''
              className='w-10 aspect-square rounded-full border border-yellow-600' />
            
            <div className='flex-1 flex flex-col'>
              <p className='text-white'>{user.fullName}</p>
              <span className={`${onlineUsers.includes(user._id) ? 'text-green-400' : 'text-gray-400'} text-xs`}>
                {onlineUsers.includes(user._id) ? 'Online' : 'Offline'}
              </span>
            </div>

            {unseenMessages[user._id] >0 && (
              <p className='h-5 w-5 flex justify-center items-center rounded-full bg-yellow-500 text-black text-xs'>
                {unseenMessages[user._id]}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Divider */}
     <hr className="block sm:hidden border-t border-yellow-600 my-2" />


      {/* Sticky Logout Button */}
      <div className='mt-auto md:hidden'>
  <button
    onClick={()=> logout()}
    className='w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black py-2 text-sm font-medium rounded-lg shadow-lg hover:opacity-90 transition'
  >
    Logout
  </button>
</div>
    </div>
  )
}

export default Sidebar;
