import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

import ClickSpark from './components/ClickSpark';
import cursorImg from './assets/photos/cursor.png';
import Loading from './components/Loading';
import Noise from './components/Noise';

import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Achievements from './components/Achievements';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Footer from './components/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    window.scrollTo(0, 0);
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ClickSpark sparkColor="#030303" sparkRadius={25} sparkCount={20} duration={300} extraScale={0.9}>

      <div className="fixed inset-0 z-[9998] pointer-events-none overflow-hidden">
        <Noise
          patternSize={500}
          patternScaleX={5}
          patternScaleY={5}
          patternRefreshInterval={2}
          patternAlpha={20}
        />
      </div>
  

      <AnimatePresence mode="wait">
        {isLoading && <Loading key="loader" />}
      </AnimatePresence>

      

      <Header />

      <motion.div 
        style={{ cursor: `url(${cursorImg}), auto` }} 
        className="flex flex-col w-screen min-h-screen relative z-10 bg-stone-100 dark:bg-stone-950 transition-colors duration-500" 
        initial={{ filter: 'blur(20px)', opacity: 0 }}
        animate={{ 
          filter: isLoading ? 'blur(20px)' : 'blur(0px)', 
          opacity: isLoading ? 0.3 : 1 
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <main className="w-full">
          <Home />
          <About/>
          <Achievements />
          <Skills />
          <Projects />
          <Experience/>
          <Footer />
        </main>
      </motion.div>
    </ClickSpark>
  );
}

export default App;