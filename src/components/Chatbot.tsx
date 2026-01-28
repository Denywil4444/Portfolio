import  { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion, AnimatePresence } from "framer-motion";
import profilePic from '../assets/photos/nonoy_pic.png';



const PORTFOLIO_CONTEXT = `
You are DenAI, the AI assistant for Denywil's portfolio. 
You have access to the following background info, but DO NOT list it all at once. 
Only answer specific questions based on this data:

- Role: Web Developer, Frontend Developer, System Developer, Freelancer
- About Him:
  - Mobile Number: 09706354463 
  - Location: Balasan, Iloilo
  - Birthdate: May 4, 2003
  - Email: denywillanac4444@gmail.com
  - Degree: Bachelor of Science in Information Technology
- Achievements or Certifications:
  - Civil Service Exam Passer, with a rating of 81.19
  - eBudget System Completion
  - Northern Iloilo State University Internship Certificate, total of 486 hours
  - SSBI Internship Certiticate, total of 300 hours.
- Professional Skills: React.js, Tailwind CSS, Framer Motion, JavaScript, TypeScript, MySQL and PHP.
- Technology used: Git, Github, Xampp, Postman, Gemini Ai
- Soft Skills: Problem Solving, Team Collaboration, Time Management, Good Communication, Critical Thinking, Attention to Details.
- Projects: 
    1. Pawtify (Dog adoption), 2. Settle Space (Home rental), 3. BRMS (Barangay reports), 4. Finance (Transactions), 5. Samaritan (Funeral system).
- Experience:
    1. Northern Iloilo State University (Web Dev Intern) - eBudget System
    2. SSBI Food Services (Software Dev Intern) - React/Node Scalable Apps
    3. Freelancer (Web Developer) - Modern responsive sites.
- Goal: To showcase Denywil's work and connect with potential employers.

CONSTRAINTS:
- Keep your initial greeting brief.
- Do not dump all your knowledge in one message. 
- If someone asks "What can you do?", explain that you can answer questions about Denywil's skills and projects.
- Keep responses concise and professional.
`;

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Chatbot = ({ isOpen, setIsOpen }: ModalProps) => {
  const initialMessage = { role: "bot", text: "Hello! I'm DenAI. I'm here to answer any questions you have about Denywil's work. How can I help?" };
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([initialMessage]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isMaximized, isOpen]);

  const handleClearChat = () => {
    if (window.confirm("Are you sure you want to clear the conversation?")) {
      setMessages([initialMessage]);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash", 
        systemInstruction: PORTFOLIO_CONTEXT 
      });

      const chatHistory = messages
        .filter((msg, index) => !(index === 0 && msg.role === "bot"))
        .map(m => ({
          role: m.role === "bot" ? "model" : "user",
          parts: [{ text: m.text }],
        }));

      const chat = model.startChat({ history: chatHistory });
      const result = await chat.sendMessage(userMessage);
      const response = await result.response;
      
      setMessages(prev => [...prev, { role: "bot", text: response.text() }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: "bot", text: "wrong: Connection failed. Check your API key or connection." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const chatWindow = (
    <AnimatePresence>
      {isOpen && (
        <>
          {!isMaximized && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-[999] backdrop-blur-[2px] bg-black/20 dark:bg-black/40" 
              onClick={() => setIsOpen(false)}
            />
          )}

          <motion.div 
            layout
            initial={isMaximized ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 10 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              width: isMaximized ? "100vw" : "auto",
              height: isMaximized ? "100vh" : "auto"
            }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`fixed z-[9999] flex flex-col ${
              isMaximized 
                ? "inset-0 top-0 left-0" 
                : "top-4 left-4 right-4 bottom-24 md:top-auto md:left-auto md:right-6 md:bottom-6 md:w-80 pointer-events-none items-center md:items-end"
            }`}
          >
            <div className={`overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl pointer-events-auto flex flex-col w-full h-full ${
              isMaximized ? "rounded-none" : "rounded-2xl"
            }`}>
              
              {/* Header */}
              <div className="bg-slate-950 dark:bg-black p-4 text-white flex justify-between items-center shadow-md shrink-0">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img src={profilePic} className="w-9 h-9 rounded-full object-cover border border-white/20" alt="Profile" />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-slate-900 dark:border-black rounded-full"></span>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">DenAI</h3>
                    <p className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">Active now</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={handleClearChat}
                    className="hover:bg-white/10 p-1.5 rounded-full transition-colors text-slate-300 hover:text-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                  </button>
                  <button 
                    onClick={() => setIsMaximized(!isMaximized)}
                    className="hover:bg-white/10 p-1.5 rounded-full transition-colors text-slate-300 hover:text-white"
                  >
                    {isMaximized ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v5H3M21 8h-5V3M3 16h5v5M16 21v-5h5"/></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                    )}
                  </button>
                  <button 
                    onClick={() => { setIsOpen(false); setIsMaximized(false); }} 
                    className="hover:bg-white/10 p-1.5 rounded-full transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m18 6-12 12"/><path d="m6 6 12 12"/></svg>
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div ref={scrollRef} className={`bg-slate-50 dark:bg-gray-800/50 p-4 overflow-y-auto flex flex-col gap-4 flex-grow ${isMaximized ? "" : "h-[45vh] md:h-80"}`}>
                <div className={isMaximized ? "max-w-4xl mx-auto w-full flex flex-col gap-4 py-8" : "contents"}>
                  {messages.map((msg, index) => (
                    <div key={index} className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      {msg.role === 'bot' && (
                        <div className="relative self-end mb-1 shrink-0">
                          <img src={profilePic} className="w-7 h-7 rounded-full object-cover border border-slate-200 dark:border-slate-700 shadow-sm" alt="Bot" />
                          <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 border border-white dark:border-slate-900 rounded-full"></span>
                        </div>
                      )}
                      {msg.role === 'user' && (
                        <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center self-end mb-1 border border-slate-300 dark:border-slate-700 shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-600 dark:text-slate-400" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        </div>
                      )}
                      <div className={`${isMaximized ? "max-w-[70%]" : "max-w-[80%]"} p-3 text-xs shadow-sm rounded-2xl ${
                        msg.role === 'user' 
                          ? "bg-slate-900 dark:bg-white text-white dark:text-black rounded-br-none" 
                          : msg.text.includes("wrong") 
                            ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/30 rounded-bl-none" 
                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-700 rounded-bl-none"
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-2.5">
                      <div className="relative self-end mb-1 shrink-0">
                        <img src={profilePic} className="w-7 h-7 rounded-full object-cover" alt="Bot" />
                      </div>
                      <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-slate-100 dark:border-slate-700 flex gap-1 items-center">
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Input Area */}
              <div className={`border-t border-slate-100 dark:border-slate-800 p-3 bg-white dark:bg-slate-900 shrink-0 ${isMaximized ? "pb-12 pt-6" : ""}`}>
                <div className={`relative flex items-center w-full ${isMaximized ? "max-w-4xl mx-auto" : ""}`}>
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type a message..." 
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 pl-4 pr-10 py-2.5 text-xs text-slate-800 dark:text-slate-100 outline-none focus:border-slate-900 dark:focus:border-slate-400 focus:ring-1 focus:ring-slate-900/10 transition-all placeholder:text-slate-400" 
                  />
                  <button 
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                    className="absolute right-2 p-1.5 text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:text-slate-300 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden relative transition-transform active:scale-90 outline-none"
      >
        <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white dark:border-slate-800 shadow-md">
          <img src={profilePic} className="w-full h-full object-cover" alt="Toggle Chat" />
        </div>
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
      </button>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hidden md:flex fixed bottom-6 right-6 z-[50] group transition-all hover:scale-105 active:scale-95 outline-none"
      >
        <div className="w-14 h-14 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl group-hover:shadow-slate-500/10">
          <img src={profilePic} className="w-full h-full object-cover" alt="Toggle Chat" />
        </div>
        <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-4 border-white dark:border-slate-800 rounded-full"></span>
        <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full animate-ping opacity-75"></span>
      </button>

      {createPortal(chatWindow, document.body)}
    </>
  );
};

export default Chatbot;