
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, CreditCard, Truck, Shield, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [promoCode, setPromoCode] = useState("");
  const [isPromoApplied, setIsPromoApplied] = useState(false);

  const orderItems = [
    {
      id: 1,
      name: "Premium Dog Bed",
      variant: "Large, Blue",
      price: 2200,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=80&h=80&fit=crop"
    }
  ];

  const subtotal = 2200;
  const deliveryCharge = 100;
  const discount = isPromoApplied ? 200 : 0;
  const total = subtotal + deliveryCharge - discount;

  const applyPromo = () => {
    if (promoCode.toLowerCase() === "welcome10") {
      setIsPromoApplied(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/cart" className="flex items-center text-[#0C831F] hover:text-[#2d24b8] transition-colors">
              <ChevronLeft className="h-5 w-5 mr-2" />
              Back to Cart
            </Link>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Secure Checkout</h1>
              <div className="flex items-center justify-center mt-2 text-sm text-gray-600">
                <Shield className="h-4 w-4 mr-1 text-green-600" />
                SSL Secured
              </div>
            </div>
            <div className="w-24"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information */}
            <Card className="border-0 shadow-lg rounded-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-xl">
                  <span className="bg-[#0C831F] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">1</span>
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="fullName" 
                      placeholder="Enter your full name"
                      className="mt-1 border-gray-300 focus:border-[#0C831F] focus:ring-[#0C831F]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your.email@example.com"
                      className="mt-1 border-gray-300 focus:border-[#0C831F] focus:ring-[#0C831F]"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input 
                    id="phone" 
                    placeholder="98XXXXXXXX"
                    className="mt-1 border-gray-300 focus:border-[#0C831F] focus:ring-[#0C831F]"
                  />
                </div>
                <div>
                  <Label htmlFor="orderNote" className="text-sm font-medium text-gray-700">
                    Order Note (Optional)
                  </Label>
                  <Textarea 
                    id="orderNote" 
                    placeholder="Any special instructions for your order..."
                    className="mt-1 border-gray-300 focus:border-[#0C831F] focus:ring-[#0C831F]"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Delivery Address */}
            <Card className="border-0 shadow-lg rounded-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-xl">
                  <span className="bg-[#0C831F] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">2</span>
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                    City/District <span className="text-red-500">*</span>
                  </Label>
                  <select className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:border-[#0C831F] focus:ring-[#0C831F] focus:outline-none">
                    <option>Kathmandu</option>
                    <option>Lalitpur</option>
                    <option>Bhaktapur</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                      Address <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="address" 
                      placeholder="Street, Area"
                      className="mt-1 border-gray-300 focus:border-[#0C831F] focus:ring-[#0C831F]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="landmark" className="text-sm font-medium text-gray-700">Landmark</Label>
                    <Input 
                      id="landmark" 
                      placeholder="Near landmark"
                      className="mt-1 border-gray-300 focus:border-[#0C831F] focus:ring-[#0C831F]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card className="border-0 shadow-lg rounded-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-xl">
                  <span className="bg-[#0C831F] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">3</span>
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div 
                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                      paymentMethod === "cod" 
                        ? "border-[#0C831F] bg-[#0C831F]/5" 
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setPaymentMethod("cod")}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === "cod" ? "border-[#0C831F] bg-[#0C831F]" : "border-gray-300"
                      }`}>
                        {paymentMethod === "cod" && <Check className="h-3 w-3 text-white" />}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <Truck className="h-5 w-5 mr-2 text-[#0C831F]" />
                          <span className="font-semibold">Cash on Delivery</span>
                        </div>
                        <p className="text-sm text-gray-600">Pay when you receive</p>
                      </div>
                    </div>
                  </div>

                  <div 
                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                      paymentMethod === "online" 
                        ? "border-[#0C831F] bg-[#0C831F]/5" 
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setPaymentMethod("online")}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === "online" ? "border-[#0C831F] bg-[#0C831F]" : "border-gray-300"
                      }`}>
                        {paymentMethod === "online" && <Check className="h-3 w-3 text-white" />}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <CreditCard className="h-5 w-5 mr-2 text-[#0C831F]" />
                          <span className="font-semibold">Online Payment</span>
                        </div>
                        <p className="text-sm text-gray-600">eSewa, Khalti, Cards</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-xl rounded-2xl sticky top-4">
              <CardHeader>
                <CardTitle className="text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Order Items */}
                <div className="space-y-4">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <div className="relative">
                        <img 
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <Badge className="absolute -top-2 -right-2 bg-[#0C831F] text-white text-xs">
                          {item.quantity}
                        </Badge>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600">{item.variant}</p>
                        <p className="font-bold text-[#0C831F]">NPR {item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Promo Code */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Promo Code</Label>
                  <div className="flex space-x-2">
                    <Input 
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button 
                      onClick={applyPromo}
                      variant="outline"
                      className="border-[#0C831F] text-[#0C831F] hover:bg-[#0C831F] hover:text-white"
                    >
                      Apply
                    </Button>
                  </div>
                  {isPromoApplied && (
                    <p className="text-sm text-green-600 flex items-center">
                      <Check className="h-4 w-4 mr-1" />
                      Promo code applied successfully!
                    </p>
                  )}
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Subtotal</span>
                    <span className="font-semibold">NPR {subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Delivery Charge</span>
                    <span className="font-semibold">NPR {deliveryCharge}</span>
                  </div>
                  {isPromoApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span className="font-semibold">-NPR {discount}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-[#0C831F]">NPR {total}</span>
                  </div>
                </div>

                <Button className="w-full bg-[#0C831F] hover:bg-[#2d24b8] text-white py-3 text-lg font-semibold transition-all duration-300 hover:scale-105">
                  Place Order
                </Button>

                <div className="text-center text-xs text-gray-500 space-y-1">
                  <div className="flex items-center justify-center">
                    <Shield className="h-4 w-4 mr-1 text-green-600" />
                    Your payment information is secure
                  </div>
                  <p>By placing your order, you agree to our terms and conditions</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
