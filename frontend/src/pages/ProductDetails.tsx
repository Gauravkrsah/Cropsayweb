import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ShoppingCart, Heart, Star, Minus, Plus, Truck, Shield, RotateCcw, ChevronLeft, Share2, Check, Clock, Award, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/ProductCard";

const ProductDetails = () => {
  const { id } = useParams();  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('specifications');
  const [isInCart, setIsInCart] = useState(false);
  const [currentDeliveryMessage, setCurrentDeliveryMessage] = useState(0);

  // Delivery messages for animation
  const deliveryMessages = [
    "Get Same day delivery in kathmandu",
    "Get Delivery in 3-4 days out of kathmandu"
  ];

  // Effect for delivery message animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDeliveryMessage((prev) => (prev + 1) % deliveryMessages.length);
    }, 5000); // Switch every 5 seconds

    return () => clearInterval(interval);
  }, [deliveryMessages.length]);

  // Handle adding to cart
  const handleAddToCart = () => {
    setIsInCart(true);
    console.log(`Added ${quantity} items to cart`);
  };
  // Handle quantity changes
  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, quantity + delta);
    setQuantity(newQuantity);
    // If quantity goes to 0, return to "Add to Cart" state
    if (newQuantity === 1 && delta === -1 && isInCart) {
      setIsInCart(false);
    }
  };  // Mock product data
  const product = {
    id: parseInt(id || "1"),
    name: "Saaho Tomato Seeds",
    subtitle: "High Quality Hybrid Tomato Seeds",
    price: 85,
    originalPrice: 100,
    unit: "10g pack",
    images: [
      "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1606588260584-34f1043d2fd9?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1595939841168-2ad96854cbde?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=600&fit=crop"
    ],
    badge: "BESTSELLER",
    rating: 4.7,
    reviews: 1245,
    category: "Seeds",
    subcategory: "Tomato",
    productType: "Tomato Seeds",
    description: "Premium quality hybrid tomato seeds with high germination rate. Perfect for home gardening and commercial cultivation. These seeds produce healthy, disease-resistant tomato plants with excellent fruit quality and yield.",
    features: [
      "High Germination Rate (85%+)",
      "Hybrid Variety",
      "Disease Resistant",
      "High Yield Potential",
      "Premium Quality",
      "Suitable for All Seasons"
    ],
    specifications: {
      "Brand": "Saaho Seeds",
      "Weight": "10g pack",
      "Variety": "Hybrid Tomato",
      "Germination Rate": "85-90%",
      "Origin": "India",
      "Shelf Life": "24 months"
    },
    inStock: true,
    stockCount: 127,
    seoMetadata: {
      "Keywords": "tomato seeds, hybrid seeds, vegetable seeds, gardening",
      "Description": "Premium quality hybrid tomato seeds for excellent yield",
      "Manufacturer": "Saaho Seed Company",
      "FSSAI License": "12345678901234",
      "Country of Origin": "India"
    }
  };
  const reviews = [
    {
      id: 1,
      name: "Rajesh Kumar",
      rating: 5,
      comment: "Excellent quality seeds! Great germination rate and healthy plants. Very satisfied with the purchase.",
      date: "2 weeks ago",
      verified: true
    },
    {
      id: 2,
      name: "Priya Sharma",
      rating: 4,
      comment: "Good quality tomato seeds. Plants are growing well. Fast delivery and well packaged.",
      date: "1 month ago",
      verified: true
    },
    {
      id: 3,
      name: "Amit Patel",
      rating: 5,
      comment: "Best seeds for home gardening. High yield and good quality tomatoes. Will order again.",
      date: "2 months ago",
      verified: false
    }
  ];
  const whyShopBenefits = [
    {
      icon: <Clock className="h-5 w-5 text-green-600" />,
      title: "Superfast Delivery",
      description: "Get your order delivered in as fast as 10 minutes"
    },
    {
      icon: <Award className="h-5 w-5 text-blue-600" />,
      title: "Best Prices & Offers", 
      description: "Best price destination with offers directly from the manufacturers"
    },
    {
      icon: <Shield className="h-5 w-5 text-purple-600" />,
      title: "Wide Assortment",
      description: "Choose from 5000+ products across food, personal care, household & other categories"
    }
  ];

  const relatedProducts = [
    {
      id: 2,
      name: "Aashirvaad Organic Atta",
      price: 164,
      originalPrice: 180,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop",
      rating: 4.8
    },
    {
      id: 3,
      name: "Nature Fresh Wheat Organic",
      price: 207,
      originalPrice: 230,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop",
      rating: 4.7
    },
    {
      id: 4,
      name: "24 Mantra Organic Sooji",
      price: 93,
      originalPrice: 110,
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=300&h=300&fit=crop",
      rating: 4.6
    },
    {
      id: 5,
      name: "Nature's Bounty Organic Flour",
      price: 295,
      originalPrice: 320,
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=300&h=300&fit=crop",
      rating: 4.8
    }
  ];  return (
    <div className="min-h-screen bg-white">      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-50 bg-white shadow-sm px-4 py-3 border-b">
        <div className="flex items-center">
          <Link to="/shop" className="p-1">
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </Link>
          <div className="ml-4 flex items-center space-x-1 text-xs text-gray-500 truncate">
            <Link to="/" className="hover:text-green-600 transition-colors">Home</Link>
            <span>/</span>
            <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-green-600 transition-colors">{product.category}</Link>
            <span>/</span>
            <Link to={`/shop?category=${encodeURIComponent(product.category)}&subcategory=${encodeURIComponent(product.subcategory)}`} className="hover:text-green-600 transition-colors">{product.subcategory}</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </div>
      </div>{/* Desktop Breadcrumb */}
      <div className="hidden lg:block bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-green-600 transition-colors">Home</Link>
            <span>/</span>
            <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-green-600 transition-colors">{product.category}</Link>
            <span>/</span>
            <Link to={`/shop?category=${encodeURIComponent(product.category)}&subcategory=${encodeURIComponent(product.subcategory)}`} className="hover:text-green-600 transition-colors">{product.subcategory}</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Container */}
      <div className="bg-white">        {/* Mobile Layout */}
        <div className="lg:hidden">          {/* Full-width Product Image */}
          <div className="relative w-full h-80 overflow-hidden">
            <img 
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {/* Discount Badge inside image - top right */}
            <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </div>
            {product.badge && (
              <Badge className="absolute top-4 left-4 bg-orange-500 hover:bg-orange-600 text-white font-medium text-xs px-2 py-1 rounded">
                {product.badge}
              </Badge>
            )}
          </div>          {/* Thumbnail Images */}
          <div className="flex space-x-2 p-4 overflow-x-auto">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-12 h-12 rounded-lg border overflow-hidden ${
                  selectedImage === index ? 'border-green-500' : 'border-gray-200'
                }`}
              >
                <img 
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Product Info */}
          <div className="p-4">
            {/* Product Title & Brand */}
            <div className="mb-3">
              <h1 className="text-lg font-semibold text-gray-900 leading-tight text-left">
                {product.name}
              </h1>
              <div className="text-sm text-gray-500 mt-1 text-left">{product.unit}</div>
            </div>

            {/* Rating */}
            <div className="flex items-center mb-3">
              <div className="flex items-center bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">
                <Star className="h-3 w-3 fill-current mr-1" />
                <span>{product.rating}</span>
              </div>
              <span className="ml-2 text-xs text-gray-500">({product.reviews.toLocaleString()})</span>
            </div>
          </div>

          {/* Product Description - Mobile */}
          <div className="px-4 py-3 bg-gray-50">
            <h3 className="text-lg font-semibold mb-3 text-gray-900 text-left">Product Description</h3>
            <p className="text-sm text-gray-700 leading-relaxed text-left">{product.description}</p>
            
            <div className="mt-4">
              <h4 className="font-semibold text-gray-900 text-sm mb-3 text-left">Key Features:</h4>
              <div className="space-y-2">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm">
                    <div className="bg-green-100 p-1 rounded-full">
                      <Check className="h-3 w-3 text-green-600" />
                    </div>
                    <span className="text-gray-700 text-left">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Continued in Product Info section */}
          <div className="p-4">            {/* Discount Badge - Remove from here since it's now in the image */}

            {/* Price & Add to Cart Row */}
            <div className="flex items-center justify-between mb-4 bg-white sticky bottom-0 py-3 border-t shadow-lg -mx-4 px-4 z-10">
              <div className="flex-1">
                <div className="flex items-baseline space-x-2 text-left">
                  <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
                  <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
                </div>
              </div>                <div className="ml-2">
                {!isInCart ? (
                  <Button 
                    onClick={handleAddToCart}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-1.5 text-sm font-medium rounded-md w-32 flex items-center justify-center"
                  >
                    ADD
                  </Button>
                ) : (
                  <div className="flex items-center border border-green-600 rounded-md bg-white w-32">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="p-1.5 text-green-600 hover:bg-green-50 transition-colors flex-shrink-0"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="px-1 py-1.5 font-semibold text-green-600 text-sm flex-1 text-center">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="p-1.5 text-green-600 hover:bg-green-50 transition-colors flex-shrink-0"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>            {/* Delivery Info */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 mt-4">
              <div className="flex items-center space-x-2">
                <Truck className="h-4 w-4 text-green-600" />
                <div className="text-left">
                  <div className="font-medium text-green-800 text-sm">Express Delivery</div>
                  <div className="text-xs text-green-700 transition-opacity duration-500 ease-in-out">
                    {deliveryMessages[currentDeliveryMessage]}
                  </div>
                </div>
              </div>
            </div>{/* Product Details Tabs */}            <div className="border-t pt-4">
              <div className="flex space-x-4 mb-4">
                {['specifications', 'reviews'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-2 text-sm font-medium capitalize border-b-2 ${
                      activeTab === tab 
                        ? 'text-green-600 border-green-600' 
                        : 'text-gray-500 border-transparent'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>              <div className="text-left">
                {activeTab === 'specifications' && (
                  <div className="space-y-2">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
                        <span className="text-gray-600 text-sm">{key}</span>
                        <span className="text-gray-900 text-sm font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900 text-sm">{review.name}</span>
                            {review.verified && (
                              <Badge className="bg-green-100 text-green-700 text-xs px-1.5 py-0.5">
                                Verified
                              </Badge>
                            )}
                          </div>
                          <span className="text-xs text-gray-500">{review.date}</span>
                        </div>
                        <div className="flex items-center mb-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < review.rating 
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-gray-700 text-left">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Add bottom padding for sticky price bar */}
            <div className="h-20"></div>
          </div>
        </div>{/* Desktop Layout */}
        <div className="hidden lg:block max-w-6xl mx-auto">
          <div className="grid grid-cols-5 gap-0">
            {/* Left Column - Product Images (3 columns) */}
            <div className="col-span-3 p-6">              {/* Main Product Image */}
              <div className="relative bg-white overflow-hidden rounded-lg">
                <img 
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-[500px] object-cover"
                />
                {/* Discount Badge inside image - top right */}
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1.5 rounded-md text-sm font-bold shadow-lg">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </div>
                {product.badge && (
                  <Badge className="absolute top-4 left-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs px-3 py-1.5 rounded-full shadow-sm">
                    {product.badge}
                  </Badge>
                )}
              </div>

              {/* Thumbnail Images */}
              <div className="flex space-x-3 mt-4 overflow-x-auto pb-2 scrollbar-hide">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden transition-all duration-300 ${
                      selectedImage === index 
                        ? 'border-green-500 shadow-lg scale-105' 
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    <img 
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover bg-gray-50"
                    />
                  </button>
                ))}
              </div>

              {/* Product Description - Desktop */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-gray-900 text-left">Product Description</h3>
                <p className="text-sm text-gray-700 leading-relaxed text-left">{product.description}</p>
                
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-900 text-sm mb-3 text-left">Key Features:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <div className="bg-green-100 p-1 rounded-full">
                          <Check className="h-3 w-3 text-green-600" />
                        </div>
                        <span className="text-gray-700 text-left">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>            {/* Right Column - Product Info (2 columns) */}
            <div className="col-span-2 p-6 border-l border-gray-100">              {/* Product Title & Brand */}
              <div className="mb-4">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2 leading-tight text-left">
                  {product.name}
                </h1>
                <div className="text-sm text-gray-600 mb-3 text-left">{product.unit}</div>
                
                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex items-center bg-green-600 text-white px-2.5 py-1 rounded-md text-sm font-semibold">
                    <Star className="h-3.5 w-3.5 fill-current mr-1" />
                    <span>{product.rating}</span>
                  </div>
                  <span className="ml-3 text-sm text-gray-500">({product.reviews.toLocaleString()} reviews)</span>
                </div>
              </div>              {/* Discount Badge - Now in image */}

              {/* Price Section & Add to Cart */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-left">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
                      <span className="text-lg text-gray-400 line-through">₹{product.originalPrice}</span>
                    </div>
                  </div>
                  
                  <div className="ml-6">
                    {!isInCart ? (
                      <Button 
                        onClick={handleAddToCart}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 text-sm font-semibold transition-all duration-200 rounded-md shadow-sm hover:shadow-md"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    ) : (
                      <div className="flex items-center border border-green-500 rounded-md bg-white">
                        <button
                          onClick={() => handleQuantityChange(-1)}
                          className="p-2.5 text-green-600 hover:bg-green-50 transition-colors rounded-l-md"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4 py-2.5 font-semibold text-gray-900 min-w-[3rem] text-center bg-green-50">{quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(1)}
                          className="p-2.5 text-green-600 hover:bg-green-50 transition-colors rounded-r-md"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>              {/* Delivery Info */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Truck className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-green-800 text-sm">Express Delivery</div>
                    <div className="text-sm text-green-700 transition-opacity duration-500 ease-in-out">
                      {deliveryMessages[currentDeliveryMessage]}
                    </div>
                  </div>
                </div>
              </div>{/* Why Shop from Blinkit */}
              <div className="border-t border-gray-200 pt-6 mb-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 text-left">Why shop from blinkit?</h3>
                <div className="space-y-4">
                  {whyShopBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="bg-gray-50 p-2 rounded-lg mt-0.5">
                        {benefit.icon}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-semibold text-sm text-gray-900 mb-1">{benefit.title}</div>
                        <div className="text-sm text-gray-600 leading-relaxed">{benefit.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>              {/* Product Details Tabs */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex space-x-6 mb-4">
                  {['specifications', 'reviews'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-3 text-sm font-semibold capitalize transition-all duration-200 border-b-2 ${
                        activeTab === tab 
                          ? 'text-green-600 border-green-600' 
                          : 'text-gray-500 border-transparent hover:text-gray-700'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="min-h-[200px] text-left">
                  {activeTab === 'specifications' && (                    <div className="space-y-3">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
                          <span className="text-gray-600 text-sm font-medium">{key}</span>
                          <span className="text-gray-900 text-sm font-semibold">{value}</span>
                        </div>
                      ))}
                    </div>)}

                  {activeTab === 'reviews' && (
                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-gray-900 text-sm">{review.name}</span>
                              {review.verified && (
                                <Badge className="bg-green-100 text-green-700 text-xs px-1.5 py-0.5">
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <span className="text-xs text-gray-500">{review.date}</span>
                          </div>
                          <div className="flex items-center mb-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < review.rating 
                                    ? 'text-yellow-400 fill-current' 
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-sm text-gray-700">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>      {/* Related Products Section */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h2 className="text-xl font-bold mb-6 text-gray-900 text-left">You might also like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="w-full">
                <ProductCard
                  id={relatedProduct.id}
                  image={relatedProduct.image}
                  name={relatedProduct.name}
                  quantity="500g"
                  price={relatedProduct.price}
                  originalPrice={relatedProduct.originalPrice}
                  discountPercent={Math.round(((relatedProduct.originalPrice - relatedProduct.price) / relatedProduct.originalPrice) * 100)}
                  onAddToCart={(quantity) => console.log(`Added ${quantity} of ${relatedProduct.name}`)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
