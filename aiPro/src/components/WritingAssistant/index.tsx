import React from 'react';
import { motion } from 'framer-motion';
import { Search, FileText, ArrowRight, Mic, Sparkles, Wand2, FileSignature, Brain, FileStack, CheckCircle, BookOpen, Pen, Zap, Star, Rocket, Lightbulb, Palette, Newspaper, MessageSquare, Mail, FileEdit, PenTool, Scroll, BookOpenCheck, FileQuestion, FileSearch, Sparkles as FileSparkles, ChevronRight } from 'lucide-react';

interface Props {
  onStartChat: (message: string) => void;
  setCurrentView: (view: 'home' | 'chat' | 'writing' | 'yinyang' | 'longform') => void;
}

export function WritingAssistant({ onStartChat, setCurrentView }: Props) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState('all');
  const [showAllCategories, setShowAllCategories] = React.useState(false);

  const categories = [
    { id: 'all', name: '全部' },
    { id: 'work', name: '工作', types: ['总结汇报', '研究报告', '论文'] },
    { id: 'business', name: '商业营销', types: ['宣传文案', '方案策划', '市场调研报告', '广告创意文案', '推广策略'] },
    { id: 'education', name: '学习/教育', types: ['作文', '论文', '读书笔记', '学习计划'] },
    { id: 'social', name: '社媒文章', types: ['小红书', '朋友圈', '微博', '公众号文章'] },
    { id: 'literature', name: '文学艺术', types: ['诗歌', '故事', '散文', '剧本'] },
    { id: 'reply', name: '回复和改写', types: ['邮件回复', '评论回复', '文章改写'] }
  ];

  const writingTypes = [
    {
      icon: FileText,
      bgColor: 'bg-gray-50',
      iconColor: 'text-blue-500',
      title: '文章',
      description: '撰写各主流平台文章',
      tag: '分步票'
    },
    {
      icon: FileText,
      bgColor: 'bg-gray-50',
      iconColor: 'text-rose-500',
      title: '宣传文案',
      description: '撰写各平台的推广文案',
      tag: '分步票'
    },
    {
      icon: FileText,
      bgColor: 'bg-gray-50',
      iconColor: 'text-emerald-500',
      title: '作文',
      description: '专为学生打造高分作文',
      tag: '分步票'
    },
    {
      icon: Mic,
      bgColor: 'bg-gray-50',
      iconColor: 'text-amber-500',
      title: '话术',
      description: '满足不同场景表达需求',
    },
    {
      icon: FileText,
      bgColor: 'bg-gray-50',
      iconColor: 'text-purple-500',
      title: '论文',
      description: '撰写专业详实的论文',
      tag: '分步票'
    },
    {
      icon: FileText,
      bgColor: 'bg-gray-50',
      iconColor: 'text-teal-500',
      title: '研究报告',
      description: '深度研究，精准分析',
      tag: '分步票'
    },
    {
      icon: FileText,
      bgColor: 'bg-gray-50',
      iconColor: 'text-indigo-500',
      title: '总结汇报',
      description: '超级好的工作效效',
    },
    {
      icon: FileText,
      bgColor: 'bg-gray-50',
      iconColor: 'text-pink-500',
      title: '诗歌',
      description: '创作动人心弦的诗篇',
    },
    {
      icon: FileText,
      bgColor: 'bg-gray-50',
      iconColor: 'text-red-500',
      title: '小红书',
      description: '打造吸睛的小红书内容',
    },
    {
      icon: FileText,
      bgColor: 'bg-gray-50',
      iconColor: 'text-green-500',
      title: '朋友圈',
      description: '精心设计的朋友圈文案',
    },
    {
      icon: FileText,
      bgColor: 'bg-gray-50',
      iconColor: 'text-orange-500',
      title: '微博',
      description: '撰写吸引眼球的微博',
    },
    {
      icon: FileText,
      bgColor: 'bg-gray-50',
      iconColor: 'text-cyan-500',
      title: '故事',
      description: '编织魅力动人的故事'
    },
    {
      icon: FileText,
      bgColor: 'bg-gray-50',
      iconColor: 'text-amber-500',
      title: '方案策划',
      description: '专业的商业方案策划',
      category: 'business'
    },
    {
      icon: FileText,
      bgColor: 'bg-gray-50',
      iconColor: 'text-blue-500',
      title: '市场调研报告',
      description: '深入的市场分析报告',
      category: 'business'
    },
    {
      icon: FileText,
      bgColor: 'bg-gray-50',
      iconColor: 'text-rose-500',
      title: '广告创意文案',
      description: '吸引眼球的广告文案',
      category: 'business'
    },
    {
      icon: FileText,
      bgColor: 'bg-gray-50',
      iconColor: 'text-emerald-500',
      title: '推广策略',
      description: '有效的推广方案',
      category: 'business'
    },
    {
      icon: FileText,
      bgColor: 'bg-gray-50',
      iconColor: 'text-violet-500',
      title: '读书笔记',
      description: '结构化的读书心得',
      category: 'education'
    },
    {
      icon: FileText,
      bgColor: 'bg-gray-50',
      iconColor: 'text-cyan-500',
      title: '学习计划',
      description: '科学的学习规划',
      category: 'education'
    },
    {
      icon: FileText,
      bgColor: 'bg-gray-50',
      iconColor: 'text-indigo-500',
      title: '公众号文章',
      description: '优质的公众号内容',
      category: 'social'
    },
    {
      icon: FileText,
      bgColor: 'bg-gray-50',
      iconColor: 'text-fuchsia-500',
      title: '散文',
      description: '优美的散文创作',
      category: 'literature'
    },
    {
      icon: FileText,
      bgColor: 'bg-gray-50',
      iconColor: 'text-orange-500',
      title: '剧本',
      description: '专业的剧本创作',
      category: 'literature'
    },
    {
      icon: FileText,
      bgColor: 'bg-gray-50',
      iconColor: 'text-sky-500',
      title: '邮件回复',
      description: '得体的邮件回复',
      category: 'reply'
    },
    {
      icon: FileText,
      bgColor: 'bg-gray-50',
      iconColor: 'text-teal-500',
      title: '评论回复',
      description: '合适的评论回复',
      category: 'reply'
    },
    {
      icon: FileText,
      bgColor: 'bg-gray-50',
      iconColor: 'text-purple-500',
      title: '文章改写',
      description: '灵活的文章改写',
      category: 'reply'
    }
  ];

  const filteredTypes = writingTypes.filter(type => {
    const matchesSearch = !searchTerm || 
      type.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      type.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || 
      type.category === activeCategory ||
      categories.find(cat => cat.id === activeCategory)?.types?.includes(type.title);
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex-1 overflow-y-auto bg-white px-3 relative">
      {/* Background Decoration */}

      <div className="max-w-4xl mx-auto pt-12 pb-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <motion.div
              animate={{
                rotate: [0, -20, 0],
                y: [0, -2, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Pen className="w-8 h-8 text-gray-900" strokeWidth={2} />
            </motion.div>
            <div className="flex items-center space-x-1">
              {['帮', '我', '写', '作'].map((char, index) => (
                <motion.span
                  key={index}
                  className="text-2xl font-bold text-gray-900 inline-block"
                  animate={{
                    y: [0, -6, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.2
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </div>
          <p className="text-gray-600 text-lg font-medium">多种体裁，润色校对，一键成文</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { 
              icon: FileSignature, 
              title: '论文写作', 
              desc: '分步完成专业学术论文',
              bgColor: 'bg-gray-50',
              iconColor: 'text-blue-500',
              borderColor: 'border-blue-100'
            },
            { 
              icon: Wand2, 
              title: '全文润色', 
              desc: '一键润色，提升质量',
              bgColor: 'bg-gray-50',
              iconColor: 'text-purple-500',
              borderColor: 'border-purple-100'
            },
            { 
              icon: Brain, 
              title: '全文扩写', 
              desc: '丰富内容，扩展思路',
              bgColor: 'bg-gray-50',
              iconColor: 'text-emerald-500',
              borderColor: 'border-emerald-100'
            },
            { 
              icon: Sparkles, 
              title: 'AI 润稿', 
              desc: '移除 AI 痕迹，表达更自然',
              bgColor: 'bg-gray-50',
              iconColor: 'text-amber-500',
              borderColor: 'border-amber-100'
            }
          ].map((item, index) => (
            <div 
              key={index} 
              className={`group bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer hover:scale-[1.02] active:scale-[0.98] border ${item.borderColor}`}
              onClick={() => {
                if (item.title === '论文写作') {
                  setCurrentView('longform');
                } else {
                  onStartChat(`使用${item.title}功能`);
                }
              }}
            >
              <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${item.bgColor} transition-all duration-300 group-hover:scale-110`}>
                <item.icon className={`w-6 h-6 ${item.iconColor}`} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Secondary Actions */}
        <div className="grid grid-cols-3 gap-4 mb-6">
         {[
            { 
              icon: FileStack, 
              title: '文档合并', 
              desc: '整合多个文档', 
              tag: '敬请期待',
              bgColor: 'bg-gray-50',
              iconColor: 'text-violet-500',
              borderColor: 'border-violet-100',
              hoverBg: 'hover:bg-gray-100'
            },
            { 
              icon: CheckCircle, 
              title: '全文校正', 
              desc: '检查文本错误', 
              tag: '敬请期待',
              bgColor: 'bg-gray-50',
              iconColor: 'text-emerald-500',
              borderColor: 'border-emerald-100',
              hoverBg: 'hover:bg-gray-100'
            },
            { 
              icon: BookOpen, 
              title: '生成参考', 
              desc: '提供文献参考', 
              tag: '敬请期待',
              bgColor: 'bg-gray-50',
              iconColor: 'text-blue-500',
              borderColor: 'border-blue-100',
              hoverBg: 'hover:bg-gray-100'
            }
          ].map((item, index) => (
            <div 
              key={index} 
              className={`${item.bgColor} ${item.hoverBg} rounded-xl p-3 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer hover:scale-[1.02] group border ${item.borderColor}`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/80">
                  <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                </div>
                <div className="flex-1">
                  <h3 className={`text-sm font-medium text-gray-900 group-hover:${item.iconColor} transition-colors`}>{item.title}</h3>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
                <span className="text-xs text-gray-500 bg-white/80 px-2 py-0.5 rounded-full whitespace-nowrap border border-gray-100">
                  {item.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Categories */}
        <div className="relative mb-3">
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 mask-fade-right">
            {categories.slice(0, showAllCategories ? categories.length : 6).map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all duration-300 ${
                category.id === activeCategory
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              {category.name}
            </button>
            ))}
            {!showAllCategories && categories.length > 6 && (
              <button
                onClick={() => setShowAllCategories(true)}
                className="px-3 py-1.5 rounded-full text-sm text-gray-500 hover:bg-gray-50 transition-all duration-300 whitespace-nowrap flex items-center"
              >
                <span>更多</span>
                <ChevronRight size={16} className="ml-1" />
              </button>
            )}
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="输入你要撰写的主题"
            className="w-full bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl px-6 py-4 pl-12 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all shadow-sm hover:shadow-md"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Mic className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600" size={20} />
        </div>

        {/* Writing Types Grid */}
        <div className="grid grid-cols-4 gap-4">
          {filteredTypes.map((type, index) => (
            <button
              key={index}
              onClick={() => onStartChat(`帮我写一篇${type.title}`)}
              className={`${type.bgColor || 'bg-white'} p-4 rounded-xl text-left hover:shadow-md transition-all duration-300 group hover:scale-[1.02] active:scale-[0.98] border border-gray-100 hover:border-opacity-50 backdrop-blur-sm relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/60">
                  <type.icon size={18} className={`${type.iconColor || 'text-gray-400'} transition-colors`} />
                </div>
                <ArrowRight size={14} className="text-gray-400 group-hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className={`text-base font-medium text-gray-900 mb-2 group-hover:${type.iconColor} transition-colors`}>{type.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">{type.description}</p>
              {type.tag && type.tag !== '分步票' && (
                <span className="inline-block text-xs text-gray-500 bg-white/60 px-2 py-1 rounded-full mt-2 border border-gray-100">
                  {type.tag}
                </span>
              )}
            </button>
          ))}
        </div>
        
        {/* Empty State */}
        {filteredTypes.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Search size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">未找到相关写作类型</h3>
            <p className="text-gray-500">试试其他关键词，或者选择其他分类</p>
          </div>
        )}
      </div>
    </div>
  );
}
