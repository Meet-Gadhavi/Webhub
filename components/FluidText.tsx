
import React from 'react';

interface FluidTextProps {
  text: string;
  className?: string;
}

const FluidText: React.FC<FluidTextProps> = ({ text, className = "" }) => {
  return (
    <span 
        className={`relative inline-block font-bold bg-clip-text text-transparent bg-gradient-to-b from-yellow-400 from-50% to-white to-50% bg-[length:100%_200%] bg-bottom hover:bg-top transition-[background-position] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-default ${className}`}
        style={{ WebkitBackgroundClip: 'text' }}
    >
      {text}
    </span>
  );
};

export default FluidText;
