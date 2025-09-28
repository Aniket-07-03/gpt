import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { Mic, Send, X } from 'lucide-react';
import ChatMessage from './chatMessage';
import { useSpeechRecognition } from 'react-speech-kit';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  status: string;
}

interface EgramPanelProps {
  onClose: () => void;
  setIsLoading: (isLoading: boolean) => void;
}

const EgramPanel: React.FC<EgramPanelProps> = ({ onClose, setIsLoading }) => {
  const { listen, listening, stop, supported } = useSpeechRecognition({
    onResult: (result: any) => {
      let cleanResult = "";
      if (typeof result === "string") {
        cleanResult = result.trim();
      } else if (result && typeof result === "object") {
        if (result.transcript) {
          cleanResult = String(result.transcript).trim();
        } else if (result.text) {
          cleanResult = String(result.text).trim();
        }
      }

      if (
        cleanResult &&
        cleanResult !== "[object Object]" &&
        cleanResult.length > 0
      ) {
        setInput(cleanResult);
      }
    },
    onEnd: () => {
      console.log("Speech recognition ended");
    },
    onError: (error: any) => {
      console.error("Speech recognition error:", error);
    },
  });
  const [language, setLanguage] = useState('en-US');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I am EgramGPT. How can I assist you with financial reporting today?',
      isBot: true,
      timestamp: new Date(),
      status: 'received',
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [isLoading, localSetIsLoading] = useState(false);

  const handleLanguageClick = () => {
    setShowLanguageDropdown(!showLanguageDropdown);
  };

  const handleLanguageSelect = (code: string) => {
    setLanguage(code);
    setShowLanguageDropdown(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isBot: false,
      timestamp: new Date(),
      status: 'sent',
    };

    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInput('');
    setIsLoading(true);
    localSetIsLoading(true);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_OPENAI_API_KEY'
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{role: "user", content: input}],
          temperature: 0.7
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const botResponseText = data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';

      const newBotMessage: Message = {
        id: Date.now().toString() + '-bot',
        text: botResponseText,
        isBot: true,
        timestamp: new Date(),
        status: 'received',
      };

      setMessages((prevMessages) => [...prevMessages, newBotMessage]);
    } catch (error) {
      console.error('Error fetching GPT response:', error);
      const errorMessage: Message = {
        id: Date.now().toString() + '-error',
        text: 'Error: Could not connect to the GPT service.',
        isBot: true,
        timestamp: new Date(),
        status: 'error',
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
      localSetIsLoading(false);
    }
  };

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
      loadVoices();
    }
  }, []);

  if (!supported) {
    console.error('Speech Recognition is not supported in this browser.');
  }

  useEffect(() => {
    // Speech recognition is now handled by the onResult callback in useSpeechRecognition
    // No need to manually set input from transcript
  }, [listening]);

  const languageData = {
    'en-US': { name: 'English', nativeName: 'English', country: 'en-US' },
    'hi-IN': { name: 'Hindi', nativeName: 'हिन्दी', country: 'hi-IN' },
    'mr-IN': { name: 'Marathi', nativeName: 'मराठी', country: 'mr-IN' },
  };

  return (
    <div className="w-80 h-96 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-green-600 p-4 text-white flex justify-between items-center relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <img src="/Animation.gif" alt="animation" />
          </div>
          <div>
            <h3 className="font-semibold">EgramGPT</h3>
            <p className="text-xs opacity-90">Financial Reporting Assistant</p>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={handleLanguageClick}
            className="mr-2 flex items-center gap-1 text-sm hover:text-gray-100"
          >
            🌐
            <span>{languageData[language].nativeName}</span>
          </button>

          {showLanguageDropdown && (
            <div className="absolute right-0 top-8 bg-white border rounded-lg shadow-lg py-1 min-w-[120px] z-50">
              {Object.entries(languageData).map(([code, lang]) => (
                <div
                  key={code}
                  className={cn(
                    'px-3 py-1.5 cursor-pointer hover:bg-gray-100 text-sm',
                    code === language ? 'text-orange-500' : 'text-gray-700'
                  )}
                  onClick={() => handleLanguageSelect(code)}
                >
                  {lang.nativeName}
                </div>
              ))}
            </div>
          )}
        </div>

        <button onClick={onClose} className="text-white hover:text-gray-200">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <svg className="animate-spin h-4 w-4 text-orange-500" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
            <span>Generating response...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form
        onSubmit={sendMessage}
        className="p-4 border-t border-gray-200 flex items-center gap-2 relative"
      >
        <div className="relative flex-1">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about financial reports..."
            className="w-full p-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <Mic
            className={cn(
              'absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 cursor-pointer',
              listening ? 'text-orange-600' : 'text-gray-500'
            )}
            onClick={() => {
              if (!supported) {
                alert('Speech Recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
                return;
              }
              
              if (listening) {
                stop();
              } else {
                try {
                  listen({
                    lang: language,
                    continuous: true,
                    interimResults: true,
                  });
                } catch (error) {
                  console.error('Error starting speech recognition:', error);
                }
              }
            }}
          />
        </div>
        <button
          type="submit"
          className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Send message"
          disabled={isLoading}
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default EgramPanel;
