import { useState, useEffect, RefObject } from 'react';

/**
 * Custom hook for handling horizontal scroll with touch/drag support
 */
export function useHorizontalScroll(scrollRef: RefObject<HTMLDivElement>) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: MouseEvent) => {
    if (!scrollRef.current) return;
    
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    scrollRef.current.style.cursor = 'grabbing';
  };

  const handleMouseUp = () => {
    if (!scrollRef.current) return;
    
    setIsDragging(false);
    scrollRef.current.style.cursor = 'grab';
  };

  const handleMouseLeave = () => {
    if (!scrollRef.current) return;
    
    setIsDragging(false);
    scrollRef.current.style.cursor = '';
  };
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Reduced scroll speed for smoother experience
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e: TouchEvent) => {
    if (!scrollRef.current) return;
    
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || !scrollRef.current) return;
    
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;
    
    // Mouse event listeners
    element.addEventListener('mousedown', handleMouseDown as EventListener);
    element.addEventListener('mouseleave', handleMouseLeave as EventListener);
    element.addEventListener('mouseup', handleMouseUp as EventListener);
    element.addEventListener('mousemove', handleMouseMove as EventListener);
    
    // Touch event listeners
    element.addEventListener('touchstart', handleTouchStart as EventListener);
    element.addEventListener('touchend', handleTouchEnd as EventListener);
    element.addEventListener('touchmove', handleTouchMove as EventListener);

    // Set initial cursor
    element.style.cursor = 'grab';
    
    return () => {
      // Clean up
      element.removeEventListener('mousedown', handleMouseDown as EventListener);
      element.removeEventListener('mouseleave', handleMouseLeave as EventListener);
      element.removeEventListener('mouseup', handleMouseUp as EventListener);
      element.removeEventListener('mousemove', handleMouseMove as EventListener);
      
      element.removeEventListener('touchstart', handleTouchStart as EventListener);
      element.removeEventListener('touchend', handleTouchEnd as EventListener);
      element.removeEventListener('touchmove', handleTouchMove as EventListener);
    };
  }, [scrollRef, isDragging, startX, scrollLeft]);
}
