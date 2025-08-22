import React, { useContext, useEffect, useRef, useState } from 'react'
import assets from '../assets/assets'
import { formatMessageTime } from '../lib/utils'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'
import toast from 'react-hot-toast'

const ChatContainer = () => {

  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } = useContext(ChatContext)
  const { authUser, onlineUsers } = useContext(AuthContext);
  const [isShowProfileClicked, setIsShowProfileClicked] = useState(false);
  const {logout } = useContext(AuthContext) 
  
  const scrolEnd = useRef()
  const [msgImages, setMsgimages] = useState([]);
  const [input, setInput] = useState("");

    // handle sending s message
    const handleSendMessage = async(e)=>{
        e.preventDefault();
        if(input.trim() === "" ) return null;
        await sendMessage({text: input.trim()});
        setInput("");
    }

    // handle sending image 
    const handleSendImage = async(e)=>{
      const file = e.target.files[0];
      if(!file || !file.type.startsWith("image/")){
        toast.error("select an image file");
        return;
      }
      const reader = new FileReader();
      reader.onloadend= async ()=>{
        await sendMessage({image:reader.result})
        e.target.value = ""
      }
      reader.readAsDataURL(file)
    }

    useEffect(()=>{
      if(selectedUser){
        getMessages(selectedUser._id);
        setMsgimages(messages.filter(msg => msg.image).map(msg=> msg.image))
      }
    },[selectedUser,messages])

    useEffect(()=>{
      if(scrolEnd.current ){
        scrolEnd.current.scrollIntoView({behavior:'smooth', block: "end"})
      }
    },[messages])

  return selectedUser ?  (
    <div>
    <div className={` h-full overflow-scroll relative backdrop-blur-lg ${isShowProfileClicked ? "max-md:hidden" : "block"}`}>

      {/* --------------  header  --------- */}
      <div className='flex items-center gap-3 py-3 mx-4 border-b border-stone-500'>
        <img onClick={()=>{setIsShowProfileClicked(!isShowProfileClicked)}}   src={selectedUser.profilePic || assets.avatar_icon} alt="" className=' cursor-pointer w-8 rounded-full' />
        <p className=' flex-1 text-lg text-white gap-2 flex items-center '>
          {selectedUser.fullName}
        {onlineUsers.includes(selectedUser._id) && <span className='w-2 h-2 rounded-full bg-green-500' ></span>}
        </p>
        <img onClick={()=> setSelectedUser(null)} src={assets.arrow_icon} alt=""
         className='md:hidden max-w-7' />
        <img src={assets.help_icon} alt="" className='max-md:hidden max-w-5' />
      </div>

      {/* --------  chat area  ------ */}
      <div className={`flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3
      pb-6  `}>
        {messages.map((msg,index)=>(
          <div key={index} className={`flex items-end gap-2 justify-end 
          ${msg.senderId !== authUser._id && 'flex-row-reverse'}`} >
            {msg.image ? (
              <img src={msg.image} alt='' className='max-w-[230px] border
              border-gray-700 rounded-lg overflow-hidden mb-8'/>
            ):(
              <p className={`p-2 max-w-[200px] md:text-sm font-light
                rounded-lg mb-8 break-all bg-violet-500/30 text-white 
                ${msg.senderId=== authUser._id ? 'rounded-br-none' :
                  'rounded-bl-none'} `} >{msg.text}</p>
            )}
            <div className='text-center text-xs'>
             <img src={msg.senderId === authUser._id ? authUser?.profilePic || assets.avatar_icon 
              : selectedUser?.profilePic || assets.avatar_icon} alt="" className='w-7 rounded-full' />
              <p className='text-gray-500' >{formatMessageTime(msg.createdAt) }</p>
            </div>
          </div>
        ))}
        <div ref={scrolEnd}></div>
      </div>

      {/* bottom area */}
      <div className='absolute bottom-0 right-0 flex items-center gap-3 p-3'>
         <div className='flex-1 flex items-center bg-gray-100/12 px-3 rounded-full ' >
           <input onChange={(e)=>setInput(e.target.value)} value={input} onKeyDown={(e)=> e.key === "Enter" ? handleSendMessage(e) : null} type="text" placeholder='Send a message' 
           className='flex-1 text-sm p-3 border-none rounded-lg outline-none
           text-white placeholder-gray-400 '/>
           <input onChange={handleSendImage} type="file"  id="image" accept='image/png, image/jpeg' hidden />
           <label htmlFor="image">
            <img src={assets.gallery_icon} alt="" className='w-5 mr-2 cursor-pointer' />
           </label>
         </div>
         <img onClick={handleSendMessage} src={assets.send_button} alt="" className='w-7 cursor-pointer' />
      </div>
    </div>

 {/*  Show Profile for Small Screen */}
    {isShowProfileClicked && (
      <div
  className={`md:hidden bg-[#8185B2]/10 text-white w-full h-screen flex flex-col`}>
  {/* ------- Top Content ------- */}
  <div className="flex-1 overflow-y-auto">
    <div className="pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto">
      <img onClick={()=> setIsShowProfileClicked(!isShowProfileClicked)} src={assets.arrow_icon} alt=""
         className='md:hidden max-w-7 invert ml-50' />
      <img
        src={selectedUser?.profilePic || assets.avatar_icon}
        alt=""
        className="w-20 aspect-[1/1] rounded-full" />
      <h1
        className="px-10 text-xl font-medium mx-auto flex items-center gap-2"
      >
        {onlineUsers.includes(selectedUser._id) && (
          <p className="w-2 h-2 rounded-full bg-green-500"></p>
        )}
        {selectedUser.fullName}
      </h1>
      <p className="px-10 mx-auto">{selectedUser.bio}</p>
    </div>
    <hr className="border-[#ffffff50] my-4" />

    <div className="px-5 text-xs">
      <p>Media</p>
      <div className="mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-80">
        {msgImages.map((url, index) => (
          <div
            key={index}
            onClick={() => window.open(url)}
            className="cursor-pointer rounded"
          >
            <img src={url} alt="" className="h-full rounded-md" />
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* ------- Fixed Bottom Button ------- */}
  <div className="p-5">
    <button
      onClick={() => {
        logout();
      }}
      className="w-full bg-gradient-to-r from-purple-400 to-violet-600 text-white border-none
      text-sm font-light py-2 rounded-full cursor-pointer"
    >
      Logout
    </button>
  </div>
</div>
)}
{/* end of show profile for small screen */}
    </div>
  ) : (
    <div className='flex flex-col items-center justify-center gap-2 text-gray-500
    bg-white/10 max-md:hidden'>
      <img src={assets.aura} className='max-w-150' />
      <p className='text-lg font-medium text-white'>Chat anytime, anywhere with friends<br /> Developed by Yaschilal</p>
    </div>
  )
}

export default ChatContainer
