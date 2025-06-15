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
  gradientColors = "from-blue-500 to-purple-500",
  className = ""
}) => {
  return (
    <div className={`text-center mb-10 sm:mb-12 ${className}`}>
      <div className="relative inline-block">
        {icon && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-3xl sm:text-4xl animate-bounce-subtle">
            {icon}
          </div>
        )}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 px-4 pt-2">
          {title}
        </h2>
        <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 sm:w-24 h-1 bg-gradient-to-r ${gradientColors} rounded-full`}></div>
      </div>
      {subtitle && (
        <p className="text-gray-600 text-sm sm:text-base mt-4 max-w-lg mx-auto px-2 leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
};

export default SectionTitle;
