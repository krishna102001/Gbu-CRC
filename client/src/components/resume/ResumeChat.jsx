import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { MdUploadFile } from "react-icons/md";
import { toast } from "react-toastify";

const botMessage = [
  {
    role: "ai",
    content: "Hello! I am CRC AI model 🤖",
  },
  {
    role: "ai",
    content: "To know your ATS Score, please upload your resume first 📄",
  },
];

const ResumeChat = () => {
  const [messages, setMessages] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const { backendUrl } = useContext(AppContext);

  useEffect(() => {
    setMessages(botMessage);
  }, []);

  const handleClick = async () => {
    if (query.length === 0) {
      toast.error("Please provide a job description.");
      return;
    }
    setLoading(true);
    setMessages((prev) => [...prev, { role: "user", content: query }]);

    try {
      const { data } = await axios.post(`${backendUrl}/api/students/chat/ai`, {
        query,
      });

      if (data.success) {
        setQuery("");
        const aiMessage =
          typeof data.message === "string"
            ? { role: "ai", content: data.message }
            : { role: "ai", content: data.message };

        setMessages((prev) => [...prev, aiMessage]);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
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
          loading={loading}
          setMessages={setMessages}
        />
      </div>
    </div>
  );
};

const ResumeDisplay = ({ messages }) => {
  const [expandedMessages, setExpandedMessages] = useState({});

  const toggleExpand = (index) => {
    setExpandedMessages((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const truncateText = (text, wordLimit = 30) => {
    const words = text.trim().split(/\s+/);
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  return (
    <div className='flex-1 space-y-4 pr-2 overflow-y-auto'>
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
            className={`max-w-[70%] bg-gray-100 p-3 text-sm ${
              message.role === "user" ? "rounded-tl-lg" : "rounded-tr-lg"
            } rounded-bl-lg rounded-br-lg`}
          >
            {typeof message.content === "string" ? (
              <>
                <p>
                  {message.role === "user" && !expandedMessages[index]
                    ? truncateText(message.content)
                    : message.content}
                </p>
                {message.role === "user" &&
                  message.content.trim().split(/\s+/).length > 30 && (
                    <button
                      onClick={() => toggleExpand(index)}
                      className='text-blue-600 text-xs mt-1 underline'
                    >
                      {expandedMessages[index] ? "Show less" : "Show more"}
                    </button>
                  )}
              </>
            ) : (
              <div className='space-y-2'>
                <p className='font-semibold text-blue-700'>
                  ✅ ATS Score: {message.content.ats_score} / 100
                </p>
                <div>
                  <p className='font-semibold underline'>
                    🔧 Key Missing Skills:
                  </p>
                  <ul className='list-disc ml-5 text-gray-700'>
                    {message.content.key_missing_skill.map((skill, i) => (
                      <li key={i}>{skill}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className='font-semibold underline'>🔑 Keyword Match:</p>
                  <div className='flex flex-wrap gap-2 mt-1'>
                    {message.content.keyword_analysis.map((word, i) => (
                      <span
                        key={i}
                        className='bg-blue-200 text-blue-800 px-2 py-1 rounded-md text-xs'
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className='font-semibold underline'>
                    📈 Resume Improvement Suggestions:
                  </p>
                  <ul className='list-decimal ml-5 text-gray-700'>
                    {message.content.improvement_resume.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
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

const ResumeInput = ({
  query,
  setQuery,
  handleClick,
  setMessages,
  loading,
}) => {
  const { backendUrl } = useContext(AppContext);

  const handlePdfFile = () => {
    const inputFile = document.createElement("input");
    inputFile.setAttribute("type", "file");
    inputFile.setAttribute("accept", "application/pdf");
    inputFile.click();

    inputFile.addEventListener("change", async () => {
      try {
        const formData = new FormData();
        formData.append("pdf", inputFile.files[0]);

        const { data } = await axios.post(
          `${backendUrl}/api/students/upload/pdf`,
          formData
        );

        if (data.success) {
          toast.success(data.message);
          setMessages((prev) => [
            ...prev,
            {
              role: "user",
              content: "📤 Resume Uploaded Successfully ✅",
            },
            {
              role: "ai",
              content: "Now provide me the Job Description (JD) 📋",
            },
          ]);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Upload failed");
        console.error(error);
      }
    });
  };

  return (
    <div className='mt-4 flex items-center gap-2'>
      <div
        className='hover:bg-gray-600 p-1 rounded-full relative group'
        onClick={handlePdfFile}
      >
        <MdUploadFile
          size={32}
          className='hover:text-white/70 cursor-pointer'
        />
        <div className='absolute hidden group-hover:block text-xs -top-10 bg-black/70 text-white px-2 py-1 rounded'>
          Upload Resume
        </div>
      </div>
      <input
        type='text'
        placeholder='Write job description here...'
        className='flex-1 p-2 rounded-md border border-black/40 focus:outline-none focus:ring-2 focus:ring-blue-400'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className='ml-2 p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 shadow-sm'
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Send"}
      </button>
    </div>
  );
};

export default ResumeChat;
