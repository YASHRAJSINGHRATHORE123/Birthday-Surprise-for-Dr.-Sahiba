import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Star } from 'lucide-react';
import { CountdownIntro } from '../components/CountdownIntro';
import { FloatingParticles, BackgroundHearts } from '../components/BackgroundEffects';
import { FlipCard } from '../components/FlipCard';

export const SurpriseView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    if (!introDone) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [introDone]);

  return (
    <>
      <AnimatePresence>
        {!introDone && <CountdownIntro onComplete={() => setIntroDone(true)} />}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: introDone ? 1 : 0, scale: introDone ? 1 : 0.95 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: introDone ? 0.5 : 0 }}
        className="min-h-screen bg-[#05020a] text-white relative font-sans w-full overflow-x-hidden"
        style={{ 
          pointerEvents: introDone ? 'auto' : 'none', 
          height: introDone ? 'auto' : '100vh', 
          overflowY: introDone ? 'auto' : 'hidden' 
        }}
      >
      {/* Atmospheric Background */}
      <div className="fixed inset-0 z-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[#0a0514]"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-pink-900/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-900/20 blur-[150px] rounded-full"></div>
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-amber-900/10 blur-[100px] rounded-full"></div>
        <div className="absolute inset-0 opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none"></div>
      </div>
      
      <FloatingParticles />
      <BackgroundHearts />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-20">
        <button 
          onClick={onBack} 
          aria-label="Back to celebration"
          className="group text-pink-300 hover:text-white mb-6 md:mb-8 flex items-center gap-2 transition-all font-medium bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          <span className="group-hover:-translate-x-1 transition-transform" aria-hidden="true">&larr;</span> Back to Celebration
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 sm:p-8 md:p-16 shadow-2xl relative overflow-hidden max-w-4xl mx-auto w-full"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-amber-400" aria-hidden="true"></div>
          
          <div className="flex justify-center mb-8 md:mb-10">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(236,72,153,0.5)]">
              <Heart className="text-white fill-white w-8 h-8 md:w-10 md:h-10" aria-hidden="true" />
            </div>
          </div>

          <h2 className="font-serif italic text-3xl md:text-6xl text-center mb-8 md:mb-10 text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-white to-pink-200 bg-[length:200%_auto] animate-gradient-x">
            A Year of Blessings Ahead
          </h2>

          <div className="space-y-6 md:space-y-8 text-base md:text-2xl text-pink-50/90 leading-relaxed font-light text-center max-w-3xl mx-auto">
            <p>
              Dear Dr. Sahiba,
            </p>
            <p>
              May this year bring you as much joy and healing as you bring to others. Your dedication, your pure soul, and your unwavering kindness make you truly special.
            </p>
            <p>
              May Khatu Shyam Ji bless your path with success, peace, and endless happiness. Keep shining your beautiful light on the world.
            </p>
            
            {/* Personal Message Section */}
            <div className="mt-8 md:mt-12 p-5 sm:p-6 md:p-8 rounded-2xl bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/20 shadow-inner relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#0a0514] px-3 md:px-4 text-pink-300 font-script text-lg md:text-2xl whitespace-nowrap">
                A Special Note For You
              </div>
              <div className="italic text-pink-100/80 text-base md:text-xl leading-relaxed mt-2 space-y-4">
                <p>
                  "You’re on your way to becoming an amazing doctor, and I truly admire your dedication and dreams.
                  Keep shining and never stop believing in yourself."
                </p>
                <p>
                  "Happy Birthday and wishing you all the success and happiness in the world."
                </p>
              </div>
              <p className="mt-4 md:mt-6 text-right text-pink-300 font-medium text-base md:text-lg">
                — YR Rathore
              </p>
            </div>

            <p className="pt-6 md:pt-8 font-script text-3xl md:text-5xl text-pink-300 drop-shadow-md">
              Happy Birthday! 🎉
            </p>
          </div>
        </motion.div>

        <div className="mt-12 md:mt-24 flex flex-col gap-12 sm:gap-20 md:gap-32 pb-20">
          {[
            { id: 1, title: "A Beautiful Beginning", text: "Every great journey starts with a single step. Your journey has been nothing short of magical, touching lives along the way." },
            { id: 2, title: "Healing Hands", text: "The way you care for others shows the pure gold your heart is made of. You are a true healer, inside and out." },
            { id: 3, title: "Unstoppable Spirit", text: "Through all the late nights and endless studying, your determination never faded. We are so proud of you." },
            { id: 4, title: "That Radiant Smile", text: "A smile that brings comfort and joy to everyone around you. Never lose this beautiful spark!" },
            { id: 5, title: "The Bright Future", text: "Khatu Shyam Ji's blessings are always with you. The future holds wonderful things for you, Dr. Sahiba." }
          ].map((memory, index) => (
            <motion.div 
              key={memory.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
              className={`flex ${index % 2 === 1 ? 'flex-row-reverse' : 'flex-row'} items-center gap-4 sm:gap-8 md:gap-16 max-w-5xl mx-auto w-full`}
            >
              <div className="w-[42%] sm:w-[240px] md:w-1/2 flex justify-center shrink-0">
                <div className="w-full md:max-w-sm">
                  <FlipCard i={memory.id} startAnimation={introDone} />
                </div>
              </div>
              <div className={`flex-1 space-y-1.5 sm:space-y-3 md:space-y-4 ${index % 2 === 1 ? 'text-right' : 'text-left'}`}>
                <h3 className="text-lg sm:text-3xl md:text-4xl font-serif italic text-pink-300 leading-tight">{memory.title}</h3>
                <p className="text-[13px] sm:text-base md:text-xl text-pink-100/80 leading-relaxed">
                  {memory.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll to top button */}
      <motion.button
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
        className="fixed bottom-8 right-8 z-50 p-4 bg-pink-600/20 hover:bg-pink-600/40 border border-pink-500/30 rounded-full backdrop-blur-md transition-all text-pink-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
      >
        <Star size={20} className="fill-pink-200" aria-hidden="true" />
      </motion.button>
      </motion.div>
    </>
  );
};
