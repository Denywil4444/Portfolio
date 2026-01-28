import { motion, type Variants} from 'framer-motion'; // 1. Import Variants type

const Loading = () => {
  const text = "<Deny/>";
  
  // 2. Explicitly type the variant objects
  const screenVariants: Variants = {
    initial: { opacity: 1 },
    exit: { 
      opacity: 0,
      transition: { duration: 0.6, ease: "easeInOut" }
    },
  };

  const letterVariants: Variants = {
    animate: {
      y: [0, -30, 0],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut",
      }
    },
  };

  const containerVariants: Variants = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  return (
    <motion.div 
      variants={screenVariants}
      initial="initial"
      exit="exit"
      className="fixed inset-0 z-100 flex items-center justify-center bg-stone-100" // Note: z-100 changed to z-[100] for standard Tailwind
    >
      <motion.div 
        variants={containerVariants}
        animate="animate"
        className="flex"
      >
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            className="inline-block tracking-tighter text-7xl font-bold text-slate-800"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.div>
      
      <div className="absolute bottom-1/3 w-32 h-2 bg-black/5 blur-xl rounded-[100%]" />
    </motion.div>
  );
};

export default Loading;