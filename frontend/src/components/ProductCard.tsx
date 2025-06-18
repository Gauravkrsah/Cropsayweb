import React, { useState, useEffect } from 'react';

type Props = {
  image: string;
  name: string;
  quantity: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  deliveryTime?: string;
  onAddToCart?: (quantity: number) => void;
};

export default function ProductCard({
  image,
  name,
  quantity,
  price,
  originalPrice,
  discountPercent,
  deliveryTime,
  onAddToCart,
}: Props) {
  const [count, setCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    onAddToCart?.(newCount);
  };
  
  const decrement = () => {
    if (count === 1) {
      setCount(0);
      onAddToCart?.(0);
    } else if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      onAddToCart?.(newCount);
    }
  };return (    <div      className={        isMobile
          ? `relative bg-white rounded-xl shadow flex flex-col w-full h-[280px] transition-all duration-300 pt-2 pb-3 px-2.5`
          : `relative bg-white rounded-2xl shadow hover:shadow-lg p-4 flex flex-col w-full h-[360px] transition-all duration-300`
      }
    >
      {/* Discount Label - Blinkit Style */}
      {discountPercent && (
        <div
          className={
            isMobile              ? `absolute top-1 left-1 bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-md z-10`
              : `absolute top-3 left-3 bg-green-600 text-white text-sm font-bold px-2.5 py-0.5 rounded-full shadow-md z-10`
          }
          style={{ userSelect: 'none' }}
        >
          {discountPercent}% OFF
        </div>
      )}      <div className={isMobile ? 'flex justify-center items-center h-28 w-full mb-1 mt-1 flex-shrink-0' : 'flex justify-center items-center h-40 w-full mb-3 flex-shrink-0'}>
        <img
          src={image}
          alt={name}
          className={isMobile ? 'object-contain h-full max-h-28 w-auto max-w-full' : 'object-contain h-full max-h-40 w-auto max-w-full'}
          loading="lazy"
        />
      </div>      {/* Content area with fixed height */}
      <div className={isMobile ? 'flex-1 flex flex-col justify-between min-h-0' : 'flex-1 flex flex-col justify-between min-h-0'}>
        {/* Delivery Time */}
        {deliveryTime && (        <div className={isMobile ? 'flex items-center text-xs text-gray-600 mb-1 select-none flex-shrink-0' : 'flex items-center text-sm text-gray-600 mb-2 select-none flex-shrink-0'}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={isMobile ? 'h-3.5 w-3.5 mr-1 text-gray-500' : 'h-4 w-4 mr-1 text-gray-500'}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{deliveryTime}</span>
          </div>
        )}        {/* Product name with fixed height */}
        <div className={isMobile ? 'text-gray-800 font-medium text-xs text-left mb-0.5 h-8 flex items-start overflow-hidden' : 'text-gray-800 font-medium text-base text-left mb-1.5 h-12 flex items-start overflow-hidden'}>
          <span className="line-clamp-2 leading-tight">{name}</span>
        </div>{/* Quantity with fixed height */}
        <div className={isMobile ? 'text-gray-500 text-[10px] text-left mb-1.5 h-3 flex items-center flex-shrink-0' : 'text-gray-500 text-sm text-left mb-2 h-5 flex items-center flex-shrink-0'}>
          {quantity}
        </div>{/* Price and Add Button */}      
        <div className={isMobile ? 'flex justify-between items-center flex-shrink-0' : 'flex justify-between items-center flex-shrink-0'}>
          <div className={isMobile ? 'flex flex-col justify-center text-left' : 'flex flex-col justify-center text-left'}>
            <div className={isMobile ? 'text-gray-800 font-semibold text-sm' : 'text-gray-800 font-semibold text-lg'}>
              ₹{price}
            </div>
            {originalPrice && (
              <div className={isMobile ? 'text-gray-400 line-through text-[10px]' : 'text-gray-400 line-through text-sm'}>
                ₹{originalPrice}
              </div>
            )}
          </div><div className="flex justify-center flex-shrink-0 transition-all duration-300">          {isMobile
            ? count === 0
              ? (
                <button
                  onClick={() => {
                    setCount(1);
                    onAddToCart?.(1);
                  }}
                  className="bg-green-600 text-white text-xs font-bold rounded-md hover:bg-green-700 transition-all flex items-center justify-center"
                  style={{ 
                    height: '32px', 
                    width: '100px',
                    minWidth: '100px',
                    boxSizing: 'border-box'
                  }}
                >
                  ADD
                </button>
              ) : (
                <div
                  className="flex items-center border border-green-600 rounded-md overflow-hidden bg-white"
                  style={{ 
                    height: '32px', 
                    width: '100px',
                    minWidth: '100px',
                    boxSizing: 'border-box'
                  }}
                >                  <button
                    onClick={decrement}
                    className="h-full text-green-600 font-bold text-base select-none flex items-center justify-center bg-transparent"
                    style={{ width: '28px', minWidth: '28px' }}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <div
                    className="h-full text-green-600 font-semibold text-xs flex items-center justify-center bg-transparent"
                    style={{ width: '44px', minWidth: '44px', padding: '0 2px' }}
                  >
                    {count}
                  </div>
                  <button
                    onClick={increment}
                    className="h-full text-green-600 font-bold text-base select-none flex items-center justify-center bg-transparent"
                    style={{ width: '28px', minWidth: '28px' }}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              )            : count === 0
            ? (              <button
                onClick={() => {
                  setCount(1);
                  onAddToCart?.(1);
                }}
                className="bg-green-600 text-white text-sm font-bold rounded-md hover:bg-green-700 transition-all flex items-center justify-center"                style={{ 
                  height: '36px', 
                  width: '110px',
                  minWidth: '110px',
                  boxSizing: 'border-box'
                }}
              >
                ADD
              </button>
            ) : (              <div
                className="flex items-center border border-green-600 rounded-md overflow-hidden"
                style={{ 
                  height: '36px', 
                  width: '110px',
                  minWidth: '110px',
                  boxSizing: 'border-box'
                }}
              ><button
                  onClick={decrement}
                  className="h-full text-green-600 font-bold text-xl select-none flex items-center justify-center bg-transparent"
                  style={{ width: '30px', minWidth: '30px' }}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <div
                  className="h-full text-green-600 font-semibold text-base flex items-center justify-center bg-transparent"
                  style={{ width: '50px', minWidth: '50px', padding: '0 2px' }}
                >
                  {count}
                </div>
                <button
                  onClick={increment}
                  className="h-full text-green-600 font-bold text-xl select-none flex items-center justify-center bg-transparent"
                  style={{ width: '30px', minWidth: '30px' }}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>            )}
        </div>
        </div>
      </div>
    </div>
  );
}
