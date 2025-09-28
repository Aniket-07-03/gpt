import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import EgramPanel from './egramPanel';
import { cn } from '@/lib/utils';

const EgramGPT = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Panel */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 animate-slide-up">
          <EgramPanel onClose={() => setIsOpen(false)} setIsLoading={setIsLoading} />
        </div>
      )}
      
      {/* Floating Chat Button */}
      <button
        onClick={toggleChat}
        className={cn(
          "relative group w-16 h-16 rounded-full shadow-lg",
          "bg-gradient-to-r from-orange-500 to-green-600",
          "hover:from-orange-600 hover:to-green-700",
          "transition-all duration-300 ease-in-out",
          "transform hover:scale-110 active:scale-95"
        )}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {/* Floating wave rings */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-green-600 animate-wave-1 opacity-20"></div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-green-600 animate-wave-2 opacity-15"></div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-green-600 animate-wave-3 opacity-10"></div>
        
        {/* Button content */}
        <div className="relative flex items-center justify-center w-full h-full rounded-full overflow-hidden text-white">
          {isOpen ? (
            <X className="w-6 h-6 transition-transform duration-200" />
          ) : (
            isLoading ? (
              <img src="/Animation-1.gif" alt="Loading animation" className="w-10 h-10" />
            ) : (
              <img src="/Animation-2.gif" alt="animation"/>
            )
          )}
        </div>
        
        {/* Hover effect overlay */}
        <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
      </button>
      
      {/* Notification dot */}
      {!isOpen && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white animate-glow">
          <div className="absolute inset-0 bg-emerald-500 rounded-full animate-pulse-gentle"></div>
        </div>
      )}
    </div>
  );
};

export default EgramGPT;
