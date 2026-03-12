import React, { useState, useEffect } from 'react';

export const Typewriter = ({ messages }: { messages: string[] }) => {
  const [currentMsgIndex, setCurrentMsgIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentMsg = messages[currentMsgIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentMsg.substring(0, text.length + 1));
        if (text.length === currentMsg.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setText(currentMsg.substring(0, text.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setCurrentMsgIndex((prev) => (prev + 1) % messages.length);
        }
      }
    }, isDeleting ? 40 : 80);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, currentMsgIndex, messages]);

  return (
    <div className="min-h-[3rem] md:min-h-[4rem] flex items-center justify-center mt-4 px-4 text-center">
      <span className="font-script text-2xl md:text-4xl text-amber-200 border-r-2 border-pink-400 pr-1 animate-pulse leading-tight">
        {text}
      </span>
    </div>
  );
};
