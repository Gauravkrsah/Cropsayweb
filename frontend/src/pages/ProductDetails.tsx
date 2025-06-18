
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ShoppingCart, Heart, Star, Minus, Plus, Truck, Shield, RotateCcw, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/ProductCard";

const ProductDetails = () => {
  const { id } = useParams();  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [buttonAnimation, setButtonAnimation] = useState(false);
  
  // Handle adding to cart
  const handleAddToCart = () => {
    setButtonAnimation(true);
    
    // Reset animation after it completes
    setTimeout(() => {
      setButtonAnimation(false);
    }, 1000);
  };
  // Mock product data
  const product = {
    id: 1,
    name: "Premium Wheat Seeds",
    subtitle: "High Yield Variety",
    price: 850,
    originalPrice: 1000,
    images: [
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600&h=600&fit=crop"
    ],
    badge: "BEST SELLER",
    rating: 4.9,
    reviews: 248,
    category: "Seeds",
    description: "Premium Wheat Seeds are specially selected for high yield and disease resistance. These hybrid varieties are perfect for both commercial farming and home gardening, providing excellent germination rates and robust growth.",
    features: [
      "High germination rate (95%+)",      "Disease resistant varieties",
      "Suitable for all soil types",
      "Fast growing (120-140 days)",
      "High nutritional value",
      "No GMO, natural hybrid"
    ],
    specifications: {
      "Weight": "1 kg packet",
      "Variety": "Hybrid Wheat (HW-2)",
      "Germination": "95% minimum",
      "Growing Season": "Rabi (Winter)",
      "Maturity": "120-140 days",
      "Yield": "40-50 quintals/hectare",
      "Moisture": "12% maximum"
    },
    inStock: true,
    stockCount: 25
  };
  const relatedProducts = [
    {
      id: 2,
      name: "Organic Fertilizer NPK",
      price: 1200,
      originalPrice: 1400,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop",
      rating: 4.8
    },
    {
      id: 3,
      name: "Garden Hand Tools Set",
      price: 750,
      originalPrice: 950,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop",
      rating: 4.7
    },
    {
      id: 4,
      name: "Drip Irrigation Kit",
      price: 2500,
      originalPrice: 3000,
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=300&h=300&fit=crop",
      rating: 4.8
    }
  ];

  const reviews = [
    {
      id: 1,
      name: "Rajesh Shrestha",
      rating: 5,
      comment: "Excellent food! My golden retriever loves it and his coat has become much shinier.",
      date: "2 weeks ago"
    },
    {
      id: 2,
      name: "Sunita Maharjan",
      rating: 4,
      comment: "Good quality food, delivered on time. My dog is very healthy since switching to this.",
      date: "1 month ago"
    },
    {
      id: 3,
      name: "Amit Thapa",
      rating: 5,
      comment: "Best dog food available in Nepal. Worth every rupee. Highly recommended!",
      date: "2 months ago"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="w-full max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-12 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-[#362FD9] hover:underline">Home</Link>
            <span className="text-gray-500">/</span>
            <Link to="/shop" className="text-[#362FD9] hover:underline">Shop</Link>
            <span className="text-gray-500">/</span>
            <span className="text-gray-700">{product.name}</span>
          </div>
        </div>
      </div>      <div className="w-full max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
        {/* Back Button */}
        <Link to="/shop">
          <Button variant="outline" className="mb-6 border-[#362FD9] text-[#362FD9] hover:bg-[#362FD9] hover:text-white">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Shop
          </Button>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="mb-4">
              <img 
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    selectedImage === index ? 'border-[#362FD9]' : 'border-gray-200'
                  }`}
                >
                  <img 
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-24 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <Badge className={`mb-4 px-3 py-1 text-sm font-bold ${
              product.badge === 'BEST SELLER' ? 'bg-red-500' : 'bg-[#362FD9]'
            } text-white`}>
              {product.badge}
            </Badge>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-xl text-gray-600 mb-4">{product.subtitle}</p>
            
            {/* Rating */}
            <div className="flex items-center mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                ))}
                <span className="ml-2 font-semibold">{product.rating}</span>
                <span className="text-gray-500 ml-2">({product.reviews} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center mb-6">
              <span className="text-4xl font-bold text-red-500">Rs. {product.price}</span>
              <span className="text-2xl text-gray-500 line-through ml-4">Rs. {product.originalPrice}</span>
              <Badge className="ml-4 bg-green-500 text-white">
                Save Rs. {product.originalPrice - product.price}
              </Badge>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {product.inStock ? (
                <span className="text-green-600 font-semibold">✓ In Stock ({product.stockCount} available)</span>
              ) : (
                <span className="text-red-600 font-semibold">✗ Out of Stock</span>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4 mb-8">
              <span className="font-semibold">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-100 transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-100 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>            {/* Action Buttons */}
            <div className="flex space-x-4 mb-8">
              <Button 
                onClick={handleAddToCart}
                className={`flex-1 bg-[#362FD9] hover:bg-[#2d24b8] text-white py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 ${buttonAnimation ? 'bark-btn-animation' : ''}`}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
                {buttonAnimation && (
                  <div className="bark-bubble">
                    <span>Woof!</span>
                  </div>
                )}
              </Button>
              <Button variant="outline" className="p-3 border-[#362FD9] text-[#362FD9] hover:bg-[#362FD9] hover:text-white">
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            {/* Trust Icons */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { icon: Truck, text: "Fast Delivery" },
                { icon: Shield, text: "Safe & Secure" },
                { icon: RotateCcw, text: "Easy Returns" }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                  <item.icon className="h-4 w-4 text-[#362FD9]" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-[#362FD9] mt-1">•</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Card className="border-0 shadow-lg rounded-2xl">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Specifications */}
                <div>
                  <h3 className="text-xl font-bold mb-4">Specifications</h3>
                  <div className="space-y-3">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700">{key}:</span>
                        <span className="text-gray-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reviews Summary */}
                <div>
                  <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-100 pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold">{review.name}</span>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <p className="text-gray-700 text-sm">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>        {/* Related Products */}        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8 text-center">You Might Also Like</h2>          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">            {relatedProducts.map((relatedProduct) => (              <div key={relatedProduct.id} className="w-full max-w-[250px] mx-auto">
                <ProductCard
                  image={relatedProduct.image}
                  name={relatedProduct.name}
                  quantity="150g"
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
