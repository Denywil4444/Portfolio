import React, { useRef, useEffect, useCallback } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';
import { Lightbulb, Users, Clock, MessageSquare, Brain, Search } from 'lucide-react';

interface SkillData {
  name: string;
  url: string;
  site: string;
}

const skillsData = [
  { name: 'React', url: 'https://cdn.simpleicons.org/react/61DAFB', site: 'https://react.dev' },
  { name: 'Tailwind', url: 'https://cdn.simpleicons.org/tailwindcss/06B6D4', site: 'https://tailwindcss.com' },
  { name: 'Framer Motion', url: 'https://cdn.simpleicons.org/framer/0055FF', site: 'https://www.framer.com/motion/' },
  { name: 'JavaScript', url: 'https://cdn.simpleicons.org/javascript/F7DF1E', site: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  { name: 'TypeScript', url: 'https://cdn.simpleicons.org/typescript/3178C6', site: 'https://www.typescriptlang.org' },
  { name: 'MySQL', url: 'https://cdn.simpleicons.org/mysql/4479A1', site: 'https://www.mysql.com' },
  { name: 'PHP', url: 'https://cdn.simpleicons.org/php/777BB4', site: 'https://www.php.net' },
  { name: 'Git', url: 'https://cdn.simpleicons.org/git/F05032', site: 'https://git-scm.com/' },
  { name: 'GitHub', url: 'https://cdn.simpleicons.org/github/181717', site: 'https://github.com/' },
];

const softSkills = [
  { name: 'Problem Solving', icon: <Lightbulb size={16} /> },
  { name: 'Team Collaboration', icon: <Users size={16} /> },
  { name: 'Time Management', icon: <Clock size={16} /> },
  { name: 'Good Communication', icon: <MessageSquare size={16} /> },
  { name: 'Critical Thinking', icon: <Brain size={16} /> },
  { name: 'Attention to Details', icon: <Search size={16} /> },
];

const Skills = () => {
  // Optimization: 2 copies are enough for a seamless loop if logic is correct
  const duplicatedSkills = [...skillsData, ...skillsData];
  const duplicatedSoftSkills = [...softSkills, ...softSkills];

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  } as const;

  return (
    <div id="skills" className="flex items-center flex-col justify-center w-full overflow-hidden py-10 md:py-20 transition-colors duration-300">
      
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }} // Optimized to run once
        variants={fadeInUp}
        className="flex flex-col text-center max-w-4xl px-4 gap-6 mb-10"
      >
        <p className="text-gray-500 dark:text-gray-400 underline underline-offset-8 uppercase tracking-widest text-xs md:text-sm font-bold">
          EXPERTISE
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-slate-100">
          Professional Skills
        </h1>
        <p className="mx-auto max-w-2xl leading-relaxed text-gray-600 dark:text-zinc-400">
          A specialized collection of modern frameworks and core professional skills.
        </p>
      </motion.div>

      <div className="w-full">
        <motion.p 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center text-gray-500 dark:text-gray-400 underline underline-offset-8 uppercase tracking-widest text-sm font-semibold mb-8"
        >
          Programming Skills
        </motion.p>
        <DraggableSlider duration={30} direction="left" heightClass="h-48">
          {duplicatedSkills.map((skill, index) => (
            <LogoItem key={`hard-${index}`} data={skill} />
          ))}
        </DraggableSlider>
      </div>

      <div className="w-full">
        <motion.p 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center text-gray-500 dark:text-gray-400 underline underline-offset-8 uppercase tracking-widest text-sm font-semibold mb-8"
        >
          Soft Skills
        </motion.p>
        <DraggableSlider duration={35} direction="right" heightClass="h-24">
          {duplicatedSoftSkills.map((skill, index) => (
            <div
              key={`soft-${index}`}
              className="flex items-center gap-4 mx-3 px-4 py-2 rounded-xl bg-white dark:bg-stone-950 border border-gray-100 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] whitespace-nowrap cursor-grab active:cursor-grabbing hover:shadow-md transition-all duration-300 group"
            >
              <span className="text-blue-500 dark:text-white bg-blue-50 dark:bg-stone-500/30 p-2 rounded-lg group-hover:scale-110 transition-transform">
                {skill.icon}
              </span>
              <span className="text-sm font-bold text-slate-700 dark:text-slate-200 tracking-tight">
                {skill.name}
              </span>
            </div>
          ))}
        </DraggableSlider>
      </div>
    </div>
  );
};

const DraggableSlider = ({ children, duration, direction, heightClass }: { children: React.ReactNode, duration: number, direction: 'left' | 'right', heightClass: string }) => {
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const isDragging = useRef(false);

  const startAnimation = useCallback(() => {
    if (isDragging.current) return;
    
    const contentWidth = containerRef.current?.scrollWidth || 0;
    const halfWidth = contentWidth / 2;
    const currentX = x.get();

    // Logic for infinite loop
    const targetX = direction === 'left' ? -halfWidth : 0;
    const initialX = direction === 'left' ? 0 : -halfWidth;

    controls.start({
      x: direction === 'left' ? [currentX, targetX] : [currentX, 0],
      transition: {
        duration: duration * (Math.abs(currentX - targetX) / halfWidth),
        ease: "linear",
        onComplete: () => {
          x.set(initialX);
          // eslint-disable-next-line react-hooks/immutability
          startAnimation();
        }
      }
    });
  }, [controls, direction, duration, x]);

  useEffect(() => {
    startAnimation();
    return () => controls.stop();
  }, [startAnimation, controls]);

  return (
    <div className={`relative w-full ${heightClass} flex items-center group overflow-hidden`}>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 md:w-40 bg-gradient-to-r from-stone-100 dark:from-stone-950 to-transparent"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 md:w-40 bg-gradient-to-l from-stone-100 dark:from-stone-950 to-transparent"></div>

      <motion.div
        ref={containerRef}
        drag="x"
        style={{ x }}
        animate={controls}
        onHoverStart={() => controls.stop()}
        onHoverEnd={startAnimation}
        onDragStart={() => {
          isDragging.current = true;
          controls.stop();
        }}
        onDragEnd={() => {
          isDragging.current = false;
          // Smoothly reset if dragged too far
          const contentWidth = containerRef.current?.scrollWidth || 0;
          const halfWidth = contentWidth / 2;
          if (x.get() < -halfWidth) x.set(x.get() + halfWidth);
          if (x.get() > 0) x.set(x.get() - halfWidth);
          startAnimation();
        }}
        className="flex items-center cursor-grab active:cursor-grabbing will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
};

const LogoItem = ({ data }: { data: SkillData }) => (
  <div className="group/item relative flex flex-col items-center justify-center mx-3 md:mx-5 min-w-[100px] md:min-w-[140px]">
    <motion.a
      href={data.site}
      target="_blank"
      rel="noopener noreferrer"
      className="relative block"
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <img 
        src={data.url} 
        alt={data.name} 
        loading="lazy" 
        className="h-12 w-12 md:h-16 md:w-16 object-contain pointer-events-none dark:brightness-110 dark:contrast-125" 
      />
    </motion.a>
    <span className="absolute top-20 whitespace-nowrap rounded-full bg-gray-900 dark:bg-slate-100 px-4 py-1.5 text-[10px] md:text-xs font-bold text-white dark:text-stone-950 opacity-0 transition-all duration-300 group-hover/item:opacity-100 group-hover/item:translate-y-2 shadow-2xl pointer-events-none z-50">
      {data.name}
    </span>
  </div>
);

export default Skills;