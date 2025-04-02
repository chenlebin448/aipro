import React from 'react';
import { MessageCircle, Image, Mic, Search, ChevronRight, Home, PanelLeftClose, PanelLeft, Pen, Plus, History } from 'lucide-react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

interface SidebarProps {
  currentView: 'home' | 'chat' | 'writing' | 'yinyang';
  setCurrentView: (view: 'home' | 'chat' | 'writing' | 'yinyang') => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (collapsed: boolean) => void;
}

export function Sidebar({ currentView, setCurrentView, isSidebarCollapsed, setIsSidebarCollapsed }: SidebarProps) {
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className={`${isSidebarCollapsed ? 'w-20' : 'w-72'} transition-all duration-300 border-r border-gray-100 flex flex-col bg-white/90 backdrop-blur-md fixed top-0 left-0 bottom-0 z-40`}>
      {/* Collapse Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 z-[9999]"
        style={{ left: isSidebarCollapsed ? '4.5rem' : '17rem' }}
      >
        {isSidebarCollapsed ? <PanelLeft size={16} /> : <PanelLeftClose size={16} />}
      </button>

      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <img 
            src="https://images.unsplash.com/photo-1633177317976-3f9bc45e1d1d?w=50&h=50&fit=crop" 
            alt="Profile" 
            className="w-10 h-10 rounded-full ring-2 ring-gray-200 transition-all duration-300 hover:scale-105 hover:ring-gray-300"
          />
          <span className={`text-lg font-medium text-gray-900 ${isSidebarCollapsed ? 'hidden' : 'block'}`}>天音</span>
          <button className={`ml-auto hover:bg-gray-100 p-1 rounded-full transition-colors ${isSidebarCollapsed ? 'hidden' : 'block'}`}>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
        </div>
      </div>
      
      {/* Navigation Menu */}
      <nav className="flex-1">
        <div className="p-2">
          {/* Home Button */}
          <button 
            onClick={() => setCurrentView('home')}
            className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'space-x-3'} p-4 text-gray-900 ${currentView === 'home' ? 'bg-gray-200' : 'hover:bg-gray-100'} rounded-2xl transition-all duration-300 mb-2`}
          >
            <Home size={20} className="text-gray-500 group-hover:text-black transition-colors duration-300" />
            <span className={`text-gray-700 group-hover:text-black transition-colors duration-300 ${isSidebarCollapsed ? 'hidden' : 'block'}`}>首页</span>
          </button>

          {/* AI Chat Button */}
          <div className="mb-2">
            <button
              onClick={() => setCurrentView('chat')}
              className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'space-x-3'} p-4 text-gray-900 ${currentView === 'chat' ? 'bg-gray-200' : 'hover:bg-gray-100'} rounded-2xl transition-all duration-300`}
            >
              <MessageCircle size={20} className="text-gray-500 group-hover:text-black transition-colors duration-300" />
              <span className={`text-gray-700 group-hover:text-black transition-colors duration-300 ${isSidebarCollapsed ? 'hidden' : 'block'}`}>AI对话</span>
              {!isSidebarCollapsed && <span className="ml-auto text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded-full font-medium">Beta</span>}
            </button>
            {!isSidebarCollapsed && (
              <div className="ml-4 mt-1 space-y-1">
                <button
                  onClick={() => setCurrentView('chat')}
                  className="w-full flex items-center space-x-3 px-4 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-300"
                >
                  <Plus size={18} />
                  <span>开启新对话</span>
                </button>
                <button
                  className="w-full flex items-center space-x-3 px-4 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-300"
                >
                  <History size={18} />
                  <span>历史对话</span>
                </button>
              </div>
            )}
          </div>

          {/* Writing Assistant Button */}
          <button 
            onClick={() => setCurrentView('writing')}
            className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'space-x-3'} p-4 text-gray-900 ${currentView === 'writing' ? 'bg-gray-200' : 'hover:bg-gray-100'} rounded-2xl transition-all duration-300 mb-2`}
          >
            <Pen size={20} className="text-gray-500 group-hover:text-black transition-colors duration-300" />
            <span className={`text-gray-700 group-hover:text-black transition-colors duration-300 ${isSidebarCollapsed ? 'hidden' : 'block'}`}>帮我写作</span>
          </button>
          <button 
            onClick={() => setCurrentView('yinyang')}
            className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'space-x-3'} p-4 text-gray-900 hover:bg-gray-100 rounded-2xl transition-all duration-300 mb-2`}
          >
            <motion.div
              animate={{
                rotate: currentView === 'yinyang' ? 360 : 0
              }}
              transition={{
                duration: 2,
                repeat: currentView === 'yinyang' ? Infinity : 0,
                ease: "linear"
              }}
            >
              <Icon 
                icon="mdi:yin-yang" 
                width="20" 
                height="20" 
                className={`text-gray-500 group-hover:text-black transition-colors duration-300 ${currentView === 'yinyang' ? 'text-black' : ''}`} 
              />
            </motion.div>
            <span className={`text-gray-700 group-hover:text-black transition-colors duration-300 ${isSidebarCollapsed ? 'hidden' : 'block'} ${currentView === 'yinyang' ? 'text-black' : ''}`}>AI命理</span>
          </button>
        </div>

        {/* Tool Buttons */}
        <div className="mt-2">
          {[
            { name: 'AI 搜索', icon: Search, inDevelopment: true },
            { name: '图像生成', icon: Image, inDevelopment: false },
            { name: 'AI 阅读', icon: MessageCircle, inDevelopment: true },
            { name: 'AI 翻译', icon: MessageCircle, inDevelopment: true },
            { name: '语音通话', icon: Mic, inDevelopment: true }
          ].map((item) => (
            <button 
              key={item.name}
              className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'space-x-3'} p-4 hover:bg-gray-50 rounded-2xl transition-all duration-300 group relative`}
              disabled={item.inDevelopment}
              onClick={() => {
                if (item.inDevelopment) return;
                if (item.name === '帮我写作') {
                  setCurrentView('writing');
                } else if (item.name === '图像生成') {
                  setCurrentView('image');
                } else {
                  setCurrentView('chat');
                }
              }}
            >
              <item.icon size={20} className="text-gray-500 group-hover:text-black transition-colors duration-300" />
              <span className={`${item.inDevelopment ? 'text-gray-400' : 'text-gray-700'} transition-colors duration-300 ${isSidebarCollapsed ? 'hidden' : 'block'}`}>{item.name}</span>
              {!isSidebarCollapsed && (
                item.inDevelopment && <span className="ml-auto text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">开发中</span>
              )}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className={`mt-auto p-4 text-xs text-gray-500 ${isSidebarCollapsed ? 'hidden' : 'block'}`}>
          <div className="flex items-center">
            <span>关于天音</span>
          </div>
        </div>
      </nav>
    </div>
  );
}