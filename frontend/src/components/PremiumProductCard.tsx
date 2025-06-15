import React, { useState, useEffect } from 'react';
import { Plus, Minus, Camera, AlertCircle, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile, useHasCamera } from "@/hooks/use-mobile";
import { useToast } from "@/components/ui/use-toast";
import '@/components/styles/PremiumShopStyles.css';

interface PremiumProductCardProps {
  product: {
    id: number;
    name: string;
    subtitle?: string;
    price: number;
    originalPrice?: number | null;
    image: string;
    badge?: string;
    rating?: number;
    reviews?: number;
    discount?: number;
    isNew?: boolean;
    category?: string;
    weight?: string;
    unit?: string;
    deliveryTime?: number;
    hasAR?: boolean;
  };
  horizontal?: boolean;
  className?: string;
}

const PremiumProductCard: React.FC<PremiumProductCardProps> = ({ product, horizontal = false, className = "" }) => {
  const [animatedButton, setAnimatedButton] = useState<number | null>(null);
  const [productsInCart, setProductsInCart] = useState<number[]>([]);
  const [productQuantities, setProductQuantities] = useState<Record<number, number>>({});    const [showARView, setShowARView] = useState(false);
  const [arAttempted, setArAttempted] = useState(false);
  const isMobile = useIsMobile();
  const hasCamera = useHasCamera();
  const { toast } = useToast();
  const hasAR = product.hasAR || product.category === 'Accessories' || product.id % 2 === 0; // for demo purposes
  const handleAddToCart = (productId: number, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    setAnimatedButton(productId);
    
    // Add to cart
    setProductsInCart(prev => [...prev, productId]);
    setProductQuantities(prev => ({...prev, [productId]: 1}));
    
    setTimeout(() => {
      setAnimatedButton(null);
    }, 1000);
  };
  // Handle AR camera access
  const handleARClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    // Open AR view
    setShowARView(true);
    
    // First check if the browser supports mediaDevices API
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      toast({
        title: "AR not supported",
        description: "Your browser doesn't support AR features. Try updating or using a different browser.",
        variant: "destructive"
      });
      setShowARView(false);
      return;
    }

    // Request camera access
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Show AR overlay first
      const arOverlay = document.getElementById(`ar-overlay-${product.id}`);
      const arContent = document.getElementById(`ar-content-${product.id}`);
      const loadingIndicator = document.getElementById(`ar-loading-${product.id}`);
      
      if (arOverlay) {
        arOverlay.classList.add('active');
        
        // Request fullscreen for better experience
        if (arContent) {
          setTimeout(() => {
            requestFullscreen(arContent);
          }, 500);
        }
      }

      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(stream => {
          // Show AR overlay
          const videoElement = document.getElementById(`ar-video-${product.id}`) as HTMLVideoElement;
          
          if (videoElement) {
            videoElement.srcObject = stream;
            videoElement.play();
            
            // Hide loading indicator when video starts playing
            videoElement.onloadeddata = () => {
              if (loadingIndicator) {
                loadingIndicator.style.display = 'none';
              }
            };
          }
        })
        .catch(error => {
          console.error("Camera access error:", error);
          
          // Close AR view
          closeAR();
          
          // Show specific error toast based on error type
          if (error.name === 'NotAllowedError') {
            toast({
              title: "Camera permission denied",
              description: "Please allow camera access to use AR features",
              variant: "destructive"
            });
          } else if (error.name === 'NotFoundError' || error.name === 'OverconstrainedError') {
            toast({
              title: "Camera not found",
              description: "Your device doesn't have a compatible camera for AR",
              variant: "destructive"
            });
          } else if (error.name === 'NotReadableError') {
            toast({
              title: "Camera not available",
              description: "Your camera is currently in use by another application",
              variant: "destructive"
            });
          } else if (error.name === 'SecurityError') {
            toast({
              title: "Security error",
              description: "Camera access is restricted in this context",
              variant: "destructive"
            });
          } else {
            toast({
              title: "AR not available",
              description: "We couldn't access your camera. Please try again later.",
              variant: "destructive"
            });
          }
        });
    } else {
      // Show error toast for unsupported browsers
      toast({
        title: "AR not supported",
        description: "Your browser doesn't support AR features. Try updating or using a different browser.",
        variant: "destructive"
      });
      setShowARView(false);
    }
  };    // Close AR view with improved error handling
  const closeAR = () => {
    try {
      // Exit fullscreen if we're in fullscreen mode
      exitFullscreen();
      
      const videoElement = document.getElementById(`ar-video-${product.id}`) as HTMLVideoElement | null;
      const arOverlay = document.getElementById(`ar-overlay-${product.id}`);
      const loadingIndicator = document.getElementById(`ar-loading-${product.id}`);
      
      // Safely stop all camera tracks
      if (videoElement && videoElement.srcObject) {
        try {
          const tracks = (videoElement.srcObject as MediaStream).getTracks();
          tracks.forEach(track => {
            try {
              track.stop();
            } catch (trackError) {
              console.log("Error stopping camera track:", trackError);
            }
          });
          videoElement.srcObject = null;
        } catch (streamError) {
          console.log("Error cleaning up camera stream:", streamError);
        }
      }
      
      if (loadingIndicator) {
        loadingIndicator.style.display = 'block';
      }
      
      if (arOverlay) {
        arOverlay.classList.remove('active');
      }
      
      setShowARView(false);
    } catch (error) {
      console.log("Error closing AR view:", error);
      // Ensure we always set state back to closed even if other cleanup fails
      setShowARView(false);
    }
  };
  
  // Clean up AR resources when component unmounts
  useEffect(() => {
    return () => {
      if (showARView) {
        const videoElement = document.getElementById(`ar-video-${product.id}`) as HTMLVideoElement;
        if (videoElement && videoElement.srcObject) {
          const tracks = (videoElement.srcObject as MediaStream).getTracks();
          tracks.forEach(track => track.stop());
        }
      }
    };
  }, [showARView, product.id]);
  
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
      [productId]: Math.max(1, (prev[productId] || 1) - 1)
    }));
  };
  
  const removeFromCart = (productId: number, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    setProductsInCart(prev => prev.filter(id => id !== productId));
    setProductQuantities(prev => {
      const newQuantities = {...prev};
      delete newQuantities[productId];
      return newQuantities;
    });
  };
  
  // Request fullscreen for AR
  const requestFullscreen = (element: HTMLElement) => {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if ((element as any).webkitRequestFullscreen) {
      (element as any).webkitRequestFullscreen();
    } else if ((element as any).mozRequestFullScreen) {
      (element as any).mozRequestFullScreen();
    } else if ((element as any).msRequestFullscreen) {
      (element as any).msRequestFullscreen();
    }
  }
    // Exit fullscreen with safety check
  const exitFullscreen = () => {
    try {
      // Check if fullscreen is actually active before attempting to exit
      if (document.fullscreenElement || 
          (document as any).webkitFullscreenElement || 
          (document as any).mozFullScreenElement || 
          (document as any).msFullscreenElement) {
        
        if (document.exitFullscreen) {
          document.exitFullscreen().catch(err => console.log("Fullscreen exit error:", err));
        } else if ((document as any).webkitExitFullscreen) {
          (document as any).webkitExitFullscreen();
        } else if ((document as any).mozCancelFullScreen) {
          (document as any).mozCancelFullScreen();
        } else if ((document as any).msExitFullscreen) {
          (document as any).msExitFullscreen();
        }
      }
    } catch (error) {
      console.log("Error exiting fullscreen:", error);
    }
  }
  
  return (
    <Link to={`/product/${product.id}`} className={`block h-full ${className}`}>
      <div className="blinkit-product-card">
        {/* Product image with discount badge */}
        <div className="blinkit-product-image">
          {product.discount && (
            <div className="blinkit-discount-badge">
              {product.discount}% OFF
            </div>
          )}          <img 
            src={product.image}
            alt={product.name}
            loading="lazy"
          />          {/* AR Camera Icon - only show on mobile devices with camera */}
          {product.hasAR && (
            <>
              <button 
                className="ar-camera-icon"
                onClick={handleARClick}
                aria-label="View in AR"
              >
                <Camera size={16} />
              </button>
              <div className="ar-hint">Try in AR</div>
            </>
          )}
        </div>
        
        {/* Product details */}
        <div className="blinkit-product-content">
          <h3 className="blinkit-product-name" title={product.name}>{product.name}</h3>
          
          <div className="blinkit-product-pricing">
            <div className="blinkit-price-section">
              <span className="blinkit-current-price">₹{product.price}</span>
              {product.originalPrice && (
                <span className="blinkit-original-price">₹{product.originalPrice}</span>
              )}
            </div>
            
            <div className="blinkit-action-container">
              {productsInCart.includes(product.id) ? (
                <div className="blinkit-quantity-selector">
                  <button 
                    className="blinkit-quantity-btn blinkit-minus" 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (productQuantities[product.id] <= 1) {
                        removeFromCart(product.id, e);
                      } else {
                        decreaseQuantity(product.id, e);
                      }
                    }}
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="blinkit-quantity-value">
                    {productQuantities[product.id] || 1}
                  </span>
                  <button 
                    className="blinkit-quantity-btn blinkit-plus"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      increaseQuantity(product.id, e);
                    }}
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddToCart(product.id, e);
                  }}
                  className={`blinkit-add-btn ${animatedButton === product.id ? 'bark-btn-animation' : ''}`}
                >
                  ADD
                </button>
              )}
            </div>
          </div>
        </div>
          {/* AR View Overlay - Hidden by default */}
        <div className={`ar-view-overlay`} id={`ar-overlay-${product.id}`}>
          <video 
            className="ar-video" 
            id={`ar-video-${product.id}`}
            autoPlay
            playsInline
            muted
          />
          <div className="ar-content">
            {/* AR content goes here */}
            <h2>AR View</h2>
            <p>Point your camera at the product to see it in AR.</p>
          </div>        </div>
      </div>      {/* AR View Overlay */}
      {product.hasAR && (
        <div id={`ar-overlay-${product.id}`} className="ar-overlay">
          <div id={`ar-content-${product.id}`} className="ar-content">
            <video id={`ar-video-${product.id}`} className="ar-video" playsInline></video>
            <div className="ar-loading" id={`ar-loading-${product.id}`}>
              Accessing camera
            </div>
            <div className="ar-product-overlay">
              <img 
                src={product.image} 
                alt={product.name} 
                className="ar-product-image" 
              />
            </div>
            <div className="ar-instructions">
              Move your phone around to place {product.name} in your space
            </div>            <button className="ar-close-btn" onClick={closeAR} aria-label="Close AR">
              <X size={16} className="mr-1" /> Close AR
            </button>
          </div>
        </div>
      )}
    </Link>
  );
};

export default PremiumProductCard;
