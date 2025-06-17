import React, { FC } from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  gradientColors?: string;
  className?: string;
}

const SectionTitle: FC<SectionTitleProps> = ({
  title,
  subtitle,
  icon,
  gradientColors = "from-[#0C831F] to-green-500",
  className = ""
}) => {
  return (
    <div className={`text-center mb-8 sm:mb-10 md:mb-12 ${className}`}>
      <div className="relative inline-block">
        {icon && (
          <div className="absolute -top-6 sm:-top-8 left-1/2 transform -translate-x-1/2 text-2xl sm:text-3xl md:text-4xl animate-bounce-subtle">
            {icon}
          </div>
        )}
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 px-3 sm:px-4 pt-1 sm:pt-2 leading-tight">
          {title}
        </h2>
        <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 sm:w-16 md:w-24 h-1 bg-gradient-to-r ${gradientColors} rounded-full`}></div>
      </div>
      {subtitle && (
        <p className="text-gray-600 text-sm sm:text-base md:text-lg mt-3 sm:mt-4 max-w-lg mx-auto px-3 sm:px-2 leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
};

export default SectionTitle;
