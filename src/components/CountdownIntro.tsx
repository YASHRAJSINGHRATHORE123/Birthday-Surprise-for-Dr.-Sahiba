import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { FloatingParticles } from './BackgroundEffects';

export const CountdownIntro = ({ onComplete }: { onComplete: () => void }) => {
  const [count, setCount] = useState<number | null>(3);
  const [showFlash, setShowFlash] = useState(false);
  const [showText, setShowText] = useState(false);
  
  const tickAudio = useRef<HTMLAudioElement>(null);
  const sparkleAudio = useRef<HTMLAudioElement>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (count === null) return;

    if (count > 0) {
      if (tickAudio.current) {
        tickAudio.current.currentTime = 0;
        tickAudio.current.volume = 0.4;
        tickAudio.current.play().catch(() => {});
      }
      
      const timer = setTimeout(() => {
        setCount(prev => (prev !== null ? prev - 1 : null));
      }, 1000);
      return () => clearTimeout(timer);
    } else if (count === 0) {
      setCount(null); // Prevent effect from re-running
      setShowFlash(true);
      if (sparkleAudio.current) {
        sparkleAudio.current.volume = 0.6;
        sparkleAudio.current.play().catch(() => {});
      }
      
      confetti({
        particleCount: 200,
        spread: 160,
        origin: { y: 0.4 },
        colors: ['#ffb6c1', '#ff69b4', '#ff1493', '#ffd700', '#ffffff'],
        zIndex: 10000
      });

      setTimeout(() => {
        setShowFlash(false);
        setShowText(true);
      }, 150);

      setTimeout(() => {
        onCompleteRef.current();
      }, 3000);
    }
  }, [count]);

  return (
    <motion.div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#05020a] overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      role="dialog"
      aria-label="Countdown Intro"
    >
      {/* Background glow */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-[50%] h-[50%] bg-pink-900/20 blur-[120px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[50%] h-[50%] bg-purple-900/20 blur-[120px] rounded-full mix-blend-screen"></div>
        <div className="absolute inset-0 opacity-40 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none"></div>
      </div>

      {/* Particles */}
      <div className="absolute inset-0 z-0 opacity-50" aria-hidden="true">
        <FloatingParticles />
      </div>

      {/* Audio elements */}
      <audio ref={tickAudio} src="https://actions.google.com/sounds/v1/alarms/beep_short.ogg" preload="auto" />
      <audio ref={sparkleAudio} src="https://actions.google.com/sounds/v1/magic/magic_chime.ogg" preload="auto" />

      {/* Camera Zoom Container */}
      <motion.div
        animate={{ scale: [1, 1.15] }}
        transition={{ duration: 3, ease: "linear" }}
        className="relative z-10 flex items-center justify-center w-full h-full"
      >
        <AnimatePresence>
          {count !== null && count > 0 && (
            <motion.div
              key={count}
              initial={{ scale: 0.2, opacity: 0, rotateX: 60, rotate: -10, x: "-50%", y: "-50%" }}
              animate={{ 
                scale: 1, 
                opacity: 1, 
                rotateX: 0,
                rotate: 0,
                x: "-50%",
                y: "-50%",
                textShadow: "0 0 20px #ff69b4, 0 0 40px #ff1493, 0 0 80px #ff1493"
              }}
              exit={{ scale: 2.5, opacity: 0, filter: "blur(10px)", x: "-50%", y: "-50%" }}
              transition={{ duration: 0.9, type: "spring", bounce: 0.4 }}
              className="absolute top-1/2 left-1/2 font-serif font-bold text-[8rem] sm:text-[12rem] md:text-[20rem] text-white leading-none"
              style={{
                WebkitTextStroke: "2px rgba(255,105,180,0.8)",
              }}
              aria-live="polite"
            >
              {count}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Flash */}
      <AnimatePresence>
        {showFlash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-white z-40"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Final Text */}
      <AnimatePresence>
        {showText && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: "-40%", x: "-50%" }}
            animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)", x: "-50%", y: "-50%" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 z-20 text-center px-4 w-full"
          >
            <h2 className="font-serif italic text-2xl sm:text-3xl md:text-5xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-400 drop-shadow-[0_0_25px_rgba(251,191,36,0.6)] leading-relaxed">
              Someone special deserves<br/>something special 💖
            </h2>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
