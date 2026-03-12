import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Home } from './pages/Home';
import { SurpriseView } from './pages/SurpriseView';

export default function App() {
  const [isBlown, setIsBlown] = useState(false);
  const [showSurprise, setShowSurprise] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<{id: number, left: string, top: string, emoji: string, xOffset: number}[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (isBlown && audioRef.current) {
      audioRef.current.volume = 0.5;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Audio play failed:", error);
        });
      }
    }
  }, [isBlown]);

  const handleSurpriseClick = () => {
    setShowSurprise(true);
  };

  return (
    <>
      {/* Background Music - Happy Birthday Song */}
      <audio 
        ref={audioRef} 
        src="https://archive.org/download/HappyBirthdayToYou_897/Happy_Birthday_To_You.mp3" 
        loop 
        preload="auto" 
      />
      <AnimatePresence mode="wait">
        {showSurprise ? (
          <motion.div 
            key="surprise"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full min-h-screen"
          >
            <SurpriseView onBack={() => setShowSurprise(false)} />
          </motion.div>
        ) : (
          <Home 
            key="home"
            onSurpriseClick={handleSurpriseClick} 
            isBlown={isBlown} 
            setIsBlown={setIsBlown} 
            floatingHearts={floatingHearts} 
            setFloatingHearts={setFloatingHearts} 
          />
        )}
      </AnimatePresence>
    </>
  );
}
