
import React from 'react';

interface AnimatedWebhubProps {
  className?: string;
  onClick?: () => void;
  isHeader?: boolean;
}

const AnimatedWebhub: React.FC<AnimatedWebhubProps> = ({ className = "text-xl", onClick }) => {
  return (
    <span 
        onClick={onClick}
        className={`inline-flex items-center font-bold tracking-tighter cursor-pointer select-none ${className}`}
    >
        <span className="text-white">WEB</span>
        {/* Precise 2px spacing */}
        <span className="text-yellow-400 ml-[2px]">HUB</span>
    </span>
  );
};

export default AnimatedWebhub;
