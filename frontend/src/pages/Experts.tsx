import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import ChatPopup from "@/components/ChatPopup";
import { 
  MessageCircle, 
  Calendar, 
  Star, 
  Clock,
  Award,
  Search,
  Users,
  Zap,
  CheckCircle,
  Bot
} from "lucide-react";

interface Expert {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  status: 'online' | 'offline';
  isAI?: boolean;
  avatar?: string;
  fee?: string;
  responseTime?: string;
  expertise: string[];
  consultations?: number;
  whatsappLink?: string;
}

interface Expert {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  status: 'online' | 'offline';
  isAI?: boolean;
  avatar?: string;
  fee?: string;
  responseTime?: string;
  expertise: string[];
  consultations?: number;
  whatsappLink?: string;
}

const Experts = () => {
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);  const [filterStatus, setFilterStatus] = useState<'all' | 'online' | 'offline'>('all');
  const [filterSpecialty, setFilterSpecialty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState("");

  const experts: Expert[] = [
    {
      id: "ai-1",
      name: "Cropsay AI",
      specialty: "AI Agricultural Assistant",
      rating: 4.9,
      status: 'online',
      isAI: true,
      avatar: "/placeholder.svg",
      fee: "Free",
      responseTime: "Instant",
      expertise: ["Crop Management", "Pest Control", "Soil Health", "Weather", "Market Analysis"],
      consultations: 50000
    },
    {
      id: "expert-1",
      name: "Dr. Priya Sharma",
      specialty: "Crop Management Expert",
      rating: 4.8,
      status: 'online',
      avatar: "/placeholder.svg",
      fee: "₹500",
      responseTime: "2h",
      expertise: ["Organic Farming", "Crop Rotation", "Yield Optimization"],
      consultations: 1250,
      whatsappLink: "https://wa.me/919876543210"
    },
    {
      id: "expert-2",
      name: "Rajesh Kumar",
      specialty: "Soil Science Specialist",
      rating: 4.7,
      status: 'online',
      avatar: "/placeholder.svg",
      fee: "₹400",
      responseTime: "3h",
      expertise: ["Soil Testing", "Nutrient Management", "pH Balancing"],
      consultations: 980,
      whatsappLink: "https://wa.me/919876543211"
    },
    {
      id: "expert-3",
      name: "Sneha Patel",
      specialty: "Plant Pathologist",
      rating: 4.6,
      status: 'offline',
      avatar: "/placeholder.svg",
      fee: "₹450",
      responseTime: "4h",
      expertise: ["Disease Control", "Pest Management", "Plant Health"],
      consultations: 750,
      whatsappLink: "https://wa.me/919876543212"
    },
    {
      id: "expert-4",
      name: "Amit Singh",
      specialty: "AgriTech Consultant",
      rating: 4.5,
      status: 'online',
      avatar: "/placeholder.svg",
      fee: "₹350",
      responseTime: "1h",
      expertise: ["Smart Farming", "IoT Solutions", "Precision Agriculture"],
      consultations: 650,
      whatsappLink: "https://wa.me/919876543213"
    },
    {
      id: "expert-5",
      name: "Dr. Meera Reddy",
      specialty: "Horticulture Expert",
      rating: 4.9,
      status: 'offline',
      avatar: "/placeholder.svg",
      fee: "₹600",
      responseTime: "2h",
      expertise: ["Fruit Production", "Vegetable Farming", "Post Harvest"],
      consultations: 1450,
      whatsappLink: "https://wa.me/919876543214"
    }
  ];
  const filteredExperts = experts.filter(expert => {
    const matchesStatus = filterStatus === 'all' || expert.status === filterStatus;
    const matchesSpecialty = filterSpecialty === 'all' || expert.specialty.toLowerCase().includes(filterSpecialty.toLowerCase());
    const matchesSearch = expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         expert.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         expert.expertise.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSpecialty && matchesSearch;
  });
  // Get unique specialties for filter
  const specialties = Array.from(new Set(experts.map(expert => expert.specialty)));

  const handleChatClick = (expert: Expert) => {
    setSelectedExpert(expert);
    if (expert.isAI || expert.whatsappLink) {
      setShowChat(true);
    }
  };

  const handleScheduleClick = (expert: Expert) => {
    setSelectedExpert(expert);
    setShowSchedule(true);
  };const ExpertCard = ({ expert }: { expert: Expert }) => (
    <Card className="group relative overflow-hidden bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md rounded-xl">
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <div className="relative">
            <Avatar className="h-12 w-12 ring-2 ring-white shadow-lg">
              <AvatarImage src={expert.avatar} alt={expert.name} />
              <AvatarFallback className={`text-white text-sm font-semibold ${expert.isAI ? 'bg-gradient-to-br from-blue-500 to-purple-600' : 'bg-green-600'}`}>
                {expert.isAI ? <Bot className="w-6 h-6" /> : expert.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${expert.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="min-w-0 flex-1 text-left">
                <h3 className="font-semibold text-gray-900 text-sm leading-tight group-hover:text-green-700 transition-colors truncate">
                  {expert.name}
                </h3>
                <p className="text-green-600 text-xs font-medium mt-0.5 text-left">{expert.specialty}</p>
              </div>
              {expert.isAI && (
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 text-xs px-2 py-0.5 rounded-full">
                  AI
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-3 mt-2 justify-start">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span className="text-xs font-medium text-gray-700">{expert.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-600">{expert.consultations?.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-green-50 rounded-lg p-2.5">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-green-600" />
              <span className="text-xs text-gray-700 font-medium">{expert.responseTime}</span>
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-2.5">
            <div className="flex items-center gap-1.5">
              <Award className="w-3 h-3 text-green-600" />
              <span className="text-xs text-gray-700 font-medium">{expert.fee}</span>
            </div>
          </div>
        </div>

        {/* Expertise Tags */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1 justify-start">
            {expert.expertise.slice(0, 2).map((skill, index) => (
              <Badge key={index} variant="outline" className="text-xs border-green-200 text-green-700 px-2 py-1 rounded-full bg-green-50">
                {skill}
              </Badge>
            ))}
            {expert.expertise.length > 2 && (
              <Badge variant="outline" className="text-xs border-gray-200 text-gray-600 px-2 py-1 rounded-full bg-gray-50">
                +{expert.expertise.length - 2}
              </Badge>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            onClick={() => handleChatClick(expert)}
            className="flex-1 bg-green-600 hover:bg-white hover:text-green-600 hover:border-green-600 border border-green-600 text-white h-9 text-xs font-medium transition-all duration-200 rounded-lg shadow-sm hover:shadow-md"
            size="sm"
          >
            <MessageCircle className="w-3 h-3 mr-1.5" />
            {expert.isAI ? 'Chat' : 'WhatsApp'}
          </Button>
          <Button 
            onClick={() => handleScheduleClick(expert)}
            className="flex-1 bg-white border border-green-600 text-green-600 hover:bg-green-600 hover:text-white h-9 text-xs font-medium transition-all duration-200 rounded-lg shadow-sm hover:shadow-md"
            size="sm"
          >
            <Calendar className="w-3 h-3 mr-1.5" />
            Book
          </Button>
        </div>
      </CardContent>
    </Card>  );  return (    <div className="min-h-screen bg-gray-50 pb-20">      {/* Compact Header - Mobile Optimized */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white -mt-px pt-[10px]">
        <div className="container mx-auto px-4 py-0.5">
          {/* Mobile Layout: Title + Toggle on same row, Description hidden */}
          <div className="lg:hidden">
            {/* Row 1: Title + Toggle */}
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-lg font-bold">
                Agricultural Experts
              </h1>
              {/* Toggle Buttons - Mobile */}
              <div className="flex bg-white/20 rounded-lg p-0.5">
                <Button
                  variant="ghost"
                  onClick={() => setFilterStatus('all')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all border-0 ${
                    filterStatus === 'all' 
                      ? 'bg-white text-green-700 shadow-sm hover:bg-white hover:text-green-700' 
                      : 'text-white bg-transparent hover:bg-white/10 hover:text-white'
                  }`}
                  size="sm"
                >
                  All
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setFilterStatus('online')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all border-0 ${
                    filterStatus === 'online' 
                      ? 'bg-white text-green-700 shadow-sm hover:bg-white hover:text-green-700' 
                      : 'text-white bg-transparent hover:bg-white/10 hover:text-white'
                  }`}
                  size="sm"
                >
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1" />
                  Online
                </Button>
              </div>
            </div>
              {/* Row 2: Search + Filter */}
            <div className="flex gap-2 mb-1">
              {/* Search Bar - Left and Wider */}
              <div className="relative flex-1">
                <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Search className="w-3 h-3" />
                </div>
                <input
                  type="text"
                  placeholder="Search experts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent focus:bg-white transition-all duration-200 h-8"
                />
              </div>
              
              {/* Specialty Filter - Right and Smaller */}
              <select
                value={filterSpecialty}
                onChange={(e) => setFilterSpecialty(e.target.value)}
                className="px-2 py-1.5 bg-white text-gray-900 border-0 rounded-lg text-xs focus:ring-2 focus:ring-green-300 min-w-[90px] max-w-[110px] h-8"
              >
                <option value="all">All Fields</option>
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Desktop Layout: Original design */}
          <div className="hidden lg:flex lg:items-center lg:justify-between gap-1">
            {/* Title and Description - Left Aligned */}
            <div className="text-left lg:flex-shrink-0">
              <h1 className="text-xl md:text-2xl font-bold mb-0">
                Agricultural Experts
              </h1>
              <p className="text-green-100 text-xs">
                Get instant AI assistance or connect with certified agricultural professionals
              </p>
            </div>
            
            {/* Search and Filter - Right Side */}
            <div className="flex flex-row gap-2 lg:max-w-4xl w-full lg:w-auto">
              {/* Specialty Filter - First */}
              <select
                value={filterSpecialty}
                onChange={(e) => setFilterSpecialty(e.target.value)}
                className="px-3 py-1.5 bg-white text-gray-900 border-0 rounded-lg text-xs focus:ring-2 focus:ring-green-300 min-w-[120px] lg:min-w-[140px] h-9"
              >
                <option value="all">All Fields</option>
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
              
              {/* Toggle Buttons - Second */}
              <div className="flex bg-white/20 rounded-lg p-0.5">
                <Button
                  variant="ghost"
                  onClick={() => setFilterStatus('all')}
                  className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all border-0 ${
                    filterStatus === 'all' 
                      ? 'bg-white text-green-700 shadow-sm hover:bg-white hover:text-green-700' 
                      : 'text-white bg-transparent hover:bg-white/10 hover:text-white'
                  }`}
                  size="sm"
                >
                  All
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setFilterStatus('online')}
                  className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all border-0 ${
                    filterStatus === 'online' 
                      ? 'bg-white text-green-700 shadow-sm hover:bg-white hover:text-green-700' 
                      : 'text-white bg-transparent hover:bg-white/10 hover:text-white'
                  }`}
                  size="sm"
                >
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5" />
                  Online
                </Button>
              </div>

              {/* Search Bar - Third */}
              <div className="relative flex-1 lg:min-w-[480px]">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="Search experts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent focus:bg-white transition-all duration-200"
                />
              </div>
            </div>
          </div>
        </div>
      </div>{/* Stats Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-1.5">
          <div className="flex justify-center gap-6 text-xs text-gray-600">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-green-600" />
              <span>{filteredExperts.filter(e => e.isAI).length} AI Assistant</span>
            </div>            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-3 h-3 text-green-600" />
              <span>{filteredExperts.filter(e => e.status === 'online' && !e.isAI).length} Experts Online</span>            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-3 h-3 text-gray-400" />
              <span>{filteredExperts.length} Total Experts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Experts Grid */}
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredExperts.map((expert) => (
            <ExpertCard key={expert.id} expert={expert} />
          ))}
        </div>

        {filteredExperts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No experts found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}      </div>

      {/* New Chat Popup Component */}
      <ChatPopup 
        open={showChat}
        onOpenChange={setShowChat}
        expert={selectedExpert}
      />

      {/* Compact Schedule Dialog */}
      <Dialog open={showSchedule} onOpenChange={setShowSchedule}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-lg">Schedule Consultation</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Avatar className="h-10 w-10">
                <AvatarImage src={selectedExpert?.avatar} alt={selectedExpert?.name} />
                <AvatarFallback className={`text-white ${selectedExpert?.isAI ? 'bg-gradient-to-br from-blue-500 to-purple-600' : 'bg-green-600'}`}>
                  {selectedExpert?.isAI ? <Bot className="w-5 h-5" /> : selectedExpert?.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{selectedExpert?.name}</p>
                <p className="text-xs text-gray-600">{selectedExpert?.specialty}</p>
                <p className="text-xs text-green-600 font-medium">{selectedExpert?.fee}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700">Date</label>
                <Input type="date" className="mt-1 h-9" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Time</label>
                <Input type="time" className="mt-1 h-9" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Topic</label>
                <textarea 
                  className="w-full mt-1 p-2 text-sm border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  rows={2}
                  placeholder="What would you like to discuss?"
                />
              </div>
            </div>            <div className="flex gap-2 pt-2">
              <Button 
                onClick={() => setShowSchedule(false)} 
                className="flex-1 h-9 bg-white border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-all duration-200"
              >
                Cancel
              </Button>
              <Button 
                className="flex-1 bg-green-600 hover:bg-white hover:text-green-600 hover:border-green-600 border border-green-600 text-white h-9 transition-all duration-200"
                onClick={() => {
                  setShowSchedule(false);
                }}
              >
                Book Now
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Experts;
