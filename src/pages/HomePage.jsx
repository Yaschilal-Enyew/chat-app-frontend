import React, { useContext } from 'react'
import ChatContainer from '../components/ChatContainer.jsx';
import RightSideBar from '../components/RightSideBar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import { ChatContext } from '../../context/ChatContext.jsx';
import { AuthContext } from '../../context/AuthContext.jsx';

const HomePage = () => {

  const {selectedUser} = useContext(ChatContext)
  const { authUser } = useContext(AuthContext);

  return (
    <div className={`  border w-full h-screen sm:px-[15%] sm:py-[5%] ${authUser && 'backdrop-blur-2xl'}`}>
      <div className={`grid h-full w-full border
        ${selectedUser ? ' md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]' : 'md:grid-cols-2'}
        `}>
        <Sidebar />
        <ChatContainer />
        <RightSideBar  />
        
      </div>
  
    </div>
  )
}

export default HomePage