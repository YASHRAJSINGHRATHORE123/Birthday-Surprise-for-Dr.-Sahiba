import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';

export const FlipCard: React.FC<{ i: number, startAnimation?: boolean }> = ({ i, startAnimation = true }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const messages = [
    "Your smile lights up the room! ✨",
    "A heart of gold and hands that heal 💖",
    "May all your dreams come true 🌟",
    "Keep shining, Dr. Sahiba! 👩‍⚕️",
    "Blessed to have you in our lives 🙏"
  ];

  useEffect(() => {
    if (!startAnimation) return;

    // Automatically flip the card sequentially after the page loads
    const flipTimer = setTimeout(() => {
      setIsFlipped(true);
    }, 1200 + i * 800); // Staggered delay: 2s, 2.8s, 3.6s...

    // Flip it back after showing the message for a few seconds
    const flipBackTimer = setTimeout(() => {
      setIsFlipped(false);
    }, 1200 + i * 800 + 4000);

    return () => {
      clearTimeout(flipTimer);
      clearTimeout(flipBackTimer);
    };
  }, [i, startAnimation]);

  return (
    <motion.div 
      className="aspect-[4/5] [perspective:1000px] cursor-pointer group relative"
      onClick={() => setIsFlipped(!isFlipped)}
      role="button"
      tabIndex={0}
      aria-label={`Memory card ${i}, click to flip`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsFlipped(!isFlipped);
        }
      }}
      initial={{ rotate: i % 2 === 0 ? 3 : -3 }}
      whileHover={{ rotate: 0, scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="w-full h-full relative [transform-style:preserve-3d]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front */}
        <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
          <img 
            src={`/memory-${i}.jpg`} 
            onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/sahiba${i + 10}/600/800` }}
            alt={`Memory ${i}`} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
          <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 z-20">
            <div className="flex items-center gap-1 sm:gap-2 text-pink-200 text-[10px] sm:text-sm font-medium tracking-wider uppercase">
              <Star size={12} className="fill-pink-200 sm:w-4 sm:h-4" aria-hidden="true" /> Memory {i}
            </div>
          </div>
        </div>
        {/* Back */}
        <div 
          className="absolute inset-0 [backface-visibility:hidden] rounded-2xl sm:rounded-3xl bg-gradient-to-br from-pink-500 to-purple-600 border border-white/20 shadow-xl flex items-center justify-center p-3 sm:p-6 text-center"
          style={{ transform: "rotateY(180deg)" }}
        >
          <p className="font-serif italic text-sm sm:text-lg md:text-2xl text-white drop-shadow-md">
            {messages[i - 1]}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};
