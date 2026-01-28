import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { PhoneCall, Download } from 'lucide-react';
import profilePic from '../assets/photos/nonoy_pic.png';
import resumeFile from '../assets/Denywil_Resume.pdf';

const Home = () => {
  const [text] = useTypewriter({
    words: ['Frontend Developer', 'Web Developer', 'Freelancer', 'System Developer'],
    loop: 0,
    typeSpeed: 100,
    deleteSpeed: 80,
  });

  return (
    <section 
      id="home" 
      className="flex items-center justify-center w-full px-6 py-12 lg:px-20 mt-20 transition-colors duration-500 will-change-contents"
    >
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl gap-12 md:gap-16 lg:gap-24">
        
        {/* Left Side: Text Content */}
        <div className="flex flex-col space-y-4 w-full md:w-1/2 lg:w-auto order-2 md:order-1 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-stone-800 dark:text-stone-100 leading-tight">
            Hi, I'm{' '}
            <span className="bg-stone-200 dark:bg-stone-800 text-stone-900 dark:text-white rounded-3xl px-5 py-1 inline-block border border-stone-300 dark:border-stone-700 shadow-sm animate-[float_5s_ease-in-out_infinite]">
              Denywil
            </span>
          </h1>
          
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-stone-600 dark:text-stone-100 min-h-[50px] md:min-h-[60px]">
            <span>{text}</span>
            <Cursor cursorStyle='|' />
          </h2>

          <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400 max-w-xl mx-auto md:mx-0 leading-relaxed">
            I am a developer dedicated to crafting digital experiences that are as functional as they are beautiful. 
            I prioritize accessibility and performance.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-6 items-center pt-6 justify-center md:justify-start">
            <div className="flex items-center gap-4">
              <a href="#footer" className="bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-sm px-8 py-3.5 rounded-full hover:bg-black dark:hover:bg-white transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 font-bold shadow-xl">
                <PhoneCall size={18} />
                Connect
              </a>
              
              <a href={resumeFile} download="Denywil_Resume.pdf" className="bg-transparent border-2 border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 text-sm px-8 py-3.5 rounded-full hover:border-stone-800 dark:hover:border-stone-400 hover:bg-stone-50 dark:hover:bg-stone-900 transition-all flex items-center gap-2 font-bold">
                <Download size={18} />
                Resume
              </a>
            </div>

            <div className="flex space-x-10 border-t-2 sm:border-t-0 sm:border-l-2 border-stone-100 dark:border-stone-800 pt-6 sm:pt-0 sm:pl-10">
              <div className="flex flex-col">
                <span className="text-3xl font-extrabold text-stone-800 dark:text-stone-100">1+</span>
                <span className="text-[10px] text-stone-500 uppercase tracking-[0.2em] font-bold">Years Exp</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-extrabold text-stone-800 dark:text-stone-100">5+</span>
                <span className="text-[10px] text-stone-500 uppercase tracking-[0.2em] font-bold">Projects</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Image Container */}
        <div className="w-full md:w-1/2 lg:w-auto flex justify-center md:justify-end order-1 md:order-2">
          <div className="relative group w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[400px] animate-[float_5s_ease-in-out_infinite]">
            
            {/* Background Shadows */}
            <div className="absolute inset-0 bg-stone-800 dark:bg-stone-100 rounded-[2.5rem] translate-x-4 translate-y-4 transition-all duration-500 group-hover:translate-x-6 group-hover:translate-y-6 opacity-20 dark:opacity-10 blur-md"></div>
            <div className="absolute inset-0 bg-stone-800 dark:bg-stone-100 rounded-[2.5rem] translate-x-3 translate-y-3 transition-transform duration-500"></div>
            
            {/* Main Image Container */}
            <div className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-stone-200 dark:bg-stone-700 border-4 border-white dark:border-stone-800 shadow-2xl transition-all duration-500 group-hover:scale-[1.02]">
              <img 
                src={profilePic} 
                alt="Denywil"
                loading="eager"
                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700 transform-gpu"
              />
            </div>

            {/* Reflection Effect */}
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-white/5 dark:bg-white/10 blur-3xl rounded-full pointer-events-none"></div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Home;