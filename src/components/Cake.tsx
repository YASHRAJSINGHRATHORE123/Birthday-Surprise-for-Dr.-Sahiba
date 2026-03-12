import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const Smoke = () => {
  const [smokeParticles, setSmokeParticles] = useState<any[]>([]);

  useEffect(() => {
    setSmokeParticles([...Array(5)].map((_, i) => ({
      id: i,
      xOffset: (Math.random() - 0.5) * 40,
      yOffset: -100 - Math.random() * 50,
      duration: 2 + Math.random() * 2,
      delay: i * 0.4
    })));
  }, []);

  return (
    <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-10 h-20 pointer-events-none" aria-hidden="true">
      {smokeParticles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 0, scale: 0.5 }}
          animate={{ 
            opacity: [0, 0.3, 0], 
            y: p.yOffset, 
            x: p.xOffset,
            scale: [0.5, 1.5, 2] 
          }}
          transition={{ 
            duration: p.duration, 
            repeat: Infinity, 
            delay: p.delay,
            ease: "easeOut"
          }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/20 rounded-full blur-xl"
        />
      ))}
    </div>
  );
};

export const Cake = ({ onBlow, isBlown }: { onBlow: () => void, isBlown: boolean }) => {
  return (
    <div className="relative w-72 h-72 mx-auto mt-8 z-10" role="img" aria-label="Birthday Cake">
      {/* Cake Base/Plate */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-64 h-10 bg-zinc-800 rounded-[100%] border-b-4 border-zinc-900 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"></div>
      
      {/* Cake Body */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-56 h-32 bg-gradient-to-b from-[#ffb6c1] to-[#ff69b4] rounded-[50%/20px] shadow-inner">
        {/* Cake Top */}
        <div className="absolute top-0 left-0 w-full h-14 bg-[#ffc0cb] rounded-[50%] border border-[#ffb6c1]"></div>
        
        {/* Icing Drips */}
        <div className="absolute top-7 left-0 w-full h-full pointer-events-none">
           <div className="absolute top-0 left-[10%] w-8 h-14 bg-[#fff0f5] rounded-b-full shadow-sm"></div>
           <div className="absolute top-0 left-[30%] w-10 h-20 bg-[#fff0f5] rounded-b-full shadow-sm"></div>
           <div className="absolute top-0 left-[55%] w-6 h-12 bg-[#fff0f5] rounded-b-full shadow-sm"></div>
           <div className="absolute top-0 left-[75%] w-8 h-16 bg-[#fff0f5] rounded-b-full shadow-sm"></div>
        </div>
      </div>
      
      {/* Candle */}
      <div className="absolute bottom-40 left-1/2 -translate-x-1/2 w-4 h-20 bg-gradient-to-r from-blue-100 via-white to-blue-200 rounded-t-sm shadow-sm">
        {/* Stripes */}
        <div className="absolute inset-0 overflow-hidden rounded-t-sm">
          <div className="w-full h-[200%] bg-[repeating-linear-gradient(45deg,transparent,transparent_5px,#ff6b9d_5px,#ff6b9d_10px)] opacity-60"></div>
        </div>
        {/* Wick */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-2 bg-zinc-800 rounded-t-sm"></div>
        
        {/* Smoke when blown */}
        {isBlown && <Smoke />}
        
        {/* Flame */}
        <AnimatePresence>
          {!isBlown && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ 
                scale: [1, 1.1, 0.9, 1.05, 1],
                rotate: [0, -3, 3, -1, 0],
                y: [0, -2, 0]
              }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
              exit={{ scale: 0, opacity: 0, transition: { duration: 0.3 } }}
              className="absolute -top-14 left-1/2 -translate-x-1/2 w-8 h-12 bg-gradient-to-b from-yellow-100 via-orange-400 to-red-500 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] blur-[1px] cursor-pointer origin-bottom shadow-[0_0_25px_#ff9900,0_0_50px_#ff4500]"
              onClick={onBlow}
              role="button"
              aria-label="Blow out candle"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onBlow();
                }
              }}
            >
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-5 bg-white rounded-full opacity-80 blur-[1px]"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse Ring */}
        {!isBlown && (
          <motion.div
            animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 w-12 h-12 border-2 border-amber-300 rounded-full pointer-events-none"
          />
        )}
      </div>
    </div>
  );
};
