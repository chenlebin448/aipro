import React from 'react';
import { Image as ImageIcon, Mic, Paperclip, Send, Volume2, Copy, RefreshCcw, Share2, MoreHorizontal, ThumbsUp, ThumbsDown, Search, Wand2, Pen, BookOpen, Languages, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { InitialChatDialog } from '../InitialChatDialog';
import { chatCompletion } from '../../lib/openai';
import { ThinkingAnimation } from './ThinkingAnimation';

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
  displayedContent?: string;
}

let messageCounter = -1;

function generateMessageId(): string {
  messageCounter += 1;
  return `${Date.now()}-${messageCounter}`;
}

interface ChatProps {
  initialMessage?: string;
  showInitialDialog?: boolean;
}

export function Chat({ initialMessage, showInitialDialog: propShowInitialDialog }: ChatProps) {
  console.log("4655454")
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [inputValue, setInputValue] = React.useState('');
  const [showInitialDialog, setShowInitialDialog] = React.useState(propShowInitialDialog ?? true);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const typingSpeed = 50; // 打字速度（毫秒/字）

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 处理AI回复的打字机效果
  const handleTypingEffect = (message: Message) => {
    let currentIndex = -1;
    const content = message.content;
    
    const typingInterval = setInterval(() => {
      currentIndex++;
      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg.id === message.id 
            ? { ...msg, displayedContent: content.slice(0, currentIndex) }
            : msg
        )
      );
      
      if (currentIndex >= content.length) {
        clearInterval(typingInterval);
      }
    }, typingSpeed);
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  React.useEffect(() => {
    setShowInitialDialog(propShowInitialDialog ?? true);
  }, [propShowInitialDialog]);

  React.useEffect(() => {
    if (initialMessage) {
      const newMessage: Message = {
        id: generateMessageId(),
        content: initialMessage,
        isBot: false,
        timestamp: new Date()
      };

      setMessages([newMessage]);
      //
      // const response =  fetch(`http://localhost:3300/api/chat?json=` + encodeURIComponent(inputValue), {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });

      

      // 解析 JSON 响应
      // const responseData = response;
      //
      // 假设返回的 JSON 数据中有 'content' 或 'response' 字段
      // const botResponseContent = JSON.stringify(responseData) || responseData || '抱歉，我现在无法回答这个问题。';
      //

      // setMessages([newMessage]);

      // Simulate bot response
      setTimeout(() => {
        const botResponse: Message = {
          id: generateMessageId(),
          content: `111111`,
          displayedContent: '',
          isBot: true,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
        handleTypingEffect(botResponse);
      }, 1000);
    }
  }, [initialMessage]);

  const handleInitialMessage = (message: string) => {
    const newMessage: Message = {
      id: generateMessageId(),
      content: message,
      isBot: false,
      timestamp: new Date()
    };

    setMessages([newMessage]);
    setShowInitialDialog(false);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: generateMessageId(),
        content: `这是来自AI的回复：${message}`,
        displayedContent: '',
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      handleTypingEffect(botResponse);
    }, 1000);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // 创建用户消息
    const newMessage: Message = {
      id: generateMessageId(),
      content: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');

    // 创建等待中的 AI 响应消息
    const pendingMessage: Message = {
      id: generateMessageId(),
      content: '正在思考...',
      displayedContent: '正在思考...',
      isBot: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, pendingMessage]);

    // 调用 OpenAI API
    chatCompletion(inputValue)
      .then(response => {
        // 显示"正在回答"状态
        setMessages(prev =>
          prev.map(msg =>
            msg.id === pendingMessage.id
              ? { ...msg, content: '正在回答...', displayedContent: '正在回答...' }
              : msg
          )
        );

        // 延迟一会儿再显示实际回答
        setTimeout(() => {
        // 更新 AI 响应消息
        const botResponse: Message = {
          id: pendingMessage.id,
          content: response || '抱歉，我现在无法回答这个问题。',
          displayedContent: '',
          isBot: true,
          timestamp: new Date()
        };

        setMessages(prev =>
          prev.map(msg => msg.id === pendingMessage.id ? botResponse : msg)
        );

        handleTypingEffect(botResponse);
        }, 1000);
      })
      .catch(error => {
        // 处理错误情况
        const errorMessage: Message = {
          id: pendingMessage.id,
          content: '抱歉，发生了一些错误。请稍后再试。',
          displayedContent: '抱歉，发生了一些错误。请稍后再试。',
          isBot: true,
          timestamp: new Date()
        };

        setMessages(prev =>
          prev.map(msg => msg.id === pendingMessage.id ? errorMessage : msg)
        );
      });

    // setTimeout(() => {
    //   const botResponse: Message = {
    //     id: generateMessageId(),
    //     content: `这是来自AI的回复：${inputValue}`,
    //     displayedContent: '',
    //     isBot: true,
    //     timestamp: new Date()
    //   };
    //   setMessages(prev => [...prev, botResponse]);
    //   handleTypingEffect(botResponse);
    // }, 1000);
  };

  return (
    <div className="flex flex-col h-screen z-30">
      {/* Chat Title */}
      <div className="bg-white border-b border-gray-100 relative z-30">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-lg font-medium text-gray-900 truncate">
            {messages.length > 0 ? messages[0].content : ''}
          </h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto flex items-center justify-center">
        {showInitialDialog ? (
          <InitialChatDialog onSendMessage={handleInitialMessage} />
        ) : (
          <div className="flex flex-col w-full h-full">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto px-4 py-6 min-h-0 overflow-x-hidden">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-start max-w-4xl mx-auto mb-4 ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`flex-1 max-w-[80%] ${message.isBot ? '' : 'flex justify-end'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: message.isBot ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`${
                        message.isBot 
                          ? 'text-gray-900 relative' 
                          : 'bg-gray-100 text-gray-900'
                      } ${message.isBot ? '' : 'rounded-2xl'} px-6 py-4 text-lg`}
                    >
                      {message.isBot ? (
                        message.content === '正在思考...' ? (
                          <ThinkingAnimation status="thinking" />
                        ) : (
                          message.displayedContent
                        )
                      ) : (
                        message.content
                      )}
                      {message.isBot && message.displayedContent === message.content && (
                        <div className="flex items-center mt-2 -mx-1.5">
                          <div className="flex items-center">
                           <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors relative group">
                              <Volume2 size={18} />
                             <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">朗读</span>
                            </button>
                           <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors relative group">
                              <Copy size={18} />
                             <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">复制</span>
                            </button>
                           <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors relative group">
                              <RefreshCcw size={18} />
                             <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">重新生成</span>
                            </button>
                           <button className="flex items-center space-x-1 px-2 py-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                              <Share2 size={18} />
                             <span className="text-sm">分享</span>
                            </button>
                           <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors relative group">
                              <MoreHorizontal size={18} />
                             <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">更多</span>
                            </button>
                          </div>
                          <div className="h-4 mx-1 border-l border-gray-200"></div>
                          <div className="flex items-center">
                           <button className="flex items-center space-x-1 px-2 py-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                              <ThumbsUp size={18} />
                             <span className="text-sm">分析</span>
                            </button>
                            <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                              <ThumbsDown size={18} />
                            </button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="bg-white border-t border-gray-100">
            <div className="max-w-4xl mx-auto px-4 py-6">
              <div className="flex items-center gap-2 mb-4 px-4">
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl text-sm text-gray-600 transition-colors whitespace-nowrap">
                  <Search size={16} />
                  <span>AI 搜索</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-50 hover:bg-gray-900 hover:text-white rounded-xl text-sm text-gray-600 transition-all duration-300 whitespace-nowrap border border-gray-100">
                  <Wand2 size={16} />
                  <span>AI 编辑</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-50 hover:bg-gray-900 hover:text-white rounded-xl text-sm text-gray-600 transition-all duration-300 whitespace-nowrap border border-gray-100">
                  <Pen size={16} />
                  <span>帮我写作</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-50 hover:bg-gray-900 hover:text-white rounded-xl text-sm text-gray-600 transition-all duration-300 whitespace-nowrap border border-gray-100">
                  <ImageIcon size={16} />
                  <span>图像生成</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-50 hover:bg-gray-900 hover:text-white rounded-xl text-sm text-gray-600 transition-all duration-300 whitespace-nowrap border border-gray-100">
                  <BookOpen size={16} />
                  <span>AI 阅读</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-50 hover:bg-gray-900 hover:text-white rounded-xl text-sm text-gray-600 transition-all duration-300 whitespace-nowrap border border-gray-100">
                  <Languages size={16} />
                  <span>学术搜索</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-50 hover:bg-gray-900 hover:text-white rounded-xl text-sm text-gray-600 transition-all duration-300 whitespace-nowrap border border-gray-100">
                  <FileText size={16} />
                  <span>解题答疑</span>
                </button>
              </div>
              <div className="bg-gray-50 rounded-2xl p-4">
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
                    placeholder="输入您的问题..."
                    className="flex-1 bg-transparent border-none focus:outline-none text-gray-900 placeholder:text-gray-400 text-lg px-4 mb-4"
                  />
                  <div className="flex items-center justify-end space-x-3">
                    <button className="p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors rounded-xl">
                      <Paperclip size={24} />
                    </button>
                    <button className="p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors rounded-xl">
                      <ImageIcon size={24} />
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
          </div>
        </div>
        )}
      </div>
    </div>
  );
}