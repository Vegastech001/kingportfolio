
import { useState, useEffect } from 'react';

interface TypewriterEffectProps {
  texts: string[];
  isDark: boolean;
}

const TypewriterEffect = ({ texts, isDark }: TypewriterEffectProps) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const typeSpeed = isDeleting ? 30 : 80;
    const text = texts[currentTextIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting && currentText !== text) {
        setCurrentText(text.substring(0, currentText.length + 1));
      } else if (isDeleting && currentText !== '') {
        setCurrentText(text.substring(0, currentText.length - 1));
      } else if (!isDeleting && currentText === text) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentTextIndex, texts]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="h-16 flex items-center justify-center">
      <span className="text-3xl md:text-4xl font-mono font-light tracking-wide">
        <span className={`${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
          {currentText}
        </span>
        <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100 ${isDark ? 'text-white' : 'text-black'}`}>
          |
        </span>
      </span>
    </div>
  );
};

export default TypewriterEffect;
