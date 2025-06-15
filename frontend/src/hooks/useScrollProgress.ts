import { useState, useEffect, RefObject } from 'react';

/**
 * Hook to track horizontal scroll progress
 */
export function useScrollProgress(scrollRef: RefObject<HTMLDivElement>) {
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    
    const element = scrollRef.current;
    const scrollWidth = element.scrollWidth - element.clientWidth;
    const scrollLeft = element.scrollLeft;
    
    // Calculate progress percentage (0 to 100)
    const progress = Math.min(Math.max((scrollLeft / scrollWidth) * 100, 0), 100);
    setScrollProgress(progress);
  };

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;
    
    // Add scroll event listener
    element.addEventListener('scroll', handleScroll);
    
    // Initial calculation
    handleScroll();
    
    return () => {
      element.removeEventListener('scroll', handleScroll);
    };
  }, [scrollRef]);

  return scrollProgress;
}
