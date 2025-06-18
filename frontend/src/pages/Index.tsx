import { useRef, useEffect, useState } from "react";
import { 
  ShoppingCart, Heart, Star, Truck, Shield, RotateCcw, 
  ArrowRight, MessageCircle, Facebook, Instagram, Twitter, 
  Youtube, ChevronRight, MapPin, Phone, Mail 
} from "lucide-react";
import ScrollButton from "@/components/ScrollButton";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { DotPattern } from "@/components/ui/background-pattern";
import SectionTitle from "@/components/ui/section-title";
import ProductSection from "@/components/ProductSection";
import ViewAllButton from "@/components/ViewAllButton";
import "@/components/styles/HideScrollbar.css";
import "@/components/styles/HeroAnimation.css";
import "@/components/styles/HeroCard.css";
import "@/components/styles/MobileOptimized.css";

const Index = () => {
  const heroRef = useRef<HTMLElement>(null);
  const featuredRef = useRef<HTMLElement>(null);
  const hotDealsScrollRef = useRef<HTMLDivElement>(null);
  const newArrivalsScrollRef = useRef<HTMLDivElement>(null);
  const featuredProductsScrollRef = useRef<HTMLDivElement>(null);
  const heroCardRef = useRef<HTMLDivElement>(null);
  const addToCartBtnRef = useRef<HTMLButtonElement>(null);
    // State to control animations
  const [showAnimation, setShowAnimation] = useState(false);
  const [cardAnimation, setCardAnimation] = useState(false);
    // Agricultural site - no audio context needed// Handler for Add to Cart button - with smoother animation
  const handleAddToCart = () => {
    setCardAnimation(true);
    setShowAnimation(true);
    
    // Reset animation after it completes
    setTimeout(() => {
      setCardAnimation(false);
    }, 1000);
  };
    // Scroll handlers for product lists
  const scrollProducts = (containerRef: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    // Calculate scroll amount: 2 cards (220px each) + 2 gaps (16px each) = 472px
    const scrollAmount = window.innerWidth >= 640 ? 472 : 424; // Smaller cards on mobile
    
    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  };const categories = [
    { name: "Seeds", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop", count: "500+", icon: "🌱" },
    { name: "Fertilizers", image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=300&h=300&fit=crop", count: "200+", icon: "🧪" },
    { name: "Tools", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop", count: "150+", icon: "🛠️" },
    { name: "Pesticides", image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=300&fit=crop", count: "120+", icon: "🧴" },
    { name: "Irrigation", image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=300&h=300&fit=crop", count: "80+", icon: "💧" },
    { name: "Organic Products", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop", count: "250+", icon: "🌿" },
    { name: "Soil Testing", image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=300&fit=crop", count: "45+", icon: "🔬" },
    { name: "Farm Equipment", image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=300&h=300&fit=crop", count: "90+", icon: "🚜" }
  ];
  const hotDeals = [
    {
      id: 1,
      name: "Premium Hybrid Seeds",
      subtitle: "High Yield Varieties",
      price: 2499,
      originalPrice: 2999,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop",
      badge: "30% OFF",
      rating: 4.9,
      reviews: 324,
      discount: 30
    },
    {
      id: 2,
      name: "Organic Fertilizer",
      subtitle: "NPK Rich Formula",
      price: 1299,
      originalPrice: 1599,
      image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=300&h=300&fit=crop",
      badge: "25% OFF",
      rating: 4.8,
      reviews: 156,
      discount: 25
    },
    {
      id: 3,
      name: "Garden Tool Set",
      subtitle: "Professional Grade",
      price: 3999,
      originalPrice: 4999,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop",
      badge: "20% OFF",
      rating: 4.9,
      reviews: 89,
      discount: 20
    },
    {
      id: 4,
      name: "Bio Pesticide",
      subtitle: "Eco-Friendly Solution",
      price: 899,
      originalPrice: 1199,
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=300&fit=crop",
      badge: "35% OFF",
      rating: 4.7,
      reviews: 234,
      discount: 35
    },
    {
      id: 5,
      name: "Irrigation Kit",
      subtitle: "Smart Watering System",
      price: 1599,
      originalPrice: 2299,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop",
      badge: "30% OFF",
      rating: 4.6,
      reviews: 178,
      discount: 30
    },
    {
      id: 6,
      name: "Plant Growth Promoter",
      subtitle: "Natural Nutrients",
      price: 799,
      originalPrice: 1099,
      image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=300&h=300&fit=crop",
      badge: "27% OFF",
      rating: 4.5,
      reviews: 412,
      discount: 27
    },
    {
      id: 7,
      name: "Greenhouse Supplies",
      subtitle: "Complete Setup",
      price: 1799,
      originalPrice: 2399,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop",
      badge: "25% OFF",
      rating: 4.8,
      reviews: 95,
      discount: 25
    },
    {
      id: 8,
      name: "Soil Test Kit",
      subtitle: "Accurate Analysis",
      price: 999,
      originalPrice: 1399,
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=300&fit=crop",
      badge: "28% OFF",
      rating: 4.6,
      reviews: 167,
      discount: 28
    }
  ];
  const newArrivals = [
    {
      id: 9,
      name: "Smart Irrigation System",
      subtitle: "Automated Watering",
      price: 4999,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop",
      badge: "NEW",
      rating: 4.8,
      reviews: 42,
      isNew: true
    },
    {
      id: 10,
      name: "Organic Vermicompost",
      subtitle: "Natural Soil Enricher",
      price: 1899,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=300&h=300&fit=crop",
      badge: "NEW",
      rating: 4.7,
      reviews: 28,
      isNew: true
    },
    {
      id: 11,
      name: "GPS Soil Monitor",
      subtitle: "Real-time Soil Analysis",
      price: 3499,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=300&fit=crop",
      badge: "NEW",
      rating: 4.9,
      reviews: 67,
      isNew: true
    },
    {
      id: 12,
      name: "Raised Garden Bed",
      subtitle: "Modular Design",
      price: 2299,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop",
      badge: "NEW",
      rating: 4.6,
      reviews: 15,
      isNew: true
    },
    {
      id: 13,
      name: "Plant Protection Net",
      subtitle: "UV Resistant",
      price: 1599,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop",
      badge: "NEW",
      rating: 4.7,
      reviews: 33,
      isNew: true
    },
    {
      id: 14,
      name: "Weather Station",
      subtitle: "Monitor Climate",
      price: 2799,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=300&fit=crop",
      badge: "NEW",
      rating: 4.8,
      reviews: 52,
      isNew: true
    },
    {
      id: 15,
      name: "Mulch Film",
      subtitle: "Weed Protection",
      price: 1299,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop",
      badge: "NEW",
      rating: 4.5,
      reviews: 21,
      isNew: true
    },
    {
      id: 16,
      name: "Seed Germination Kit",
      subtitle: "Quick Start Growing",
      price: 699,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=300&h=300&fit=crop",
      badge: "NEW",
      rating: 4.9,
      reviews: 78,
      isNew: true
    }
  ];  const heroProduct = {
    id: 'hero-combo',
    name: "Premium Seeds",
    subtitle: "High-yield collection",
    description: "Quality hybrid seeds for better harvest",
    price: 2499,
    originalPrice: 3999,
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=500&fit=crop",
    badge: "SPECIAL OFFER",
    rating: 4.9,
    reviews: 235,
    discount: 38
  };
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Announcement Bar - Improved with gradient */}
      <div className="bg-gradient-to-r from-green-600 via-[#0C831F] to-green-500 text-white text-center py-1 sm:py-1.5 md:py-2 text-xs sm:text-sm md:text-base font-medium w-full flex items-center justify-center space-x-2">
        <span className="bg-white bg-opacity-20 rounded-full w-4 h-4 inline-flex items-center justify-center text-[8px] sm:text-[10px]">✓</span>
        <span>FREE SHIPPING ON ORDERS OVER RS. 2000 IN KATHMANDU VALLEY</span>
      </div>
      
      {/* Hero Section - Enhanced responsive design for all screen sizes */}
      <section ref={heroRef} className="hero-section relative bg-gradient-to-br from-green-600 via-[#0C831F] to-[#0a6b1a] overflow-hidden w-full">        {/* Dynamic responsive padding and min-height - optimized for mobile */}
        <div className="py-1 xs:py-2 sm:py-6 md:py-8 lg:py-12 xl:py-16 min-h-[calc(100vh-6rem)] xs:min-h-[calc(100vh-5rem)] sm:min-h-[75vh] md:min-h-[70vh] lg:min-h-[75vh] xl:min-h-[80vh] flex items-center">
          {/* Enhanced background patterns with better mobile optimization */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            {/* Simplified background pattern for better mobile performance */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMCAwdi02aC02djZoNnptNiAwaDZ2LTZoLTZ2NnptLTEyIDBoLTZ2LTZoNnY2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
            {/* Enhanced gradient overlay for better contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-green-800/20 to-transparent"></div>
          </div>
          
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr,0.8fr] xl:grid-cols-[1fr,0.7fr] gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 items-center">
              {/* Text content - Enhanced responsive typography */}
              <div className="hero-content text-white z-10 relative order-2 lg:order-1 text-center lg:text-left max-w-full lg:max-w-none mx-auto lg:mx-0">
                <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">                  <h1 className="font-bold tracking-tight leading-[1.1] text-center lg:text-left" 
                      style={{ 
                        fontFamily: 'var(--font-rounded, "DM Sans", "Inter", system-ui, sans-serif)',
                        fontSize: 'clamp(1.5rem, 4vw, 3.5rem)'
                      }}>
                    <span className="whitespace-nowrap">Everything Your</span>
                    <span className="text-green-300 block mt-1 sm:mt-2">
                      Farm Needs
                    </span>
                  </h1>
                  <p className="opacity-90 max-w-2xl leading-relaxed text-green-100 tracking-wide text-center lg:text-left mx-auto lg:mx-0" 
                     style={{ 
                       fontFamily: 'var(--font-rounded, "DM Sans", "Inter", system-ui, sans-serif)',
                       fontSize: 'clamp(0.875rem, 2.5vw, 1.25rem)'
                     }}>
                    Premium quality agricultural products delivered fast to your doorstep in Kathmandu Valley.
                  </p>
                </div>
                
                <div className="flex items-center justify-center lg:justify-start mt-4 sm:mt-6 bg-white/15 backdrop-blur-sm rounded-full py-2 sm:py-3 px-4 sm:px-6 w-fit mx-auto lg:mx-0">
                  <div className="flex items-center text-green-300">
                    <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-300 rounded-full mr-3 animate-pulse"></span>
                    <span className="font-medium text-sm sm:text-base tracking-wider" style={{ fontFamily: 'var(--font-rounded, "DM Sans", "Inter", system-ui, sans-serif)' }}>Free delivery in 30 minutes</span>
                  </div>
                </div>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 justify-center lg:justify-start">
                  <Link to="/shop" className="w-full sm:w-auto">
                    <Button className="bg-white hover:bg-gray-100 text-[#0C831F] px-6 sm:px-8 py-3 sm:py-4 font-bold rounded-full w-full tracking-wide shadow-lg hover:shadow-xl transition-all duration-300" 
                            style={{ fontSize: 'clamp(0.875rem, 2.5vw, 1.125rem)' }}>
                      <span>Shop Now</span>
                      <ArrowRight className="ml-3 h-5 w-5" />
                    </Button>
                  </Link>
                  
                  <Link to="/expert" className="w-full sm:w-auto">
                    <Button 
                      variant="outline" 
                      className="border-2 border-white text-white hover:bg-white hover:text-[#0C831F] px-6 sm:px-8 py-3 sm:py-4 font-bold rounded-full w-full tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 bg-transparent" 
                      style={{ fontSize: 'clamp(0.875rem, 2.5vw, 1.125rem)' }}
                    >
                      <MessageCircle className="mr-3 h-5 w-5" />
                      <span>Chat with Expert</span>
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Hero Product Card - Enhanced responsive design */}
              <div 
                ref={heroCardRef} 
                className="hero-product-card order-1 lg:order-2 z-10 flex justify-center lg:justify-end relative"
              >                {/* Redesigned agricultural themed hero card - bigger size and no hover effects */}
                <Card className="bg-white border-0 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg sm:shadow-xl w-full max-w-[320px] xxs:max-w-[340px] xs:max-w-[360px] sm:max-w-[400px] md:max-w-[420px] lg:max-w-[380px] xl:max-w-[420px] 2xl:max-w-[450px] mx-auto lg:mx-0 relative z-10">
                  <CardContent className="p-0 flex flex-col w-full relative z-10">
                    {/* Enhanced product image with responsive height - no overflow on hover */}
                    <div className="relative overflow-hidden rounded-t-2xl sm:rounded-t-3xl">                      <img 
                        src={heroProduct.image} 
                        alt={heroProduct.name}
                        className="w-full object-cover transition-none"
                        style={{ height: 'clamp(16rem, 38vw, 20rem)' }}
                      />{/* Save percentage badge in left corner */}
                      <div className="absolute top-3 left-3 bg-gradient-to-r from-green-600 to-green-700 text-white px-3 py-1.5 rounded-lg font-bold shadow-lg z-10"
                           style={{ fontSize: 'clamp(0.75rem, 2vw, 0.875rem)' }}>
                        Save {heroProduct.discount}%
                      </div>
                      
                      {/* Ribbon style special offer badge */}
                      <div className="hero-ribbon">
                        <span>{heroProduct.badge}</span>
                      </div>
                      
                      {/* Simplified product title overlay - responsive text */}
                      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                        <h3 className="font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-tight text-left"
                            style={{ fontSize: 'clamp(0.875rem, 2.5vw, 1.125rem)' }}>
                          {heroProduct.name}
                        </h3>
                      </div>
                    </div>
                    
                    {/* Simplified bottom section - cleaner design */}
                    <div className="p-3 sm:p-4">
                      {/* Price section and add to cart - enhanced mobile spacing */}
                      <div className="flex items-center justify-between gap-2 sm:gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-1 sm:gap-2 mb-1">
                            <span className="font-bold text-[#0C831F]" style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)' }}>रु.{heroProduct.price}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-gray-500 line-through" style={{ fontSize: 'clamp(0.75rem, 2vw, 0.875rem)' }}>रु.{heroProduct.originalPrice}</span>
                          </div>
                        </div>
                        
                        <Button 
                          ref={addToCartBtnRef}
                          onClick={handleAddToCart}
                          className={`bg-gradient-to-r from-[#0C831F] to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex-shrink-0 ${cardAnimation ? 'card-btn-animation' : 'card-btn-hover'}`}
                          style={{ fontSize: 'clamp(0.75rem, 2vw, 0.875rem)' }}
                        >
                          <ShoppingCart className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                          <span className="hidden xs:inline">ADD TO CART</span>
                          <span className="xs:hidden">ADD</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
        
        {/* Animation keyframes are defined in a CSS file */}
        
        {/* Categories Section - Redesigned */}
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-12 bg-white relative w-full">
        <div className="w-full max-w-screen-2xl mx-auto relative z-10">          <SectionTitle 
            title="Shop by Category"
            subtitle="Find exactly what your farm needs"
            gradientColors="from-[#0C831F] to-green-500"
          />
              <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 sm:gap-4 md:gap-6 pb-4 min-w-max">
              {categories.map((category, index) => (
                <Link key={index} to="/shop" className="flex-shrink-0 w-48 sm:w-56 md:w-64">
                  <Card className="cursor-pointer border border-gray-100 hover:border-[#0C831F] bg-white rounded-xl overflow-hidden h-full shadow-sm hover:shadow-md transition-all">
                    <CardContent className="p-0">
                      <div className="relative">
                        <img 
                          src={category.image}
                          alt={category.name}
                          className="w-full h-28 sm:h-36 md:h-44 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white">
                          <h3 className="font-bold text-base sm:text-lg md:text-xl">{category.name}</h3>
                          <p className="text-xs sm:text-sm md:text-base opacity-90 mt-0.5 sm:mt-1">
                            {category.count} items
                          </p>
                        </div>
                          {/* Category Icon */}
                        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/30 backdrop-blur-sm p-1.5 sm:p-2 rounded-full">
                          <span className="text-base sm:text-lg md:text-xl">{category.icon}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products Section - Updated with consistent mobile-responsive header */}
      <section className="py-6 sm:py-8 md:py-10 px-3 sm:px-4 lg:px-12 bg-gray-50 border-y border-gray-100">
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
            <div className="text-left">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight">Featured Products</h2>                <Badge className="bg-green-100 text-green-700 hover:bg-green-600 hover:text-white px-2 py-1 text-xs font-semibold rounded-md border border-green-200 hover:border-green-600 w-fit transition-all duration-200">
                  POPULAR
                </Badge>
              </div>
              <p className="text-gray-500 text-sm sm:text-base mt-1 sm:mt-2">Our best selling agricultural products</p>
            </div>
            
            <div className="flex items-center gap-2 justify-end sm:justify-start">
              <ScrollButton 
                direction="left" 
                onClick={() => scrollProducts(featuredProductsScrollRef, 'left')}
              />
              <ScrollButton 
                direction="right" 
                onClick={() => scrollProducts(featuredProductsScrollRef, 'right')}
              />
            </div>
          </div>
        </div>
          <div className="px-0">          <div ref={featuredProductsScrollRef} className="overflow-x-auto scrollbar-hide pb-4 sm:pb-6">
            <div className="flex gap-3 sm:gap-4 w-max">              {hotDeals.slice(0, 8).map((product) => (
                <div key={product.id} className="flex-shrink-0 w-[200px] sm:w-[220px]">                  <ProductCard
                    image={product.image}
                    name={product.name}
                    quantity="80g"
                    price={product.price}
                    originalPrice={product.originalPrice}
                    discountPercent={product.discount}
                    onAddToCart={(quantity) => console.log(`Added ${quantity} of ${product.name}`)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* View All Button */}
        <div className="flex justify-center mt-4 sm:mt-6">          <Button variant="outline" className="border-[#0C831F] text-[#0C831F] hover:bg-[#0C831F] hover:text-white text-xs sm:text-sm">
            View All Featured Products
            <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1.5 sm:ml-2" />
          </Button>
        </div>
      </section>
      
      {/* Hot Deals - Updated with improved mobile-responsive header */}      
      <section ref={featuredRef} className="py-8 sm:py-10 md:py-12 bg-white">
        <div className="px-4 sm:px-6 lg:px-12 mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
            <div className="text-left">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                  Hot Deals
                </h2>                <Badge className="bg-red-100 text-red-600 hover:bg-red-600 hover:text-white px-2 py-1 text-xs font-semibold rounded-md border border-red-200 hover:border-red-600 w-fit transition-all duration-200">
                  SPECIAL OFFERS
                </Badge>
              </div>
              <p className="text-gray-500 text-sm sm:text-base mt-1 sm:mt-2">Limited time offers on premium agricultural products</p>
            </div>
            
            <div className="flex items-center gap-2 justify-end sm:justify-start">
              <ScrollButton 
                direction="left" 
                onClick={() => scrollProducts(hotDealsScrollRef, 'left')}
              />
              <ScrollButton 
                direction="right" 
                onClick={() => scrollProducts(hotDealsScrollRef, 'right')}
              />
            </div>
          </div>
        </div>
            {/* Horizontal scrollable product list with improved cards */}          
        <div className="px-4 sm:px-6 lg:px-12">          <div ref={hotDealsScrollRef} className="overflow-x-auto scrollbar-hide pb-4 sm:pb-6">            <div className="flex gap-3 sm:gap-4 w-max">                  {hotDeals.map((product) => (
                <div key={product.id} className="flex-shrink-0 w-[200px] sm:w-[220px]">                  <ProductCard
                    image={product.image}
                    name={product.name}
                    quantity="4x80g"
                    price={product.price}
                    originalPrice={product.originalPrice}
                    discountPercent={product.discount}
                    onAddToCart={(quantity) => console.log(`Added ${quantity} of ${product.name}`)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
            {/* View All Button */}
        <div className="flex justify-center mt-4 sm:mt-6">          <Button variant="outline" className="border-[#0C831F] text-[#0C831F] hover:bg-[#0C831F] hover:text-white text-xs sm:text-sm">
            View All Hot Deals
            <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1.5 sm:ml-2" />
          </Button>
        </div>
      </section>
      
      {/* New Arrivals - Updated with improved mobile-responsive header */}
      <section className="py-8 sm:py-10 md:py-12 bg-gray-50">
        <div className="px-4 sm:px-6 lg:px-12 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
            <div className="text-left">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                  New Arrivals
                </h2>                <Badge className="bg-green-100 text-green-700 hover:bg-green-600 hover:text-white px-2 py-1 text-xs font-semibold rounded-md border border-green-200 hover:border-green-600 w-fit transition-all duration-200">
                  JUST LANDED
                </Badge>
              </div>
              <p className="text-gray-500 text-sm sm:text-base mt-1 sm:mt-2">Discover our latest collection of farming products</p>
            </div>
            
            <div className="flex items-center gap-2 justify-end sm:justify-start">
              <ScrollButton 
                direction="left" 
                onClick={() => scrollProducts(newArrivalsScrollRef, 'left')}
              />
              <ScrollButton 
                direction="right" 
                onClick={() => scrollProducts(newArrivalsScrollRef, 'right')}
              />
            </div>
          </div>
        </div>
              {/* Horizontal scrollable product list with improved cards */}
        <div className="px-4 sm:px-6 lg:px-12">          <div ref={newArrivalsScrollRef} className="overflow-x-auto scrollbar-hide pb-4 sm:pb-6">            <div className="flex gap-3 sm:gap-4 w-max">              {newArrivals.map((product) => (
                <div key={product.id} className="flex-shrink-0 w-[200px] sm:w-[220px]">                  <ProductCard
                    image={product.image}
                    name={product.name}
                    quantity="250ml"
                    price={product.price}
                    originalPrice={product.originalPrice}
                    onAddToCart={(quantity) => console.log(`Added ${quantity} of ${product.name}`)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
            {/* View All Button */}
        <div className="flex justify-center mt-4 sm:mt-6">          <Button variant="outline" className="border-[#0C831F] text-[#0C831F] hover:bg-[#0C831F] hover:text-white text-xs sm:text-sm">
            View All New Arrivals
            <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1.5 sm:ml-2" />
          </Button>
        </div>
      </section>
        
        {/* Trust Section - Redesigned */}
        <section className="py-6 sm:py-10 md:py-16 px-3 sm:px-6 lg:px-12 bg-white">
        <div className="w-full max-w-screen-2xl mx-auto">
          <div className="text-center mb-4 sm:mb-8 md:mb-12">            <h2 className="text-lg sm:text-2xl md:text-3xl font-bold mb-1.5 sm:mb-3 md:mb-4 text-gray-900">Why Choose Us</h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base max-w-2xl mx-auto">We prioritize your farm's success and your convenience</p>
          </div>
          
          <div className="grid grid-cols-3 gap-1.5 xs:gap-3 sm:gap-6 md:gap-8">            {[
              { icon: Truck, title: "Fast Delivery", desc: "Same day delivery in Kathmandu valley" },
              { icon: Shield, title: "100% Authentic", desc: "Genuine agricultural products only" },
              { icon: RotateCcw, title: "Easy Returns", desc: "7-day hassle-free return policy" }
            ].map((item, index) => (                <Card key={index} className="text-center border border-gray-100 bg-white hover:border-[#0C831F] transition-all rounded-lg sm:rounded-xl">
                <CardContent className="p-2 sm:p-4 md:p-6 lg:p-8">                  <div className="inline-flex items-center justify-center w-6 xs:w-8 sm:w-12 md:w-16 lg:w-20 h-6 xs:h-8 sm:h-12 md:h-16 lg:h-20 rounded-full bg-[#0C831F]/10 mb-1 sm:mb-2 md:mb-4 lg:mb-6">
                    <item.icon className="h-2.5 xs:h-3 sm:h-5 md:h-7 lg:h-10 w-2.5 xs:w-3 sm:w-5 md:w-7 lg:w-10 text-[#0C831F]" />
                  </div>                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-0.5 sm:mb-1 md:mb-3 text-gray-800">{item.title}</h3>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 line-clamp-2">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>        </div>
      </section>

      {/* Footer */}<footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white py-4 sm:py-6 md:py-10 lg:py-16 px-4 sm:px-6 lg:px-12">        <div className="w-full max-w-screen-2xl mx-auto">
          {/* Mobile: 2x2 grid, Tablet: 3 columns, Desktop: 5 columns */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 md:gap-6 lg:gap-8">
            {/* Logo and description - spans full width on mobile */}
            <div className="col-span-2 sm:col-span-3 md:col-span-1"><div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#0C831F] to-green-700 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-green-500/50">
                  <span className="text-white font-bold text-lg sm:text-xl md:text-2xl">C</span>
                </div>
                <span className="text-xl sm:text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-green-200">Cropsay</span>
              </div>              <p className="text-gray-300 leading-relaxed text-[10px] sm:text-xs md:text-sm mb-2 sm:mb-4 md:mb-6 text-left">
                Nepal's most trusted destination for premium agricultural products and farming essentials.
              </p>
              <div className="flex space-x-2 sm:space-x-3 mt-2 sm:mt-4">
                {['facebook', 'instagram', 'twitter', 'youtube'].map((social) => (
                  <a 
                    key={social} 
                    href="#" 
                    className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#0C831F] transition-colors duration-300"
                  >
                    <span className="sr-only">{social}</span>
                    {social === 'facebook' && <Facebook className="h-3 w-3 sm:h-4 sm:w-4 text-gray-300" />}
                    {social === 'instagram' && <Instagram className="h-3 w-3 sm:h-4 sm:w-4 text-gray-300" />}
                    {social === 'twitter' && <Twitter className="h-3 w-3 sm:h-4 sm:w-4 text-gray-300" />}
                    {social === 'youtube' && <Youtube className="h-3 w-3 sm:h-4 sm:w-4 text-gray-300" />}
                  </a>
                ))}
              </div>
            </div>

            <div className="col-span-1 text-left">
              <h3 className="font-bold mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm md:text-base relative inline-block">
                Categories
                <span className="absolute -bottom-1 left-0 w-4 sm:w-6 md:w-8 h-0.5 bg-[#0C831F] rounded-full"></span>
              </h3>
              <ul className="space-y-1 sm:space-y-2 md:space-y-3 text-gray-300 text-[10px] sm:text-xs md:text-sm">
                {[
                  { name: "Seeds", path: "/shop?category=seeds" },
                  { name: "Fertilizers", path: "/shop?category=fertilizers" },
                  { name: "Tools", path: "/shop?category=tools" },
                  { name: "Irrigation", path: "/shop?category=irrigation" }
                ].map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="hover:text-white transition-colors hover:translate-x-1 flex items-center">
                      <ChevronRight className="h-2 w-2 sm:h-2.5 sm:w-2.5 md:h-3 md:w-3 mr-1 text-[#0C831F]" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-1 text-left">
              <h3 className="font-bold mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm md:text-base relative inline-block">                Quick Links
                <span className="absolute -bottom-1 left-0 w-4 sm:w-6 md:w-8 h-0.5 bg-[#0C831F] rounded-full"></span>
              </h3>
              <ul className="space-y-1 sm:space-y-2 md:space-y-3 text-gray-300 text-[10px] sm:text-xs md:text-sm">
                {[
                  { name: "Shop All", path: "/shop" },
                  { name: "New Arrivals", path: "/shop?filter=new" },
                  { name: "Sale", path: "/shop?filter=sale" },
                  { name: "Brands", path: "/brands" }
                ].map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="hover:text-white transition-colors hover:translate-x-1 flex items-center">
                      <ChevronRight className="h-2 w-2 sm:h-2.5 sm:w-2.5 md:h-3 md:w-3 mr-1 text-[#0C831F]" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>            <div className="col-span-1 text-left">
              <h3 className="font-bold mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm md:text-base relative inline-block">
                Support
                <span className="absolute -bottom-1 left-0 w-4 sm:w-6 md:w-8 h-0.5 bg-[#0C831F] rounded-full"></span>
              </h3>
              <ul className="space-y-1 sm:space-y-2 md:space-y-3 text-gray-300 text-[10px] sm:text-xs md:text-sm">
                {["Help Center", "Track Order", "Returns", "Contact Us"].map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-white transition-colors hover:translate-x-1 flex items-center">
                      <ChevronRight className="h-2 w-2 sm:h-2.5 sm:w-2.5 md:h-3 md:w-3 mr-1 text-[#0C831F]" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>            <div className="col-span-1 text-left">
              <h3 className="font-bold mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm md:text-base relative inline-block">
                Contact
                <span className="absolute -bottom-1 left-0 w-4 sm:w-6 md:w-8 h-0.5 bg-[#0C831F] rounded-full"></span>
              </h3>
              <div className="space-y-1 sm:space-y-2 md:space-y-3 text-gray-300 text-[10px] sm:text-xs md:text-sm">
                <p className="flex items-center"><MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 text-[#0C831F]" /> Kathmandu, Nepal</p>
                <p className="flex items-center"><Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 text-[#0C831F]" /> +977-1-4xxxxxx</p>
                <p className="flex items-center truncate"><Mail className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 text-[#0C831F] flex-shrink-0" /> hello@Cropsay.np</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 sm:mt-10 pt-6 sm:pt-8 text-center text-gray-400 text-xs sm:text-sm">
            <p>&copy; 2024 Cropsay. Made with <span className="text-red-500">❤️</span> for Nepali Farmers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
