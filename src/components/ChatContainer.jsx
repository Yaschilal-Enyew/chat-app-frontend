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
  const { logout } = useContext(AuthContext)

  const scrolEnd = useRef()
  const [msgImages, setMsgimages] = useState([]);
  const [input, setInput] = useState("");

  // Modal state
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return null;
    await sendMessage({ text: input.trim() });
    setInput("");
  }

  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = async () => {
      await sendMessage({ image: reader.result })
      e.target.value = ""
    }
    reader.readAsDataURL(file)
  }

  // Get images from messages
  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
      setMsgimages(messages.filter(msg => msg.image).map(msg => msg.image))
    }
  }, [selectedUser, messages])

  // Modal functions
  const openImageModal = (url) => {
    setSelectedImage(url);
    setIsImageModalOpen(true);
  }

  const closeImageModal = () => {
    setSelectedImage(null);
    setIsImageModalOpen(false);
  }

  return selectedUser ? (
    <div className="min-h-screen bg-black flex flex-col relative">
      <div className={`h-full overflow-scroll relative backdrop-blur-xl bg-gradient-to-b from-gray-900 via-black to-yellow-950/20 ${isShowProfileClicked ? "max-md:hidden" : "block"} shadow-2xl`}>

        {/* Header */}
        <div className='flex items-center gap-3 py-3 mx-4 border-b border-yellow-600/40'>
          <img onClick={() => { setIsShowProfileClicked(!isShowProfileClicked) }} src={selectedUser.profilePic || assets.avatar_icon} alt="" className='rounded-full cursor-pointer w-10' />
          <p className='flex-1 text-lg text-yellow-300 gap-2 flex items-center'>
            {selectedUser.fullName}
            {onlineUsers.includes(selectedUser._id) && <span className='w-2 h-2 rounded-full bg-green-400'></span>}
          </p>
          <img onClick={() => setSelectedUser(null)} src={assets.arrow_icon} alt="" className='md:hidden max-w-7 invert' />
          <img src={assets.help_icon} alt="" className='max-md:hidden max-w-5 invert' />
        </div>

        {/* Chat Area */}
        <div className={`flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6`}>
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-end gap-2 justify-end ${msg.senderId !== authUser._id ? 'flex-row-reverse' : ''}`} >
              {msg.image ? (
                <img 
                  src={msg.image} 
                  alt='' 
                  className='max-w-[230px] border border-yellow-500/30 mb-8 shadow-md cursor-pointer'
                  onClick={() => openImageModal(msg.image)}
                />
              ) : (
                <p className={`p-2 max-w-[200px] md:text-sm font-light mb-8 break-all
                  ${msg.senderId === authUser._id
                    ? 'rounded-br-none bg-blue-700 rounded-2xl text-white shadow-md'
                    : 'rounded-bl-none bg-green-700 text-yellow-50 rounded-2xl shadow-md'}`}>
                  {msg.text}
                </p>
              )}
              <div className='text-center text-xs'>
                <img src={msg.senderId === authUser._id ? authUser?.profilePic || assets.avatar_icon : selectedUser?.profilePic || assets.avatar_icon} alt="" className='w-7 rounded-full' />
                <p className=' text-yellow-400'>{formatMessageTime(msg.createdAt)}</p>
              </div>
            </div>
          ))}
          <div ref={scrolEnd}></div>
        </div>

        {/* Bottom Input */}
        <div className='absolute bottom-0 right-0 flex items-center gap-3  bg-black/20 w-full  mx-4 mb-4'>
          <div className='flex-1 flex items-center bg-yellow-900/20 px-3'>
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              onKeyDown={(e) => e.key === "Enter" ? handleSendMessage(e) : null}
              type="text"
              placeholder='Send a message'
              className='flex-1 text-sm p-3 border-none outline-none rounded-2xl w-full text-yellow-100 placeholder-white bg-transparent' />
            <input onChange={handleSendImage} type="file" id="image" accept='image/png, image/jpeg' hidden />
            <label htmlFor="image">
              <img src={assets.gallery_icon} alt="" className='w-5 mr-2 cursor-pointer ' />
            </label>
          </div>
          <button onClick={handleSendMessage} className='px-6 py-3 bg-gradient-to-r rounded-2xl from-yellow-500 to-yellow-600 text-black shadow-lg hover:opacity-90 transition'>Send</button>
        </div>
      </div>

      {/* Show Profile for small screens */}
      {isShowProfileClicked && (
        <div className={`md:hidden bg-black/80 text-yellow-300 w-full h-screen flex flex-col backdrop-blur-xl`}>
          <div className="flex-1 overflow-y-auto">
            <div className="pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto">
              <img onClick={() => setIsShowProfileClicked(!isShowProfileClicked)} src={assets.arrow_icon} alt="" className='md:hidden max-w-7 invert ml-50' />
              <img src={selectedUser?.profilePic || assets.avatar_icon} alt="" className="w-20 rounded-full aspect-[1/1]" />
              <h1 className="px-10 text-xl font-medium mx-auto flex items-center gap-2">
                {onlineUsers.includes(selectedUser._id) && (
                  <p className="w-2 h-2 rounded-full bg-green-400"></p>
                )}
                {selectedUser.fullName}
              </h1>
              <p className="px-10 mx-auto">{selectedUser.bio}</p>
            </div>
            <hr className="border-yellow-500/30 my-4" />
            <div className="px-5 text-xs">
              <p>Media</p>
              <div className="mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-90">
                {msgImages.map((url, index) => (
                  <div key={index} onClick={() => openImageModal(url)} className="cursor-pointer rounded">
                    <img src={url} alt="" className="h-full shadow-md" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="p-5">
            <button onClick={() => logout()} className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black text-sm font-light py-2 shadow-lg">Logout</button>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {isImageModalOpen && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 cursor-pointer"
          onClick={closeImageModal}
        >
          <img src={selectedImage} alt="preview" className="max-h-[90%] max-w-[90%] rounded-lg shadow-lg" />
        </div>
      )}

    </div>
  ) : (
    <div className='flex flex-col items-center justify-center gap-2 text-yellow-300 bg-black/20 max-md:hidden h-full'>
      <img src="/boom.svg" className='max-w-100' />
      <p className='text-lg font-medium text-yellow-300 text-center'>Chat anytime, anywhere with friends </p>
      <img src="/logo.svg" alt="logo" />
    </div>
  )
}

export default ChatContainer
