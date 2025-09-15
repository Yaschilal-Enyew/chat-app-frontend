import React from "react";

const ChatContainer = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-4xl bg-gradient-to-b from-gray-900 via-black to-gray-950 backdrop-blur-2xl rounded-2xl shadow-2xl p-6 flex flex-col h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-700 pb-4 mb-4">
          <h2 className="text-white text-xl font-semibold">EthioChat</h2>
          <button className="text-sm text-gray-400 hover:text-white transition">Logout</button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto space-y-4 p-2 custom-scrollbar">
          {/* Example Messages */}
          <div className="flex justify-start">
            <div className="max-w-xs bg-gray-800 text-white p-3 rounded-2xl rounded-bl-none shadow-md">
              Selam! How are you?
            </div>
          </div>
          <div className="flex justify-end">
            <div className="max-w-xs bg-gradient-to-r from-green-500 to-green-700 text-white p-3 rounded-2xl rounded-br-none shadow-md">
              I'm good, alhamdulillah. You?
            </div>
          </div>
        </div>

        {/* Input Box */}
        <div className="mt-4 flex items-center border-t border-gray-700 pt-4">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <button className="ml-3 px-6 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-xl shadow-lg hover:opacity-90 transition">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
