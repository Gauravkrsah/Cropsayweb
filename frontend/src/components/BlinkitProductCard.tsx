import React, { useState } from 'react';

interface BlinkitProductCardProps {
  image: string;
  title: string;
  quantity: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  onAddToCart?: (quantity: number) => void;
  className?: string;
}

const BlinkitProductCard: React.FC<BlinkitProductCardProps> = ({
  image,
  title,
  quantity,
  price,
  originalPrice,
  discountPercent,
  onAddToCart,
  className = ""
}) => {
  const [count, setCount] = useState(0);

  const handleAdd = () => {
    setCount(1);
    onAddToCart?.(1);
  };

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    onAddToCart?.(newCount);
  };

  const handleDecrement = () => {
    if (count === 1) {
      setCount(0);
      onAddToCart?.(0);
    } else if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      onAddToCart?.(newCount);
    }
  };

  return (
    <div className={`
      group relative bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100
      hover:shadow-lg hover:border-gray-200 transition-all duration-300 ease-out
      flex flex-col h-full
      w-full max-w-[180px] sm:max-w-[200px] md:max-w-[220px]
      ${className}
    `}>
      {/* Discount Badge - Exact Blinkit Style */}
      {discountPercent && discountPercent > 0 && (
        <div className="absolute top-2 left-2 z-20">
          <div className="
            bg-green-600 text-white text-[10px] font-bold
            px-2 py-1 rounded-md shadow-sm
            transform transition-transform duration-200
            group-hover:scale-105
          ">
            {discountPercent}% OFF
          </div>
        </div>
      )}
      
      {/* Product Image Container */}
      <div className="
        relative w-full h-32 sm:h-36 md:h-40 lg:h-44
        bg-gray-50 flex items-center justify-center
        p-3 sm:p-4
        overflow-hidden
      ">
        <img
          src={image}
          alt={title}
          className="
            w-full h-full object-contain
            transition-transform duration-300 ease-out
            group-hover:scale-105
          "
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            target.parentElement!.innerHTML = '<div class="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs">Image not found</div>';
          }}
        />
      </div>
      
      {/* Product Details */}
      <div className="flex-1 flex flex-col p-3 pt-2">
        {/* Product Title */}
        <h3 className="
          text-gray-900 font-medium text-sm leading-tight
          line-clamp-2 mb-1 flex-1
          transition-colors duration-200
          group-hover:text-gray-700
        ">
          {title}
        </h3>
        
        {/* Quantity/Weight */}
        <p className="text-gray-500 text-xs mb-3">
          {quantity}
        </p>
        
        {/* Bottom Section - Price and Add Button */}
        <div className="flex items-center justify-between mt-auto">
          {/* Price Section */}
          <div className="flex flex-col space-y-0.5">
            <div className="flex items-baseline space-x-1">
              <span className="text-gray-900 font-semibold text-base">
                ₹{price}
              </span>
              {originalPrice && originalPrice > price && (
                <span className="text-gray-400 text-xs line-through">
                  ₹{originalPrice}
                </span>
              )}
            </div>
          </div>
          
          {/* Add to Cart Controls */}
          <div className="flex-shrink-0 ml-2">
            {count === 0 ? (
              <button
                onClick={handleAdd}
                className="
                  bg-green-600 hover:bg-green-700 active:bg-green-800
                  text-white px-4 py-2 rounded-md text-xs font-bold
                  transition-all duration-200 ease-out
                  min-w-[56px] h-8
                  flex items-center justify-center
                  shadow-sm hover:shadow-md
                  transform hover:scale-105 active:scale-95
                "
              >
                ADD
              </button>
            ) : (
              <div className="
                flex items-center border border-green-600 rounded-md
                bg-white min-w-[72px] h-8
                shadow-sm
              ">
                <button
                  onClick={handleDecrement}
                  className="
                    w-6 h-full flex items-center justify-center
                    text-green-600 hover:bg-green-50 active:bg-green-100
                    font-bold text-base leading-none
                    transition-colors duration-150
                    rounded-l-md
                  "
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <div className="
                  flex-1 h-full flex items-center justify-center
                  text-green-600 font-semibold text-sm
                  border-x border-green-200 bg-green-50
                  min-w-[24px]
                ">
                  {count}
                </div>
                <button
                  onClick={handleIncrement}
                  className="
                    w-6 h-full flex items-center justify-center
                    text-green-600 hover:bg-green-50 active:bg-green-100
                    font-bold text-base leading-none
                    transition-colors duration-150
                    rounded-r-md
                  "
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlinkitProductCard;
