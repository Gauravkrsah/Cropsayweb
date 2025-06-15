import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, RefreshCw, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock product data for our AR demo
const mockProducts = [
  {
    id: 1,
    name: "Royal Canin Adult Dog Food",
    image: "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400&h=400&fit=crop",
    arModel: "/models/dog-food.glb", // This would be a 3D model in a real application
  },
  {
    id: 2,
    name: "Designer Dog Hoodie",
    image: "https://images.unsplash.com/photo-1546975490-e8b92a360b24?w=400&h=400&fit=crop",
    arModel: "/models/dog-hoodie.glb",
  },
  {
    id: 3,
    name: "Natural Dog Treats",
    image: "https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?w=400&h=400&fit=crop",
    arModel: "/models/dog-treats.glb",
  },
  {
    id: 4,
    name: "Dog Toy Bundle",
    image: "https://images.unsplash.com/photo-1529472119196-cb724127a98e?w=400&h=400&fit=crop",
    arModel: "/models/dog-toy.glb",
  },
];

// For this demo, we'll create a fake AR experience using regular images
const ARView: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<any>(null);
  const [arActive, setArActive] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  
  // Find the product based on the ID
  useEffect(() => {
    const id = parseInt(productId || '0');
    const foundProduct = mockProducts.find(p => p.id === id) || mockProducts[0];
    
    setProduct(foundProduct);
    
    // Simulate loading the AR model
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [productId]);

  // Simulate AR rotation
  useEffect(() => {
    let animationFrame: number;
    
    if (arActive) {
      const animate = () => {
        setRotation(prev => (prev + 0.5) % 360);
        animationFrame = requestAnimationFrame(animate);
      };
      
      animationFrame = requestAnimationFrame(animate);
    }
    
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [arActive]);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 1.5));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.7));
  };

  const handleStartAR = () => {
    setArActive(true);
  };

  const handleBackToProduct = () => {
    navigate(`/product/${productId}`);
  };

  if (!product) {
    return <div className="flex items-center justify-center h-screen">Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-white p-4 shadow-md flex items-center">
        <button onClick={handleBackToProduct} className="mr-4">
          <ArrowLeft />
        </button>
        <h1 className="text-xl font-semibold">AR View - {product.name}</h1>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 relative">
        {loading ? (
          <div className="flex flex-col items-center">
            <RefreshCw className="animate-spin h-12 w-12 text-[#0C831F] mb-4" />
            <p className="text-lg">Loading AR Experience...</p>
            <p className="text-sm text-gray-600 mt-2">Please wait while we prepare your virtual pet product</p>
          </div>
        ) : arActive ? (
          <div className="relative w-full max-w-lg aspect-square bg-white rounded-xl shadow-lg overflow-hidden">
            {/* This simulates AR - in a real app, you'd integrate with AR.js, Three.js or similar */}
            <div className="absolute inset-0 bg-gray-200/30 flex items-center justify-center">
              <img 
                src={product.image} 
                alt={product.name} 
                className="object-contain max-h-full"
                style={{ 
                  transform: `rotate(${rotation}deg) scale(${zoom})`,
                  transition: 'transform 0.1s ease'
                }}
              />
            </div>
            
            {/* Camera feed background simulation */}
            <video 
              className="absolute inset-0 w-full h-full object-cover z-[-1] opacity-40"
              autoPlay 
              muted 
              loop
            >
              <source src="/sound.mp3" type="audio/mp3" />
            </video>
            
            {/* AR Controls */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              <Button size="icon" variant="secondary" onClick={handleZoomOut}>
                <ZoomOut size={18} />
              </Button>
              <Button size="icon" variant="secondary" onClick={handleZoomIn}>
                <ZoomIn size={18} />
              </Button>
            </div>
            
            {/* AR Guidance */}
            <div className="absolute top-4 left-4 bg-black/70 text-white text-xs p-2 rounded">
              Move your device to place the product
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center max-w-md text-center">
            <div className="mb-8 border-4 border-[#0C831F] p-2 rounded-full">
              <Camera className="h-16 w-16 text-[#0C831F]" />
            </div>
            <h2 className="text-2xl font-bold mb-4">{product.name} AR Experience</h2>
            <p className="text-gray-600 mb-6">
              See how {product.name} looks in your space before you buy! 
              Point your camera at an open floor area to place the virtual product.
            </p>
            <Button 
              onClick={handleStartAR} 
              className="bg-[#0C831F] hover:bg-[#2520b9] text-white font-medium px-8 py-2 rounded-md"
            >
              Launch AR Experience
            </Button>
            <p className="text-xs text-gray-500 mt-4">
              This feature requires camera access. For demo purposes, a simulation is shown.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ARView;
