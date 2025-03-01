'use client';

import { useState, useRef, useEffect } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

// Mock hotel room suggestions
const hotelRooms = [
  {
    name: 'Premium Room - Sofitel Legend Metropole',
    price: 350,
    location: 'Hoan Kiem District, Hanoi',
    description: 'Luxurious 45m² room in the historic wing with colonial charm',
    features: [
      'French colonial decor',
      'Premium Sofitel MyBed™',
      'Hermès bath amenities',
      'Club Metropole access',
      'Butler service'
    ],
    nearbyAttractions: 'Walking distance to Hoan Kiem Lake and Old Quarter',
    dining: 'Access to Le Beaulieu French restaurant',
  },
  {
    name: 'Grand Deluxe Suite - Vinpearl Luxury',
    price: 280,
    location: 'Tay Ho District, Hanoi',
    description: 'Modern 60m² suite overlooking West Lake',
    features: [
      'Panoramic lake view',
      'Separate living area',
      'Executive lounge access',
      'Rain shower and soaking tub',
      'Smart room controls'
    ],
    nearbyAttractions: 'Near Tran Quoc Pagoda and West Lake',
    dining: 'Complimentary breakfast buffet',
  },
  {
    name: 'Ocean Pool Villa - InterContinental Danang',
    price: 420,
    location: 'Son Tra Peninsula, Da Nang',
    description: 'Luxurious 150m² villa with private infinity pool',
    features: [
      'Private infinity pool',
      'Direct beach access',
      'Outdoor dining area',
      'Personal butler',
      'Luxury spa bathroom'
    ],
    nearbyAttractions: 'Views of Monkey Mountain and East Sea',
    dining: 'Access to Michelin-star La Maison 1888',
  },
  {
    name: 'Beach View Suite - Hyatt Regency',
    price: 250,
    location: 'Ngu Hanh Son, Da Nang',
    description: 'Elegant 55m² suite with panoramic beach views',
    features: [
      'Private balcony',
      'Marble bathroom',
      'Club lounge access',
      'Beach service',
      'Evening cocktails'
    ],
    nearbyAttractions: 'Near My Khe Beach and Marble Mountains',
    dining: 'Multiple restaurants and bars',
  },
  {
    name: 'Park Suite - Park Hyatt Saigon',
    price: 380,
    location: 'District 1, Ho Chi Minh City',
    description: 'Sophisticated 70m² suite with city views',
    features: [
      'Italian marble bathroom',
      'Walk-in closet',
      'Butler service',
      'Luxury spa access',
      'Evening canapes'
    ],
    nearbyAttractions: 'Next to Opera House and Nguyen Hue Street',
    dining: 'Square One Vietnamese restaurant',
  },
  {
    name: 'River Studio - Le Meridien Saigon',
    price: 220,
    location: 'District 1, Ho Chi Minh City',
    description: 'Modern 42m² room with Saigon River views',
    features: [
      'Floor-to-ceiling windows',
      'Signature Le Meridien bed',
      'Rain shower',
      'Club lounge access',
      'Welcome drinks'
    ],
    nearbyAttractions: 'Near Bach Dang Waterfront and Bitexco Tower',
    dining: 'Latest Recipe international buffet',
  },
];

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

export default function SupportPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hello! I\'m your hotel booking assistant. I can help you find the perfect room within your budget. What\'s your budget per night?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [budget, setBudget] = useState<number | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    processUserMessage(inputMessage);
    setInputMessage('');
  };

  const processUserMessage = (message: string) => {
    // Try to extract budget from user message
    const budgetMatch = message.match(/\$?(\d+)/);
    const numberInMessage = budgetMatch ? parseInt(budgetMatch[1]) : null;

    setTimeout(() => {
      let botResponse: Message;

      if (!budget && numberInMessage) {
        setBudget(numberInMessage);
        const suggestedRooms = hotelRooms.filter(room => room.price <= numberInMessage);
        
        if (suggestedRooms.length > 0) {
          const roomSuggestions = suggestedRooms
            .map(room => `${room.name} in ${room.location} at $${room.price}/night (${room.features.join(', ')})`)
            .join('\n\n');

          botResponse = {
            id: messages.length + 2,
            text: `Great! For your budget of $${numberInMessage}, I can suggest these rooms:\n\n${roomSuggestions}\n\nWould you like more details about any of these options?`,
            sender: 'bot',
            timestamp: new Date(),
          };
        } else {
          botResponse = {
            id: messages.length + 2,
            text: `I apologize, but I don't have any rooms available within your budget of $${numberInMessage}. Would you like to explore options in a different price range?`,
            sender: 'bot',
            timestamp: new Date(),
          };
        }
      } else if (message.toLowerCase().includes('thank')) {
        botResponse = {
          id: messages.length + 2,
          text: "You're welcome! Let me know if you need anything else.",
          sender: 'bot',
          timestamp: new Date(),
        };
      } else if (message.toLowerCase().includes('help')) {
        botResponse = {
          id: messages.length + 2,
          text: "I can help you find a room based on your budget. Just tell me how much you'd like to spend per night, and I'll suggest some options!",
          sender: 'bot',
          timestamp: new Date(),
        };
      } else {
        botResponse = {
          id: messages.length + 2,
          text: "I'm here to help you find the perfect room. Could you please let me know your budget per night?",
          sender: 'bot',
          timestamp: new Date(),
        };
      }

      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-blue-600 p-4">
          <h1 className="text-2xl font-bold text-white">Hotel Support Chat</h1>
          <p className="text-blue-100">Ask our chatbot about room recommendations</p>
        </div>

        {/* Chat Messages */}
        <div 
          ref={chatContainerRef}
          className="h-[600px] overflow-y-auto p-4 space-y-4"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <div className="whitespace-pre-wrap">{message.text}</div>
                <div
                  className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}
                >
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t">
          <div className="flex space-x-4">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 