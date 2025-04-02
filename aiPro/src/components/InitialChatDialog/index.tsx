import React from 'react';
import { Image, Mic, Paperclip, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface InitialChatDialogProps {
  onSendMessage: (message: string) => void;
}

export function InitialChatDialog({ onSendMessage }: InitialChatDialogProps) {
  const [inputValue, setInputValue] = React.useState('');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    onSendMessage(inputValue);
    setInputValue('');
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-4xl"
      >
        <div className="p-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-2"
          >
            <span className="text-5xl font-bold text-gray-900">你好，我是
              <span className="text-blue-600 inline-flex">
                <span className="animate-bounce-1 inline-block">天</span>
                <span className="animate-bounce-2 inline-block ml-1">音</span>
              </span>
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 text-center mb-12"
          >
            愿为您解答世间疑惑
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="p-6">
              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="flex flex-col">
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
                    placeholder="你可以问我任何问题..."
                    className="flex-1 bg-transparent border-none focus:outline-none text-gray-900 placeholder:text-gray-400 text-lg px-4 mb-4"
                    autoFocus
                  />
                  <div className="flex items-center justify-end space-x-3">
                    <button className="p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors rounded-xl">
                      <Paperclip size={24} />
                    </button>
                    <button className="p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors rounded-xl">
                      <Image size={24} />
                    </button>
                    <button className="p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors rounded-xl">
                      <Mic size={24} />
                    </button>
                    <button 
                      onClick={handleSendMessage}
                      className={`p-3 transition-all duration-300 rounded-xl ${
                        inputValue.trim() 
                          ? 'text-white bg-gray-900 hover:bg-gray-800' 
                          : 'text-black bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      <Send size={24} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}