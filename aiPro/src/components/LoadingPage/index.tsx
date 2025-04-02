import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap } from 'lucide-react';

export function LoadingPage() {
  return (
    <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* 背景装饰 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* 科技网格背景 */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
        
        {/* 动态光效 */}
        <motion.div
          className="absolute w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] -top-[400px] -right-[400px]"
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
          className="absolute w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[100px] -bottom-[300px] -left-[300px]"
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

        {/* 科技感线条 */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-gray-300/30 to-transparent"
            style={{
              top: `${20 + i * 20}%`,
              left: 0,
              right: 0,
              transform: `rotate(${-5 + i * 2}deg)`
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              translateX: ['-100%', '100%']
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        ))}
      </div>

      <div className="relative">
        {/* 中心图标 */}
        <div className="flex flex-col items-center relative">
          {/* 闪电图标 */}
          <motion.div
            className="mb-8 relative group"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {/* 光晕效果 */}
            <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-400/20 transition-colors"></div>
            
            {/* 图标容器 */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              <motion.div
                className="absolute inset-0 border-2 border-blue-400/30 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <Zap className="w-8 h-8 text-blue-500 relative z-10" />
              
              {/* 装饰性闪光 */}
              <motion.div
                className="absolute top-0 right-0"
                animate={{
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Sparkles className="w-4 h-4 text-blue-400" />
              </motion.div>
            </div>
          </motion.div>

          {/* 跳动文字 */}
          <div className="flex items-center space-x-1">
            {['正', '在', '创', '造'].map((char, index) => (
              <motion.span
                key={index}
                className="text-2xl font-medium text-gray-900"
                animate={{
                  y: [0, -10, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.1
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* 提示文字 */}
          <motion.p
            className="mt-4 text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            请耐心等待
          </motion.p>

          {/* 加载动画 */}
          <div className="mt-8 flex space-x-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-blue-500"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}