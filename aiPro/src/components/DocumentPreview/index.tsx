import React from 'react';
import { motion } from 'framer-motion';
import { 
  Save, Download, Share2, Settings, History, Users, 
  ChevronDown, Edit3, Sparkles, MessageCircle, Search,
  BookOpen, FileText, ArrowLeft, MoreHorizontal, Plus,
  Heading1, ListOrdered, Quote, Code, Image as ImageIcon,
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight,
  Link, Undo, Redo, Send
} from 'lucide-react';

export interface DocumentPreviewProps {
  title: string;
  outline: string;
  content: string;
  onBack: () => void;
}

export function DocumentPreview({ title, outline, content, onBack }: DocumentPreviewProps) {
  const [wordCount, setWordCount] = React.useState(0);
  const [selectedSection, setSelectedSection] = React.useState<number | null>(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [showOutline, setShowOutline] = React.useState(true);
  const [displayedContent, setDisplayedContent] = React.useState('');
  const [saveStatus, setSaveStatus] = React.useState<'saved' | 'saving' | 'unsaved'>('saved');
  const typingSpeed = 50; // 打字速度（毫秒/字）

  // 处理打字机效果
  React.useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex >= content.length) {
        clearInterval(typingInterval);
        return;
      }
      
      setDisplayedContent(prev => prev + content[currentIndex]);
      currentIndex++;
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [content]);

  // 模拟自动保存
  React.useEffect(() => {
    if (displayedContent !== content) {
      setSaveStatus('saving');
      const timer = setTimeout(() => {
        setSaveStatus('saved');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [displayedContent, content]);

  // 计算字数
  React.useEffect(() => {
    setWordCount(displayedContent.length);
  }, [displayedContent]);

  const sections = [
    { id: 1, title: '绪论', subsections: ['研究背景', '研究意义', '研究方法'] },
    { id: 2, title: '文献综述', subsections: ['国内研究现状', '国外研究现状'] },
    { id: 3, title: '研究内容', subsections: ['理论基础', '研究框架', '研究假设'] },
    { id: 4, title: '研究方法', subsections: ['数据来源', '研究设计', '分析方法'] },
    { id: 5, title: '研究结果', subsections: ['数据分析', '结果讨论'] },
    { id: 6, title: '结论与展望', subsections: ['研究结论', '研究局限', '未来展望'] }
  ];

  return (
    <div className="flex h-screen bg-white">
      {/* 左侧大纲面板 */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className={`w-80 border-r border-gray-100 flex-shrink-0 ${showOutline ? 'block' : 'hidden'}`}
      >
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">文档大纲</h2>
            <button 
              onClick={() => setShowOutline(false)}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={16} />
            </button>
          </div>
          <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
            <Plus size={16} />
            <span>添加章节</span>
          </button>
        </div>
        <div className="p-4 space-y-4">
          {sections.map((section) => (
            <div key={section.id} className="space-y-2">
              <button
                onClick={() => setSelectedSection(section.id)}
                className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                  selectedSection === section.id
                    ? 'bg-gray-100'
                    : 'hover:bg-gray-50'
                }`}
              >
                <span className="text-sm font-medium">{section.title}</span>
                <ChevronDown size={16} className="text-gray-400" />
              </button>
              {selectedSection === section.id && (
                <div className="ml-4 space-y-1">
                  {section.subsections.map((subsection, index) => (
                    <button
                      key={index}
                      className="w-full text-left p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      {subsection}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* 主要内容区域 */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* 顶部工具栏 */}
        <div className="border-b border-gray-100 bg-white mt-6">
          <div className="h-14 px-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {!showOutline && (
                <button 
                  onClick={() => setShowOutline(true)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FileText size={20} />
                </button>
              )}
              <h1 className="text-lg font-medium truncate">{title}</h1>
              <span className="text-sm text-gray-500">{wordCount} 字</span>
              <span className="text-sm text-gray-500">
                {saveStatus === 'saved' && '已保存'}
                {saveStatus === 'saving' && '保存中...'}
                {saveStatus === 'unsaved' && '未保存'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <History size={20} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Users size={20} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Share2 size={20} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Download size={20} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings size={20} />
              </button>
            </div>
          </div>
          
          {/* 编辑工具栏 */}
          <div className="h-12 px-4 border-t border-gray-100 flex items-center space-x-1">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Heading1 size={18} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ListOrdered size={18} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Quote size={18} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Code size={18} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ImageIcon size={18} />
            </button>
            <div className="h-6 w-px bg-gray-200 mx-2" />
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Bold size={18} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Italic size={18} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Underline size={18} />
            </button>
            <div className="h-6 w-px bg-gray-200 mx-2" />
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <AlignLeft size={18} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <AlignCenter size={18} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <AlignRight size={18} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Link size={18} />
            </button>
            <div className="h-6 w-px bg-gray-200 mx-2" />
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Undo size={18} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Redo size={18} />
            </button>
          </div>
        </div>

        {/* 文档内容区域 */}
        <div className="flex-1 overflow-y-auto mt-6">
          <div className="max-w-5xl mx-auto py-8 px-8">
            <div className="prose prose-lg">
              <textarea
                value={displayedContent}
                onChange={(e) => setDisplayedContent(e.target.value)}
                className="w-full min-h-[calc(100vh-10rem)] bg-transparent border-none resize-none focus:outline-none focus:ring-0 text-lg"
                placeholder="开始写作..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* 右侧工具面板 */}
      <motion.div 
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-96 border-l border-gray-100 flex-shrink-0 flex flex-col"
      >
        <div className="p-4 border-b border-gray-100 flex-shrink-0">
          <h2 className="text-lg font-medium mb-4">AI 论文导师</h2>
          <div className="space-y-2">
            <button className="w-full flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
              <Sparkles size={16} />
              <span>智能续写</span>
            </button>
          </div>
        </div>
        
        {/* 对话区域 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {[
            { isBot: true, content: '你好，我是你的AI论文导师。我会帮助你完成论文写作。' },
            { isBot: true, content: '我注意到你的论文主题很有趣。让我们从论文结构开始讨论吧。' },
            { isBot: false, content: '好的，我想先完善研究方法部分。' },
            { isBot: true, content: '这是个很好的起点。对于研究方法，我建议：\n\n1. 明确说明研究范式\n2. 详细描述数据收集方法\n3. 解释分析工具和过程' }
          ].map((message, index) => (
            <div
              key={index}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`max-w-[80%] rounded-2xl p-4 ${
                message.isBot 
                  ? 'bg-gray-50 text-gray-900' 
                  : 'bg-gray-900 text-white'
              }`}>
                <div className="whitespace-pre-wrap text-sm">{message.content}</div>
              </div>
            </div>
          ))}
        </div>

        {/* 输入区域 */}
        <div className="flex-shrink-0 border-t border-gray-100 p-4 bg-white">
          <div className="relative">
            <textarea
              placeholder="输入你的问题..."
              className="w-full pl-4 pr-12 py-3 bg-gray-50 rounded-xl resize-none h-[100px] focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            <button className="absolute right-3 bottom-3 p-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
              <Send size={18} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}