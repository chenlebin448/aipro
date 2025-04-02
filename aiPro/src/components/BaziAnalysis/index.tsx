import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { Heart } from 'lucide-react';
import { BaziChat } from '../BaziChat/index';

interface BaziAnalysisProps {
  birthData: {
    gender: string;
    solarDate: string;
    lunarDate: string;
    time: string;
    place: string;
  };
  onBack: () => void;
}

export function BaziAnalysis({ birthData, onBack }: BaziAnalysisProps) {
  const baziData = {
    yearPillar: { heavenly: '戊', earthly: '寅', hidden: ['甲', '丙', '戊'], element: '木' },
    monthPillar: { heavenly: '辛', earthly: '酉', hidden: ['辛', '己'], element: '金' },
    dayPillar: { heavenly: '庚', earthly: '寅', hidden: ['甲', '丙', '戊'], element: '木' },
    hourPillar: { heavenly: '癸', earthly: '巳', hidden: ['丙', '庚', '戊'], element: '火' },
  };

  const elements = {
    nayin: ['城头土', '石榴木', '白蜡金', '杨柳木'],
    stars: ['绝', '帝旺', '衰', '冠带'],
    gods: ['长生', '临官', '养', '墓'],
    palaces: ['中西', '子丑', '中西', '中西'],
    spirits: ['驿马', '桃花', '月德贵人', '金舆'],
  };

  return (
    <div className="h-screen bg-white text-gray-900 relative flex overflow-hidden p-4">
      {/* Background Patterns */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* 八卦图案 */}
        <div className="absolute inset-0 opacity-[0.02]">
          {[...Array(64)].map((_, i) => {
            const size = Math.random() * 100 + 50;
            return (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  width: size,
                  height: size,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='48' fill='none' stroke='black' stroke-width='1'/%3E%3Cpath d='M50 2 A48 48 0 0 1 50 98 A24 24 0 0 1 50 50 A24 24 0 0 0 50 2z' fill='black'/%3E%3Ccircle cx='50' cy='26' r='8' fill='white'/%3E%3Ccircle cx='50' cy='74' r='8' fill='black'/%3E%3C/svg%3E")`,
                  backgroundSize: 'contain',
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 20 + Math.random() * 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            );
          })}
        </div>

        {/* 五行文字 */}
        {['金', '木', '水', '火', '土'].map((char, i) => {
          const angle = (i * Math.PI * 2) / 5;
          const radius = 300;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          return (
            <motion.div
              key={char}
              className="absolute text-8xl font-bold text-gray-100"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)',
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.8,
              }}
            >
              {char}
            </motion.div>
          );
        })}

        {/* 装饰线条 */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"
              style={{
                top: `${(i + 1) * 12.5}%`,
                transform: `rotate(${i * 22.5}deg)`,
              }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.4,
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Left Panel - BaZi Analysis */}
      <div className="w-[40%] h-[calc(100vh-2rem)] overflow-y-auto scrollbar-hide border-r border-gray-100 rounded-l-2xl bg-white">

        {/* Content */}
        <div className="px-6 py-6">
        {/* Basic Info */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-full bg-amber-100/50 flex items-center justify-center">
              <Icon icon="mdi:account" className="w-6 h-6 text-amber-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-medium mb-1">八字命盘分析</h2>
              <div className="text-sm text-gray-500 space-y-1">
                <div>性别：{birthData.gender}</div>
                <div>公历：{birthData.solarDate}</div>
                <div>农历：{birthData.lunarDate}</div>
                <div>时辰：{birthData.time}</div>
                <div>地点：{birthData.place}</div>
              </div>
            </div>
          </div>
        </div>

        {/* BaZi Chart */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="mb-4">
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="text-center font-medium">年柱</div>
              <div className="text-center font-medium">月柱</div>
              <div className="text-center font-medium">日柱</div>
              <div className="text-center font-medium">时柱</div>
            </div>
            
            {/* Heavenly Stems */}
            <div className="grid grid-cols-4 gap-4 mb-4">
              {Object.values(baziData).map((pillar, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3 text-center relative group hover:bg-gray-100 transition-all duration-300">
                  <div className="text-3xl font-bold text-gray-900">{pillar.heavenly}</div>
                  <div className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    {pillar.element}
                  </div>
                </div>
              ))}
            </div>

            {/* Earthly Branches */}
            <div className="grid grid-cols-4 gap-4 mb-4">
              {Object.values(baziData).map((pillar, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3 text-center relative group hover:bg-gray-100 transition-all duration-300">
                  <div className="text-3xl font-bold text-gray-900">{pillar.earthly}</div>
                  <div className="mt-2 text-sm text-gray-600">
                    {pillar.hidden.map((h, i) => (
                      <span key={i} className="mx-1">{h}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          {Object.entries(elements).map(([key, values], index) => (
            <div key={key} className="mb-4 last:mb-0">
              <div className="grid grid-cols-4 gap-4">
                <div className="text-gray-900 font-medium text-sm">{key}</div>
                {values.map((value, i) => (
                  <div key={i} className="text-center text-sm bg-gray-50 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                    {value}
                  </div>
                ))}
              </div>
              {index !== Object.entries(elements).length - 1 && (
                <div className="my-4 border-b border-gray-100"></div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { text: '我今年有投资的机会吗？', icon: 'mdi:chart-line' },
            { text: '我适合做什么水晶', icon: 'mdi:diamond' },
            { text: '我适合读什么大学？', icon: 'mdi:school' },
          ].map((item, index) => (
            <button
              key={index}
              className="flex items-center justify-center space-x-2 py-3 px-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 hover:bg-gray-50 transition-all duration-300 text-sm shadow-sm hover:shadow-md"
            >
              <Icon icon={item.icon} className="w-4 h-4" />
              <span>{item.text}</span>
            </button>
          ))}
        </div>

        {/* Subscription */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
          </div>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="w-5 h-5 text-yellow-400" />
            <span className="text-gray-200">你还有 1 条额度（每日免费3条）</span>
          </div>
          <button className="bg-white text-gray-900 px-6 py-2 rounded-full hover:bg-gray-100 transition-colors relative z-10">
            解锁更多分析额度
          </button>
        </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-[60%] h-[calc(100vh-2rem)] rounded-r-2xl bg-white overflow-hidden">
        <BaziChat birthData={birthData} />
      </div>
    </div>
  );
}