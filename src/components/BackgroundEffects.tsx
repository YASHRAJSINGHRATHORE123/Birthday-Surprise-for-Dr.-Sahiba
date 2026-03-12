import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Stethoscope, HeartPulse, BookOpen, Heart } from 'lucide-react';

export const Petals = () => {
  const [petals, setPetals] = useState<any[]>([]);

  useEffect(() => {
    setPetals(Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 8 + Math.random() * 10,
      delay: Math.random() * 15,
      size: 14 + Math.random() * 16,
      emoji: ['🌸', '🌺', '🌷', '💮', '🌹', '✿'][Math.floor(Math.random() * 6)],
      xOffset1: Math.random() * 100 - 50,
      xOffset2: Math.random() * 100 - 50,
      rotationDir: 360 * (Math.random() > 0.5 ? 1 : -1)
    })));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {petals.map(p => (
        <motion.div
          key={p.id}
          className="absolute -top-10"
          style={{ left: `${p.left}vw`, fontSize: p.size }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, p.xOffset1, p.xOffset2],
            rotate: [0, p.rotationDir],
            opacity: [0, 0.8, 0.8, 0]
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {p.emoji}
        </motion.div>
      ))}
    </div>
  );
};

export const FloatingIcons = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-10 md:opacity-15 hidden sm:block" aria-hidden="true">
      <motion.div animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/4 left-[15%]">
        <Stethoscope size={72} className="text-white" />
      </motion.div>
      <motion.div animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-1/3 right-[15%]">
        <HeartPulse size={80} className="text-pink-400" />
      </motion.div>
      <motion.div animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-1/4 left-[20%]">
        <BookOpen size={64} className="text-blue-300" />
      </motion.div>
    </div>
  );
};

export const FloatingParticles = () => {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    // Limit particle count for performance
    setParticles([...Array(20)].map((_, i) => ({
      id: i,
      initialX: Math.random() * 100 + "vw",
      initialY: Math.random() * 100 + "vh",
      opacity: Math.random() * 0.5,
      targetY: Math.random() * 100 + "vh",
      targetX: Math.random() * 100 + "vw",
      duration: 20 + Math.random() * 20
    })));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ 
            x: p.initialX, 
            y: p.initialY,
            opacity: p.opacity
          }}
          animate={{ 
            y: [null, p.targetY],
            x: [null, p.targetX],
          }}
          transition={{ 
            duration: p.duration, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute w-1 h-1 bg-pink-200/30 rounded-full blur-[1px]"
        />
      ))}
    </div>
  );
};

export const BackgroundHearts = () => {
  const [hearts, setHearts] = useState<any[]>([]);

  useEffect(() => {
    setHearts(Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      size: 16 + Math.random() * 24,
      duration: 15 + Math.random() * 15,
      delay: Math.random() * 10,
      opacity: 0.1 + Math.random() * 0.2,
      xOffset1: Math.random() * 60 - 30,
      xOffset2: Math.random() * 60 - 30,
      rotate1: Math.random() * 180 - 90,
      rotate2: Math.random() * 180 - 90,
    })));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {hearts.map(h => (
        <motion.div
          key={h.id}
          className="absolute -bottom-16 text-pink-500"
          style={{ left: h.left, opacity: h.opacity }}
          animate={{
            y: ['0vh', '-120vh'],
            x: [0, h.xOffset1, h.xOffset2],
            rotate: [0, h.rotate1, h.rotate2],
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Heart size={h.size} fill="currentColor" />
        </motion.div>
      ))}
    </div>
  );
};
