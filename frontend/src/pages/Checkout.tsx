
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [promoCode, setPromoCode] = useState("");

  const orderItems = [
    {
      id: 1,
      name: "Premium Organic Seeds",
      variant: "Tomato Seeds", 
      price: 4999,
      quantity: 1,
      image: "/placeholder.svg"
    }
  ];

  const subtotal = 4999;
  const deliveryCharge = 100;
  const total = subtotal + deliveryCharge;  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <Link to="/cart" className="text-gray-600 hover:text-[#0C831F] mr-4">
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-semibold text-gray-900">Checkout</h1>
          </div>
        </div>
      </div>      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Mobile Order Summary First - Hidden on Desktop */}
          <div className="lg:hidden">
            <div className="bg-white rounded-lg border border-gray-200 p-5 mb-6">
              <h2 className="text-base font-medium text-gray-900 mb-4 text-left">Order Summary</h2>
              
              {/* Order Items */}
              <div className="space-y-3 mb-5">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <div className="relative">
                      <img 
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg bg-gray-100"
                      />
                      <div className="absolute -top-1 -right-1 bg-[#0C831F] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                      <p className="text-xs text-gray-600">₹ {item.price} ×{item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 mb-4 text-left">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Sub-total</span>
                  <span>₹ {subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Charge [1 KG]</span>
                  <span>₹ {deliveryCharge}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>₹ {total}</span>
                  </div>
                </div>
              </div>              {/* Promo Code */}
              <div className="mb-4 text-left">
                <Label className="text-sm text-gray-700 mb-1 block">Promo Code</Label>
                <div className="flex space-x-2">
                  <Input 
                    placeholder="FREE30"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 text-sm text-left"
                  />
                  <Button className="bg-[#0C831F] hover:bg-green-700 text-white px-4 text-sm">
                    APPLY
                  </Button>
                </div>
              </div>
            </div>
          </div>{/* Left Side - Forms */}
          <div className="space-y-6">
            {/* General Information */}
            <div>
              <h2 className="text-base font-medium text-gray-900 mb-3 text-left">1. General Information</h2>
              <div className="space-y-3">                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <Label className="text-sm text-gray-700 mb-1 block text-left">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input placeholder="Ram Bahadur" className="text-sm text-left" />
                  </div>
                  <div>
                    <Label className="text-sm text-gray-700 mb-1 block text-left">Email</Label>
                    <Input placeholder="john@gmail.com" className="text-sm text-left" />
                  </div>
                </div>
                <div>
                  <Label className="text-sm text-gray-700 mb-1 block text-left">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input placeholder="9862200000" className="text-sm text-left" />
                </div>
                <div>
                  <Label className="text-sm text-gray-700 mb-1 block text-left">Order Note (any message for us)</Label>
                  <Textarea 
                    placeholder="I was searching for this product from so long."
                    className="text-sm min-h-[60px] text-left"
                  />
                </div>
              </div>
            </div>            {/* Delivery Address */}
            <div>
              <h2 className="text-base font-medium text-gray-900 mb-3 text-left">2. Delivery Address</h2>
              <div className="space-y-3">                <div>
                  <Label className="text-sm text-gray-700 mb-1 block text-left">
                    City/District <span className="text-red-500">*</span>
                  </Label><select className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:border-[#0C831F] focus:ring-[#0C831F] focus:outline-none bg-white text-left">
                    <option>Kathmandu Inside Ring Road</option>
                    <option>Kathmandu Outside Ring Road</option>
                    <option>Pokhara</option>
                    <option>Biratnagar</option>
                    <option>Dharan</option>
                    <option>Itahari</option>
                    <option>Butwal</option>
                    <option>Achham</option>
                    <option>Arghakhanchi</option>
                    <option>Baglung</option>
                    <option>Baitadi</option>
                    <option>Bajhang</option>
                    <option>Bajura</option>
                    <option>Banke</option>
                    <option>Bara</option>
                    <option>Bardiya</option>
                    <option>Bhaktapur</option>
                    <option>Bhojpur</option>
                    <option>Chitwan</option>
                    <option>Dadeldhura</option>
                    <option>Dailekh</option>
                    <option>Dang</option>
                    <option>Darchula</option>
                    <option>Dhading</option>
                    <option>Dhankuta</option>
                    <option>Dhanusa</option>
                    <option>Dolakha</option>
                    <option>Dolpa</option>
                    <option>Doti</option>
                    <option>Gorkha</option>
                    <option>Gulmi</option>
                    <option>Humla</option>
                    <option>Ilam</option>
                    <option>Jajarkot</option>
                    <option>Jhapa</option>
                    <option>Jumla</option>
                    <option>Kailali</option>
                    <option>Kalikot</option>
                    <option>Kanchanpur</option>
                    <option>Kapilvastu</option>
                    <option>Kaski</option>
                    <option>Kathmandu</option>
                    <option>Kavrepalanchok</option>
                    <option>Khotang</option>
                    <option>Lalitpur</option>
                    <option>Lamjung</option>
                    <option>Mahottari</option>
                    <option>Makwanpur</option>
                    <option>Manang</option>
                    <option>Morang</option>
                    <option>Mugu</option>
                    <option>Mustang</option>
                    <option>Myagdi</option>
                    <option>Nawalparasi</option>
                    <option>Nuwakot</option>
                    <option>Okhaldhunga</option>
                    <option>Palpa</option>
                    <option>Panchthar</option>
                    <option>Parbat</option>
                    <option>Parsa</option>
                    <option>Pyuthan</option>
                    <option>Ramechhap</option>
                    <option>Rasuwa</option>
                    <option>Rautahat</option>
                    <option>Rolpa</option>
                    <option>Rukum</option>
                    <option>Rupandehi</option>
                    <option>Salyan</option>
                    <option>Sankhuwasabha</option>
                    <option>Saptari</option>
                    <option>Sarlahi</option>
                    <option>Sindhuli</option>
                    <option>Sindhupalchok</option>
                    <option>Siraha</option>
                    <option>Solukhumbu</option>
                    <option>Sunsari</option>
                    <option>Surkhet</option>
                    <option>Syangja</option>
                    <option>Tanahu</option>
                    <option>Taplejung</option>
                    <option>Terhathum</option>
                    <option>Udayapur</option>
                  </select>
                </div>                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <Label className="text-sm text-gray-700 mb-1 block text-left">
                      Address <span className="text-red-500">*</span>
                    </Label>
                    <Input placeholder="kathmandu, tinkune" className="text-sm text-left" />
                  </div>
                  <div>
                    <Label className="text-sm text-gray-700 mb-1 block text-left">Landmark</Label>
                    <Input placeholder="madan bhandari park" className="text-sm text-left" />
                  </div>
                </div>
              </div>
            </div>            {/* Payment Methods */}
            <div>
              <h2 className="text-base font-medium text-gray-900 mb-3 text-left">3. Payment Methods</h2>
              <div className="grid grid-cols-2 gap-3">
                <div 
                  className={`border-2 rounded-lg p-3 cursor-pointer transition-all ${
                    paymentMethod === "cod" 
                      ? "border-[#0C831F] bg-green-50" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setPaymentMethod("cod")}
                >
                  <div className="flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === "cod" ? "border-[#0C831F] bg-[#0C831F]" : "border-gray-300"
                    }`}>
                      {paymentMethod === "cod" && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                    <Truck className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">Cash on delivery</span>
                  </div>
                </div>

                <div 
                  className={`border-2 rounded-lg p-3 cursor-pointer transition-all ${
                    paymentMethod === "fonepay" 
                      ? "border-[#0C831F] bg-green-50" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setPaymentMethod("fonepay")}
                >
                  <div className="flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === "fonepay" ? "border-[#0C831F] bg-[#0C831F]" : "border-gray-300"
                    }`}>
                      {paymentMethod === "fonepay" && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>                    <div className="w-4 h-4 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">F</div>
                    <span className="text-sm font-medium text-gray-900">FonePay</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Place Order Button - After Payment Methods */}
            <div className="lg:hidden mt-6">
              <Button className="w-full bg-[#0C831F] hover:bg-green-700 text-white py-3 text-base font-medium">
                Place Order
              </Button>
            </div>
          </div>{/* Right Side - Order Summary (Hidden on Mobile) */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-lg border border-gray-200 p-5 sticky top-6">
              <h2 className="text-base font-medium text-gray-900 mb-4 text-left">Order Summary</h2>
              
              {/* Order Items */}
              <div className="space-y-3 mb-5">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <div className="relative">
                      <img 
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg bg-gray-100"
                      />
                      <div className="absolute -top-1 -right-1 bg-[#0C831F] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                        {item.quantity}
                      </div>
                    </div>                    <div className="flex-1 text-left">
                      <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                      <p className="text-xs text-gray-600">₹ {item.price} ×{item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>              {/* Price Breakdown */}
              <div className="space-y-2 mb-4 text-left">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Sub-total</span>
                  <span>₹ {subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Charge [1 KG]</span>
                  <span>₹ {deliveryCharge}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>₹ {total}</span>
                  </div>
                </div>
              </div>              {/* Promo Code */}
              <div className="mb-4 text-left">
                <Label className="text-sm text-gray-700 mb-1 block text-left">Promo Code</Label>
                <div className="flex space-x-2">
                  <Input 
                    placeholder="FREE30"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 text-sm text-left"
                  />
                  <Button className="bg-[#0C831F] hover:bg-green-700 text-white px-4 text-sm">
                    APPLY
                  </Button>
                </div>
              </div>              {/* Place Order Button */}
              <Button className="w-full bg-[#0C831F] hover:bg-green-700 text-white py-2.5 text-sm font-medium">
                Place Order
              </Button>
            </div>          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
