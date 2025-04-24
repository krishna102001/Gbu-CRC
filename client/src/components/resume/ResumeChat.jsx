import React, { useEffect, useRef, useState } from "react";
import { MdUploadFile } from "react-icons/md";
const botMessage = [
  {
    role: "ai",
    content: "hello i am llm how i can assist you",
  },
  {
    role: "user",
    content: "hello i am krishna",
  },
  {
    role: "ai",
    content: "hello i am llm how i can assist you",
  },
  {
    role: "user",
    content: "hello i am krishna",
  },
  {
    role: "ai",
    content: "hello i am llm how i can assist you",
  },
  {
    role: "user",
    content: "hello i am krishna",
  },
  {
    role: "ai",
    content: "hello i am llm how i can assist you",
  },
  {
    role: "user",
    content: "hello i am krishna",
  },
];

const ResumeChat = () => {
  const [messages, setMessages] = useState([]);
  const [query, setQuery] = useState("");
  useEffect(() => {
    setMessages(botMessage);
  }, []);
  //   useEffect(() => {
  //     messageRef.current?.scrollIntoView({ behavior: "smooth" });
  //   }, [messages]);
  const handleClick = () => {
    setMessages((prev) => [...prev, { role: "user", content: query }]);
    alert(`hello clicked ${query}`);
  };
  return (
    <div className='flex flex-col justify-between min-h-[80vh] p-4'>
      <div>
        <ResumeDisplay messages={messages} />
      </div>
      <div>
        <ResumeInput
          query={query}
          setQuery={setQuery}
          handleClick={handleClick}
        />
      </div>
    </div>
  );
};

const ResumeDisplay = ({ messages }) => {
  return (
    <div className=' flex-1 space-y-4 pr-2 overflow-y-auto '>
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex gap-2 items-end ${
            message.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          {message.role === "ai" && (
            <div className='w-8 h-8 bg-blue-500 p-2 rounded-full flex items-center justify-center'>
              🤖
            </div>
          )}

          <div
            className={`max-w-[70%] bg-gray-100 p-2 text-sm ${
              message.role === "user" ? " rounded-tl-lg " : " rounded-tr-lg "
            } rounded-bl-lg rounded-br-lg`}
          >
            <h1>{message.content}</h1>
          </div>
          {message.role === "user" && (
            <div className='w-8 h-8 bg-blue-600 p-2 rounded-full flex items-center justify-center text-white'>
              U
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const ResumeInput = ({ query, setQuery, handleClick }) => {
  const handlePdfFile = () => {
    const inputFile = document.createElement("input");
    inputFile.setAttribute("type", "file");
    inputFile.setAttribute("accept", "application/pdf");
    inputFile.click();
    //backend main resume pdf file send karna hain
    try {
    } catch (error) {}
  };
  return (
    <div className=' mt-4 flex  items-center gap-2'>
      <div
        className='hover:bg-gray-600 p-1 rounded-full relative group'
        onClick={handlePdfFile}
      >
        <MdUploadFile
          size={32}
          className='hover:text-white/70 cursor-pointer'
        />
        <div className='absolute hidden group-hover:block text-xs -top-10 bg-black/30 p-1 left-0 rounded'>
          Upload Resume
        </div>
      </div>
      <input
        type='text'
        placeholder='write job description  here .....'
        className='flex-1 p-2 rounded-md border border-black/40 focus:outline-none focus:ring-2 focus:ring-blue-400'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className='ml-2 p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 shadow-sm'
        onClick={handleClick}
      >
        Send
      </button>
    </div>
  );
};

export default ResumeChat;
