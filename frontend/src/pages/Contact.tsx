import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, MapPin, Phone, Mail, Clock, Send, MessageCircle, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      // Reset form or show success message
      alert("Thank you for your message! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-0">
      {/* Simple Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <Link to="/" className="text-gray-600 hover:text-[#0C831F] mr-4">
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <div className="text-left">
              <h1 className="text-xl font-semibold text-gray-900">Contact Us</h1>
              <p className="text-sm text-gray-600">Get in touch with our team</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Cards */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 text-left">Get In Touch</h2>
              <p className="text-gray-600 mb-6 text-left">
                We're here to help you with your agricultural needs. Reach out to us through any of the following channels.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-[#0C831F] bg-opacity-10 rounded-lg flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-[#0C831F]" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-gray-900">Visit Our Store</h3>
                    <p className="text-sm text-gray-600">Kathmandu, Tinkune<br />Near Madan Bhandari Park<br />Kathmandu, Nepal</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-[#0C831F] bg-opacity-10 rounded-lg flex items-center justify-center">
                    <Phone className="h-5 w-5 text-[#0C831F]" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-gray-900">Call Us</h3>
                    <p className="text-sm text-gray-600">+977-1-4567890<br />+977-9862200000</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-[#0C831F] bg-opacity-10 rounded-lg flex items-center justify-center">
                    <Mail className="h-5 w-5 text-[#0C831F]" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-gray-900">Email Us</h3>
                    <p className="text-sm text-gray-600">info@Cropsay.com<br />support@Cropsay.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-[#0C831F] bg-opacity-10 rounded-lg flex items-center justify-center">
                    <Clock className="h-5 w-5 text-[#0C831F]" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-gray-900">Business Hours</h3>
                    <p className="text-sm text-gray-600">Sunday - Friday: 9:00 AM - 7:00 PM<br />Saturday: 10:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Support */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-base font-medium text-gray-900 mb-4 text-left">Quick Support</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  className="flex items-center justify-center space-x-2 border-[#0C831F] text-[#0C831F] hover:bg-[#0C831F] hover:text-white py-3"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span className="text-sm">Live Chat</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="flex items-center justify-center space-x-2 border-[#0C831F] text-[#0C831F] hover:bg-[#0C831F] hover:text-white py-3"
                >
                  <Headphones className="h-4 w-4" />
                  <span className="text-sm">Call Support</span>
                </Button>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-base font-medium text-gray-900 mb-4 text-left">Frequently Asked Questions</h3>
              <div className="space-y-3 text-left">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">What are your delivery areas?</h4>
                  <p className="text-xs text-gray-600 mt-1">We deliver throughout Kathmandu Valley and major cities across Nepal.</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Do you offer bulk discounts?</h4>
                  <p className="text-xs text-gray-600 mt-1">Yes, we offer special pricing for bulk orders. Contact us for details.</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">What payment methods do you accept?</h4>
                  <p className="text-xs text-gray-600 mt-1">We accept Cash on Delivery, FonePay, and bank transfers.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 text-left">Send us a Message</h2>
            <p className="text-gray-600 mb-6 text-left text-sm">
              Have a question or need assistance? Fill out the form below and we'll get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-gray-700 mb-1 block text-left">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="text-sm text-left"
                    required
                  />
                </div>
                <div>
                  <Label className="text-sm text-gray-700 mb-1 block text-left">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="text-sm text-left"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-gray-700 mb-1 block text-left">Phone Number</Label>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="9862200000"
                    className="text-sm text-left"
                  />
                </div>
                <div>
                  <Label className="text-sm text-gray-700 mb-1 block text-left">
                    Subject <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    className="text-sm text-left"
                    required
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm text-gray-700 mb-1 block text-left">
                  Message <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your inquiry, requirements, or any questions you have..."
                  className="text-sm min-h-[120px] text-left"
                  required
                />
              </div>

              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="privacy"
                  className="mt-1"
                  required
                />
                <label htmlFor="privacy" className="text-xs text-gray-600 text-left">
                  I agree to the <span className="text-[#0C831F] underline cursor-pointer">Privacy Policy</span> and consent to being contacted regarding my inquiry.
                </label>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#0C831F] hover:bg-green-700 text-white py-3 text-sm font-medium disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Send className="h-4 w-4" />
                    <span>Send Message</span>
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500 text-center">
                We typically respond within 24 hours during business days.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Spacing */}
      <div className="lg:hidden h-6"></div>
    </div>
  );
};

export default Contact;
