import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Plus, Minus, Trash2, ChevronLeft, Truck, Shield, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Premium Wheat Seeds",
      price: 850,
      originalPrice: 1000,
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=200&h=200&fit=crop",
      quantity: 2,
      inStock: true
    },
    {
      id: 2,
      name: "Organic Fertilizer NPK",
      price: 1200,
      originalPrice: 1400,
      image: "https://images.unsplash.com/photo-1546975490-e8b92a360b24?w=200&h=200&fit=crop",
      quantity: 1,
      inStock: true
    },
    {
      id: 3,
      name: "Garden Hand Tools Set",
      price: 750,
      originalPrice: 950,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&h=200&fit=crop",
      quantity: 1,
      inStock: true
    }
  ]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const addRecommendedProduct = (product: any) => {
    const newItem = {
      ...product,
      quantity: 1,
      inStock: true
    };
    setCartItems([...cartItems, newItem]);
  };

  const isProductInCart = (productId: number) => {
    return cartItems.some(item => item.id === productId);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const originalTotal = cartItems.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
  const savings = originalTotal - subtotal;
  const shippingFee = subtotal > 2000 ? 0 : 100;
  const total = subtotal + shippingFee;

  const recommendedProducts = [
    {
      id: 4,
      name: "Soil Test Kit",
      price: 999,
      originalPrice: 1399,
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=200&h=200&fit=crop"
    },
    {
      id: 5,
      name: "Plant Growth Promoter",
      price: 799,
      originalPrice: 1099,
      image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=200&h=200&fit=crop"
    }
  ];

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 max-w-md mx-auto">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="h-10 w-10 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6 text-sm">Looks like you haven't added any items to your cart yet.</p>
            <Link to="/shop">
              <Button className="bg-[#0C831F] hover:bg-green-700 text-white px-6 py-2 w-full">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-0">
      {/* Simple Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <Link to="/shop" className="text-gray-600 hover:text-[#0C831F] mr-4">
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <div className="text-left">
              <h1 className="text-xl font-semibold text-gray-900">Shopping Cart</h1>
              <p className="text-sm text-gray-600">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''}</p>
            </div>
          </div>
        </div>
      </div>      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Mobile Order Summary First - Hidden on Desktop */}
          <div className="lg:hidden">
            <div className="bg-white rounded-lg border border-gray-200 p-5 mb-6">
              <h2 className="text-base font-medium text-gray-900 mb-4 text-left">Order Summary</h2>
              
              <div className="space-y-3 mb-4 text-left">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
                  <span>₹ {subtotal}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>You Save</span>
                    <span>-₹ {savings}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Charge</span>
                  <span>{shippingFee === 0 ? <span className="text-green-600">FREE</span> : `₹ ${shippingFee}`}</span>
                </div>
                {subtotal < 2000 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2">
                    <p className="text-xs text-yellow-800">Add ₹ {2000 - subtotal} more for FREE delivery!</p>
                  </div>
                )}
                <div className="border-t pt-3">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span className="text-[#0C831F]">₹ {total}</span>
                  </div>
                </div>
              </div>

              <Link to="/checkout">
                <Button className="w-full bg-[#0C831F] hover:bg-green-700 text-white py-2.5 text-sm font-medium mb-3">
                  Proceed to Checkout
                </Button>
              </Link>

              <div className="text-center text-xs text-gray-600">
                <div className="flex justify-center space-x-2 mb-2">
                  <Badge variant="outline" className="text-xs">COD</Badge>
                  <Badge variant="outline" className="text-xs">FonePay</Badge>
                </div>
                <div className="flex items-center justify-center space-x-4 text-xs">
                  <div className="flex items-center">
                    <Shield className="h-3 w-3 mr-1 text-[#0C831F]" />
                    Secure
                  </div>
                  <div className="flex items-center">
                    <RotateCcw className="h-3 w-3 mr-1 text-[#0C831F]" />
                    7-day return
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cart Items */}
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-start space-x-3">
                  <img 
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg bg-gray-100"
                  />
                  
                  <div className="flex-1 text-left">
                    <h3 className="font-medium text-gray-900 text-sm mb-1">{item.name}</h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-base font-semibold text-gray-900">₹ {item.price}</span>
                      {item.originalPrice > item.price && (
                        <span className="text-xs text-gray-500 line-through">₹ {item.originalPrice}</span>
                      )}
                    </div>
                    {item.originalPrice > item.price && (
                      <span className="text-xs text-green-600">You save ₹ {item.originalPrice - item.price}</span>
                    )}
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 hover:bg-gray-50 transition-colors"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="px-3 py-2 text-sm font-medium min-w-[50px] text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-gray-50 transition-colors"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">₹ {item.price * item.quantity}</div>
                    {item.originalPrice > item.price && (
                      <div className="text-xs text-gray-500 line-through">₹ {item.originalPrice * item.quantity}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}            {/* Recommended Products */}
            <div className="bg-white rounded-lg border border-gray-200 p-5 mt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-medium text-left text-gray-900">Frequently Bought Together</h3>
                <span className="text-xs text-gray-500">Add to cart</span>
              </div>
              <div className="space-y-4">
                {recommendedProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:border-gray-200 transition-colors">
                    <div className="flex items-center space-x-3 flex-1">
                      <img 
                        src={product.image}
                        alt={product.name}
                        className="w-14 h-14 object-cover rounded-lg bg-gray-100"
                      />
                      <div className="flex-1 text-left">
                        <h4 className="font-medium text-gray-900 text-sm mb-1">{product.name}</h4>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold text-base text-gray-900">₹ {product.price}</span>
                          <span className="text-xs text-gray-500 line-through">₹ {product.originalPrice}</span>
                        </div>
                        <span className="text-xs text-green-600">You save ₹ {product.originalPrice - product.price}</span>
                      </div>
                    </div>
                    
                    <div className="ml-3">
                      {isProductInCart(product.id) ? (
                        <Button 
                          disabled
                          className="bg-gray-100 text-gray-500 px-6 py-2 text-sm font-medium cursor-not-allowed min-w-[80px]"
                        >
                          Added
                        </Button>
                      ) : (
                        <Button 
                          onClick={() => addRecommendedProduct(product)}
                          className="bg-[#0C831F] hover:bg-green-700 text-white px-6 py-2 text-sm font-medium transition-all min-w-[80px] active:scale-95"
                        >
                          Add
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Quick add all button */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Button
                  onClick={() => {
                    recommendedProducts.forEach(product => {
                      if (!isProductInCart(product.id)) {
                        addRecommendedProduct(product);
                      }
                    });
                  }}
                  variant="outline"
                  className="w-full border-[#0C831F] text-[#0C831F] hover:bg-[#0C831F] hover:text-white py-2 text-sm font-medium transition-all"
                  disabled={recommendedProducts.every(product => isProductInCart(product.id))}
                >
                  {recommendedProducts.every(product => isProductInCart(product.id)) 
                    ? "All items added" 
                    : `Add all remaining items (₹ ${recommendedProducts.filter(p => !isProductInCart(p.id)).reduce((sum, p) => sum + p.price, 0)})`
                  }
                </Button>
              </div>
            </div>
          </div>

          {/* Desktop Order Summary */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-lg border border-gray-200 p-5 sticky top-6">
              <h2 className="text-base font-medium text-gray-900 mb-4 text-left">Order Summary</h2>
              
              <div className="space-y-3 mb-4 text-left">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
                  <span>₹ {subtotal}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>You Save</span>
                    <span>-₹ {savings}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Charge</span>
                  <span>{shippingFee === 0 ? <span className="text-green-600">FREE</span> : `₹ ${shippingFee}`}</span>
                </div>
                {subtotal < 2000 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-sm text-yellow-800">Add ₹ {2000 - subtotal} more for FREE delivery!</p>
                  </div>
                )}
                <div className="border-t pt-3">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span className="text-[#0C831F]">₹ {total}</span>
                  </div>
                </div>
              </div>

              <Link to="/checkout">
                <Button className="w-full bg-[#0C831F] hover:bg-green-700 text-white py-2.5 text-sm font-medium mb-4">
                  Proceed to Checkout
                </Button>
              </Link>

              <div className="text-center text-sm text-gray-600">
                <div className="flex justify-center space-x-2 mb-3">
                  <Badge variant="outline" className="text-xs">COD</Badge>
                  <Badge variant="outline" className="text-xs">FonePay</Badge>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-center">
                    <Truck className="h-3 w-3 mr-2 text-[#0C831F]" />
                    Free delivery over ₹ 2,000
                  </div>
                  <div className="flex items-center justify-center">
                    <Shield className="h-3 w-3 mr-2 text-[#0C831F]" />
                    Secure checkout
                  </div>
                  <div className="flex items-center justify-center">
                    <RotateCcw className="h-3 w-3 mr-2 text-[#0C831F]" />
                    7-day return policy
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Button */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <Link to="/checkout">
          <Button className="w-full bg-[#0C831F] hover:bg-green-700 text-white py-3 text-base font-medium">
            Proceed to Checkout (₹ {total})
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
