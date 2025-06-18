import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { X, ArrowLeft, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface LoginDialogProps {
  children: React.ReactNode;
  onLoginSuccess?: (userName: string) => void;
}

const LoginDialog = ({ children, onLoginSuccess }: LoginDialogProps) => {  const [phoneNumber, setPhoneNumber] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  // Detect mobile device and handle keyboard visibility
  useEffect(() => {
    const checkIsMobile = () => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    };
    setIsMobile(checkIsMobile());

    // Handle keyboard visibility for mobile
    if (checkIsMobile()) {
      const handleResize = () => {
        const viewportHeight = window.visualViewport?.height || window.innerHeight;
        const windowHeight = window.innerHeight;
        setKeyboardVisible(viewportHeight < windowHeight * 0.8);
      };

      window.addEventListener('resize', handleResize);
      window.visualViewport?.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        window.visualViewport?.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  // Handle login (simulate successful login)
  const handleLogin = () => {
    if (phoneNumber.length === 10) {
      // Simulate successful login - in real app, this would make API call
      const userName = `User ${phoneNumber.slice(-4)}`; // Simple username from phone
      onLoginSuccess?.(userName);
      setIsOpen(false);
      setPhoneNumber("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>      <DialogContent className={`w-[95vw] max-w-[360px] sm:max-w-md p-0 gap-0 border-none overflow-hidden rounded-2xl shadow-2xl mx-2 transition-all duration-300 ${
        keyboardVisible ? 'my-2 max-h-[60vh] translate-y-[-20vh]' : 'my-4 max-h-[85vh] sm:max-h-[90vh]'
      }`}>
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`flex flex-col w-full transition-all duration-300 ${
            keyboardVisible ? 'h-[60vh]' : 'h-full max-h-[85vh] sm:max-h-[90vh]'
          }`}
        >{/* Header with back button */}
          <div className="px-4 py-2.5 sm:py-3 flex items-center justify-between bg-gray-50">
            <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-full hover:bg-gray-100 transition-colors">
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </button>
            <span className="text-sm font-medium text-gray-700">Login / Sign up</span>
            <div className="w-8"></div> {/* Empty div for spacing balance */}
          </div>          {/* Main content area */}
          <div className={`p-4 sm:p-6 pt-3 sm:pt-4 flex flex-col items-center overflow-y-auto flex-1 transition-all duration-300 ${
            keyboardVisible ? 'pb-2' : ''
          }`}>            {/* Logo - responsive for different screen sizes */}
            <div className={`bg-yellow-200 rounded-lg flex items-center justify-center mb-3 flex-shrink-0 transition-all duration-300 ${
              keyboardVisible ? 'w-10 h-10' : 'w-12 h-12 sm:w-14 sm:h-14'
            }`}>
              {/* Mobile Logo - Visible on small screens */}
              <img src="/mobilelogo.svg" alt="Cropsay" className={`object-contain sm:hidden transition-all duration-300 ${
                keyboardVisible ? 'w-6 h-6' : 'w-8 h-8'
              }`} />
              {/* Desktop Logo - Visible on larger screens */}
              <img src="/logo.svg" alt="Cropsay" className={`hidden sm:block object-contain transition-all duration-300 ${
                keyboardVisible ? 'w-8 h-8' : 'w-10 h-10'
              }`} />
            </div>              {/* Title - responsive text size */}
            <h2 className={`font-bold text-gray-800 mb-1 transition-all duration-300 ${
              keyboardVisible ? 'text-base' : 'text-lg sm:text-xl'
            }`}>Cropsay</h2>
            <p className={`text-sm text-gray-600 text-center transition-all duration-300 ${
              keyboardVisible ? 'mb-2' : 'mb-4'
            }`}>Log in or Sign up</p>{/* Phone input */}
            <div className="w-full mb-3 sm:mb-4">              <div className={`flex items-center border-2 ${focused ? 'border-[#0C831F]' : phoneNumber.length === 10 ? 'border-green-500' : 'border-gray-300'} rounded-lg px-3 py-2.5 transition-colors duration-200 h-12`}>
                <span className="text-gray-700 font-semibold mr-2 text-sm flex-shrink-0">+977</span>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => {
                    // Only allow numbers and limit to 10 digits
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    if (value.length <= 10) {
                      setPhoneNumber(value);
                    }
                  }}
                  onFocus={() => {
                    setFocused(true);
                    setKeyboardVisible(true);
                  }}
                  onBlur={() => {
                    setFocused(false);
                    setTimeout(() => setKeyboardVisible(false), 300);
                  }}
                  placeholder="Enter mobile number"
                  className="flex-1 outline-none border-none text-gray-700 bg-transparent text-base min-w-0 h-full resize-none"
                  maxLength={10}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  style={{ height: 'auto', lineHeight: 'normal' }}
                />
                {phoneNumber && (
                  <button 
                    onClick={() => setPhoneNumber("")} 
                    className="text-gray-400 hover:text-gray-600 p-1 flex-shrink-0"
                    type="button"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              {/* Phone number validation indicator */}
              <div className="mt-1.5 w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${phoneNumber.length === 10 ? 'bg-green-500' : 'bg-[#0C831F]'}`} 
                  style={{ width: `${(phoneNumber.length / 10) * 100}%` }}
                ></div>
              </div>
            </div>            {/* Continue button - Touch-friendly for mobile with better keyboard handling */}
            <div className={`w-full pt-2 bg-white sticky bottom-0 transition-all duration-300 ${
              keyboardVisible ? 'mt-2' : 'mt-4'
            }`}>
              <motion.div
                className="w-full"
                animate={{ 
                  scale: phoneNumber.length === 10 ? 1 : 0.98,
                }}
                transition={{ duration: 0.3 }}
              >                <Button 
                  className={`w-full text-white rounded-lg flex items-center justify-center text-base font-medium transition-all duration-300 ${
                    phoneNumber.length === 10 ? 'bg-[#0C831F] hover:bg-green-700 shadow-lg' : 'bg-gray-400 hover:bg-gray-500'
                  } ${
                    keyboardVisible ? 'py-2.5 min-h-[40px]' : 'py-3 sm:py-4 min-h-[44px]'
                  }`}
                  disabled={phoneNumber.length < 10}
                  onClick={handleLogin}
                >
                  Continue
                </Button>
              </motion.div>
              
              {/* Terms */}
              {!keyboardVisible && (
                <p className="text-xs text-gray-500 mt-3 text-center px-2 pb-2">
                  By continuing, you agree to our{" "}
                  <a href="/terms" className="text-gray-700 underline">Terms of service</a>{" "}
                  &{" "}
                  <a href="/privacy" className="text-gray-700 underline">Privacy policy</a>
                </p>
              )}
            </div>
          </div></motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
