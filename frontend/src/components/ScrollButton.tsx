import React, { useState } from 'react';

interface ScrollButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
}

/**
 * Enhanced scroll button with loading indicator
 */
const ScrollButton: React.FC<ScrollButtonProps> = ({ direction, onClick }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    onClick();
    
    // Reset loading state after animation completes
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  return (
    <button 
      className={`w-9 h-9 flex items-center justify-center bg-white border border-gray-200 
        rounded-full shadow-md hover:shadow-lg hover:bg-[#0C831F] hover:border-[#0C831F] hover:text-white
        active:scale-95 transition-all duration-300
        ${isLoading ? 'opacity-70' : ''}`}
      onClick={handleClick}
      aria-label={`Scroll ${direction}`}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="h-3.5 w-3.5 rounded-full border-2 border-[#0C831F] border-t-transparent animate-spin"></div>
      ) : direction === 'left' ? (
        <svg width="7" height="12" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:stroke-white">
          <path d="M5 1L1 5L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ) : (
        <svg width="7" height="12" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:stroke-white">
          <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </button>
  );
};

export default ScrollButton;
