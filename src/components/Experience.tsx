import { motion } from 'framer-motion';
import { Calendar, MapPin, ClipboardList, Code2, CheckCircle2, Building2 } from 'lucide-react';

interface ExperienceProps {
  exp: {
    company: string;
    role: string;
    type: string;
    period: string;
    year: string;
    location: string;
    description: string;
    responsibilities: readonly string[];
    technologies: readonly string[];
    side: "left" | "right";
  };
}

const experiences = [
  {
    company: "Northern Iloilo State University",
    role: "Web Development Intern",
    type: "Internship",
    period: "January 2025 - June 2025",
    year: "2025",
    location: "Estancia, Iloilo",
    description: "Developed eBudget System to automate the manual process in submitting budget proposals and generating reports.",
    responsibilities: [
      "Designed and developed a web-based eBudget System to digitize manual budget proposal submissions.",
      "Automated the generation of financial reports, reducing processing time and human error.",
      "Implemented a responsive and user-friendly interface using PHP and Tailwind CSS.",
      "Managed database architecture with MySQL to ensure secure and organized storage of fiscal data."
    ],
    technologies: ["PHP", "JavaScript", "Tailwind CSS", "MySQL", "MS Word", "MS Excel"],
    side: "left"
  },
  {
    company: "SSBI Food Services Corporation",
    role: "Software Development Intern",
    type: "Internship",
    period: "Sept 2025 - Nov 2025",
    year: "2025",
    location: "WFH / Remote",
    description: "Focused on developing scalable web applications and enhancing user interface experiences.",
    responsibilities: [
      "Collaborated with the dev team to build responsive components",
      "Participated in weekly code reviews and sprint planning",
      "Fetching api data and integrating backend services",
      "Use AI tools to optimize development workflow"
    ],
    technologies: ["React.js", "Tailwind CSS", "Framer Motion", "Node.js", "Express.js", "Prisma", "PostgreSQL", "Git", "Github", "Trello"],
    side: "right"
  },
  {
    company: "Freelancer",
    role: "Web Developer",
    type: "Part-Time",
    period: "June 2025 - Present",
    year: "2026",
    location: "WFH / Remote",
    description: "Design and Developed modern and responsive websites for small businesses and personal portfolios.",
    responsibilities: [
      "Communicated with clients to gather requirements and provide project updates",
      "Meeting deadlines and managing multiple projects simultaneously",
      "Meets the client's needs and expectations"
    ],
    technologies: ["Php", "Tailwind CSS", "JavaScript", "MySQL"],
    side: "left"
  }
] as const;

const ExperienceCard = ({ exp }: ExperienceProps) => {
  const isLeft = exp.side === "left";

  return (
    <div className={`mb-16 flex flex-col md:flex-row justify-between items-center w-full ${isLeft ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
      
      {/* Year Marker - Optimized with once: true */}
      <div className={`hidden md:flex w-[30%] items-center ${isLeft ? 'justify-start pl-12' : 'justify-end pr-12'}`}>
        <motion.span 
          initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-7xl font-black text-slate-200 dark:text-zinc-800 select-none tracking-tighter will-change-transform"
        >
          {exp.year}
        </motion.span>
      </div>

      {/* Timeline Bullet */}
      <div className="z-20 flex items-center order-1 bg-white dark:bg-zinc-900 shadow-xl w-10 h-10 rounded-full border-4 border-slate-50 dark:border-zinc-800 justify-center mb-4 md:mb-0">
        <div className="w-3 h-3 bg-slate-800 dark:bg-zinc-100 rounded-full animate-pulse" />
      </div>

      {/* Content Card - Optimized with once: true and hardware acceleration */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }} 
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="order-1 bg-white dark:bg-zinc-900/50 dark:backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200 dark:border-zinc-800 w-full md:w-[60%] px-8 py-6 md:px-10 hover:shadow-2xl transition-all duration-300 group will-change-transform"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-slate-100 dark:bg-zinc-800 p-2 rounded-lg transition-colors group-hover:bg-slate-200 dark:group-hover:bg-zinc-700">
              <Building2 className="w-6 h-6 text-slate-800 dark:text-zinc-200" />
            </div>
            <h3 className="font-bold text-2xl text-slate-800 dark:text-zinc-100">{exp.company}</h3>
          </div>
          <span className="self-start sm:self-center px-3 py-1 text-[10px] font-bold text-slate-500 dark:text-zinc-400 border border-slate-300 dark:border-zinc-700 rounded-full uppercase tracking-widest">
            {exp.type}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <CheckCircle2 className="w-5 h-5 text-slate-800 dark:text-zinc-400" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-zinc-200 tracking-tight">{exp.role}</h2>
        </div>

        <div className="flex flex-wrap gap-4 mb-4 text-sm font-semibold text-slate-500 dark:text-zinc-400">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-slate-800 dark:text-zinc-500" /> {exp.period}
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-slate-800 dark:text-zinc-500" /> {exp.location}
          </div>
        </div>

        <p className="text-slate-600 dark:text-zinc-400 mb-6 text-[15px] leading-relaxed italic border-l-4 border-slate-200 dark:border-zinc-800 pl-4">
          "{exp.description}"
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <ClipboardList className="w-4 h-4 text-slate-800 dark:text-zinc-400" />
              <h4 className="font-bold text-slate-800 dark:text-zinc-300 text-sm uppercase tracking-tighter">Responsibilities</h4>
            </div>
            <ul className="space-y-2">
              {exp.responsibilities.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-xs text-slate-600 dark:text-zinc-400 leading-snug">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-800 dark:bg-zinc-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Code2 className="w-4 h-4 text-slate-800 dark:text-zinc-400" />
              <h4 className="font-bold text-slate-800 dark:text-zinc-300 text-sm uppercase tracking-tighter">Stack</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {exp.technologies.map((tech, i) => (
                <span key={i} className="px-2.5 py-1 bg-slate-800 dark:bg-zinc-100 text-white dark:text-black text-[10px] rounded-md font-bold shadow-sm transition-transform hover:-translate-y-1">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Experience = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  } as const;

  return (
    <div id="experience" className="relative flex flex-col items-center justify-center min-h-screen w-full py-20 transition-colors duration-500">
      
      {/* Header Section - Optimized once: true */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        className="flex flex-col text-center max-w-4xl px-4 gap-6 mb-24 relative z-10"
      >
        <p className="text-gray-500 dark:text-zinc-500 underline underline-offset-8 uppercase tracking-widest text-sm font-bold">
          PROFESSIONAL BACKGROUND
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-zinc-100">
          Work Experience
        </h1>
        <p className="text-slate-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
          A summary of my career milestones and technical expertise, highlighting the 
          contributions and solutions I have delivered throughout my professional journey.
        </p>
      </motion.div>

      {/* Timeline Wrapper */}
      <div className="relative container mx-auto px-6 max-w-7xl">
        <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 h-full w-[2px] bg-gradient-to-b from-transparent via-slate-200 dark:via-zinc-800 to-transparent"></div>

        <div className="relative">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} exp={exp} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;