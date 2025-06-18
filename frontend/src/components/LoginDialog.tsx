import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { X, ArrowLeft, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface LoginDialogProps {
  children: React.ReactNode;
}

const LoginDialog = ({ children }: LoginDialogProps) => {  const [phoneNumber, setPhoneNumber] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [focused, setFocused] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>      <DialogContent className="w-[85vw] max-w-[400px] sm:max-w-md p-0 gap-0 border-none overflow-hidden rounded-xl shadow-2xl">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col w-full"
        >{/* Header with back button */}
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-full hover:bg-gray-100">
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </button>
            <span className="text-sm font-medium text-gray-600">Login / Sign up</span>
            <div className="w-8"></div> {/* Empty div for spacing balance */}
          </div>
          
          {/* Main content area */}
          <div className="p-6 pt-0 flex flex-col items-center">            {/* Logo - responsive for different screen sizes */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-yellow-200 rounded-md flex items-center justify-center mb-4 sm:mb-6">
              {/* Mobile Logo - Visible on small screens */}
              <img src="/mobilelogo.svg" alt="Cropsay" className="w-12 h-12 object-contain sm:hidden" />
              {/* Desktop Logo - Visible on larger screens */}
              <img src="/logo.svg" alt="Cropsay" className="hidden sm:block w-16 h-16 object-contain" />
            </div>              {/* Title - responsive text size */}
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">Cropsay</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Log in or Sign up</p>
              {/* Phone input */}
            <div className="w-full mb-4">
              <div className={`flex items-center border ${focused ? 'border-[#0C831F]' : phoneNumber.length === 10 ? 'border-green-500' : 'border-gray-300'} rounded-md px-3 py-2.5 transition-colors duration-200`}>
                <span className="text-gray-600 font-medium mr-2">+977</span>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => {
                    // Only allow numbers
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    setPhoneNumber(value);
                  }}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder="Enter mobile number"
                  className="flex-1 outline-none border-none text-gray-700"
                  maxLength={10}
                  autoFocus
                />
                {phoneNumber && (
                  <button onClick={() => setPhoneNumber("")} className="text-gray-400">
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
            </div>            {/* Continue button - Changes color to blue when phone number is complete */}
            <motion.div
              className="w-full"
              animate={{ 
                scale: phoneNumber.length === 10 ? 1 : 0.98,
              }}
              transition={{ duration: 0.3 }}
            >
              <Button 
                className={`w-full py-6 ${phoneNumber.length === 10 ? 'bg-[#0C831F] hover:bg-green-700 shadow-lg' : 'bg-gray-400 hover:bg-gray-500'} text-white rounded-md flex items-center justify-center text-base font-medium transition-all duration-300`}
                disabled={phoneNumber.length < 10}
              >
                Continue
              </Button>
            </motion.div>
            
            {/* Terms */}
            <p className="text-xs text-gray-500 mt-4 text-center">
              By continuing, you agree to our{" "}
              <a href="/terms" className="text-gray-700 underline">Terms of service</a>{" "}
              &{" "}
              <a href="/privacy" className="text-gray-700 underline">Privacy policy</a>
            </p>
          </div>        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
