import { useState, useEffect, useRef, useCallback } from "react";
import { ShoppingCart, Star, Filter, Grid, List, SlidersHorizontal, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useSearchParams } from "react-router-dom";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import PremiumProductCard from "@/components/PremiumProductCard"; // Import PremiumProductCard
import removeProductXButtons from "@/lib/removeProductXButtons"; // Import the X button remover utility
import '@/components/styles/ShopStyles.css';
import '@/components/styles/PremiumShopStyles.css';
import '@/components/styles/HideProductX.css';

const Shop = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [animatedButton, setAnimatedButton] = useState<number | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [displayedProducts, setDisplayedProducts] = useState(12);
  const [productQuantities, setProductQuantities] = useState<{[key: number]: number}>({});
  const [productsInCart, setProductsInCart] = useState<number[]>([]);  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  const productContainerRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // Use horizontal scroll for category tabs
  useHorizontalScroll(horizontalScrollRef);

  // Remove X buttons from product cards
  useEffect(() => {
    removeProductXButtons();
  }, []);
  
  // Simulate loading when filters change
  useEffect(() => {
    setIsLoading(true);
    setDisplayedProducts(12);
    setHasMore(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [activeCategory, sortBy]);
  
  // Handle infinite scrolling with Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries;
        if (entry?.isIntersecting && !isLoading && hasMore) {
          loadMoreProducts();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px 200px 0px'
      }
    );
    
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    
    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [isLoading, hasMore]);
  
  // Load more products function
  const loadMoreProducts = useCallback(() => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setDisplayedProducts(prev => {
        const newValue = prev + 6;
        if (newValue >= filteredProducts.length) {
          setHasMore(false);
        }
        return newValue;
      });
      setIsLoading(false);
    }, 500);
  }, [isLoading]);    const handleAddToCart = (productId: number, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setAnimatedButton(productId);
    
    // Get the current quantity or default to 1
    const quantity = productQuantities[productId] || 1;
    
    // Add the product to cart
    setProductsInCart(prev => {
      if (!prev.includes(productId)) {
        return [...prev, productId];
      }
      return prev;
    });
    
    // Here you would add the product to cart with the quantity
    console.log(`Added product ${productId} with quantity ${quantity} to cart`);
    
    setTimeout(() => {
      setAnimatedButton(null);
    }, 1000);
  };
  
  const removeFromCart = (productId: number, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    setProductsInCart(prev => prev.filter(id => id !== productId));
    
    // Reset quantity to 1 when removed from cart
    setProductQuantities(prev => ({
      ...prev,
      [productId]: 1
    }));
    
    console.log(`Removed product ${productId} from cart`);
  };
  
  // Initialize all product quantities to 1
  useEffect(() => {
    const initialQuantities: {[key: number]: number} = {};
    products.forEach(product => {
      initialQuantities[product.id] = 1;
    });
    setProductQuantities(initialQuantities);
  }, []);
  
  const increaseQuantity = (productId: number, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    setProductQuantities(prev => ({
      ...prev,
      [productId]: (prev[productId] || 1) + 1
    }));
  };
  
  const decreaseQuantity = (productId: number, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    setProductQuantities(prev => ({
      ...prev,
      [productId]: Math.max((prev[productId] || 1) - 1, 1)
    }));
  };

  const products = [    {
      id: 1,
      name: "Royal Canin Adult Dog Food",
      subtitle: "Premium Nutrition Formula",
      price: 3200,
      originalPrice: 3800,
      image: "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400&h=400&fit=crop",
      badge: "BEST SELLER",
      rating: 4.9,
      reviews: 248,
      category: "Food",
      isNew: false,
      discount: 15,
      hasAR: true
    },    {
      id: 2,
      name: "Designer Dog Hoodie",
      subtitle: "Warm & Stylish Comfort",
      price: 1800,
      originalPrice: 2200,
      image: "https://images.unsplash.com/photo-1546975490-e8b92a360b24?w=400&h=400&fit=crop",
      badge: "TRENDING",
      rating: 4.8,
      reviews: 156,
      category: "Accessories",
      isNew: true,
      discount: 18,
      hasAR: true
    },
    {
      id: 3,
      name: "Natural Dog Treats",
      subtitle: "Healthy Rewards",
      price: 950,
      originalPrice: 1200,
      image: "https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?w=400&h=400&fit=crop",
      badge: "ORGANIC",
      rating: 4.7,
      reviews: 189,
      category: "Treats",
      isNew: false,
      discount: 20
    },
    {
      id: 4,
      name: "Smart Puzzle Toy",
      subtitle: "Mental Stimulation",
      price: 2100,
      originalPrice: 2500,
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop",
      badge: "SMART",
      rating: 4.8,
      reviews: 134,
      category: "Toys",
      isNew: true,
      discount: 16
    },
    {
      id: 5,
      name: "Orthopedic Dog Bed",
      subtitle: "Maximum Comfort",
      price: 4500,
      originalPrice: 5200,
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop",
      badge: "PREMIUM",
      rating: 4.6,
      reviews: 98,
      category: "Beds",
      isNew: false,
      discount: 13
    },
    {
      id: 6,
      name: "Professional Dog Brush",
      subtitle: "Grooming Essential",
      price: 1200,
      originalPrice: 1500,
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop",
      badge: "QUALITY",
      rating: 4.5,
      reviews: 156,
      category: "Grooming",
      isNew: false,
      discount: 20
    }
  ];

  const categories = ["All", "Food", "Toys", "Accessories", "Beds", "Grooming", "Treats"];
    // Filter products based on active category
  const filteredProducts = products.filter(product => 
    (activeCategory === "All" || product.category === activeCategory)
  );
  
  // Sort products based on selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': 
        return a.price - b.price;
      case 'price-high': 
        return b.price - a.price;
      case 'rating': 
        return b.rating - a.rating;
      case 'newest':
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      default: // popular - by reviews
        return b.reviews - a.reviews;
    }
  });
  return (
    <div className="premium-shop-container">
      {/* Premium Header - Clean and minimal */}
      <header className="premium-header">
        <div className="premium-content-wrapper">
          <div className="flex items-center justify-between">
            {/* Left side - Breadcrumb navigation */}
            <div className="flex items-center">
              <div className="flex items-center text-sm">
                <Link to="/" className="flex items-center text-gray-500 hover:text-gray-700">
                  <Home className="h-3.5 w-3.5" />
                  <span className="ml-1 hidden sm:inline">Home</span>
                </Link>
                <span className="mx-1.5 text-gray-400">/</span>
                <span className="font-medium text-gray-700">Shop</span>
              </div>
            </div>
            
            {/* Right side - Action buttons */}
            <div className="flex items-center space-x-2">
              {/* Filters Sheet */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="h-8 px-3 text-gray-700 border-gray-200 hover:bg-gray-50"
                  >
                    <Filter className="h-3.5 w-3.5 mr-1.5" />
                    Filter
                  </Button>
                </SheetTrigger>
                <SheetContent side={isMobile ? "bottom" : "right"} className="w-full sm:max-w-sm">
                  <div className="px-1 py-4">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-bold text-base flex items-center">
                        <SlidersHorizontal className="h-4 w-4 mr-2 text-[#4f46e5]" />
                        Filters
                      </h3>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setActiveCategory("All");
                          setSearchParams(new URLSearchParams());
                        }}
                        className="text-[#4f46e5] text-xs py-1 px-2 h-auto"
                      >
                        Reset All
                      </Button>
                    </div>

                    {/* Categories */}
                    <div className="mb-6">
                      <h4 className="font-medium mb-3 text-sm">Categories</h4>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <label key={category} className="flex items-center cursor-pointer">
                            <input 
                              type="radio" 
                              name="category"
                              checked={activeCategory === category}
                              onChange={() => setActiveCategory(category)}
                              className="rounded-full border-gray-300 text-[#4f46e5] focus:ring-[#4f46e5]" 
                            />
                            <span className="ml-2 text-gray-700 text-sm">{category}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Price Range */}
                    <div className="mb-6">
                      <h4 className="font-medium mb-3 text-sm">Price Range</h4>
                      <div className="space-y-2">
                        {[
                          "Under ₹1,000",
                          "₹1,000 - ₹2,500",
                          "₹2,500 - ₹5,000",
                          "Above ₹5,000"
                        ].map((range) => (
                          <label key={range} className="flex items-center cursor-pointer">
                            <input type="checkbox" className="rounded border-gray-300 text-[#4f46e5] focus:ring-[#4f46e5]" />
                            <span className="ml-2 text-gray-700 text-sm">{range}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Rating */}
                    <div>
                      <h4 className="font-medium mb-3 text-sm">Rating</h4>
                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <label key={rating} className="flex items-center cursor-pointer">
                            <input type="checkbox" className="rounded border-gray-300 text-[#4f46e5] focus:ring-[#4f46e5]" />
                            <div className="ml-2 flex items-center">
                              {[...Array(rating)].map((_, i) => (
                                <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              ))}
                              <span className="ml-1 text-gray-700 text-sm">& up</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              
              {/* orders link */}
              <Link to="/orders">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 px-3 text-gray-700 border-gray-200 hover:bg-gray-50"
                >
                  Orders
                </Button>
              </Link>
              
              {/* View toggle */}
              <div className="flex items-center border rounded-md overflow-hidden bg-gray-50">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' 
                    ? 'bg-[#4f46e5] text-white rounded-none h-8 w-8 p-0' 
                    : 'text-gray-500 hover:text-gray-700 rounded-none h-8 w-8 p-0 hover:bg-gray-100'
                  }
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'compact' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('compact')}
                  className={viewMode === 'compact' 
                    ? 'bg-[#4f46e5] text-white rounded-none h-8 w-8 p-0' 
                    : 'text-gray-500 hover:text-gray-700 rounded-none h-8 w-8 p-0 hover:bg-gray-100'
                  }
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Premium category tabs */}
      <div className="premium-category-wrapper">
        <div className="premium-content-wrapper">
          <div 
            ref={horizontalScrollRef} 
            className="premium-category-tabs"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "premium-category-tab",
                  activeCategory === category ? "active" : ""
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <main className="flex-grow pb-8">
        <div className="premium-content-wrapper">
          {/* Sort options and result count */}
          <div className="flex items-center justify-between mb-4">
            <div>
              {activeCategory !== "All" && (
                <p className="text-sm text-gray-500">
                  {filteredProducts.length} products
                </p>
              )}
            </div>
            
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="premium-sort-control"
            >
              <option value="popular">Sort: Popular</option>
              <option value="price-low">Sort: Price - Low to High</option>
              <option value="price-high">Sort: Price - High to Low</option>
              <option value="rating">Sort: Highest Rated</option>
              <option value="newest">Sort: Newest First</option>
            </select>
          </div>
          
          {/* Products grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-12 text-center">
              <div className="bg-white p-6 rounded-xl shadow-sm inline-block max-w-xs">
                <Filter className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">No products found</h3>
                <p className="text-gray-500 mb-4">
                  No products found in the "{activeCategory}" category
                </p>
                <Button 
                  onClick={() => {
                    setActiveCategory("All");
                    setSearchParams(new URLSearchParams());
                  }}
                  className="bg-[#362FD9] hover:bg-[#2d24b8] text-white"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          ) : (            <>              <div className="premium-product-grid">
                {sortedProducts.slice(0, displayedProducts).map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="mx-auto w-full"
                  >
                    <PremiumProductCard product={product} />
                  </motion.div>
                ))}
                
                {/* Skeleton loaders */}
                {isLoading && (
                  <AnimatePresence>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <motion.div
                        key={`skeleton-${index}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ProductCardSkeleton mode="premium" />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>
              
              {/* Infinite scroll loading indicator */}
              <div 
                ref={loaderRef} 
                className="premium-loading-indicator"
              >
                {isLoading ? (
                  <div className="premium-loading-dots">
                    <div className="premium-loading-dot"></div>
                    <div className="premium-loading-dot"></div>
                    <div className="premium-loading-dot"></div>
                  </div>
                ) : hasMore ? (
                  <div className="text-sm text-gray-500">Loading more products</div>
                ) : (
                  <div className="text-sm text-gray-500">All products loaded</div>
                )}
              </div>
            </>
          )}
        </div>
      </main>
  
    </div>
  );
};

export default Shop;
