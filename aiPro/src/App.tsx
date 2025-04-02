import React from 'react';
import { Sidebar } from './components/Sidebar/index';
import { Home } from './components/Home';
import { Chat } from './components/Chat';
import { WritingAssistant } from './components/WritingAssistant';
import { YinYang } from './components/YinYang';
import { LongFormWriting } from './components/LongFormWriting';
import { ImageGeneration } from './components/ImageGeneration';
import { LoginModal } from './components/LoginModal';

function App() {
  const [currentView, setCurrentView] = React.useState<'home' | 'chat' | 'writing' | 'yinyang' | 'longform' | 'image'>('home');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
  const [initialMessage, setInitialMessage] = React.useState<string | undefined>();
  const [showInitialDialog, setShowInitialDialog] = React.useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [isDocumentPreviewMode, setIsDocumentPreviewMode] = React.useState(false);

  const handleViewChange = (view: 'home' | 'chat' | 'writing' | 'yinyang') => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentView(view);
      setIsTransitioning(false);
    }, 300);
  };

  const handleStartChat = (message?: string) => {
    setInitialMessage(message);
    setShowInitialDialog(false);
    setCurrentView('chat');
  };

  React.useEffect(() => {
    if (currentView === 'chat') {
      setShowInitialDialog(!initialMessage);
    }
  }, [currentView, initialMessage]);

  return (
    <>
      <div className={`min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex relative isolate overflow-hidden ${isLoginModalOpen ? 'blur-sm transition-all duration-500' : ''}`}>
        <Sidebar
          currentView={currentView}
          setCurrentView={handleViewChange}
          isSidebarCollapsed={isSidebarCollapsed}
          setIsSidebarCollapsed={setIsSidebarCollapsed}
        />
        <div 
          className={`flex-1 flex flex-col relative ml-[288px] transition-all duration-300 ${
            isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`} 
          style={{ marginLeft: isSidebarCollapsed ? '80px' : '288px' }}
        >
          {currentView === 'home' ? (
            <Home onStartChat={handleStartChat} onLogin={() => setIsLoginModalOpen(true)} />
          ) : currentView === 'writing' ? (
            <WritingAssistant 
              onStartChat={handleStartChat} 
              setCurrentView={setCurrentView}
              onEnterPreview={() => {
                setIsDocumentPreviewMode(true);
                setIsSidebarCollapsed(true);
              }}
              onExitPreview={() => {
                setIsDocumentPreviewMode(false);
                setIsSidebarCollapsed(false);
              }}
            />
          ) : currentView === 'longform' ? (
            <LongFormWriting 
              onStartChat={handleStartChat}
              onEnterPreview={() => {
                setIsDocumentPreviewMode(true);
                setIsSidebarCollapsed(true);
              }}
              onExitPreview={() => {
                setIsDocumentPreviewMode(false);
                setIsSidebarCollapsed(false);
              }}
            />
          ) : currentView === 'yinyang' ? (
            <YinYang onStartChat={handleStartChat} />
          ) : currentView === 'image' ? (
            <ImageGeneration />
          ) : (
            <Chat initialMessage={initialMessage} showInitialDialog={showInitialDialog} />
          )}
        </div>
      </div>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
}

export default App;