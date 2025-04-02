import React from 'react';
import { motion } from 'framer-motion';
import { Search, Image as ImageIcon, Sparkles, Download, Share2, Palette, Wand2, Settings, Sliders, RefreshCw, Mic, Camera, Upload, Plus, Trash2, Video, Music } from 'lucide-react';

export function ImageGeneration() {
  const [prompt, setPrompt] = React.useState('');
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<'all' | 'short' | 'national' | 'marine' | 'animation' | 'future' | 'cartoon' | 'sketch' | 'portrait' | 'product' | '3d' | 'logo'>('all');
  const [selectedStyle, setSelectedStyle] = React.useState<string | null>(null);
  const [activeCreationType, setActiveCreationType] = React.useState<'image' | 'video' | 'music'>('image');

  const tabs = [
    { id: 'all', name: '发现' },
    { id: 'short', name: '短片' },
    { id: 'national', name: '国风美学' },
    { id: 'marine', name: '海报设计' },
    { id: 'animation', name: '动漫游戏' },
    { id: 'future', name: '未来科幻' },
    { id: 'cartoon', name: '动物萌宠' },
    { id: 'sketch', name: '绘本插画' },
    { id: 'portrait', name: '写实人像' },
    { id: 'product', name: '产品设计' },
    { id: '3d', name: '3D 艺术' },
    { id: 'logo', name: 'Logo 设计' }
  ];

  const recentImages = [
    {
      id: 1,
      title: '想象力挑战第35期·万物皆可冰晶',
      image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=800&h=400&q=80',
      participants: 30223,
      type: 'challenge'
    },
    {
      id: 2,
      title: '星系漩涡',
      image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=600&h=600&q=80',
      author: 'JetChan',
      likes: 2093,
      views: 8098
    },
    {
      id: 3,
      title: '优雅女士',
      image: 'https://images.unsplash.com/photo-1527416876370-fb74d128c3dc?auto=format&fit=crop&w=600&h=600&q=80',
      author: 'DCH',
      likes: 1787,
      views: 2211
    },
    {
      id: 4,
      title: '可爱植物',
      image: 'https://images.unsplash.com/photo-1615796153287-98eacf0abb13?auto=format&fit=crop&w=300&h=300&q=80',
      author: 'viola',
      likes: 815
    },
    {
      id: 5,
      title: '冬日少女',
      image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=600&h=600&q=80',
      author: 'Cora',
      likes: 1611
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-white">
      {/* 背景装饰 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[800px] h-[800px] -top-[400px] -right-[400px] bg-gradient-to-br from-purple-100/20 to-blue-100/20 rounded-full blur-3xl"></div>
        <div className="absolute w-[600px] h-[600px] -bottom-[300px] -left-[300px] bg-gradient-to-br from-amber-100/20 to-rose-100/20 rounded-full blur-3xl"></div>
        
        {/* 科技感线条 */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-gray-300/20 to-transparent"
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
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        ))}
      </div>

      <div className="w-full mx-auto px-6 py-8 relative">
        {/* Creation Type Buttons */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-[#1C1C28] rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent"></div>
            <h3 className="text-[#A2A5B9] mb-1">AI 作图</h3>
            <p className="text-[#6B6D7C] text-sm mb-4">轻松实现创意图片</p>
            <div className="grid grid-cols-2 gap-2">
              <button className="bg-[#2A2A38] text-[#A2A5B9] py-2 rounded-lg hover:bg-[#2A2A38]/80 transition-colors text-sm">
                图片生成
              </button>
              <button className="bg-[#2A2A38] text-[#A2A5B9] py-2 rounded-lg hover:bg-[#2A2A38]/80 transition-colors text-sm">
                智能画布
              </button>
            </div>
          </div>
          
          <div className="bg-[#1C1C28] rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent"></div>
            <h3 className="text-[#A2A5B9] mb-1">AI 视频</h3>
            <p className="text-[#6B6D7C] text-sm mb-4">让你的创意动起来</p>
            <div className="grid grid-cols-2 gap-2">
              <button className="bg-[#2A2A38] text-[#A2A5B9] py-2 rounded-lg hover:bg-[#2A2A38]/80 transition-colors text-sm">
                视频生成
              </button>
              <button className="bg-[#2A2A38] text-[#A2A5B9] py-2 rounded-lg hover:bg-[#2A2A38]/80 transition-colors text-sm">
                故事创作
              </button>
            </div>
          </div>
          
          <div className="bg-[#1C1C28] rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent"></div>
            <h3 className="text-[#A2A5B9] mb-1">AI 音乐</h3>
            <p className="text-[#6B6D7C] text-sm mb-4">音乐梦想不再遥远</p>
            <div className="grid grid-cols-1 gap-2">
              <button className="bg-[#2A2A38] text-[#A2A5B9] py-2 rounded-lg hover:bg-[#2A2A38]/80 transition-colors text-sm">
                音乐生成
              </button>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">
                {activeCreationType === 'image' && 'AI 作图'}
                {activeCreationType === 'video' && 'AI 视频'}
                {activeCreationType === 'music' && 'AI 音乐'}
              </h1>
              <p className="text-gray-500">
                {activeCreationType === 'image' && '轻松实现创意图片'}
                {activeCreationType === 'video' && '让你的创意动起来'}
                {activeCreationType === 'music' && '音乐梦想不再遥远'}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {activeCreationType === 'image' && (
                <>
                  <button className="px-6 py-2 bg-gray-900 text-white hover:bg-gray-800 rounded-lg transition-colors">
                    图片生成
                  </button>
                  <button className="px-6 py-2 bg-gray-100 text-gray-900 hover:bg-gray-200 rounded-lg transition-colors">
                    智能画布
                  </button>
                </>
              )}
              {activeCreationType === 'video' && (
                <>
                  <button className="px-6 py-2 bg-gray-900 text-white hover:bg-gray-800 rounded-lg transition-colors">
                    视频生成
                  </button>
                  <button className="px-6 py-2 bg-gray-100 text-gray-900 hover:bg-gray-200 rounded-lg transition-colors">
                    故事创作
                  </button>
                </>
              )}
              {activeCreationType === 'music' && (
                <button className="px-6 py-2 bg-gray-900 text-white hover:bg-gray-800 rounded-lg transition-colors">
                  音乐生成
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center space-x-4 mb-8 overflow-x-auto pb-2 mask-fade-right">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-12 gap-4">
          {/* Challenge Card */}
          <div className="col-span-6 relative group">
            <div className="aspect-[2/1] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <img
                src={recentImages[0].image}
                alt={recentImages[0].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-medium text-white mb-2">{recentImages[0].title}</h3>
                  <p className="text-sm text-gray-300">已有 {recentImages[0].participants} 人参与</p>
                </div>
              </div>
            </div>
          </div>

          {/* Regular Cards */}
          {recentImages.slice(1).map((image, index) => (
            <div key={image.id} className="col-span-3 group">
              <div className="aspect-square rounded-xl overflow-hidden bg-white relative shadow-lg hover:shadow-xl transition-all duration-300">
                <img
                  src={image.image}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white">{image.author}</span>
                      <div className="flex items-center space-x-2">
                        {image.likes && (
                          <span className="text-gray-300">♥ {image.likes}</span>
                        )}
                        {image.views && (
                          <span className="text-gray-300">👁 {image.views}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}