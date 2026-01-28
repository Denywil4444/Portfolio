import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Facebook, Instagram, Linkedin, Send, Loader2 } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // State for form status
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  // Animation Variant
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  } as const;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "fdb4565c-ec9d-45a8-a42f-c528b0308803");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setStatus("Message Sent Successfully!");
        e.currentTarget.reset();
      } else {
        setStatus("Error sending message.");
      }
    } catch {
      setStatus("Error sending message.");
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(""), 3000);
    }
  };

  return (
    <footer id="footer" className="border-t border-slate-200 pt-10 pb-6 px-4 sm:px-6 lg:px-8 transition-colors duration-500 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          // Optimized: once: true reduces CPU usage on the final section of the page
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 mb-10 will-change-transform"
        >
          
          {/* Column 1: Contact Me */}
          <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
            <h3 className="text-slate-900 dark:text-zinc-100 font-bold uppercase tracking-wider text-sm flex items-center gap-2">
              <span className="text-slate-900 dark:text-zinc-100 font-black text-lg">›</span> Contact Me
            </h3>
            <p className="text-slate-500 dark:text-zinc-400 text-sm mb-2">Reach out for collaborations or inquiries.</p>
            
            <form className="space-y-3" onSubmit={handleSubmit}>
              <input 
                type="text" 
                name="name" 
                placeholder="Name" 
                required 
                className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl px-4 py-2 text-sm text-slate-900 dark:text-zinc-100 focus:ring-2 focus:ring-slate-700 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-zinc-600"
              />
              <input 
                type="email" 
                name="email" 
                placeholder="Email" 
                required 
                className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl px-4 py-2 text-sm text-slate-900 dark:text-zinc-100 focus:ring-2 focus:ring-slate-700 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-zinc-600"
              />
              <textarea 
                name="message" 
                placeholder="Message" 
                rows={3} 
                required 
                className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl px-4 py-2 text-sm text-slate-900 dark:text-zinc-100 focus:ring-2 focus:ring-slate-700 outline-none transition-all resize-none placeholder:text-slate-400 dark:placeholder:text-zinc-600"
              />
              
              <button 
                disabled={loading}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-800 dark:bg-zinc-100 hover:bg-slate-900 dark:hover:bg-white text-white dark:text-zinc-950 text-xs font-bold py-2.5 px-8 rounded-lg transition-all active:scale-95 uppercase tracking-widest"
              >
                {loading ? <Loader2 className="animate-spin" size={14} /> : "Send"} 
                <Send size={12} />
              </button>

              {status && (
                <p className={`text-xs mt-2 font-bold ${status.includes("Error") ? "text-red-500" : "text-green-600 dark:text-green-500"}`}>
                  {status}
                </p>
              )}
            </form>
          </div>

          {/* Column 2: Portfolio Links */}
          <div className="flex flex-col gap-4 lg:pl-12">
            <h3 className="text-slate-900 dark:text-zinc-100 font-bold uppercase tracking-wider text-sm flex items-center gap-2">
              <span className="text-slate-900 dark:text-zinc-100 font-black text-lg">›</span> Portfolio
            </h3>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-y-3 gap-x-4">
              {['Home', 'About', 'Skills', 'Projects', 'Experience'].map((item) => (
                <li key={item} className="group border-b border-slate-50 dark:border-zinc-900 pb-2">
                  <a href={`#${item.toLowerCase()}`} className="text-slate-600 dark:text-zinc-400 hover:text-black dark:hover:text-white text-sm font-medium transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>  

          {/* Column 3: Social Media */}
          <div className="flex flex-col gap-4 lg:pl-12">
            <h3 className="text-slate-900 dark:text-zinc-100 font-bold uppercase tracking-wider text-sm flex items-center gap-2">
              <span className="text-slate-900 dark:text-zinc-100 font-black text-lg">›</span> Connect
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                { Icon: Facebook, href: "https://www.facebook.com/denywil.lanac.2025" },
                { Icon: Github, href: "https://github.com/Denywil4444" },
                { Icon: Instagram, href: "https://www.instagram.com/denywil.missu/" },
                { Icon: Linkedin, href: "https://www.linkedin.com/in/denywil-lanac-78b79937a/" }
              ].map(({ Icon, href }, index) => (
                <a 
                  key={index}
                  href={href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-zinc-400 rounded-xl hover:bg-slate-900 dark:hover:bg-zinc-100 hover:text-white dark:hover:text-zinc-950 transition-all duration-300 shadow-sm will-change-transform"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar: Optimized to run once */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="pt-8 border-t border-slate-300 dark:border-zinc-800 text-center py-20 will-change-transform"
        >
          <p className="text-slate-400 dark:text-zinc-500 text-sm font-medium tracking-tight">
            © {currentYear} <span className="text-slate-600 dark:text-zinc-300 underline font-bold tracking-tighter">{"<Deny/>"}</span>. All Rights Reserved.
          </p>
        </motion.div>
        
      </div>
    </footer>
  );
};

export default Footer;