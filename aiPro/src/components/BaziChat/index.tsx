import React from 'react';
import { Icon } from '@iconify/react';

interface BaziChatProps {
  birthData: {
    gender: string;
    solarDate: string;
    lunarDate: string;
    time: string;
    place: string;
  };
}

export function BaziChat({ birthData }: BaziChatProps) {
  const [messages, setMessages] = React.useState<Array<{
    id: string;
    content: string;
    isBot: boolean;
    timestamp: Date;
  }>>([
    {
      id: '1',
      content: `您好，我是您的AI命理助手。我已经完成了您的八字命盘分析，您可以问我任何关于您命盘的问题。`,
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = React.useState('');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      content: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        content: `这是关于"${inputValue}"的八字分析回复...`,
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 rounded-r-2xl">
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {messages.map(message => (
            <div key={message.id} className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Icon 
                    icon={message.isBot ? "mdi:robot" : "mdi:account"} 
                    className="w-5 h-5 text-amber-600" 
                  />
                </div>
                <div className="flex-1">
                  <p className="text-gray-600">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-100 bg-white p-4 rounded-br-2xl">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="输入您想问的问题..."
              className="w-full pl-4 pr-12 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
            />
            <button 
              onClick={handleSendMessage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-all hover:scale-105 active:scale-95"
            >
              <Icon icon="mdi:send" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}