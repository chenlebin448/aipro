import React from 'react';
import { X, Sparkles, Book, Heart } from 'lucide-react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [phoneNumber, setPhoneNumber] = React.useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-black/40 flex items-center justify-center z-50 p-4">
      {/* 背景装饰 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* 动态线条 */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
            style={{
              top: `${20 + i * 15}%`,
              left: 0,
              right: 0,
              transform: `rotate(${-5 + i * 2}deg)`
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              translateX: ['-100%', '100%']
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
        
        {/* 光晕效果 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="w-[800px] h-[800px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, rgba(59,130,246,0) 70%)'
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="bg-white/90 backdrop-blur-md w-full max-w-4xl rounded-3xl overflow-hidden relative shadow-2xl border border-white/20 flex"
      >
        {/* 玻璃态效果 */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-white/30 to-white/50 pointer-events-none"></div>
        
        {/* 左侧欢迎区域 */}
        <div className="w-[45%] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-12 relative overflow-hidden">
          <div className="absolute inset-0">
            {/* 科技网格背景 */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(50,50,50,0.2)_1px,transparent_1px)] bg-[length:20px_20px] opacity-20"></div>
            
            {/* 动态光效 */}
            <motion.div
              className="absolute w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-[100px] -top-[200px] -right-[200px] mix-blend-soft-light"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.4, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[100px] -bottom-[200px] -left-[200px] mix-blend-soft-light"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.3, 0.4, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-16"
            >
              <div className="relative mb-10 group">
                <div className="relative flex items-center justify-center">
                  {/* 简约天音 Logo */}
                  <motion.div
                    className="relative"
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {/* 光晕背景 */}
                    <div className="absolute inset-0 bg-white/10 blur-[100px] rounded-full"></div>
                    
                    {/* Logo 容器 */}
                    <div className="relative px-12 py-8 overflow-hidden flex items-center justify-center">
                      {/* 天音文字 */}
                      <div className="relative flex items-center">
                        {/* 光效装饰 */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-white/5 to-purple-500/10 blur-xl opacity-80"></div>
                        
                        {/* 艺术字 */}
                        <div className="relative flex items-center space-x-2">
                        <motion.span
                          className="text-6xl font-bold text-white inline-block"
                          style={{
                            fontFamily: '"Noto Serif SC", serif',
                            textShadow: '0 0 20px rgba(255,255,255,0.3)'
                          }}
                          animate={{
                            y: [0, -10, 0]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          天
                        </motion.span>
                        <motion.span
                          className="text-6xl font-bold text-white/90 inline-block"
                          style={{
                            fontFamily: '"Noto Serif SC", serif',
                            textShadow: '0 0 20px rgba(255,255,255,0.3)'
                          }}
                          animate={{
                            y: [0, -10, 0]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.2
                          }}
                        >
                          音
                        </motion.span>
                        </div>
                        {/* 底部装饰线 */}
                        <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
              <h3 className="text-4xl font-bold text-white mb-4">欢迎回来</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                登录后即可体验完整的AI助手功能，让我们一起探索无限可能。
              </p>
            </motion.div>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-500/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/10">
                  <Sparkles className="w-5 h-5 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-medium mb-1">智能对话</h4>
                  <p className="text-gray-300 text-sm">自然流畅的对话体验</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-purple-500/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/10">
                  <Book className="w-5 h-5 text-purple-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-medium mb-1">智能创作</h4>
                  <p className="text-gray-300 text-sm">轻松生成高质量文章</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-rose-500/20 to-rose-500/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/10">
                  <Heart className="w-5 h-5 text-rose-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-medium mb-1">个性化服务</h4>
                  <p className="text-gray-300 text-sm">为您提供专属建议</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧登录区域 */}
        <div className="flex-1 p-12 relative">
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 p-2 hover:bg-black/5 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold text-gray-900 mb-3"
          >
            登录天音
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 mb-12 text-lg"
          >
            登录后免费使用完整功能
          </motion.p>

          {/* Phone Input */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <div className="flex items-center border-2 border-gray-200 rounded-2xl px-4 py-3 focus-within:border-gray-900 transition-colors bg-white/80">
              <span className="text-gray-500 text-sm mr-2">+86</span>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="请输入手机号"
                className="flex-1 outline-none text-gray-900 placeholder:text-gray-400 bg-transparent text-lg font-medium"
              />
            </div>
          </motion.div>

          {/* Next Button */}
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full bg-gray-900 text-white py-4 rounded-2xl hover:bg-gray-800 transition-all duration-300 mb-8 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] text-lg font-medium relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            下一步
          </motion.button>

          {/* Terms */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-start mb-12"
          >
            <input type="checkbox" className="mt-1" />
            <p className="text-xs text-gray-500 ml-2">
              已阅读并同意天音的 <a href="#" className="text-gray-900">使用协议</a> 和 <a href="#" className="text-gray-900">隐私政策</a>。
            </p>
          </motion.div>

          {/* Social Login */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center relative"
          >
            <div className="absolute left-0 right-0 top-1/2 h-px bg-gray-100"></div>
            <p className="text-sm text-gray-500 mb-6">快捷登录</p>
            <div className="flex items-center justify-center space-x-6">
              <button type="button" className="p-3 rounded-full hover:bg-gray-50 transition-all hover:scale-110 active:scale-95">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#07C160] opacity-0 group-hover:opacity-20 transition-opacity rounded-full blur-xl"></div>
                  <Icon icon="ri:wechat-fill" className="w-6 h-6 text-[#07C160]" />
                </div>
              </button>
              <button type="button" className="p-3 rounded-full hover:bg-gray-50 transition-all hover:scale-110 active:scale-95">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#12B7F5] opacity-0 group-hover:opacity-20 transition-opacity rounded-full blur-xl"></div>
                  <Icon icon="ri:qq-fill" className="w-6 h-6 text-[#12B7F5]" />
                </div>
              </button>
              <button type="button" className="p-3 rounded-full hover:bg-gray-50 transition-all hover:scale-110 active:scale-95">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#E6162D] opacity-0 group-hover:opacity-20 transition-opacity rounded-full blur-xl"></div>
                  <Icon icon="ri:weibo-fill" className="w-6 h-6 text-[#E6162D]" />
                </div>
              </button>
              <button type="button" className="p-3 rounded-full hover:bg-gray-50 transition-all hover:scale-110 active:scale-95 relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF004F] to-[#00F2EA] opacity-0 group-hover:opacity-20 transition-opacity rounded-full blur-xl"></div>
                <Icon icon="ri:tiktok-fill" className="w-6 h-6 relative z-10" />
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}