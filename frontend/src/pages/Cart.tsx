import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Plus, Minus, Trash2, ChevronLeft, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Cart = () => {  const [cartItems, setCartItems] = useState([
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
    },    {
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
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const originalTotal = cartItems.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
  const savings = originalTotal - subtotal;
  const shippingFee = subtotal > 2000 ? 0 : 150;
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
      originalPrice: 1099,      image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=200&h=200&fit=crop"
    }
  ];

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="h-24 w-24 text-gray-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Link to="/shop">
            <Button className="bg-[#0C831F] hover:bg-[#2d24b8] text-white px-8 py-3">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="w-full max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-12 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
              <p className="text-gray-600 mt-1">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
            </div>
            <Link to="/shop">
              <Button variant="outline" className="border-[#0C831F] text-[#0C831F] hover:bg-[#0C831F] hover:text-white">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>      <div className="w-full max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg rounded-2xl mb-6">
              <CardContent className="p-6">
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
                      <img 
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-red-500">NPR {item.price}</span>
                          <span className="text-sm text-gray-500 line-through">NPR {item.originalPrice}</span>
                        </div>
                        <span className="text-sm text-green-600">You save NPR {item.originalPrice - item.price}</span>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 py-2 font-semibold min-w-[60px] text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="font-bold text-lg">NPR {item.price * item.quantity}</div>
                        <div className="text-sm text-gray-500 line-through">NPR {item.originalPrice * item.quantity}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recommended Products */}
            <Card className="border-0 shadow-lg rounded-2xl">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Frequently Bought Together</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recommendedProducts.map((product) => (
                    <div key={product.id} className="flex items-center space-x-3 p-3 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
                      <img 
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm">{product.name}</h4>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-red-500 text-sm">NPR {product.price}</span>
                          <span className="text-xs text-gray-500 line-through">NPR {product.originalPrice}</span>
                        </div>
                      </div>
                      <Button size="sm" className="bg-[#0C831F] hover:bg-[#2d24b8] text-white">
                        Add
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg rounded-2xl sticky top-4">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Subtotal ({cartItems.length} items)</span>
                    <span className="font-semibold">NPR {subtotal}</span>
                  </div>
                  
                  <div className="flex justify-between text-green-600">
                    <span>Savings</span>
                    <span className="font-semibold">-NPR {savings}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-700 flex items-center">
                      <Truck className="h-4 w-4 mr-1" />
                      Shipping
                    </span>
                    <span className="font-semibold">
                      {shippingFee === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `NPR ${shippingFee}`
                      )}
                    </span>
                  </div>
                  
                  {subtotal < 2000 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <p className="text-sm text-yellow-800">
                        Add NPR {2000 - subtotal} more for FREE shipping!
                      </p>
                    </div>
                  )}
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-[#0C831F]">NPR {total}</span>
                    </div>
                  </div>
                </div>

                <Link to="/checkout">
                  <Button className="w-full bg-[#0C831F] hover:bg-[#2d24b8] text-white py-3 text-lg font-semibold mb-4 transition-all duration-300 hover:scale-105">
                    Proceed to Checkout
                  </Button>
                </Link>

                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Secure Checkout</p>
                  <div className="flex justify-center space-x-2">
                    <Badge variant="outline" className="text-xs">COD</Badge>
                    <Badge variant="outline" className="text-xs">eSewa</Badge>
                    <Badge variant="outline" className="text-xs">Khalti</Badge>
                  </div>
                </div>

                <div className="mt-6 space-y-3 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Truck className="h-4 w-4 mr-2 text-[#0C831F]" />
                    Free delivery in Kathmandu Valley over NPR 2,000
                  </div>
                  <div className="flex items-center">
                    <ShoppingCart className="h-4 w-4 mr-2 text-[#0C831F]" />
                    7-day return policy
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
