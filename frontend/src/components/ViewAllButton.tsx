import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface ViewAllButtoNPR ops {
  to: string;
  text?: string;
  className?: string;
}

const ViewAllButton: React.FC<ViewAllButtoNPR ops> = ({ 
  to, 
  text = "View All", 
  className = "" 
}) => {
  return (
    <div className={`text-center mt-8 sm:mt-10 ${className}`}>
      <Link to={to}>
        <Button 
          className="view-all-button bg-[#0C831F] hover:bg-[#2d24b8] text-white px-6 sm:px-8 py-2.5 rounded-lg hover:scale-105 transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg w-auto"
        >
          {text} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </Link>
    </div>
  );
};

export default ViewAllButton;
