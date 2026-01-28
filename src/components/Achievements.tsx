import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// 1. Image imports
import cert1 from '../assets/photos/certificate1.jpg';
import cert2 from '../assets/photos/certificate2.jpg';
import cert3 from '../assets/photos/certificate3.jpg';
import cert4 from '../assets/photos/certificate4.jpg';
import cert5 from '../assets/photos/certificate5.png';

const CERTIFICATES = [
  { id: 1, title: "Civil Service Certification", color: "bg-slate-800", img: cert1 },
  { id: 2, title: "eBudget System Completion", color: "bg-slate-700", img: cert2 },
  { id: 3, title: "College Diploma", color: "bg-slate-600", img: cert3 },
  { id: 4, title: "NISU Internship", color: "bg-slate-500", img: cert4 },
  { id: 5, title: "SSBI Internship", color: "bg-slate-400", img: cert5 },
];

interface Certificate {
  id: number;
  title: string;
  color: string;
  img: string;
}

const CertificateCard = ({ cert, index }: { cert: Certificate; index: number }) => {
  const ref = useRef(null);
  // once: true ensures it doesn't repeat when scrolling back up
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      // REMOVED 'sticky' and 'top-28' - cards now flow one after the other
      className="w-full mb-10 will-change-transform"
    >
      <div 
        className={`${cert.color} rounded-3xl p-1 md:p-3 shadow-2xl transition-transform duration-500 hover:scale-[1.01] border border-transparent dark:border-white/10`}
      >
        <div className="relative bg-slate-900 rounded-2xl overflow-hidden border border-white/10 aspect-[4/3] md:aspect-video flex items-center justify-center">
          <img 
            src={cert.img} 
            alt={cert.title} 
            className="w-full h-full object-fill opacity-90 dark:opacity-80 transition-opacity hover:opacity-100" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent flex items-end p-6">
            <h3 className="text-white font-bold text-lg md:text-2xl tracking-tight">
              {cert.title}
            </h3>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Achievements = () => {
  const textVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  } as const;

  return (
    <section id="achievements" className="w-full py-10 px-4 transition-colors duration-300">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }} 
        variants={textVariant}
        className="max-w-4xl mx-auto text-center mb-16 space-y-4"
      >
        <p className="text-gray-500 dark:text-stone-400 underline underline-offset-8 uppercase tracking-widest text-xs md:text-sm font-bold">
          RECOGNITIONS
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-white">
          Achievements
        </h1>
        <p className="text-slate-600 dark:text-neutral-400 leading-relaxed text-sm md:text-base">
          A summary of significant milestones, certifications, and technical accomplishments 
          earned throughout my career.
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto relative p-1">
        {CERTIFICATES.map((cert, index) => (
          <CertificateCard key={cert.id} cert={cert} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Achievements;