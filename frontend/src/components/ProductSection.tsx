import React from 'react';

interface ProductSectioNPR ops {
  children: React.ReactNode;
  className?: string;
  backgroundColor?: string;
  elevation?: 'flat' | 'raised' | 'floating';
}

const ProductSection: React.FC<ProductSectioNPR ops> = ({ 
  children, 
  className = "", 
  backgroundColor = "bg-white",
  elevation = "raised"
}) => {
  const shadowClass = 
    elevation === 'flat' ? 'shadow-sm border border-gray-100' : 
    elevation === 'raised' ? 'shadow-md' : 
    'shadow-lg hover:shadow-xl transition-shadow duration-300';
  return (
    <div className={`visible-cards-container my-8 relative ${className}`}>
      <div className={`relative z-10 ${backgroundColor} rounded-xl p-4 sm:p-5 md:p-6 ${shadowClass} transition-all duration-300 hover:shadow-lg`}>
        {children}
      </div>
      
      {/* Subtle gradient background for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-100/10 to-transparent rounded-xl -z-10 opacity-50"></div>
    </div>
  );
};

export default ProductSection;
