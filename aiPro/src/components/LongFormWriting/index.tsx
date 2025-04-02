import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ChevronRight, Sparkles, Book, Pen, Brain, MessageCircle, Search, Image as ImageIcon, Mic, Send, Paperclip, Zap, Lightbulb, Target, Layers, Settings, Code } from 'lucide-react';
import { DocumentPreview } from '../DocumentPreview';
import { LoadingPage } from '../LoadingPage';
import { generatePaper } from '../../lib/paperai';

interface LongFormWritingProps {
  onStartChat: (message: string) => void;
  onEnterPreview?: () => void;
  onExitPreview?: () => void;
}

export function LongFormWriting({ onStartChat, onEnterPreview, onExitPreview }: LongFormWritingProps) {
  const [inputValue, setInputValue] = React.useState('');
  const [titleValue, setTitleValue] = React.useState('');
  const [wordCount, setWordCount] = React.useState<number>(4000);
  const [outlineValue, setOutlineValue] = React.useState('');
  const [outlineMode, setOutlineMode] = React.useState<'ai' | 'manual' | null>(null);
  const [referenceMode, setReferenceMode] = React.useState<'ai' | 'manual' | null>(null);
  const [pageTitle, setPageTitle] = React.useState('论文写作');
  const [pageSubtitle, setPageSubtitle] = React.useState('AI 助手帮你分步完成专业学术论文');
  const [selectedLanguage, setSelectedLanguage] = React.useState<'cn' | 'en'>('cn');
  const [educationLevel, setEducationLevel] = React.useState<'undergraduate' | 'graduate' | 'vocational' | ''>('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [showLoadingPage, setShowLoadingPage] = React.useState(false);
  const [showDocumentPreview, setShowDocumentPreview] = React.useState(false);
  const [generatedContent, setGeneratedContent] = React.useState('');
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const topics = [
    {
      icon: FileText,
      title: '学术论文',
      description: '撰写专业的学术研究论文',
      examples: ['毕业论文', '期刊论文', '会议论文'],
      bgGradient: 'from-blue-500/10 to-blue-600/5',
      iconColor: 'text-blue-500'
    },
    {
      icon: Brain,
      title: '研究报告',
      description: '深度分析研究报告',
      examples: ['市场研究', '行业分析', '调研报告'],
      bgGradient: 'from-purple-500/10 to-purple-600/5',
      iconColor: 'text-purple-500'
    },
    {
      icon: MessageCircle,
      title: '商业文案',
      description: '专业的商业写作内容',
      examples: ['商业计划书', '项目提案', '营销策划'],
      bgGradient: 'from-emerald-500/10 to-emerald-600/5',
      iconColor: 'text-emerald-500'
    },
    {
      icon: Book,
      title: '内容创作',
      description: '创意内容和文章写作',
      examples: ['博客文章', '新闻稿件', '科普文章'],
      bgGradient: 'from-amber-500/10 to-amber-600/5',
      iconColor: 'text-amber-500'
    }
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    setIsLoading(true);
    // 模拟加载效果
    setTimeout(() => {
    onStartChat(inputValue);
    setInputValue('');
      setIsLoading(false);
    }, 1000);
  };

  if (showLoadingPage) {
    return <LoadingPage />;
  }
  
  if (showDocumentPreview) {
    return (
      <DocumentPreview
        title={titleValue}
        outline={outlineValue}
        content={generatedContent}
        onBack={() => {
          setShowDocumentPreview(false);
          onExitPreview?.();
        }}
      />
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-50 via-white to-gray-50 relative flex items-center justify-center">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] -top-20 -right-20 bg-gradient-to-br from-blue-100/20 to-purple-100/20 rounded-full blur-3xl"></div>
        <div className="absolute w-[300px] h-[300px] top-1/2 -left-20 bg-gradient-to-br from-amber-100/20 to-red-100/20 rounded-full blur-3xl"></div>
        
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
      <div className="w-full max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center space-x-4 mb-4">
            <motion.div
              className="relative"
              animate={{
                rotate: [0, -10, 0],
                y: [0, -4, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="absolute inset-0 bg-blue-500/20 rounded-lg blur-xl"></div>
              <Pen className="w-10 h-10 text-gray-900 relative z-10" />
            </motion.div>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900">
                {pageTitle}
              </h1>
              <p className="text-sm text-gray-500 mt-1">{pageSubtitle}</p>
            </div>
          </div>
        </div>

        {/* Step Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="space-y-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">描述你的写作需求</h2>
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <Settings className="w-4 h-4" />
                    <span>写作偏好</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <Layers className="w-4 h-4" />
                    <span>模板库</span>
                  </button>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex flex-col">
                  <input
                    type="text"
                    value={titleValue}
                    onChange={(e) => setTitleValue(e.target.value)}
                    placeholder="请输入清晰准确的标题，如：儿童心理健康与原生家庭环境关系研究（必填）"
                   className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 text-gray-900 placeholder:text-gray-400 text-base mb-4 transition-all hover:bg-gray-100/50"
                  />
                  <div className="mb-4">
                    <label className="block text-sm text-gray-500 mb-2">写作大纲</label>
                    <div className="flex items-center space-x-4">
                      <button 
                        onClick={() => setOutlineMode(outlineMode === 'ai' ? null : 'ai')}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          outlineMode === 'ai'
                            ? 'bg-gray-900 text-white'
                            : 'bg-white text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        AI智能
                      </button>
                      <button 
                        onClick={() => setOutlineMode(outlineMode === 'manual' ? null : 'manual')}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          outlineMode === 'manual'
                            ? 'bg-gray-900 text-white'
                            : 'bg-white text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        指定大纲
                      </button>
                    </div>
                    {outlineMode === 'manual' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4"
                      >
                        <div className="relative">
                          <textarea
                            value={outlineValue}
                            onChange={(e) => setOutlineValue(e.target.value)}
                            placeholder={'1. 绪论\n   1.1 研究背景\n   1.2 研究意义\n   1.3 研究方法\n2. 文献综述\n   2.1 国内研究现状\n   2.2 国外研究现状\n3. 正文\n4. 结论'}
                            className="w-full h-40 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 text-gray-900 placeholder:text-gray-400 text-base resize-none transition-all hover:bg-gray-100/50"
                          />
                          <div className="absolute right-2 bottom-2 flex items-center space-x-2">
                            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                              <Paperclip size={20} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                              <ImageIcon size={20} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm text-gray-500 mb-2">参考文献</label>
                    <div className="flex items-center space-x-4">
                      <button 
                        onClick={() => setReferenceMode(referenceMode === 'ai' ? null : 'ai')}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          referenceMode === 'ai'
                            ? 'bg-gray-900 text-white'
                            : 'bg-white text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        AI智能
                      </button>
                      <button 
                        onClick={() => setReferenceMode(referenceMode === 'manual' ? null : 'manual')}
                        className={`relative px-4 py-2 ${
                          referenceMode === 'manual'
                            ? 'bg-gray-900 text-white'
                            : 'bg-white text-gray-600 hover:bg-gray-100'
                        } rounded-lg transition-colors`}
                      >
                        手动上传
                      </button>
                    </div>
                    {referenceMode === 'manual' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4"
                      >
                        <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                          <div className="flex flex-col items-center">
                            <div className="w-12 h-12 mb-4 rounded-full bg-blue-50 flex items-center justify-center">
                              <ImageIcon className="w-6 h-6 text-blue-500" />
                            </div>
                            <p className="text-base font-medium text-gray-900 mb-1">点击上传文献原文</p>
                            <p className="text-sm text-gray-500 mb-4">为保证学习质量，暂不支持图片提取。首次视频等</p>
                            <p className="text-xs text-gray-400">单次最多可传30个文件，支持 .pdf,.PDF 格式</p>
                            <p className="text-xs text-gray-400 mt-1">支持拖拽文件到此处上传</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="可以输入论文创作辅助信息，帮助AI更好地理解你的创作需求，如：论文关键词、核心观点、最新数据等（选填）"
                    className="w-full h-32 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 text-gray-900 placeholder:text-gray-400 text-base resize-none relative z-10 transition-all hover:bg-gray-100/50"
                  />
                  <div className="mt-4 space-y-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Target className="w-3 h-3 mr-2" />
                      <span>明确写作目的和目标读者</span>
                    </div>
                    <div className="flex items-center">
                      <Lightbulb className="w-3 h-3 mr-2" />
                      <span>提供具体的写作要求和偏好</span>
                    </div>
                    <div className="flex items-center">
                      <Code className="w-3 h-3 mr-2" />
                      <span>说明需要包含的关键信息</span>
                    </div>
                  </div>
                  <div className="space-y-4 mt-4 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-gray-500">学历层次</span>
                        <div className="flex">
                          <button 
                            onClick={() => setEducationLevel('vocational')}
                            className={`px-4 py-1.5 rounded-l-lg transition-colors ${
                              educationLevel === 'vocational'
                                ? 'bg-gray-900 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            专科
                          </button>
                          <button 
                            onClick={() => setEducationLevel('undergraduate')}
                            className={`px-4 py-1.5 transition-colors ${
                              educationLevel === 'undergraduate'
                                ? 'bg-gray-900 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            本科
                          </button>
                          <button 
                            onClick={() => setEducationLevel('graduate')}
                            className={`px-4 py-1.5 rounded-r-lg transition-colors ${
                              educationLevel === 'graduate'
                                ? 'bg-gray-900 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            研究生
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-gray-500">写作语言</span>
                        <div className="flex">
                          <button 
                            onClick={() => setSelectedLanguage('cn')}
                            className={`px-4 py-1.5 rounded-l-lg transition-colors ${
                              selectedLanguage === 'cn'
                                ? 'bg-gray-900 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            中文
                          </button>
                          <button 
                            onClick={() => setSelectedLanguage('en')}
                            className={`px-4 py-1.5 rounded-r-lg transition-colors ${
                              selectedLanguage === 'en'
                                ? 'bg-gray-900 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            English
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-500">写作字数</span>
                      <div className="flex">
                        <button
                          onClick={() => setWordCount(4000)}
                          className={`px-4 py-1.5 rounded-l-lg transition-colors ${
                            wordCount === 4000
                              ? 'bg-gray-900 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          短（约 4000字）
                        </button>
                        <button
                          onClick={() => setWordCount(8000)}
                          className={`px-4 py-1.5 transition-colors ${
                            wordCount === 8000
                              ? 'bg-gray-900 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          中（约 8000字）
                        </button>
                        <button
                          onClick={() => setWordCount(20000)}
                          className={`px-4 py-1.5 rounded-r-lg transition-colors ${
                            wordCount === 20000
                              ? 'bg-gray-900 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          长（约 20000字）
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      {/* 左侧空间预留 */}
                    </div>
                    {(!titleValue.trim() || !educationLevel) && (
                      <p className="text-red-500 text-sm">
                        {!titleValue.trim() ? '请输入标题' : '请选择学历层次'}
                      </p>
                    )}
                    <motion.button
                      onClick={() => {
                        if (!titleValue.trim() || !educationLevel) return;
                        setIsGenerating(true);
                        setShowLoadingPage(true);
                        generatePaper({
                          title: titleValue,
                          outline: outlineValue,
                          educationLevel: educationLevel as 'vocational' | 'undergraduate' | 'graduate',
                          wordCount: wordCount,
                          language: selectedLanguage,
                          additionalInfo: inputValue
                        })
                          .then(({ content }) => {
                            setGeneratedContent(content);
                            setIsGenerating(false);
                            setShowLoadingPage(false);
                            onEnterPreview?.();
                            setShowDocumentPreview(true);
                          })
                          .catch(err => {
                            setError(err.message);
                            setIsGenerating(false);
                            setShowLoadingPage(false);
                          });
                      }}
                      disabled={!titleValue.trim() || !educationLevel || isGenerating}
                      className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                        titleValue.trim() && educationLevel && !isGenerating
                          ? 'bg-gray-900 text-white hover:shadow-lg hover:scale-105 active:scale-95'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50'
                      }`}
                    >
                      <span className={`inline-flex items-center ${isGenerating ? 'invisible' : ''}`}>
                        开始写作
                        <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </span>
                      {isGenerating && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
      </div>
    </div>
  );
}
