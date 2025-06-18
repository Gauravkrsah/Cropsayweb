import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface LoginDialogProps {
  children: React.ReactNode;
  onLoginSuccess?: (userName: string) => void;
}

const LoginDialog = ({ children, onLoginSuccess }: LoginDialogProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [focused, setFocused] = useState(false);

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
      </DialogTrigger>
      
      <DialogContent className="w-[95vw] max-w-[360px] sm:max-w-md p-0 gap-0 border-none overflow-hidden rounded-2xl shadow-2xl">
        <VisuallyHidden>
          <DialogTitle>Login Dialog</DialogTitle>
        </VisuallyHidden>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col w-full h-full"
        >
          {/* Header with back button */}
          <div className="px-4 py-3 flex items-center justify-between bg-gray-50">
            <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-full hover:bg-gray-100 transition-colors">
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </button>
            <span className="text-sm font-medium text-gray-700">Login / Sign up</span>
            <div className="w-8"></div> {/* Empty div for spacing balance */}
          </div>

          {/* Main content area */}
          <div className="flex flex-col items-center p-4 sm:p-6">
            {/* Logo */}
            <div className="bg-yellow-200 rounded-lg w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center mb-3 flex-shrink-0">
              {/* Mobile Logo - Visible on small screens */}
              <img src="/mobilelogo.svg" alt="Cropsay" className="w-8 h-8 object-contain sm:hidden" />
              {/* Desktop Logo - Visible on larger screens */}
              <img src="/logo.svg" alt="Cropsay" className="hidden sm:block w-10 h-10 object-contain" />
            </div>

            {/* Title */}
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">Cropsay</h2>
            <p className="text-sm text-gray-600 text-center mb-4">Log in or Sign up</p>

            {/* Phone input */}
            <div className="w-full mb-4">
              <div className={`flex items-center border-2 ${focused ? 'border-[#0C831F]' : phoneNumber.length === 10 ? 'border-green-500' : 'border-gray-300'} rounded-lg px-3 py-2.5 transition-colors duration-200`}>
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
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder="Enter mobile number"
                  className="flex-1 outline-none border-none text-gray-700 bg-transparent text-base min-w-0"
                  maxLength={10}
                  inputMode="numeric"
                  pattern="[0-9]*"
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
            </div>

            {/* Continue button */}
            <div className="w-full">
              <motion.div
                className="w-full"
                animate={{ 
                  scale: phoneNumber.length === 10 ? 1 : 0.98,
                }}
                transition={{ duration: 0.3 }}
              >
                <Button 
                  className={`w-full text-white rounded-lg py-3 sm:py-4 min-h-[44px] flex items-center justify-center text-base font-medium transition-all duration-300 ${
                    phoneNumber.length === 10 ? 'bg-[#0C831F] hover:bg-green-700 shadow-lg' : 'bg-gray-400 hover:bg-gray-500'
                  }`}
                  disabled={phoneNumber.length < 10}
                  onClick={handleLogin}
                >
                  Continue
                </Button>
              </motion.div>
              
              {/* Terms */}
              <p className="text-xs text-gray-500 mt-3 text-center px-2">
                By continuing, you agree to our{" "}
                <a href="/terms" className="text-gray-700 underline">Terms of service</a>{" "}
                &{" "}
                <a href="/privacy" className="text-gray-700 underline">Privacy policy</a>
              </p>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
