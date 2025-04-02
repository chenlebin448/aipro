import React from 'react';
import { motion } from 'framer-motion';

interface ThinkingAnimationProps {
  status: 'thinking' | 'answering' | 'completed';
}

export function ThinkingAnimation({ status }: ThinkingAnimationProps) {
  const getStatusText = () => {
    switch (status) {
      case 'thinking':
        return ['正', '在', '思', '考'];
      case 'answering':
        return ['正', '在', '回', '答'];
      case 'completed':
        return ['回', '答', '完', '毕'];
      default:
        return ['正', '在', '思', '考'];
    }
  };

  return (
    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl">
      {/* 思考文字 */}
      <div className="flex items-center space-x-1">
        {getStatusText().map((char, index) => (
          <motion.span
            key={index}
            className="text-gray-600"
            animate={{
              y: [0, -5, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut"
            }}
          >
            {char}
          </motion.span>
        ))}
        <motion.div 
          className="flex space-x-1"
          animate={{
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {[...Array(3)].map((_, i) => (
            <span key={i} className="text-gray-600">·</span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}