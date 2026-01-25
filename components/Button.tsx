
import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'monochrome' | 'outline';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  icon,
  loading,
  disabled,
  ...props 
}) => {
  // Polaris-inspired base styles:
  // - rounded-lg (approx 0.5rem)
  // - font-medium (not bold)
  // - transition-all
  // - active:scale-[0.98] (mimics Polaris press state)
  const baseStyles = "relative inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black rounded-lg disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98]";
  
  const variants = {
    // Primary: Brand Blue (High Emphasis)
    primary: "bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-900/20 border border-transparent",
    
    // Monochrome: White (High Contrast)
    monochrome: "bg-white text-black hover:bg-neutral-200 border border-transparent shadow-lg",
    
    // Secondary: Dark Grey (Medium Emphasis)
    secondary: "bg-neutral-800 border border-neutral-700 text-white hover:bg-neutral-700 hover:border-neutral-600",
    
    // Outline: Transparent with border
    outline: "bg-transparent border border-neutral-600 text-white hover:border-white hover:bg-white/5",
    
    // Tertiary: Text only (Low Emphasis)
    tertiary: "bg-transparent text-neutral-400 hover:text-white p-0 h-auto hover:underline underline-offset-4"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 size={16} className="animate-spin" />}
      {!loading && icon && <span className="flex items-center justify-center">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export default Button;
