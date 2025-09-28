import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { Mic, Send, X } from 'lucide-react';
import ChatMessage from './chatMessage';
import { useSpeechRecognition } from 'react-speech-kit';
import { cn } from '@/lib/utils';
import { speakText, stopSpeech } from '@/lib/ttsUtils';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  status: string;
}

interface ChatPanelProps {
  onClose: () => void;
  setIsLoading: (isLoading: boolean) => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ onClose, setIsLoading }) => {
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
    const [sessionId, setSessionId] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! How can I help you today?',
      isBot: true,
      timestamp: new Date(),
      status: 'received',
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [isLoading, localSetIsLoading] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState<boolean>(true);

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

 useEffect(() => {
    const generateSessionId = () => {
      return Date.now().toString(36) + Math.random().toString(36).substring(2);
    };
    const newSessionId = generateSessionId();
    setSessionId(newSessionId);
  }, []);

  // Load TTS setting from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('ttsEnabled');
      if (stored !== null) {
        setTtsEnabled(stored === 'true');
      }
    } catch (e) {
      console.warn('Unable to read TTS setting from localStorage');
    }
  }, []);

  // Persist TTS setting
  useEffect(() => {
    try {
      localStorage.setItem('ttsEnabled', String(ttsEnabled));
    } catch (e) {
      console.warn('Unable to store TTS setting to localStorage');
    }
  }, [ttsEnabled]);

  // Stop any ongoing speech when TTS is turned off
  useEffect(() => {
    if (!ttsEnabled) {
      stopSpeech();
    }
  }, [ttsEnabled]);

  // Stop speech on component unmount
  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, []);
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
      const requestBody = {
          query: newUserMessage.text,
        sessionId,
        timestamp: Date.now(),
        language: language,
      };

      const response = await fetch(
        "https://n8n.onpointsoft.com/webhook/egram-advance",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const botResponseText = data.output || 'Sorry, I could not get a response.';

      const newBotMessage: Message = {
        id: Date.now().toString() + '-bot',
        text: botResponseText,
        isBot: true,
        timestamp: new Date(),
        status: 'received',
      };

      setMessages((prevMessages) => [...prevMessages, newBotMessage]);
      // Auto speak bot response only if TTS is enabled
      if (ttsEnabled) {
        speakText(botResponseText, '1.0').catch((err) => {
          console.error('Auto TTS failed:', err);
        });
      }
    } catch (error) {
      console.error('Error fetching bot response:', error);
      const errorMessage: Message = {
        id: Date.now().toString() + '-error',
        text: 'Error: Could not connect to the chatbot service.',
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
    'en-US': { name: 'English', nativeName: 'Eng', country: 'en-US' },
    'hi-IN': { name: 'हिन्दी', nativeName: 'हिन्दी', country: 'hi-IN' },
    'mr-IN': { name: 'मराठी', nativeName: 'मराठी', country: 'mr-IN' },
  };

  return (
    <div className="w-80 h-96 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 flex flex-col overflow-hidden notranslate">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white flex justify-between items-center relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <img src="/Animation.gif" alt="animation" />
          </div>
          <div>
            <h3 className="font-semibold">AI Smart Financing</h3>
            <p className="text-xs opacity-90">Recent Updates</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
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
                      code === language ? 'text-blue-500' : 'text-gray-700'
                    )}
                    onClick={() => handleLanguageSelect(code)}
                  >
                    {lang.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* TTS Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-xs">TTS</span>
            <button
              type="button"
              onClick={() =>
                setTtsEnabled((prev) => {
                  const next = !prev;
                  if (!next) {
                    // If toggling OFF, immediately stop any current playback
                    stopSpeech();
                  }
                  return next;
                })
              }
              aria-pressed={ttsEnabled}
              className={cn(
                'relative inline-flex h-5 w-10 items-center rounded-full transition-colors',
                ttsEnabled ? 'bg-green-400' : 'bg-gray-400'
              )}
              title={`TTS ${ttsEnabled ? 'On' : 'Off'}`}
            >
              <span
                className={cn(
                  'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                  ttsEnabled ? 'translate-x-5' : 'translate-x-1'
                )}
              />
            </button>
          </div>

          <button onClick={onClose} className="text-white hover:text-gray-200">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 notranslate">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <svg className="animate-spin h-4 w-4 text-blue-500" viewBox="0 0 24 24">
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
            <span>Processing your request...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form
        onSubmit={sendMessage}
        className="p-4 border-t border-gray-200 flex items-center gap-2 relative notranslate"
      >
        <div className="relative flex-1 notranslate">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="w-full p-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 notranslate"
          />
          <Mic
            className={cn(
              'absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 cursor-pointer',
              listening ? 'text-blue-600' : 'text-gray-500'
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
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Send message"
          disabled={isLoading}
        >
          <Send className="w-5 h-5" />
        </button>

      </form>
    </div>
  );
};

export default ChatPanel;
