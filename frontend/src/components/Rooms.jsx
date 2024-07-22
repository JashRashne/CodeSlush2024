import React, { useState } from "react";

const CommunityChat = () => {
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

  const PostCard = ({ title, imageUrl, description }) => {
    return (
      <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
        {/* Image */}
        <img className="w-full h-48 object-cover" src={imageUrl} alt={title} />
        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          {/* Description */}
          <p className="text-gray-700 mb-4">{description}</p>
          {/* Like Button */}
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
            Like
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full flex">
      <div className="h-full w-[40%] flex flex-col ">
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
            <div className="w-full h-[80%] border border-gray-100 flex items-center justify-center">
              <ul class="space-y-4 text-left text-gray-600">
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
      <div className="h-full w-[60%] flex flex-col-reverse">
        <div className="w-full h-[30%] p-2">
          <form>
            <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50  ">
              <div class="px-4 py-2 bg-white rounded-t-lg ">
                <label for="comment" class="sr-only">
                  Your comment
                </label>
                <textarea
                  id="comment"
                  rows="4"
                  class="w-full px-0 text-sm text-gray-900 bg-white border-0   "
                  placeholder="Write seomthing..."
                  required
                ></textarea>
              </div>
              <div class="flex items-center justify-between px-3 py-2 border-t ">
                <button
                  type="submit"
                  class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
                >
                  Post comment
                </button>
                <div class="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
                  <button
                    type="button"
                    class="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100   "
                  >
                    <svg
                      class="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 12 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"
                      />
                    </svg>
                    <span class="sr-only">Attach file</span>
                  </button>
                  <button
                    type="button"
                    class="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100   "
                  >
                    <svg
                      class="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 20"
                    >
                      <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                    </svg>
                    <span class="sr-only">Set location</span>
                  </button>
                  <button
                    type="button"
                    class="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100   "
                  >
                    <svg
                      class="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 18"
                    >
                      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                    <span class="sr-only">Upload image</span>
                  </button>
                </div>
              </div>
            </div>
          </form>
          <p class="ms-auto text-xs text-gray-500 ">
            Remember, contributions to this topic should follow our{" "}
            <a href="#" class="text-blue-600  hover:underline">
              Community Guidelines
            </a>
            .
          </p>
        </div>
        <div className="w-full h-[60%] bg-yellow-50 flex flex-col">
          <div className="w-full h-[20%]  flex">
            <div className="h-full w-[15%] flex items-center justify-center p-2 ">
              <div className="h-full w-[75%] rounded-full bg-black"></div>
            </div>
            <div className="h-full w-[85%] flex flex-col ">
              <div className="bg-red-100 w-full h-[50%]">
                <span className="font-semibold text-xl">Jash Rashne</span>
              </div>
              <div className="bg-red-100 w-full h-[50%]">
                <span className="text-gray-300 text-sm">@JashRashne</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityChat;
