import React from 'react';
import { LogIn, Search, MessageCircle, Image, Mic, Send, Paperclip, ChevronRight } from 'lucide-react';

interface HomeProps {
  onStartChat: (initialMessage?: string) => void;
  onLogin: () => void;
}

export function Home({ onStartChat, onLogin }: HomeProps) {
  const [inputValue, setInputValue] = React.useState('');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    console.log("1111")
    onStartChat(inputValue);
    setInputValue('');
  };

  return (
    <div className="flex-1 flex flex-col items-center p-6 overflow-y-auto">
      <div className="w-full max-w-4xl">
        <div className="mb-8">
          <div className="flex justify-end mb-4">
            <button 
              onClick={onLogin}
              className="bg-gray-900 text-white px-6 py-2.5 rounded-full flex items-center hover:shadow-lg hover:translate-y-[-1px] active:translate-y-[1px] transition-all duration-300"
            >
              <LogIn size={16} className="mr-1" />
              <span>登录</span>
            </button>
          </div>
          <div className="h-12"></div>
          <h1 className="text-center mb-2">
            <span className="text-4xl font-bold text-gray-900">你好，我是
              <span className="text-blue-600 inline-flex">
                <span className="animate-bounce-1 inline-block">天</span>
                <span className="animate-bounce-2 inline-block ml-1">音</span>
              </span>
            </span>
          </h1>
          <p className="text-lg text-gray-600 text-center mb-6">愿为您解答世间疑惑</p>
         
          <div className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 mx-auto max-w-4xl">
            <div className="p-8">
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
                    placeholder="你可以问我任何问题..."
                    className="flex-1 bg-transparent border-none focus:outline-none placeholder:text-gray-400 text-gray-900 text-base px-2 mb-2"
                  />
                  <div className="flex items-center justify-end space-x-2">
                    <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors rounded-lg">
                      <Paperclip size={20} />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors rounded-lg">
                      <Image size={20} />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors rounded-lg">
                      <Mic size={20} />
                    </button>
                    <button 
                      onClick={handleSendMessage}
                      className={`p-1 transition-all duration-300 rounded-lg ${
                        inputValue.trim() 
                          ? 'text-white bg-gray-900 hover:bg-gray-800' 
                          : 'text-black bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-gray-500 text-center mt-12 mb-8">你可以尝试下面的示例...</p>
        
          {/* Example Cards */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            {/* AI Search Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">AI 搜索</h3>
                <button className="text-blue-500 text-sm flex items-center hover:text-blue-600">
                  体验更多
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
              <div className="space-y-3">
                <button 
                  onClick={() => onStartChat("苹果台灯机器人真厉害，有哪些突破点？")}
                  className="w-full flex items-center space-x-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300"
                >
                  <Search size={16} />
                  <span className="text-sm text-left">苹果台灯机器人真厉害，有哪些突破点？</span>
                </button>
                <button 
                  onClick={() => onStartChat("OpenAI 突然公开开源了 GPT-3，这意味着什么？")}
                  className="w-full flex items-center space-x-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300"
                >
                  <Search size={16} />
                  <span className="text-sm text-left">OpenAI 突然公开开源了 GPT-3，这意味着什么？</span>
                </button>
                <button 
                  onClick={() => onStartChat("今年开了 25 家，海底捞打了个翻身仗？")}
                  className="w-full flex items-center space-x-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300"
                >
                  <Search size={16} />
                  <span className="text-sm text-left">今年开了 25 家，海底捞打了个翻身仗？</span>
                </button>
              </div>
            </div>
            
            {/* Image Generation Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">图像生成</h3>
                <button className="text-blue-500 text-sm flex items-center hover:text-blue-600">
                  体验更多
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=100&h=100&q=80',
                  'https://images.unsplash.com/photo-1527416876370-fb74d128c3dc?auto=format&fit=crop&w=100&h=100&q=80',
                  'https://images.unsplash.com/photo-1615796153287-98eacf0abb13?auto=format&fit=crop&w=100&h=100&q=80',
                  'https://images.unsplash.com/photo-1561948955-570b270e7c36?auto=format&fit=crop&w=100&h=100&q=80',
                  'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=100&h=100&q=80',
                  'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=100&h=100&q=80'
                ].map((url, index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden">
                    <img src={url} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Writing Assistant Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">帮我写作</h3>
                <button className="text-blue-500 text-sm flex items-center hover:text-blue-600">
                  体验更多
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
              <div className="space-y-3">
                <button 
                  onClick={() => onStartChat("写一篇创业公司的融资推介信")}
                  className="w-full flex items-center space-x-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300"
                >
                  <MessageCircle size={16} />
                  <span className="text-sm text-left">写一篇创业公司的融资推介信</span>
                </button>
                <button 
                  onClick={() => onStartChat("帮我写一份职场求职简历")}
                  className="w-full flex items-center space-x-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300"
                >
                  <MessageCircle size={16} />
                  <span className="text-sm text-left">帮我写一份职场求职简历</span>
                </button>
                <button 
                  onClick={() => onStartChat("写一篇关于人工智能的科技文章")}
                  className="w-full flex items-center space-x-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300"
                >
                  <MessageCircle size={16} />
                  <span className="text-sm text-left">写一篇关于人工智能的科技文章</span>
                </button>
              </div>
            </div>
            
            {/* Reading Assistant Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">帮我阅读</h3>
                <button className="text-blue-500 text-sm flex items-center hover:text-blue-600">
                  体验更多
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
              <div className="space-y-4">
                <button className="w-full flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300">
                  <img src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=60&h=60&q=80" alt="Document Cover" className="w-12 h-12 rounded-lg" />
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium mb-1">民法典被称为"社会生活的百科全书"，是新中国第一部以法典命名的法律</div>
                    <div className="text-xs text-gray-500 flex items-center">
                      <span>《中华人民共和国民法典》</span>
                      <span className="mx-2">·</span>
                      <span>pdf</span>
                    </div>
                  </div>
                </button>
                <button className="w-full flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300">
                  <img src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=60&h=60&q=80" alt="Document Cover" className="w-12 h-12 rounded-lg" />
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium mb-1">中国古典四大名著之一，以曹雪芹与高鹗的爱情婚姻悲剧为主线</div>
                    <div className="text-xs text-gray-500 flex items-center">
                      <span>《红楼梦》</span>
                      <span className="mx-2">·</span>
                      <span>pdf</span>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}