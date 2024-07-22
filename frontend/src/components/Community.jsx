import React, { useState } from "react";

import close from "../assets/close.png";
const CommunityChat = ({ setIsCommunityOpen }) => {
  // Static messages for demonstration
  const initialMessages = [
    {
      text: "Guys! What's up with Amey today? He didn't attend any lectures!",
      sender: "Juhi",
    },
    {
      text: "BRO!!! He fell down a flight of stairs and broke his nose!",
      sender: "You",
    },
    { text: "JESUS!!! WHATTT??", sender: "Juhi" },
    { text: "I swear bro I'm not kiddng?", sender: "You" },
    { text: "When did this happen?", sender: "Juhi" },
  ];

  const [messages, setMessages] = useState(initialMessages);
  const [messageInput, setMessageInput] = useState("");

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setMessages([...messages, { text: messageInput, sender: "You" }]);
      setMessageInput("");
    }
  };

  return (
    <>
      <div
        onClick={() => {
          setIsCommunityOpen(false);
        }}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 w-7 h-7 cursor-pointer flex items-center justify-center"
      >
        <img src={close} alt="close" />
      </div>
      <div className="h-full w-[38%] flex flex-col ">
        <div className="w-full h-[40%] rounded-lg p-2">
          <iframe
            className="h-full w-full rounded-lg"
            src="https://www.youtube.com/embed/Cg_GW7yhq20"
            title="Healthy Lifestyle"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
        <div className="w-full h-[60%] rounded-xl p-2">
          <div className=" rounded-xl h-full w-full flex flex-col">
            <div className="w-full h-[20%] bg-gray-100 flex items-center justify-center rounded-t-xl">
              <span className="font-bold">SOME IMPORTANT GUIDLINES</span>
            </div>
            <div className="w-full h-[80%] bg-gray-300 border border-gray-100 flex items-center justify-center">
              <ul class="space-y-4 text-left text-gray-600 h-f">
                <li class="flex items-center space-x-3 rtl:space-x-reverse">
                  <svg
                    class="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 12"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5.917 5.724 10.5 15 1.5"
                    />
                  </svg>
                  <span>Be Respectful and Courteous</span>
                </li>
                <li class="flex items-center space-x-3 rtl:space-x-reverse">
                  <svg
                    class="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 12"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5.917 5.724 10.5 15 1.5"
                    />
                  </svg>
                  <span>Share Relevant Content</span>
                </li>
                <li class="flex items-center space-x-3 rtl:space-x-reverse">
                  <svg
                    class="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 12"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5.917 5.724 10.5 15 1.5"
                    />
                  </svg>
                  <span>Engage in Constructive Discussions</span>
                </li>
                <li class="flex items-center space-x-3 rtl:space-x-reverse">
                  <svg
                    class="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 12"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5.917 5.724 10.5 15 1.5"
                    />
                  </svg>
                  <span>Respect Privacy and Confidentiality</span>
                </li>
                <li class="flex items-center space-x-3 rtl:space-x-reverse">
                  <svg
                    class="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 12"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5.917 5.724 10.5 15 1.5"
                    />
                  </svg>
                  <span>Report Issues Promptly</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="h-full w-[61%] flex flex-col-reverse p-2 ">
        <div className="flex flex-col h-screen bg-gray-50 border rounded-t-lg overflow-hidden">
          {/* Header */}
          <header className="bg-[#0BA1A2] text-white p-4  text-center">
            <h1 className="text-xl font-semibold">Community Chat</h1>
          </header>

          {/* Chat Area */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "You" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-lg max-w-xs ${
                      msg.sender === "You"
                        ? "bg-[#E5F4F5] text-[#0BA1A2] border border-[#0BA1A2]"
                        : "bg-[#0BA1A2] text-white"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className=" rounded-b-lg p-4 border-t border-gray-300">
            <div className="flex items-center">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="flex-1 border border-gray-300 p-2 rounded-lg mr-2"
                placeholder="Type your message..."
              />
              <button
                onClick={handleSendMessage}
                className="bg-[#0BA1A2] text-white p-2 rounded-lg"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommunityChat;
