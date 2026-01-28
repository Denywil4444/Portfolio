import { Phone, Building, Calendar, Mail, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import Stack from './Stacks';

const About = () => {
  // Optimized Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 }, // Reduced distance for smoother performance
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, staggerChildren: 0.05 } // Faster stagger
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { type: "spring", stiffness: 200, damping: 25 } 
    }
  } as const;

  return (
    <div id="about" className="flex flex-col items-center justify-center w-full py-12 md:py-20 lg:py-24 transition-colors duration-500 overflow-hidden">
      
      {/* Header Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        // Disabled exit for performance; once: true prevents lag on scroll-back
        viewport={{ once: true, amount: 0.2 }} 
        variants={containerVariants}
        className="flex flex-col text-center max-w-4xl px-6 gap-4 md:gap-6 mb-12 md:mb-16 transform-gpu"
      >
        <p className="text-stone-500 dark:text-stone-400 underline underline-offset-8 uppercase tracking-widest text-xs md:text-sm font-semibold">
          ABOUT ME
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-800 dark:text-stone-100">
          Get To Know Me
        </h1>
        <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-sm md:text-base">
          An overview of my background, passions, and experiences, highlighting the journey that shaped me as a developer and problem-solver.
        </p>
      </motion.div>

      {/* Main Content Container */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16 xl:gap-24 max-w-6xl px-6 w-full">
        
        {/* Visual/Stack Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={itemVariants}
          className="w-full max-w-[280px] sm:max-w-sm md:max-w-md aspect-square transform-gpu"
        >
          <Stack
            randomRotation
            sensitivity={210}
          />
        </motion.div>

        {/* Text Content Section */}
        <div className="w-full lg:w-1/2 flex flex-col text-left">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="transform-gpu"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-stone-800 dark:text-stone-100 mb-4 text-center lg:text-left">
              Who Am I?
            </h2>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-8 text-sm md:text-base text-center lg:text-left">
              Hello! I am <span className="font-semibold text-stone-900 dark:text-stone-50">Denywil Acosta Lanac</span>, 
              an aspiring Web Developer and Software Engineer. I really love coding and exploring new technologies.
            </p>
          </motion.div>

          {/* Grid for Contact Info */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3 md:gap-4 transform-gpu"
          >
            {[
              { icon: <Phone size={18} />, text: "+63 970-635-4463" },
              { icon: <Building size={18} />, text: "Balasan, Iloilo" },
              { icon: <Calendar size={18} />, text: "05/04/2003" },
              { icon: <Mail size={18} />, text: "denywillanac4444@gmail.com" },
              { icon: <GraduationCap size={18} />, text: "BS In Information Technology" }
            ].map((info, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="flex items-center gap-3 p-3 rounded-xl border border-stone-100 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50 shadow-sm hover:shadow-md dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all group will-change-transform"
              >
                <div className="flex-shrink-0 text-stone-600 dark:text-stone-400 group-hover:scale-110 transition-transform">
                  {info.icon}
                </div>
                <span className="text-xs md:text-sm text-stone-700 dark:text-stone-300 font-medium truncate">
                  {info.text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;