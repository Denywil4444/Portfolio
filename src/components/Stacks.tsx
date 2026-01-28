import React, { useState, useCallback } from 'react';
import { motion, useMotionValue, useTransform, type PanInfo, AnimatePresence } from 'framer-motion';
import { MoveHorizontal } from 'lucide-react'; // Added for the indicator icon

import about1 from "../assets/photos/about1.jpg";
import about2 from "../assets/photos/about2.jpg";
import about3 from "../assets/photos/about3.jpg";
import about4 from "../assets/photos/about4.jpg";
import about5 from "../assets/photos/about5.jpg";

interface CardItem {
  id: string | number;
  content: React.ReactNode;
  offsetRotation: number;
}

interface CardRotateProps {
  children: React.ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
  disableDrag?: boolean;
}

function CardRotate({ children, onSendToBack, sensitivity, disableDrag = false }: CardRotateProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
      onSendToBack();
    }
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      className={`absolute inset-0 ${disableDrag ? 'cursor-pointer' : 'cursor-grab active:cursor-grabbing'} touch-none`}
      style={disableDrag ? { x: 0, y: 0 } : { x, y, rotateX, rotateY }}
      drag={!disableDrag}
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

interface StackProps {
  randomRotation?: boolean;
  sensitivity?: number;
  sendToBackOnClick?: boolean;
  cards?: React.ReactNode[];
  animationConfig?: { stiffness: number; damping: number };
}

export default function Stack({
  randomRotation = false,
  sensitivity = 200,
  cards = [],
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false
}: StackProps) {
  const [hasInteracted, setHasInteracted] = useState(false); // Track first interaction
  const [stack, setStack] = useState<CardItem[]>(() => {
    const initialCards = cards.length > 0 ? cards : [
      <img key="1" src={about1} alt="" className="w-full h-full object-cover pointer-events-none select-none rounded-2xl" />,
      <img key="2" src={about2} alt="" className="w-full h-full object-cover pointer-events-none select-none rounded-2xl" />,
      <img key="3" src={about3} alt="" className="w-full h-full object-cover pointer-events-none select-none rounded-2xl" />,
      <img key="4" src={about4} alt="" className="w-full h-full object-cover pointer-events-none select-none rounded-2xl" />,
      <img key="5" src={about5} alt="" className="w-full h-full object-cover pointer-events-none select-none rounded-2xl" />,
    ];

    return initialCards.map((content, index) => ({
      id: `card-${index}-${Math.random().toString(36).substr(2, 9)}`,
      content,
      offsetRotation: Math.random() * 10 - 5
    }));
  });

  const sendToBack = useCallback((id: string | number) => {
    setHasInteracted(true); // Hide indicator once swiped
    setStack((prev) => {
      const index = prev.findIndex((card) => card.id === id);
      if (index === -1) return prev;
      const newStack = [...prev];
      const [card] = newStack.splice(index, 1);
      return [card, ...newStack];
    });
  }, []);

  return (
    <div 
      className="relative w-full h-full" 
      style={{ perspective: 1000 }}
    >
      {stack.map((card, index) => {
        const isTop = index === stack.length - 1;
        const randomRotate = randomRotation ? card.offsetRotation : 0;
        
        return (
          <CardRotate
            key={card.id}
            onSendToBack={() => sendToBack(card.id)}
            sensitivity={sensitivity}
            disableDrag={!isTop}
          >
            <motion.div
              className="absolute inset-0 rounded-2xl bg-white shadow-2xl border border-gray-200 will-change-transform"
              onClick={() => {
                if (sendToBackOnClick || !isTop) sendToBack(card.id);
              }}
              animate={{
                rotateZ: (stack.length - index - 1) * 4 + randomRotate,
                scale: 1 + index * 0.06 - stack.length * 0.06,
                transformOrigin: '50% 50%',
              }}
              initial={false}
              transition={{
                type: 'spring',
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping
              }}
            >
              <div className="relative w-full h-full overflow-hidden rounded-2xl">
                {card.content}

                {/* Swipe Indicator Overlay - Only on the top card */}
                <AnimatePresence>
                  {isTop && !hasInteracted && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none"
                    >
                      <motion.div 
                        animate={{ x: [0, -20, 20, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="flex flex-col items-center gap-2 text-white"
                      >
                        <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/30 shadow-2xl">
                          <MoveHorizontal size={32} className="drop-shadow-lg" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-[0.2em] drop-shadow-md">Swipe to Explore</span>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!isTop && (
                   <div 
                    className="absolute inset-0 bg-black/10 pointer-events-none" 
                    style={{ opacity: (stack.length - index) * 0.1 }} 
                   />
                )}
              </div>
            </motion.div>
          </CardRotate>
        );
      })}
    </div>
  );
}