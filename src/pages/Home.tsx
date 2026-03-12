import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Gift } from 'lucide-react';
import { Typewriter } from '../components/Typewriter';
import { Cake } from '../components/Cake';
import { Petals, FloatingIcons, FloatingParticles } from '../components/BackgroundEffects';

export const Home: React.FC<{ onSurpriseClick: () => void, isBlown: boolean, setIsBlown: (blown: boolean) => void, floatingHearts: any[], setFloatingHearts: any }> = ({ onSurpriseClick, isBlown, setIsBlown, floatingHearts, setFloatingHearts }) => {
  const generateHearts = (count: number, leftBase: number, leftRange: number, topBase: number, topRange: number, emojis: string[]) => {
    return Array.from({ length: count }).map(() => ({
      id: Date.now() + Math.random(),
      left: `${leftBase + Math.random() * leftRange}vw`,
      top: `${topBase + Math.random() * topRange}vh`,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      xOffset: (Math.random() - 0.5) * 100
    }));
  };

  const handleBlow = () => {
    setIsBlown(true);
    
    const hearts = generateHearts(20, 20, 60, 30, 40, ['💖','💝','💗','💓','✨','🌸','🌷','💫']);
    setFloatingHearts(hearts);
    
    setTimeout(() => setFloatingHearts([]), 3000);
  };

  return (
    <motion.div 
      key="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#0a0514] text-white overflow-hidden relative font-sans flex flex-col items-center justify-center"
    >
      {/* Enhanced Home Background */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] bg-pink-900/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[70%] h-[70%] bg-purple-900/10 blur-[120px] rounded-full"></div>
      </div>
      
      <FloatingParticles />
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(45,20,60,0.8)_0%,rgba(10,5,20,1)_100%)]" aria-hidden="true"></div>
      <div className="absolute inset-0 opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" aria-hidden="true"></div>
      
      <Petals />
      <FloatingIcons />

      {/* Main Content */}
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-4xl py-10"
      >
        <div className="mb-6 md:absolute md:top-0 md:right-0 bg-pink-500/20 border border-pink-500/40 rounded-full px-5 py-2 text-sm text-pink-200 backdrop-blur-md flex items-center gap-2 shadow-[0_0_15px_rgba(236,72,153,0.2)]">
          <Sparkles size={16} aria-hidden="true" /> Your Special Day
        </div>

        <motion.h1 
          className="font-serif italic text-4xl sm:text-5xl md:text-7xl lg:text-8xl md:mt-20 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-white to-pink-300 drop-shadow-[0_0_20px_rgba(255,192,203,0.4)] px-2 leading-tight"
        >
          Happy Birthday,<br />Dr. Sahiba 💖
        </motion.h1>

        <Typewriter messages={[
          'Future Doctor. Pure Soul.',
          'Blessed by Khatu Shyam Ji 🙏',
          'The world is lucky to have you ✨',
          'Your kindness heals before medicine does 💖',
          'Shine on, beautiful soul 🌟'
        ]} />

        <div className="transform scale-[0.65] sm:scale-100 origin-bottom mt-4 sm:mt-0">
          <Cake onBlow={handleBlow} isBlown={isBlown} />
        </div>

        <div className="min-h-[6rem] mt-4 sm:mt-8 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {!isBlown ? (
              <motion.div
                key="instruction"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-pink-200/90 text-base tracking-[0.2em] uppercase font-medium"
              >
                <p>Blow out the candle 🕯️💨🎂</p>
                <p className="text-sm opacity-60 mt-2 tracking-[0.3em]">— make a wish first! —</p>
                <button 
                  onClick={() => {
                    const newHearts = generateHearts(5, 40, 20, 60, 0, ['✨', '⭐', '🌟', '💫', '💖']);
                    setFloatingHearts((prev: any) => [...prev, ...newHearts]);
                    setTimeout(() => {
                      setFloatingHearts((prev: any) => prev.filter((h: any) => !newHearts.find(nh => nh.id === h.id)));
                    }, 2000);
                  }}
                  aria-label="Make a wish"
                  className="mt-4 text-pink-300/60 hover:text-pink-300 text-xs transition-colors flex items-center gap-2 mx-auto focus:outline-none focus:ring-2 focus:ring-pink-500 rounded-full px-2 py-1"
                >
                  <Sparkles size={12} aria-hidden="true" /> Make a Wish
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="button"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <button 
                  onClick={onSurpriseClick}
                  aria-label="Enter surprise"
                  className="group relative px-6 py-4 md:px-10 md:py-5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full font-semibold text-white text-base md:text-lg shadow-[0_0_30px_rgba(236,72,153,0.4)] hover:shadow-[0_0_50px_rgba(236,72,153,0.7)] transition-all duration-300 hover:scale-105 overflow-hidden w-full max-w-[280px] md:max-w-none mx-auto focus:outline-none focus:ring-2 focus:ring-pink-300"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" aria-hidden="true"></div>
                  <span className="relative flex items-center justify-center gap-2 md:gap-3">
                    <Gift className="w-5 h-5 md:w-[22px] md:h-[22px]" aria-hidden="true" /> Enter Surprise ✨
                  </span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.main>

      {/* Floating Hearts/Wishes */}
      <AnimatePresence>
        {floatingHearts.map(heart => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 0, scale: 0, y: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 1], y: -200, x: heart.xOffset }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute z-50 text-4xl pointer-events-none"
            style={{ left: heart.left, top: heart.top }}
            aria-hidden="true"
          >
            {heart.emoji}
          </motion.div>
        ))}
      </AnimatePresence>

    </motion.div>
  );
};
