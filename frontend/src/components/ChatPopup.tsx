import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Send, X, Bot, User, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Add styling for chat message formatting
const chatStyles = `
  /* Base text styling with better contrast */
  .chat-message-bot {
    color: white;
  }
  .chat-message-user {
    color: white;
  }
  
  /* Remove any styling from strong elements to make chat look more natural */
  .chat-message-content strong {
    font-weight: 500;
    color: inherit;
  }
  
  /* Simple paragraph styling */
  .chat-message-content p {
    margin-bottom: 0.5rem;
    line-height: 1.5;
    color: inherit;
  }
  
  /* Basic list styling */
  .chat-message-content ul, .chat-message-content ol {
    margin-left: 0;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    list-style-type: none;
  }
    /* Simple list items */
  .chat-message-content li {
    margin-bottom: 0.75rem;
    line-height: 1.4;
  }
  
  /* Simpler numbered list styling */
  .chat-message-content .list-item {
    display: flex;
    margin-bottom: 0.75rem;
    align-items: flex-start;
  }
  
  .chat-message-content .list-number {
    font-weight: 500;
    color: inherit;
    margin-right: 0.5rem;
    min-width: 1.5rem;
  }
  
  .chat-message-content .list-content {
    flex: 1;
  }
  
  /* No special formatting for project names */
  .chat-message-content .list-content strong {
    color: inherit;
    font-weight: 500;
    display: inline;
  }
  
  /* General div styling */
  .chat-message-content div {
    line-height: 1.5;
    margin-bottom: 0.3rem;
    color: inherit;
  }
`;

interface Expert {
  id: string;
  name: string;
  specialty: string;
  isAI?: boolean;
  avatar?: string;
  whatsappLink?: string;
}

interface ChatPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  expert: Expert | null;
}

interface ActionButton {
  label: string;
  onClick: () => void;
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  actions?: ActionButton[];
}

// Gemini API function
const fetchGeminiResponse = async (message: string): Promise<{ text: string }> => {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('Gemini API key not found');
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `You are Cropsay AI, an expert agricultural assistant. Answer this agricultural question in a helpful, practical way: ${message}`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    return { text: response.text() };
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
};

const getInitialMessages = (expertName: string): Message[] => [
  {
    id: 1,
    text: `Hello! I'm ${expertName}, your agricultural expert assistant. I can help you with crop management, pest control, soil health, irrigation, and farming best practices. How can I assist you today?`,
    sender: 'bot',
    timestamp: new Date()
  }
];

const ChatPopup: React.FC<ChatPopupProps> = ({
  open,
  onOpenChange,
  expert
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize messages when expert changes
  useEffect(() => {
    if (expert && open) {
      setMessages(getInitialMessages(expert.name));
    }
  }, [expert, open]);

  const clearConversation = () => {
    if (expert) {
      setMessages(getInitialMessages(expert.name));
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (open) {
      scrollToBottom();
    }
  }, [messages, open]);

  const handleBotResponse = async (userMessage: string) => {
    setIsTyping(true);
    try {
      if (expert?.isAI) {
        // Call Gemini API for AI expert
        console.log('Sending message to Gemini API:', userMessage.substring(0, 30) + '...');
        const response = await fetchGeminiResponse(userMessage);
        console.log('Received response from Gemini API');

        let botText = response.text || 'I apologize, but I\'m unable to provide an answer at the moment. Please try rephrasing your question.';

        // Clean up the response
        if (botText.length > 5000) {
          let cutoffIndex = botText.lastIndexOf('.', 2500);
          if (cutoffIndex === -1 || cutoffIndex < 2000) {
            cutoffIndex = 2500;
          }
          botText = botText.substring(0, cutoffIndex + 1) + "\n\n(Message truncated for readability)";
        }

        const botMessage: Message = {
          id: messages.length + 2,
          text: botText,
          sender: 'bot',
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, botMessage]);
      } else {
        // For human experts, show a WhatsApp redirect message
        const botMessage: Message = {
          id: messages.length + 2,
          text: `I'm currently not available for live chat. For immediate assistance, please contact me via WhatsApp where I can provide personalized agricultural guidance.`,
          sender: 'bot',
          timestamp: new Date(),
          actions: expert?.whatsappLink ? [
            { 
              label: 'Contact on WhatsApp', 
              onClick: () => window.open(expert.whatsappLink, '_blank')
            }
          ] : undefined
        };
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (error) {
      console.error('Error getting response:', error);
      const errorMessage: Message = {
        id: messages.length + 2,
        text: 'I apologize, but I\'m currently experiencing some technical difficulties. Please try again in a moment.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Store user message to pass to functions
    const userText = userMessage.text;
    
    // Simulate typing delay for more natural conversation flow
    const typingDelay = Math.min(1000, Math.max(500, userText.length * 20));
    
    setTimeout(() => {
      handleBotResponse(userText);
    }, typingDelay);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Function to format message text with minimal styling
  const formatMessageText = (text: string) => {
    const cleanedText = text.trim()
      .replace(/\r\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n');
    
    const containsNumberedList = /\b\d+\.\s+/.test(cleanedText);
    
    if (!containsNumberedList) {
      return cleanedText
        .replace(/\*\*([^*\n]+)\*\*/g, '$1')
        .replace(/\*([^*\n]+)\*/g, '$1')
        .replace(/\n\n/g, '<br/><br/>')
        .replace(/\n/g, '<br/>');
    }
    
    return cleanedText
      .replace(/(\d+)\.\s+(.*?)(?=\n\d+\.|\n\n|$)/gs, (match, number, content) => {
        const cleanContent = content
          .replace(/\*\*([^*\n]+)\*\*/g, '$1')
          .replace(/\*([^*\n]+)\*/g, '$1');
        
        return `<div class="list-item">
          <div class="list-number">${number}.</div>
          <div class="list-content">${cleanContent}</div>
        </div>`;
      })
      .replace(/^(.*?)(?=<div class="list-item">|$)/s, (match, intro) => {
        if (intro.trim()) {
          return `<p>${intro.trim()}</p>`;
        }
        return '';
      })
      .replace(/(<\/div>\s*<\/div>)([^<]*)$/s, (match, divClose, remaining) => {
        if (remaining.trim()) {
          return `${divClose}<p>${remaining.trim()}</p>`;
        }
        return divClose;
      })
      .replace(/\n/g, '');
  };

  if (!expert) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <style dangerouslySetInnerHTML={{ __html: chatStyles }} />
      <DialogContent 
        className="sm:max-w-md max-w-[90vw] p-0 bg-gradient-to-br from-gray-800 to-gray-900 border border-green-500/30 shadow-xl max-h-[70vh] flex flex-col rounded-xl overflow-hidden [&>button]:hidden"
        aria-describedby="chat-description"
      >
        {/* Hidden but accessible title and description for screen readers */}
        <div className="sr-only" id="chat-dialog-title">Chat with {expert?.name || 'Cropsay AI'}</div>
        <div className="sr-only" id="chat-description">Chat interface to communicate with {expert?.name || 'Cropsay AI'}</div>
        
        <div className="bg-gradient-to-r from-green-600 to-green-700 p-3 border-b border-gray-700 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg">
              {expert?.isAI ? (
                <Bot className="h-5 w-5 text-green-600" />
              ) : (
                <span className="text-green-600 text-sm font-bold">
                  {expert?.name.split(' ').map(n => n[0]).join('') || 'AI'}
                </span>
              )}
            </div>
            <div>
              <h3 className="text-white font-semibold text-base">{expert?.name || 'Cropsay AI'}</h3>
              <div className="flex items-center text-green-200 text-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                Available to assist
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={clearConversation}
              className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-red-300 transition-colors"
              title="Clear conversation"
            >
              <Trash2 className="h-4 w-4" />
            </button>
            <button 
              onClick={() => onOpenChange(false)}
              className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>        
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-900 to-gray-800">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              <div className="flex gap-2 max-w-[85%]">
                {message.sender === 'bot' && (
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-white shadow-md flex items-center justify-center self-end">
                    {expert?.isAI ? (
                      <Bot className="h-4 w-4 text-green-600" />
                    ) : (
                      <span className="text-green-600 text-xs font-bold">
                        {expert?.name.split(' ').map(n => n[0]).join('') || 'AI'}
                      </span>
                    )}
                  </div>
                )}
                  
                <div 
                  className={`p-3 rounded-2xl ${
                    message.sender === 'user' 
                      ? 'bg-green-600 text-white rounded-br-md' 
                      : 'bg-gray-700 text-white rounded-bl-md border border-gray-600'
                  }`}
                >
                  <div 
                    className={`text-sm leading-relaxed chat-message-content ${
                      message.sender === 'user' ? 'chat-message-user' : 'chat-message-bot'
                    }`}
                    dangerouslySetInnerHTML={{ 
                      __html: formatMessageText(message.text)
                    }}
                  />
                  {message.actions && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {message.actions.map((action, idx) => (
                        <Button
                          key={idx}
                          variant="outline"
                          size="sm"
                          onClick={action.onClick}
                          className="bg-green-600 text-white border-green-500 hover:bg-green-700 text-xs"
                        >
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  )}
                  <p className={`text-xs mt-2 ${message.sender === 'user' ? 'text-green-100' : 'text-gray-400'}`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
                
                {message.sender === 'user' && (
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-600 flex items-center justify-center self-end">
                    <User className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="flex gap-2">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-white shadow-md flex items-center justify-center self-end">
                  {expert?.isAI ? (
                    <Bot className="h-4 w-4 text-green-600" />
                  ) : (
                    <span className="text-green-600 text-xs font-bold">
                      {expert?.name.split(' ').map(n => n[0]).join('') || 'AI'}
                    </span>
                  )}
                </div>
                <div className="bg-gray-700 border border-gray-600 text-white p-3 rounded-2xl rounded-bl-md">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-bounce" style={{ animationDuration: '1.4s', animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-bounce" style={{ animationDuration: '1.4s', animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-bounce" style={{ animationDuration: '1.4s', animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>        
        <form onSubmit={handleSendMessage} className="border-t border-gray-700 p-3 bg-gray-800">
          <div className="flex items-center space-x-3">
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={`Ask ${expert?.name || 'Cropsay AI'} about agricultural advice...`}
              className="flex-1 px-4 py-2 rounded-full border border-gray-600 bg-gray-700 text-sm text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder:text-gray-400"
            />
            <Button
              type="submit"
              disabled={!inputValue.trim()}
              className="rounded-full bg-green-600 hover:bg-green-700 text-white transition-colors disabled:opacity-50 disabled:bg-gray-600 h-10 w-10 p-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChatPopup;
