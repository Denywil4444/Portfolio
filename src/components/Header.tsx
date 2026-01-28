import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Chatbot from '../components/Chatbot';

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => 
    typeof window !== 'undefined' ? document.documentElement.classList.contains('dark') : false
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <>
      {/* Optimized Full Page Ripple Overlay */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={isDarkMode ? 'dark-ripple' : 'light-ripple'}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "circOut" }}
          className={`fixed inset-0 z-[-1] pointer-events-none will-change-transform ${
            isDarkMode ? 'bg-stone-950' : 'bg-stone-50'
          }`}
        />
      </AnimatePresence>

      <header className="fixed top-0 left-0 w-full z-20 p-4 pointer-events-none">
        <nav className={`
          flex justify-between items-center w-full max-w-6xl mx-auto 
          transition-all duration-300 pointer-events-auto
          ${isScrolled 
            ? 'px-4 py-2 rounded-4xl backdrop-blur-3xl border border-stone-200 dark:border-stone-800 shadow-lg' 
            : 'bg-transparent border-transparent'
          }
          md:bg-transparent md:backdrop-blur-none md:border-none md:shadow-none md:p-0
        `}>
          
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="font-bold text-xl text-stone-800 dark:text-stone-50 p-2 px-3 rounded-xl transition-colors">
              {"<Deny/>"}
            </h1>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3 pr-2">
            <button 
              onClick={toggleDarkMode}
              className="relative flex items-center justify-center rounded-xl p-2 hover:bg-stone-200 dark:hover:bg-stone-800 transition-all active:scale-90"
              aria-label="Toggle Theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isDarkMode ? 'sun' : 'moon'}
                  initial={{ scale: 0, rotate: -45, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  exit={{ scale: 0, rotate: 45, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="will-change-transform"
                >
                  {isDarkMode ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400 fill-yellow-400/10">
                      <circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-700 fill-stone-700/10">
                      <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/>
                    </svg>
                  )}
                </motion.div>
              </AnimatePresence>
            </button>

            <Chatbot isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
          </div>
        </nav>
      </header>
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-4 left-0 w-full z-30 px-4 md:bottom-auto md:top-4 md:flex md:justify-center pointer-events-none">
        <ul className="flex items-center justify-around md:justify-center space-x-0 md:space-x-8 backdrop-blur-md bg-stone-100/90 dark:bg-stone-900/90 md:bg-white/30 rounded-[2rem] md:rounded-full shadow-lg border border-stone-200 dark:border-stone-800 text-[10px] md:text-sm font-semibold text-stone-800 dark:text-stone-200 p-3 md:px-8 md:py-3 pointer-events-auto max-w-md mx-auto md:max-w-none transition-all will-change-transform">
          {['home', 'about', 'skills', 'projects', 'experience'].map((item) => (
            <li key={item} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <a href={`#${item}`} className="flex flex-col md:flex-row items-center gap-1 md:gap-2 capitalize">
                {item === 'home' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>}
                {item === 'about' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M16 10h2"/><path d="M16 14h2"/><path d="M6.17 15a3 3 0 0 1 5.66 0"/><circle cx="9" cy="11" r="2"/><rect x="2" y="5" width="20" height="14" rx="2"/></svg>}
                {item === 'skills' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>}
                {item === 'projects' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"/></svg>}
                {item === 'experience' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M12 12h.01"/><path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><path d="M22 13a18.15 18.15 0 0 1-20 0"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg>}
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Header;