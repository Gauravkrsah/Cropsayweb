import React from 'react';

type PatterNPR ops = {
  color?: string;
  size?: number;
  opacity?: number;
  className?: string;
};

export const DotPattern: React.FC<PatterNPR ops> = ({ 
  color = 'currentColor',
  size = 24, 
  opacity = 0.1,
  className = ''
}) => {
  return (
    <div 
      className={`absolute inset-0 pointer-events-none ${className}`} 
      style={{ 
        backgroundImage: `radial-gradient(${color} ${size/6}px, transparent ${size/6}px)`,
        backgroundSize: `${size}px ${size}px`,
        opacity
      }}
    />
  );
};

export const GridPattern: React.FC<PatterNPR ops> = ({ 
  color = 'currentColor',
  size = 24,
  opacity = 0.07,
  className = ''
}) => {
  return (
    <div 
      className={`absolute inset-0 pointer-events-none ${className}`} 
      style={{ 
        backgroundImage: `linear-gradient(to right, ${color} 1px, transparent 1px), 
                          linear-gradient(to bottom, ${color} 1px, transparent 1px)`,
        backgroundSize: `${size}px ${size}px`,
        opacity
      }}
    />
  );
};

export const WavePattern: React.FC<PatterNPR ops> = ({
  color = 'currentColor',
  opacity = 0.07,
  className = ''
}) => {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <svg 
        viewBox="0 0 1440 320" 
        className="absolute w-full min-w-[1440px] h-full"
        style={{ opacity }}
        preserveAspectRatio="none"
      >
        <path 
          fill={color} 
          fillOpacity="1" 
          d="M0,224L30,213.3C60,203,120,181,180,181.3C240,181,300,203,360,218.7C420,235,480,245,540,218.7C600,192,660,128,720,128C780,128,840,192,900,197.3C960,203,1020,149,1080,117.3C1140,85,1200,75,1260,96C1320,117,1380,171,1410,197.3L1440,224L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
};

export const DiagonalPattern: React.FC<PatterNPR ops> = ({
  color = 'currentColor',
  size = 10,
  opacity = 0.08,
  className = ''
}) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `repeating-linear-gradient(45deg, ${color} 0, ${color} 1px, transparent 0, transparent ${size}px)`,
        opacity
      }}
    />
  );
};



export const CirclePattern: React.FC<PatterNPR ops> = ({
  color = 'currentColor',
  size = 30,
  opacity = 0.07,
  className = ''
}) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `radial-gradient(${color} 8%, transparent 8%),
                           radial-gradient(${color} 8%, transparent 8%)`,
        backgroundPosition: `0 0, ${size/2}px ${size/2}px`,
        backgroundSize: `${size}px ${size}px`,
        opacity
      }}
    />
  );
};
