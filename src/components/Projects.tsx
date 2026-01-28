import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

// Assets
import pawtifyVideo from '../assets/videos/Pawtify.mp4';
import settleSpaceVideo from '../assets/videos/Settle Space.mp4';
import brmsVideo from '../assets/videos/BRMS.mp4';
import financeVideo from '../assets/videos/Finance.mp4';
import samaritanVideo from '../assets/videos/Samaritan.mp4';

import thumbnail1 from '../assets/photos/thumbnail1.jpg'
import thumbnail2 from '../assets/photos/thumbnail2.jpg'
import thumbnail3 from '../assets/photos/thumbnail3.jpg'
import thumbnail4 from '../assets/photos/thumbnail4.jpg'
import thumbnail5 from '../assets/photos/thumbnail5.jpg'

// Types and Interfaces
interface Project {
  id: number;
  title: string;
  description: string;
  video: string;
  thumbnail: string;
  link: string;
  technologies: string[];
}

interface ProjectCardProps {
  project: Project;
}

const projects: Project[] = [
  { 
    id: 1, 
    title: "Pawtify", 
    description: "A Dog adoption website.", 
    video: pawtifyVideo, 
    thumbnail: thumbnail1,
    link: "https://youtu.be/7EcGv-KYAKM",
    technologies: ["HTML", "CSS", "JavaScript"] 
  },
  { 
    id: 2, 
    title: "Settle Space", 
    description: "A home rental and selling website", 
    video: settleSpaceVideo, 
    thumbnail: thumbnail2,
    link: "https://youtu.be/EU2M0cEkRNs",
    technologies: ["HTML", "CSS", "JavaScript"] 
  },
  { 
    id: 3, 
    title: "BRMS", 
    description: "System to handle barangay reports", 
    video: brmsVideo, 
    thumbnail: thumbnail3,
    link: "https://youtu.be/EWpIfm7DrLk",
    technologies: ["PHP", "MySQL", "Tailwind CSS"]
  },
  { 
    id: 4, 
    title: "Finance", 
    description: " Handle money transactions", 
    video: financeVideo, 
    thumbnail: thumbnail4,
    link: "https://youtu.be/TvZB7eh0oV8",
    technologies: ["PHP", "Tailwind", "JavaScript", "MySQL"]
  },
  { 
    id: 5, 
    title: "Samaritan", 
    description: "Funeral system to track expenses", 
    video: samaritanVideo, 
    thumbnail: thumbnail5,
    link: "https://youtu.be/676IwlK1BjI",
    technologies: ["PHP", "Tailwind", "JavaScript", "MySQL"]
  },
];

const ProjectCard = ({ project }: ProjectCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleViewProject = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.link && project.link !== "#") {
      window.open(project.link, "_blank", "noopener,noreferrer");
    } else {
      alert("Project link coming soon!");
    }
  };

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Optimized transforms
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const xMovement = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  const handleMouseEnter = () => {
    videoRef.current?.play().catch(() => { /* Handle autoplay block */ });
  };
  
  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, x: xMovement }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative h-[300px] w-[90vw] md:w-[500px] flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 transition-all duration-300 hover:scale-105 dark:border-zinc-800 dark:bg-zinc-900 md:ml-15 will-change-transform"
    >
      {/* Video Container */}
      <div className="absolute inset-0 h-full w-full bg-gray-700 p-1 dark:bg-zinc-800">
        <video
          ref={videoRef}
          poster={project.thumbnail}
          className="h-full w-full object-cover opacity-60 transition-opacity duration-500 group-hover:opacity-100"
          muted 
          loop 
          playsInline 
          preload="metadata" // Optimized: Only load metadata initially to save bandwidth
        >
          <source src={project.video} type="video/mp4" />
        </video>
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent p-8">
        <h3 className="-mb-5 translate-y-2 text-2xl font-bold text-white transition-transform group-hover:-translate-y-5">
          {project.title}
        </h3>
        <p className="mb-4 text-sm font-semibold text-gray-200 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {project.description}
        </p>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={handleViewProject} 
            className="flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-gray-200 dark:bg-zinc-100 dark:hover:bg-white"
          >
            Explore
            <ExternalLink size={16} />
          </button>

          {/* Tech stack badges */}
          <div className="flex flex-wrap gap-2 opacity-0 -translate-x-2 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
            {project.technologies?.map((tech, index) => (
              <span 
                key={index} 
                className="rounded-md border border-white/10 bg-black/40 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md dark:border-white/20 dark:bg-white/10"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const targetRef = useRef<HTMLElement>(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(
    scrollYProgress, 
    [0, 1], 
    ["0%", windowWidth < 768 ? "-77%" : "-65%"]
  );

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  } as const;

  return (
    <section id="projects" ref={targetRef} className="relative h-[300vh] bg-transparent">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden transition-colors duration-500 ">
        
        {/* Header Section - Optimized to play ONCE */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }} // Fixed: once: true
          variants={fadeInUp}
          className="mx-auto mb-12 flex max-w-4xl flex-col gap-4 px-6 text-center"
        >
          <p className="text-sm font-bold uppercase tracking-widest text-gray-500 underline underline-offset-8 dark:text-zinc-500">
            WORK SHOWCASE 
          </p>
          <h1 className="text-3xl font-extrabold text-slate-800 sm:text-4xl md:text-5xl dark:text-zinc-100">
            Featured Projects
          </h1>
          <p className="mx-auto max-w-2xl leading-relaxed text-gray-600 dark:text-zinc-400">
            A curated collection of digital experiences focusing on high-performance 
            interfaces and user-centric design.
          </p>
        </motion.div>

        {/* Horizontal Scroll Container */}
        <div className="flex items-center">
          <motion.div 
            style={{ x }} 
            className="flex gap-8 px-6 md:gap-12 md:px-20 will-change-transform" // Optimized: will-change-transform
          >
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
            
            <div className="w-[10vw] flex-shrink-0 md:hidden" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Projects;