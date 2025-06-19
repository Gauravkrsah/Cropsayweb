"use client"

import { useState, useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin"
import { CircleArrowLeft, CircleArrowRight } from "lucide-react"
import "../styles/ProductCarousel.css"

gsap.registerPlugin(ScrambleTextPlugin)

const ProductCarousel = () => {
  const products = [
    {
      id: 1,
      name: "Premium Tomato Seeds",
      description: "High-yield hybrid tomato seeds perfect for home gardens. Disease resistant with excellent flavor.",
      price: "$12.99",
      image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=400&h=400&fit=crop",
      ribbon: { text: "NEW", color: "from-green-500 to-green-600" },
    },
    {
      id: 2,
      name: "Organic Carrot Seeds",
      description: "Sweet and crunchy orange carrots. Easy to grow with high germination rate.",
      price: "$8.99",
      image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop",
      ribbon: { text: "ORGANIC", color: "from-green-600 to-green-700" },
    },
    {
      id: 3,
      name: "Bell Pepper Seeds Mix",
      description: "Colorful mix of red, yellow, and green bell pepper seeds. Perfect for salads and cooking.",
      price: "$15.99",
      image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=400&fit=crop",
      ribbon: { text: "HOT DEAL", color: "from-green-700 to-green-800" },
    },
    {
      id: 4,
      name: "Cucumber Seeds",
      description: "Fresh crisp cucumber seeds ideal for pickling or fresh eating. Fast growing variety.",
      price: "$9.99",
      image: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=400&h=400&fit=crop",
      ribbon: { text: "SALE", color: "from-green-500 to-green-600" },
    },
    {
      id: 5,
      name: "Lettuce Seeds Variety Pack",
      description: "Mixed lettuce varieties including romaine, butterhead, and leaf lettuce for continuous harvest.",
      price: "$11.99",
      image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&h=400&fit=crop",
      ribbon: { text: "POPULAR", color: "from-green-600 to-green-700" },
    },
    {
      id: 6,
      name: "Herb Garden Starter Kit",
      description: "Complete herb collection with basil, parsley, cilantro, and oregano seeds.",
      price: "$18.99",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop",
      ribbon: { text: "BUNDLE", color: "from-green-700 to-green-800" },
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [addedToCart, setAddedToCart] = useState(new Set())

  const imageRef = useRef(null)
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const priceRef = useRef(null)
  const buttonRef = useRef(null)
  const cardRef = useRef(null)
  const ribbonRef = useRef(null)
  const handleAddToCart = () => {
    const currentProductId = products[currentIndex].id
    setAddedToCart((prev) => new Set([...prev, currentProductId]))

    // Simple button feedback without scale animation
    if (buttonRef.current) {
      buttonRef.current.style.transform = 'scale(0.98)'
      setTimeout(() => {
        if (buttonRef.current) {
          buttonRef.current.style.transform = 'scale(1)'
        }
      }, 100)
    }

    // Revert back to "Add to Cart" after 3 seconds
    setTimeout(() => {
      setAddedToCart((prev) => {
        const newSet = new Set(prev)
        newSet.delete(currentProductId)
        return newSet
      })
    }, 3000)
  }

  const isInCart = addedToCart.has(products[currentIndex].id)

  const animateTransition = (newIndex) => {
    if (isTransitioning) return
    setIsTransitioning(true)

    const newProduct = products[newIndex]

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentIndex(newIndex)
        setIsTransitioning(false)
      },
    })

    // Image transition - fade out, change, fade in
    tl.to(imageRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.inOut",
    })
      .to(
        ribbonRef.current,
        {
          opacity: 0,
          scale: 0.8,
          duration: 0.2,
          ease: "power2.inOut",
        },
        "-=0.2",
      )
      .call(() => {
        // Change image source and ribbon
        if (imageRef.current) {
          imageRef.current.src = newProduct.image || "/placeholder.svg"
          imageRef.current.alt = newProduct.name
        }
        if (ribbonRef.current) {
          const ribbonSpan = ribbonRef.current.querySelector("span")
          if (ribbonSpan) {
            ribbonSpan.textContent = newProduct.ribbon.text
          }
          // Update gradient colors
          ribbonRef.current.className = ribbonRef.current.className.replace(
            /from-green-\d+ to-green-\d+/g,
            newProduct.ribbon.color,
          )
        }
      })
      .to(imageRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "back.out(1.2)",
      })
      .to(
        ribbonRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "back.out(1.2)",
        },
        "-=0.2",
      )

      // ScrambleText for title
      .to(
        titleRef.current,
        {
          duration: 0.8,
          scrambleText: {
            text: newProduct.name,
            chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            revealDelay: 0.2,
            speed: 0.4,
          },
          ease: "none",
        },
        "-=0.6",
      )

      // ScrambleText for description
      .to(
        descriptionRef.current,
        {
          duration: 1,
          scrambleText: {
            text: newProduct.description,
            chars: "abcdefghijklmnopqrstuvwxyz .,",
            revealDelay: 0.3,
            speed: 0.3,
          },
          ease: "none",
        },
        "-=0.7",
      )

      // ScrambleText for price
      .to(
        priceRef.current,
        {
          duration: 0.6,
          scrambleText: {
            text: newProduct.price,
            chars: "$0123456789.",
            revealDelay: 0.1,
            speed: 0.5,
          },
          ease: "none",
        },
        "-=0.5",
      )
  }

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? products.length - 1 : currentIndex - 1
    animateTransition(newIndex)
  }

  const goToNext = () => {
    const newIndex = currentIndex === products.length - 1 ? 0 : currentIndex + 1
    animateTransition(newIndex)
  }

  const currentProduct = products[currentIndex]
  useEffect(() => {
    // Disable hover effects - direct DOM approach
    if (cardRef.current) {
      // Disable hover animations
      const disableHoverEffect = () => {
        if (cardRef.current) {
          cardRef.current.style.transform = 'none';
          cardRef.current.style.transition = 'none';
          cardRef.current.style.animation = 'none';
        }
      };
      
      cardRef.current.addEventListener('mouseenter', disableHoverEffect);
      cardRef.current.addEventListener('mouseleave', disableHoverEffect);
      
      // Clean up
      return () => {
        if (cardRef.current) {
          cardRef.current.removeEventListener('mouseenter', disableHoverEffect);
          cardRef.current.removeEventListener('mouseleave', disableHoverEffect);
        }
      };
    }
    
  // Initial animation on mount - only run once
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 30, scale: 0.95 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 0.8, 
        ease: "back.out(1.2)",
        clearProps: "all" // Clear all props after animation to prevent hover conflicts
      }
    )

    gsap.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.2)", delay: 0.2 },
    )

    gsap.fromTo(
      ribbonRef.current,
      { opacity: 0, scale: 0.8, x: -30, y: -30 },
      { opacity: 1, scale: 1, x: 0, y: 0, duration: 0.8, ease: "back.out(1.4)", delay: 0.4 },
    )

    // Initial scramble animation for text
    gsap.fromTo(
      titleRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.8,
        scrambleText: {
          text: currentProduct.name,
          chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
          revealDelay: 0.2,
          speed: 0.4,
        },
        delay: 0.4,
      },
    )

    gsap.fromTo(
      descriptionRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        scrambleText: {
          text: currentProduct.description,
          chars: "abcdefghijklmnopqrstuvwxyz .,",
          revealDelay: 0.3,
          speed: 0.3,
        },
        delay: 0.6,
      },
    )

    gsap.fromTo(
      priceRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.6,
        scrambleText: {
          text: currentProduct.price,
          chars: "$0123456789.",
          revealDelay: 0.1,
          speed: 0.5,
        },
        delay: 0.8,
      },
    )

    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.2)", delay: 1      },
    )
  }, [])
  return (    <div 
      className="relative max-w-lg mx-auto p-4"
      style={{ 
        // @ts-ignore - Using CSS variables to prevent animations
        "--prevent-transform": "none", 
        "--prevent-animation": "none", 
        "--prevent-transition": "none"
      } as any}>      <div
        ref={cardRef}
        className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 product-carousel-card"
        style={{ 
          width: "400px", 
          height: "450px",
          transform: "none !important",
          transition: "none !important",
          animation: "none !important",
          willChange: "auto",
          perspective: "none",
          backfaceVisibility: "visible",
          transformStyle: "flat"
        }}
      >        <div className="flex flex-col h-full product-carousel-inner">          {/* Product Image with Ribbon */}
          <div className="bg-gradient-to-br from-green-50 via-green-100 to-emerald-100 flex items-center justify-center relative overflow-hidden product-carousel-content" style={{ height: "240px", transform: "none !important", transition: "none !important" }}>
            <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent"></div>
            <img
              ref={imageRef}
              src={currentProduct.image || "/placeholder.svg"}
              alt={currentProduct.name}
              className="w-full h-full object-cover"
            />

            {/* Diagonal Corner Ribbon */}
            <div className="absolute top-0 left-0 w-0 h-0 z-10">
              <div
                ref={ribbonRef}
                className={`bg-gradient-to-br ${currentProduct.ribbon.color} text-white text-xs font-bold shadow-lg relative`}
                style={{
                  width: "100px",
                  height: "100px",
                  clipPath: "polygon(0 0, 0 100%, 100% 0)",
                }}
              >
                <span
                  className="absolute top-4 left-2 transform rotate-[-45deg] origin-center whitespace-nowrap text-[10px] font-extrabold tracking-wide"
                  style={{
                    textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                  }}
                >
                  {currentProduct.ribbon.text}
                </span>
              </div>
            </div>
          </div>          {/* Product Details */}
          <div className="p-4 flex-1 flex flex-col justify-between">            <div className="space-y-3">
              <h2 ref={titleRef} className="text-lg font-bold text-gray-900 leading-tight text-left">
                {currentProduct.name}
              </h2>
              <p ref={descriptionRef} className="text-gray-600 text-sm leading-relaxed text-left">
                {currentProduct.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4">
              <div ref={priceRef} className="text-xl font-bold text-green-600">
                {currentProduct.price}
              </div>              <button
                ref={buttonRef}
                onClick={handleAddToCart}
                disabled={isInCart}
                className={`${
                  isInCart
                    ? "bg-green-500 cursor-default"
                    : "bg-gradient-to-r from-green-600 to-green-700"
                } text-white font-medium py-2 px-4 rounded-xl focus:outline-none shadow-lg whitespace-nowrap text-sm`}
              >
                {isInCart ? "✓ Added" : "Add to Cart"}
              </button>
            </div>
          </div>          {/* Product Counter */}
          <div className="px-3 pb-2 flex items-center justify-center">
            <div className="flex space-x-1.5">
              {products.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full ${
                    index === currentIndex ? "bg-green-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>      {/* Navigation Arrows */}
      <div className="flex justify-center items-center mt-4 space-x-8">
        <button
          onClick={goToPrevious}
          disabled={isTransitioning}
          className="carousel-nav-button focus:outline-none disabled:opacity-50 hover:opacity-80"
          style={{ 
            background: 'none !important',
            backgroundColor: 'transparent !important',
            outline: 'none !important',
            border: 'none !important',
            transition: 'none !important',
            transform: 'none !important'
          }}
          aria-label="Previous product"
        >
          <CircleArrowLeft className="w-10 h-10 text-white" style={{background: 'none !important'}} />
        </button>

        <button
          onClick={goToNext}
          disabled={isTransitioning}
          className="carousel-nav-button focus:outline-none disabled:opacity-50 hover:opacity-80"
          style={{ 
            background: 'none !important',
            backgroundColor: 'transparent !important',
            outline: 'none !important',
            border: 'none !important',
            transition: 'none !important',
            transform: 'none !important'
          }}
          aria-label="Next product"
        >
          <CircleArrowRight className="w-10 h-10 text-white" style={{background: 'none !important'}} />
        </button>
      </div>
    </div>
  )
}

export default ProductCarousel
