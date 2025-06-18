import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  ShoppingCart, Menu, X, Search, User, Heart, ChevronDown, ChevronRight,
  Home, MessageCircle, Grid, ShoppingBag, Store, XCircle, LogIn,
  Wheat, Zap, Wrench, Droplets, Bug, Mountain, Cog, Sprout
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import "@/components/styles/MobileNavigation.css";
import "@/components/styles/SearchAnimation.css";
import "@/components/styles/CartButton.css";
import "@/components/styles/ResponsiveNavigation.css";
import LoginDialog from "@/components/LoginDialog";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent
} from "@/components/ui/menubar";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add login state
  const [userName, setUserName] = useState(""); // Add user name state
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();  const { totalItems, totalPrice } = useCart();
    // Get icon for category
  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName) {
      case "Seeds": return <Wheat className="h-4 w-4" />;
      case "Fertilizers": return <Zap className="h-4 w-4" />;
      case "Tools": return <Wrench className="h-4 w-4" />;
      case "Equipment": return <Cog className="h-4 w-4" />;
      default: return <Sprout className="h-4 w-4" />;
    }
  };
  
  // Animated placeholders
  const placeholders = ["Search for Food...", "Search for Supplies...", "Search for Grooming...", "Search for Accessories..."];
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true);
  
  // Search suggestions
  const allCategories = ["Seeds", "Fertilizers", "Tools", "Irrigation", "Pesticides", "Soil", "Equipment", "Greenhouse", "Plant Care", "Harvesting"];
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Handle login success (you can expand this to integrate with real auth)
  const handleLoginSuccess = (name: string) => {
    setIsLoggedIn(true);
    setUserName(name);
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("");
  };

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      if (searchInputRef.current) {
        searchInputRef.current.blur();
      }
      setShowSuggestions(false);
    }
  };

  // Clear search input
  const clearSearch = () => {
    setSearchQuery("");
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
    setShowSuggestions(false);
  };
  
  // Handle suggestion selection
  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };
  
  // Filter suggestions based on input
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      const filtered = allCategories.filter(item => 
        item.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchQuery]);
  
  // Rotate placeholders
  useEffect(() => {
    if (isSearchFocused || searchQuery) return;
      const interval = setInterval(() => {
      setIsPlaceholderVisible(false);
      setTimeout(() => {
        setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
        setIsPlaceholderVisible(true);
      }, 500);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [isSearchFocused, searchQuery]);

  // Close search suggestions on outside click
  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleDocumentClick);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, []);
  // Agriculture-focused categories
  const categories = [
    {
      name: "Seeds",
      subcategories: [
        { name: "Vegetable Seeds", items: ["Tomato Seeds", "Carrot Seeds", "Cabbage Seeds", "Spinach Seeds", "Cucumber Seeds"] },
        { name: "Fruit Seeds", items: ["Watermelon Seeds", "Mango Seeds", "Papaya Seeds", "Lemon Seeds", "Orange Seeds"] },
        { name: "Cereal Seeds", items: ["Wheat Seeds", "Rice Seeds", "Corn Seeds", "Barley Seeds", "Millet Seeds"] },
        { name: "Flower Seeds", items: ["Marigold Seeds", "Rose Seeds", "Sunflower Seeds", "Jasmine Seeds", "Lotus Seeds"] }
      ]
    },
    {
      name: "Fertilizers",
      subcategories: [
        { name: "Organic Fertilizers", items: ["Compost", "Vermicompost", "Bio-fertilizers", "Cow Dung Manure", "Neem Cake"] },
        { name: "Chemical Fertilizers", items: ["NPK Fertilizers", "Urea", "DAP", "Potash", "Phosphorus"] },
        { name: "Liquid Fertilizers", items: ["Foliar Sprays", "Root Feeds", "Growth Promoters", "Bloom Boosters", "Micronutrients"] },
        { name: "Specialty Fertilizers", items: ["Citrus Fertilizer", "Vegetable Fertilizer", "Flowering Plant Feed", "Lawn Fertilizer", "Tree Fertilizer"] }
      ]
    },
    {
      name: "Tools",
      subcategories: [
        { name: "Hand Tools", items: ["Garden Spade", "Hand Trowel", "Pruning Shears", "Garden Fork", "Weeding Tool"] },
        { name: "Power Tools", items: ["Electric Trimmer", "Lawn Mower", "Chainsaw", "Hedge Trimmer", "Soil Tiller"] },
        { name: "Irrigation Tools", items: ["Garden Hose", "Sprinklers", "Drip Irrigation", "Water Timer", "Pressure Pump"] },
        { name: "Harvesting Tools", items: ["Harvesting Knife", "Fruit Picker", "Pruning Saw", "Harvesting Basket", "Crop Cutter"] }
      ]
    },
    {
      name: "Equipment",
      subcategories: [
        { name: "Greenhouse Equipment", items: ["Greenhouse Kits", "Shade Nets", "Ventilation Fans", "Heating Systems", "Humidity Controllers"] },
        { name: "Irrigation Systems", items: ["Drip Systems", "Sprinkler Systems", "Misting Systems", "Water Storage", "Filtration Systems"] },
        { name: "Soil Equipment", items: ["Soil Testers", "pH Meters", "Thermometers", "Moisture Meters", "Soil Mixers"] },
        { name: "Plant Support", items: ["Plant Stakes", "Trellises", "Garden Cages", "Climbing Frames", "Support Nets"] }      ]
    }
  ];
    const isActive = (path: string) => location.pathname === path;
  const isShopActive = location.pathname.startsWith('/shop') || location.pathname.startsWith('/brands') || location.pathname.startsWith('/categories');
  
  return (
    <nav className="bg-gradient-to-r from-white via-white to-green-50 shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-14 md:h-16">          {/* Logo - Responsive design with different images for mobile/desktop */}
          <Link to="/" className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0 mr-1 sm:mr-4">
            {/* Mobile Logo - Visible on small screens */}
            <img src="/mobilelogo.svg" alt="Cropsay" className="h-6 w-auto sm:h-7 md:hidden" />
            {/* Desktop Logo - Visible on medium and larger screens */}
            <img src="/logo.svg" alt="Cropsay" className="hidden md:block h-10 w-auto lg:h-12 xl:h-14" />
          </Link>
            {/* Mobile Search - Takes priority in mobile view */}          
          <div className="flex-1 max-w-xs sm:max-w-md md:hidden mx-1" ref={searchContainerRef}>
            <form onSubmit={handleSearchSubmit}>
              <motion.div 
                className="search-container"
                whileTap={{ scale: 0.98 }}
                initial={{ scale: 1 }}
                animate={{ 
                  scale: isSearchFocused ? 1.02 : 1
                }}
                transition={{ duration: 0.2 }}
              >                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => {
                    // Don't immediately blur to allow for suggestion clicks
                    setTimeout(() => {
                      if (!searchContainerRef.current?.contains(document.activeElement)) {
                        setIsSearchFocused(false);
                        setShowSuggestions(false);
                      }
                    }, 150);
                  }}
                  className="w-full pl-10 pr-10 py-2 search-input focus:outline-none border-0 text-sm"
                  aria-label="Search products"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
                  <Search className={cn("h-4 w-4", isSearchFocused ? "text-[#0C831F]" : "")} />
                </div>
                
                {/* Animated placeholder */}
                {!searchQuery && !isSearchFocused && (
                  <div className="absolute left-10 top-0 h-full pointer-events-none flex items-center">
                    <AnimatePresence mode="wait">
                      {isPlaceholderVisible && (
                        <motion.span
                          key={currentPlaceholder}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="text-gray-400 text-sm"
                        >
                          {placeholders[currentPlaceholder]}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>                )}
                  <button
                  type="submit" 
                  className="hidden"
                  aria-label="Submit search"
                >
                  <span>Submit</span>
                </button>
                
                {searchQuery && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-3 top-0 bottom-0 my-auto text-gray-400 hover:text-gray-600 w-5 h-5 flex items-center justify-center"
                    aria-label="Clear search"
                  >
                    <XCircle className="h-4 w-4" />
                  </motion.button>
                )}
              </motion.div>
              
        {/* Suggestions dropdown */}
              <AnimatePresence>
                {showSuggestions && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-50 w-full mt-1.5 bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200"
                  >
                    {isLoading ? (
                      <div className="p-3 flex items-center justify-center">
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                          className="w-4 h-4 border-2 border-gray-300 border-t-[#0C831F] rounded-full"
                        ></motion.div>
                        <span className="ml-2 text-sm text-gray-500">Searching...</span>
                      </div>
                    ) : filteredSuggestions.length > 0 ? (
                      <div className="max-h-60 overflow-y-auto">
                        {filteredSuggestions.map((suggestion, index) => (
                          <motion.div
                            key={suggestion}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="suggestion-item px-4 py-2.5 cursor-pointer flex items-center text-sm text-gray-700"
                          >
                            <Search className="h-3.5 w-3.5 text-gray-400 mr-2 flex-shrink-0" />
                            {suggestion}
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="no-results-message p-4 text-center text-sm text-gray-500 flex items-center justify-center">
                          <XCircle className="h-4 w-4 mr-2 text-gray-400" /> No matching products found
                        </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
          
          {/* Desktop Navigation - Simpler design with better spacing */}
          <div className="hidden lg:flex items-center">
            <Menubar className="bg-transparent shadow-none border-0 p-0 h-auto space-x-5">
              <MenubarMenu>
                <MenubarTrigger asChild>
                  <Link 
                    to="/" 
                    className={`px-4 py-1.5 font-medium text-sm ${
                      isActive("/") 
                        ? "text-[#0C831F] font-semibold border-b-2 border-[#0C831F]" 
                        : "text-gray-700 hover:text-[#0C831F]"
                    }`}
                  >
                    Home
                  </Link>
                </MenubarTrigger>
              </MenubarMenu>
              
              <MenubarMenu>
                <MenubarTrigger 
                  className={`px-4 py-1.5 font-medium text-sm flex items-center ${
                    isShopActive 
                      ? "text-[#0C831F] font-semibold border-b-2 border-[#0C831F]" 
                      : "text-gray-700 hover:text-[#0C831F]"
                  }`}
                >
                  Shop
                  <ChevronDown className="ml-1 h-3.5 w-3.5" />
                </MenubarTrigger>                <MenubarContent className="w-[900px] bg-white shadow-md rounded-md border border-gray-100 overflow-hidden">
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-8">
                      {categories.map((category) => (
                        <div key={category.name} className="space-y-4">
                          <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                            {getCategoryIcon(category.name)}
                            <h3 className="font-semibold text-gray-800 text-lg">{category.name}</h3>
                          </div>
                          <div className="space-y-3">
                            {category.subcategories.map((subCat) => (
                              <MenubarSub key={subCat.name}>
                                <MenubarSubTrigger className="w-full justify-between font-medium text-gray-700 hover:text-[#0C831F] hover:bg-gray-50 px-3 py-2 rounded-md transition-colors">
                                  {subCat.name}
                                  <ChevronRight className="h-4 w-4" />
                                </MenubarSubTrigger>
                                <MenubarSubContent className="bg-white border border-gray-100 rounded-md shadow-lg min-w-[300px] p-3">
                                  <div className="space-y-1">
                                    {subCat.items.map((item) => (
                                      <MenubarItem key={item} asChild>
                                        <Link 
                                          to={`/shop?category=${encodeURIComponent(category.name)}&subcategory=${encodeURIComponent(subCat.name)}&item=${encodeURIComponent(item)}`}
                                          className="block px-3 py-2 hover:bg-gray-50 hover:text-[#0C831F] text-sm rounded-md transition-colors"
                                        >
                                          {item}
                                        </Link>
                                      </MenubarItem>
                                    ))}
                                  </div>
                                  <MenubarSeparator className="my-2" />
                                  <MenubarItem asChild>
                                    <Link 
                                      to={`/shop?category=${encodeURIComponent(category.name)}&subcategory=${encodeURIComponent(subCat.name)}`}
                                      className="block px-3 py-2 text-[#0C831F] font-medium text-sm hover:bg-green-50 rounded-md"
                                    >
                                      View All {subCat.name}
                                    </Link>
                                  </MenubarItem>
                                </MenubarSubContent>
                              </MenubarSub>
                            ))}
                            <MenubarItem asChild>
                              <Link 
                                to={`/shop?category=${encodeURIComponent(category.name)}`}
                                className="block px-3 py-2 text-[#0C831F] font-semibold text-sm hover:bg-green-50 rounded-md mt-2 border-t border-gray-100 pt-3"
                              >
                                View All {category.name} Products →
                              </Link>
                            </MenubarItem>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger asChild>
                  <Link 
                    to="/expert" 
                    className={`px-4 py-1.5 font-medium text-sm ${
                      isActive("/expert") 
                        ? "text-[#0C831F] font-semibold border-b-2 border-[#0C831F]" 
                        : "text-gray-700 hover:text-[#0C831F]"
                    }`}
                  >
                    Expert
                  </Link>
                </MenubarTrigger>
              </MenubarMenu>
                <MenubarMenu>
                <MenubarTrigger asChild>
                  <Link 
                    to="/contact" 
                    className={`px-4 py-1.5 font-medium text-sm ${
                      isActive("/contact") 
                        ? "text-[#0C831F] font-semibold border-b-2 border-[#0C831F]" 
                        : "text-gray-700 hover:text-[#0C831F]"
                    }`}
                  >
                    Contact
                  </Link>
                </MenubarTrigger>
              </MenubarMenu>
            </Menubar>
          </div>
            {/* Desktop Search and Actions */}
          <div className="hidden md:flex items-center space-x-1.5">
            {/* Enhanced Search (desktop) with animations */}            
            <div 
              ref={searchContainerRef}
              className="relative"
            >
              <form onSubmit={handleSearchSubmit}>
                <motion.div 
                  className="search-container"
                  whileTap={{ scale: 0.98 }}
                  initial={{ scale: 1 }}
                  animate={{ 
                    scale: isSearchFocused ? 1.02 : 1
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <input 
                    ref={searchInputRef}
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => {
                      // Don't immediately blur to allow for suggestion clicks
                      setTimeout(() => {
                        if (!searchContainerRef.current?.contains(document.activeElement)) {
                          setIsSearchFocused(false);
                          setShowSuggestions(false);
                        }
                      }, 150);
                    }}
                    className="w-[28rem] pl-10 pr-10 py-2 search-input focus:outline-none border-0 text-sm"
                    aria-label="Search products"
                  />
                  
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
                    <Search className={cn("h-4 w-4", isSearchFocused ? "text-[#0C831F]" : "")} />
                  </div>
                  
                  {/* Animated placeholder */}
                  {!searchQuery && !isSearchFocused && (
                    <div className="absolute left-10 top-0 h-full pointer-events-none flex items-center">
                      <AnimatePresence mode="wait">
                        {isPlaceholderVisible && (
                          <motion.span
                            key={currentPlaceholder}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="text-gray-400 text-sm"
                          >
                            {placeholders[currentPlaceholder]}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                  
                  <button 
                    type="submit"
                    className="hidden"
                    aria-label="Submit search"
                  >
                    <span>Submit</span>
                  </button>                  {searchQuery && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      type="button"
                      onClick={clearSearch}
                      className="absolute right-3 top-0 bottom-0 my-auto text-gray-400 hover:text-gray-600 w-5 h-5 flex items-center justify-center"
                      aria-label="Clear search"
                    >
                      <XCircle className="h-4 w-4" />
                    </motion.button>
                  )}
                </motion.div>
                  {/* Suggestions dropdown for desktop */}
                <AnimatePresence>
                  {showSuggestions && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: -10, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute z-50 w-full mt-1.5 bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200"
                    >
                      {isLoading ? (
                        <div className="p-3 flex items-center justify-center">
                          <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            className="w-4 h-4 border-2 border-gray-300 border-t-[#0C831F] rounded-full"
                          ></motion.div>
                          <span className="ml-2 text-sm text-gray-500">Searching...</span>
                        </div>
                      ) : filteredSuggestions.length > 0 ? (
                        <div className="max-h-60 overflow-y-auto">
                          {filteredSuggestions.map((suggestion, index) => (
                            <motion.div
                              key={suggestion}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="suggestion-item px-4 py-2.5 cursor-pointer flex items-center text-sm text-gray-700"
                            >
                              <Search className="h-3.5 w-3.5 text-gray-400 mr-2 flex-shrink-0" />
                              {suggestion}
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="no-results-message p-4 text-center text-sm text-gray-500 flex items-center justify-center">
                          <XCircle className="h-4 w-4 mr-2 text-gray-400" /> No matching products found
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>            </div>              {/* Account and Cart - Improved responsive design */}
            <div className="flex items-center gap-2 md:gap-3 ml-2">
              {/* Account - Login Dialog */}
              {isLoggedIn ? (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="px-3 py-1.5 hover:bg-gray-100 rounded-md text-gray-700 hover:text-[#0C831F] transition-colors flex items-center gap-2"
                    onClick={() => navigate('/account')}
                  >
                    <div className="w-6 h-6 bg-[#0C831F] rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-medium">
                        {userName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm hidden lg:inline">{userName}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="px-3 py-1.5 hover:bg-gray-100 rounded-md text-gray-700 hover:text-red-600 transition-colors text-sm hidden md:inline"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <LoginDialog onLoginSuccess={handleLoginSuccess}>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="px-2 md:px-3 lg:px-4 py-1.5 hover:bg-gray-100 rounded-md text-gray-700 hover:text-[#0C831F] transition-colors flex items-center"
                  >
                    <span className="mr-1 md:mr-1.5 text-xs md:text-sm hidden md:inline">Login</span>
                    <User className="h-4 w-4" />
                  </Button>
                </LoginDialog>
              )}
              
              {/* Cart - Responsive design with better mobile adaptation */}
              <Link to="/cart" className="cart-button">
                <ShoppingCart className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                  <span className="cart-count text-xs md:text-sm leading-tight">
                    <span className="hidden sm:inline">{totalItems} {totalItems === 1 ? 'item' : 'items'}</span>
                    <span className="sm:hidden">{totalItems}</span>
                  </span>
                  <span className="cart-price text-xs md:text-sm leading-tight">
                    <span className="rupee-symbol">रु.</span>{totalPrice}
                  </span>
                </div>
              </Link>
            </div>          </div>          {/* Mobile Login/Account Button - Icon only for mobile */}
          <div className="md:hidden">
            {isLoggedIn ? (
              <Button
                variant="ghost"
                size="sm"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => navigate('/account')}
              >
                <div className="w-6 h-6 bg-[#0C831F] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-medium">
                    {userName.charAt(0).toUpperCase()}
                  </span>
                </div>
              </Button>
            ) : (
              <LoginDialog onLoginSuccess={handleLoginSuccess}>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-2 hover:bg-gray-100 rounded-full text-gray-700 hover:text-[#0C831F] transition-colors"
                >
                  <User className="h-5 w-5" />
                </Button>
              </LoginDialog>
            )}
          </div>

          {/* Desktop Menu Toggle - Hidden, no longer needed as we have bottom nav menu */}
          {/* Mobile Menu Toggle - Enhanced responsive design */}
          <Button
            variant="ghost"
            size="sm"
            className="hidden p-1 sm:p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? 
              <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" /> : 
              <Menu className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
            }
          </Button>
        </div>
          {/* Mobile Navigation - Enhanced responsive slide menu */}
        <div className={`lg:hidden border-t border-gray-100 bg-white transform transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-[85vh] sm:max-h-[80vh] opacity-100 shadow-md' : 'max-h-0 opacity-0'}`}>
          <div className="px-3 sm:px-4 py-3 sm:py-4 space-y-1 sm:space-y-1.5 menu-scrollbar-hide max-h-[calc(85vh-4rem)] sm:max-h-[calc(80vh-4rem)] overflow-y-auto">
            {/* Mobile Navigation Links */}
            <Link              to="/" 
              className={`block px-4 py-2.5 rounded-lg ${
                isActive("/") 
                  ? "text-white font-medium bg-gradient-to-r from-[#0C831F] to-green-500" 
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <Home className="h-4 w-4 mr-3" />
                <span>Home</span>
              </div>
            </Link>
            
            {/* Mobile Shop Dropdown */}
            <details className="group">
              <summary className={`block px-4 py-2.5 cursor-pointer select-none rounded-lg ${
                isShopActive 
                  ? "text-white font-medium bg-gradient-to-r from-[#0C831F] to-green-500" 
                  : "text-gray-700 hover:bg-gray-50"
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <ShoppingBag className="h-4 w-4 mr-3" />
                    <span>Shop</span>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </div>
              </summary>
              <div className="pt-1 pb-1 pl-3">
                <div className="mb-3 mt-1">
                  <span className="text-xs text-gray-500 font-medium block px-4 py-1">Agriculture Categories</span>
                  <div className="border-l border-gray-100 pl-3 mt-1">                    {categories.map((category) => (
                      <details key={category.name} className="mb-2">
                        <summary className="px-3 py-1.5 font-medium text-gray-700 cursor-pointer select-none flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(category.name)}
                            {category.name}
                          </div>
                          <ChevronRight className="h-4 w-4" />
                        </summary>
                        <div className="pl-2 mt-1">
                          {category.subcategories.map((subCat) => (
                            <details key={subCat.name} className="mb-1 pl-2 border-l border-gray-100 ml-1">
                              <summary className="px-3 py-1.5 font-medium text-gray-600 cursor-pointer select-none flex justify-between items-center text-sm">
                                {subCat.name}
                                <ChevronRight className="h-3.5 w-3.5" />
                              </summary>
                              <div className="pl-2 border-l border-gray-100 ml-2">
                                {subCat.items.map((item) => (
                                  <Link 
                                    key={item} 
                                    to={`/shop?category=${encodeURIComponent(category.name)}&subcategory=${encodeURIComponent(subCat.name)}&item=${encodeURIComponent(item)}`} 
                                    className="block py-1.5 px-3 text-gray-600 hover:text-[#0C831F] text-sm" 
                                    onClick={() => setIsMenuOpen(false)}
                                  >
                                    {item}
                                  </Link>
                                ))}
                              </div>
                            </details>
                          ))}
                          <Link 
                            to={`/shop?category=${encodeURIComponent(category.name)}`} 
                            className="block mt-1 py-1.5 px-3 text-[#0C831F] hover:underline text-sm font-medium" 
                            onClick={() => setIsMenuOpen(false)}
                          >
                            View All {category.name} Products
                          </Link>
                        </div>
                      </details>
                    ))}                  </div>
                </div>
              </div>
            </details>
            
            <Link 
              to="/expert" 
              className={`block px-4 py-2.5 rounded-lg ${
                isActive("/expert") 
                  ? "text-white font-medium bg-gradient-to-r from-[#0C831F] to-green-500" 
                  : "text-gray-700 hover:bg-gray-50"
              }`} 
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <MessageCircle className="h-4 w-4 mr-3" />
                <span>Expert</span>
              </div>
            </Link>
              <Link 
              to="/contact" 
              className={`block px-4 py-2.5 rounded-lg ${
                isActive("/contact") 
                  ? "text-white font-medium bg-gradient-to-r from-[#0C831F] to-green-500" 
                  : "text-gray-700 hover:bg-gray-50"
              }`} 
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <Grid className="h-4 w-4 mr-3" />
                <span>Contact</span>
              </div>            </Link>
            
            {/* Account/Login Section */}
            {isLoggedIn ? (
              <>
                <Link 
                  to="/account" 
                  className={`block px-4 py-2.5 rounded-lg ${
                    isActive("/account") 
                      ? "text-white font-medium bg-gradient-to-r from-[#0C831F] to-green-500" 
                      : "text-gray-700 hover:bg-gray-50"
                  }`} 
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-3" />
                    <span>My Account ({userName})</span>
                  </div>
                </Link>
                
                <button 
                  className="block w-full text-left px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50"
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                >
                  <div className="flex items-center">
                    <LogIn className="h-4 w-4 mr-3" />
                    <span>Logout</span>
                  </div>
                </button>
              </>
            ) : (
              <LoginDialog onLoginSuccess={handleLoginSuccess}>
                <button 
                  className={`block w-full text-left px-4 py-2.5 rounded-lg 
                    ${isActive("/account") 
                      ? "text-white font-medium bg-gradient-to-r from-[#0C831F] to-green-500" 
                      : "text-gray-700 hover:bg-gray-50"
                    }`} 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMenuOpen(false);
                  }}
                >
                  <div className="flex items-center">
                    <User className="h-3.5 w-3.5 mr-2.5" />
                    <span className="text-sm">Login / Sign up</span>
                  </div>
                </button>
              </LoginDialog>
            )}
          </div>
        </div>
        
        {/* Fixed Bottom Mobile Navigation - Redesigned with Shop in center */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
          <div className="grid grid-cols-5 h-16">
            <Link to="/" className="flex flex-col items-center justify-center">
              <div className={`p-1.5 rounded-full transition-colors ${isActive("/") ? "text-[#0C831F]" : "text-gray-500"}`}>
                <Home className="h-5 w-5" />
              </div>
              <span className={`text-xs mt-0.5 transition-colors ${isActive("/") ? "text-[#0C831F] font-medium" : "text-gray-500"}`}>Home</span>
            </Link>
            
            <Link to="/expert" className="flex flex-col items-center justify-center">
              <div className={`p-1.5 rounded-full transition-colors ${isActive("/expert") ? "text-[#0C831F]" : "text-gray-500"}`}>
                <MessageCircle className="h-5 w-5" />
              </div>
              <span className={`text-xs mt-0.5 transition-colors ${isActive("/expert") ? "text-[#0C831F] font-medium" : "text-gray-500"}`}>Expert</span>
            </Link>
            
            {/* Shop Button in Center - Elevated and Highlighted with improved animation */}
            <Link to="/shop" className="flex flex-col items-center justify-center relative -mt-5">
              <div className={`w-14 h-14 rounded-full bg-gradient-to-b from-[#0C831F] to-green-600 flex items-center justify-center shadow-lg nav-center-button ${isShopActive ? "ring-4 ring-green-100" : ""}`}>
                <Store className="h-6 w-6 text-white" />
              </div>
              <span className={`text-xs mt-1 font-medium text-[#0C831F]`}>Shop</span>
            </Link>            <Link to="/cart" className="flex flex-col items-center justify-center">
              <div className={`p-1.5 rounded-full relative transition-colors ${isActive("/cart") ? "text-[#0C831F]" : "text-gray-500"}`}>
                <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                <Badge className="absolute -top-1 -right-1 bg-[#0C831F] text-white text-xs h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center rounded-full border border-white shadow-sm" style={{fontSize:'0.625rem', minHeight:'1rem', minWidth:'1rem'}}>
                  {totalItems > 99 ? '99+' : totalItems}
                </Badge>
              </div>
              <span className={`text-xs mt-0.5 transition-colors ${isActive("/cart") ? "text-[#0C831F] font-medium" : "text-gray-500"}`}>Cart</span>
            </Link>
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="flex flex-col items-center justify-center focus:outline-none"
            >
              <div className={`p-1.5 rounded-full transition-colors ${isMenuOpen ? "text-[#0C831F]" : "text-gray-500"}`}>
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </div>
              <span className={`text-xs mt-0.5 transition-colors ${isMenuOpen ? "text-[#0C831F] font-medium" : "text-gray-500"}`}>Menu</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
