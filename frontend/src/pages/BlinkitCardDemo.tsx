import React from 'react';
import BlinkitProductCard from '@/components/BlinkitProductCard';

const BlinkitCardDemo = () => {
  const sampleProducts = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1586201375761-83865001e8c3?w=300&h=300&fit=crop",
      title: "Kab's Jackpot Fiery and Crunchy Crisps",
      quantity: "80 g",
      price: 50,
      originalPrice: 65,
      discountPercent: 23
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=300&h=300&fit=crop",
      title: "Fresh Red Onions",
      quantity: "1 kg",
      price: 25,
      originalPrice: 35,
      discountPercent: 29
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop",
      title: "Premium Tomatoes",
      quantity: "500 g",
      price: 30,
      originalPrice: 40,
      discountPercent: 25
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1508747703725-719777637510?w=300&h=300&fit=crop",
      title: "Organic Baby Carrots",
      quantity: "250 g",
      price: 40,
      originalPrice: null,
      discountPercent: null
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1575908539629-0cb295d6d799?w=300&h=300&fit=crop",
      title: "Farm Fresh Milk",
      quantity: "1 L",
      price: 65,
      originalPrice: 75,
      discountPercent: 13
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=300&h=300&fit=crop",
      title: "Brown Bread Loaf",
      quantity: "400 g",
      price: 45,
      originalPrice: null,
      discountPercent: null
    }
  ];

  const handleAddToCart = (productId: number, quantity: number) => {
    console.log(`Product ${productId}: ${quantity} items ${quantity > 0 ? 'added to' : 'removed from'} cart`);
    // Here you would integrate with your cart management system
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Blinkit-Style Product Cards
          </h1>
          <p className="text-gray-600">
            Responsive product cards with exact Blinkit design and functionality
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Desktop View</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {sampleProducts.map((product) => (
              <BlinkitProductCard
                key={product.id}
                image={product.image}
                title={product.title}
                quantity={product.quantity}
                price={product.price}
                originalPrice={product.originalPrice}
                discountPercent={product.discountPercent}
                onAddToCart={(quantity) => handleAddToCart(product.id, quantity)}
              />
            ))}
          </div>
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Mobile Horizontal Scroll</h2>
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-4 w-max">
              {sampleProducts.map((product) => (
                <div key={product.id} className="flex-shrink-0">
                  <BlinkitProductCard
                    image={product.image}
                    title={product.title}
                    quantity={product.quantity}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    discountPercent={product.discountPercent}
                    onAddToCart={(quantity) => handleAddToCart(product.id, quantity)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Single Card Showcase */}
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Featured Product</h2>
          <div className="flex justify-center">
            <BlinkitProductCard
              image={sampleProducts[0].image}
              title={sampleProducts[0].title}
              quantity={sampleProducts[0].quantity}
              price={sampleProducts[0].price}
              originalPrice={sampleProducts[0].originalPrice}
              discountPercent={sampleProducts[0].discountPercent}
              onAddToCart={(quantity) => handleAddToCart(sampleProducts[0].id, quantity)}
              className="shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlinkitCardDemo;
