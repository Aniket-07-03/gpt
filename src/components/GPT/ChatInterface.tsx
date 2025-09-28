import React, { useState, useRef, useEffect } from "react";
import { MessageBubble } from "./MessageBubble";
import { VoiceInput } from "./VoiceInput";
import  VoiceMode  from "./VoiceMode";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Brain,
  Send,
  Globe,
  Badge,
  Calendar,
  Download,
  FileText,
  Bot,
  Sparkles,
  Mic,
  Phone,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { speakText, stopSpeech } from "@/lib/ttsUtils";
import { useSpeechRecognition } from "react-speech-kit";
import { FundUtilizationFilterDialog } from "../FundUtilizationFilterDialog";
import { Card, CardContent } from "../ui/card";
import { ReactTransliterate } from "react-transliterate";

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
  status: string;
}

export const ChatInterface = () => {
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
        setInputValue(cleanResult);
      }
    },
    onEnd: () => {
      console.log("Speech recognition ended");
    },
    onError: (error: any) => {
      console.error("Speech recognition error:", error);
    },
  });
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const [language, setLanguage] = useState("en-US");
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [robotAnimation, setRobotAnimation] = useState("idle");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [ttsEnabled, setTtsEnabled] = useState<boolean>(true);
  const [voiceModeOpen, setVoiceModeOpen] = useState(false);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);
  
  useEffect(() => {
    const generateSessionId = () => {
      return Date.now().toString(36) + Math.random().toString(36).substring(2);
    };
    const newSessionId = generateSessionId();
    setSessionId(newSessionId);
  }, []);

  // Load and persist TTS setting
  useEffect(() => {
    try {
      const stored = localStorage.getItem("ttsEnabled");
      if (stored !== null) {
        setTtsEnabled(stored === "true");
      }
    } catch (e) {
      console.warn("Unable to read TTS setting from localStorage");
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("ttsEnabled", String(ttsEnabled));
    } catch (e) {
      console.warn("Unable to store TTS setting to localStorage");
    }
  }, [ttsEnabled]);

  // Stop TTS when disabled
  useEffect(() => {
    if (!ttsEnabled) {
      stopSpeech();
    }
  }, [ttsEnabled]);

  useEffect(() => {
    if (listening) {
      setRobotAnimation("listening");
    } else {
      setRobotAnimation("idle");
    }
  }, [listening]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    setRobotAnimation("thinking");

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      sender: "user",
      timestamp: new Date(),
      status: "sent",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    stop();
    
    try {
      const requestBody = {
        query: userMessage.content,
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

      const data = await response.json();
      const reply = data.output || "Sorry, I could not get a response.";

      const botMessage: Message = {
        id: Date.now().toString() + "-bot",
        content: reply,
        sender: "assistant",
        timestamp: new Date(),
        status: "received",
      };

      setMessages((prev) => [...prev, botMessage]);
      setRobotAnimation("speaking");
      
      // Auto-speak assistant reply if TTS is enabled
      if (ttsEnabled) {
        speakText(reply, "1.0").catch((err) =>
          console.error("Auto TTS failed:", err)
        );
      }
    } catch (err) {
      const errorMessage: Message = {
        id: Date.now().toString() + "-error",
        content: "⚠️ Error: Could not connect to the chatbot service.",
        sender: "assistant",
        timestamp: new Date(),
        status: "error",
      };
      setMessages((prev) => [...prev, errorMessage]);
      setRobotAnimation("error");
    } finally {
      setIsTyping(false);
      setTimeout(() => setRobotAnimation("idle"), 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  const handleVoiceInput = (transcript: string) => {
    setInputValue(transcript);
  };

  const handleListeningChange = () => {};

  const handleTtsToggle = () => {
    const newTtsState = !ttsEnabled;
    setTtsEnabled(newTtsState);
    
    // Stop any currently playing speech when TTS is turned off
    if (!newTtsState) {
      stopSpeech();
    }
  };

  const languageData = {
    "en-US": { name: "English", nativeName: "Eng", country: "en-US" },
    "hi-IN": { name: "हिन्दी", nativeName: "हिन्दी", country: "hi-IN" },
    "mr-IN": { name: "मराठी", nativeName: "मराठी", country: "mr-IN" },
  };

  const AnimatedRobot = () => (
    <div className="fixed bottom-8 right-8 z-50">
      <div
        className={cn(
          "relative transition-all duration-500 transform",
          robotAnimation === "listening" && "scale-110 animate-pulse",
          robotAnimation === "thinking" && "animate-bounce",
          robotAnimation === "speaking" && "animate-pulse"
        )}
      >
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
          <Bot className="w-8 h-8 text-white" />
        </div>

        {/* Animated rings */}
        <div
          className={cn(
            "absolute inset-0 rounded-full border-2 border-blue-400 opacity-30",
            robotAnimation === "listening" && "animate-ping"
          )}
        />
        <div
          className={cn(
            "absolute inset-0 rounded-full border-2 border-purple-400 opacity-20 scale-125",
            robotAnimation === "thinking" && "animate-ping"
          )}
        />

        <div
          className={cn(
            "absolute inset-0 rounded-full border-2 border-blue-400 opacity-30",
            robotAnimation === "listening" && "animate-ping"
          )}
        />
        <div
          className={cn(
            "absolute inset-0 rounded-full border-2 border-purple-400 opacity-20 scale-125",
            robotAnimation === "thinking" && "animate-ping"
          )}
        />

        {/* Status indicator */}
        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
          {robotAnimation === "listening" && (
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          )}
          {robotAnimation === "thinking" && (
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
          )}
          {robotAnimation === "speaking" && (
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          )}
          {robotAnimation === "idle" && (
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
          )}
        </div>

        {/* Sparkles effect */}
        {robotAnimation === "speaking" && (
          <div className="absolute inset-0 animate-spin">
            <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -left-1 animate-pulse" />
            <Sparkles className="w-3 h-3 text-blue-400 absolute -bottom-1 -right-1 animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <div className="h-[calc(100vh-65px)] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden notranslate">
        {/* Background animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-gradient-to-br from-indigo-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="relative z-10 p-6">
          {/* Header */}
          <div className="max-w-7xl mx-auto mb-8">
            <div className="flex justify-between items-center ">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    eGramGPT
                  </h1>
                  <p className="text-sm text-gray-600">
                    Smart Financial Reporting Assistant
                  </p>
                </div>
              </div>
              {/* Right side controls */}
              <div className="flex items-center gap-4">
                {/* Voice Mode Button */}
                {/* <Button
                  onClick={() => setVoiceModeOpen(true)}
                  variant="outline"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border-green-200 bg-green-50 hover:bg-green-100 text-green-700 transition-all duration-200 shadow-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span className="font-medium text-sm">Voice Mode</span>
                </Button> */}

                {/* TTS Toggle */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-600">TTS</span>
                  <button
                    type="button"
                    onClick={handleTtsToggle}
                    aria-pressed={ttsEnabled}
                    className={cn(
                      "relative inline-flex h-5 w-10 items-center rounded-full transition-colors",
                      ttsEnabled ? "bg-green-400" : "bg-gray-300"
                    )}
                    title={`TTS ${ttsEnabled ? "On" : "Off"}`}
                  >
                    <span
                      className={cn(
                        "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                        ttsEnabled ? "translate-x-5" : "translate-x-1"
                      )}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Container */}
          <div className="max-w-7xl  mx-auto">
            <Card className="bg-white/90 backdrop-blur-lg h-[calc(100vh-220px)] border-white/20 shadow-2xl">
              <CardContent className="p-0">
                <div
                  onClick={() => setShowLanguageDropdown(false)}
                  className="flex flex-col h-[600px]"
                >
                  {/* Chat Messages */}
                  <ScrollArea
                    ref={scrollAreaRef}
                    className="px-6 py-4 h-[calc(100vh-360px)] overflow-y-auto notranslate"
                  >
                    <div className="space-y-4 notranslate">
                      {messages.length === 0 && (
                        <div className="text-center py-12 animate-fade-in">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Bot className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            Welcome to eGramGPT!
                          </h3>
                          {/* <p className="text-gray-600 max-w-md mx-auto">
                            Your AI assistant for smart financial reporting. Ask me anything about district funds, block allocations, or village expenditures.
                          </p> */}
                        </div>
                      )}

                      {messages.map((message) => (
                        <div key={message.id} className="animate-fade-in">
                          <MessageBubble message={message} />
                        </div>
                      ))}

                      {isTyping && (
                        <div className="flex items-center gap-3 animate-fade-in">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                          <div className="bg-gray-100 rounded-2xl px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="flex space-x-1">
                                <div
                                  className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                                  style={{ animationDelay: "0ms" }}
                                />
                                <div
                                  className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                                  style={{ animationDelay: "150ms" }}
                                />
                                <div
                                  className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                                  style={{ animationDelay: "300ms" }}
                                />
                              </div>
                              <span className="text-sm text-gray-600 ml-2">
                                Processing your request...
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>

                  {/* Input Area */}
                  <div className="fixed bottom-0 w-full border-t border-gray-100 bg-white magie z-50">
                    <div className="p-6">
                      <div className="flex items-end space-x-4">
                        {/* Language Selector - Moved to Left Side */}
                        <div className="relative">
                          <Button
                            variant="outline"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setShowLanguageDropdown(!showLanguageDropdown);
                            }}
                            className="flex text-blue-600 items-center gap-2 mb-4 px-3 py-2 rounded-xl border-blue-200 bg-blue/80 backdrop-blur-sm hover:bg-white transition-all duration-200 shadow-sm"
                          >
                            <Globe className="w-4 h-4" />
                            <span className="font-medium text-sm">
                              {languageData[language].nativeName}
                            </span>
                          </Button>

                          {showLanguageDropdown && (
                            <div className="absolute left-0 bottom-14 z-50 min-w-40 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden animate-fade-in">
                              {Object.entries(languageData).map(
                                ([code, lang]) => (
                                  <button
                                    key={code}
                                    className={cn(
                                      "w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 text-sm",
                                      code === language &&
                                        "bg-blue-50 text-blue-600 font-medium"
                                    )}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      e.preventDefault();
                                      setLanguage(code);
                                      setShowLanguageDropdown(false);
                                    }}
                                  >
                                    {lang.nativeName}
                                  </button>
                                )
                              )}
                            </div>
                          )}
                        </div>

                        {/* Textarea with Mic */}
                        <div className="flex-1 relative notranslate">
                          <div className="relative notranslate">
                            {language === "en-US" ? (
                              <textarea
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder={
                                  listening
                                    ? "🎤 Listening..."
                                    : "Ask about fund utilization, reports, or allocations..."
                                }
                                className={cn(
                                  "w-full p-4 pr-16 rounded-2xl border-2 bg-white text-gray-900 placeholder-gray-500 resize-none focus:outline-none transition-all duration-200 shadow-lg",
                                  listening
                                    ? "border-red-400 ring-4 ring-red-100 bg-red-50"
                                    : "border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                                )}
                                rows={1}
                                style={{
                                  minHeight: "56px",
                                  maxHeight: "120px",
                                }}
                              />
                            ) : (
                              <ReactTransliterate
                                lang={language.split("-")[0] as any} // 'hi' or 'mr'
                                value={inputValue}
                                onChangeText={(text: string) =>
                                  setInputValue(text)
                                }
                                onKeyPress={handleKeyPress}
                                placeholder={
                                  listening
                                    ? "🎤 Listening..."
                                    : "Ask about fund utilization, reports, or allocations..."
                                }
                                className={cn(
                                  "w-full p-4 pr-16 rounded-2xl pt-[-200px] border-2 bg-white text-gray-900 placeholder-gray-500 resize-none focus:outline-none transition-all duration-200 shadow-lg",
                                  listening
                                    ? "border-red-400 ring-4 ring-red-100 bg-red-50"
                                    : "border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                                )}
                                rows={1}
                                style={{
                                  minHeight: "56px",
                                  maxHeight: "120px",
                                }}
                              />
                            )}

                            {listening && (
                              <div className="absolute inset-2 pointer-events-none rounded-xl overflow-hidden">
                                <div className="flex items-center justify-center h-full">
                                  <div className="flex items-center space-x-1">
                                    {[...Array(5)].map((_, i) => (
                                      <div
                                        key={i}
                                        className="w-1 bg-red-500 rounded-full animate-pulse"
                                        style={{
                                          height: `${12 + (i % 3) * 8}px`,
                                          animationDelay: `${i * 0.15}s`,
                                        }}
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Voice Mic Icon */}
                         <div className="absolute top-4 right-4 flex items-center gap-4">
  {/* Mic Icon */}
  <Mic
    className={cn(
      "h-6 w-6 cursor-pointer transition-colors",
      listening ? "text-blue-600" : "text-gray-500"
    )}
    onClick={() => {
      if (!supported) {
        alert(
          "Speech Recognition is not supported in this browser. Please use Chrome, Edge, or Safari."
        );
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
          console.error("Error starting speech recognition:", error);
        }
      }
    }}
  />

  {/* Voice Mode Button */}
  <button
    type="button"
    onClick={() => setVoiceModeOpen(true)}
    className="p-2 rounded-lg shadow hover:scale-105 transition"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      fill="currentColor"
      className="bi bi-soundwave"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M8.5 2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-1 
        0v-11a.5.5 0 0 1 .5-.5m-2 2a.5.5 0 0 1 .5.5v7a.5.5 
        0 0 1-1 0v-7a.5.5 0 0 1 .5-.5m4 
        0a.5.5 0 0 1 .5.5v7a.5.5 
        0 0 1-1 0v-7a.5.5 0 0 1 
        .5-.5m-6 1.5A.5.5 0 0 1 5 
        6v4a.5.5 0 0 1-1 0V6a.5.5 
        0 0 1 .5-.5m8 
        0a.5.5 0 0 1 .5.5v4a.5.5 
        0 0 1-1 0V6a.5.5 
        0 0 1 .5-.5m-10 
        1A.5.5 0 0 1 3 7v2a.5.5 
        0 0 1-1 0V7a.5.5 
        0 0 1 .5-.5m12 
        0a.5.5 0 0 1 .5.5v2a.5.5 
        0 0 1-1 0V7a.5.5 
        0 0 1 .5-.5"
      />
    </svg>
  </button>
</div>

                          
                          </div>

                        {/* Voice Mode Button */}
                       

                        {/* Send Button */}
                        <Button
                          onClick={() => handleSendMessage(inputValue)}
                          disabled={!inputValue.trim() || isTyping}
                          className={cn(
                            "h-14 w-14 rounded-2xl mb-2 transition-all duration-200 shadow-lg hover:scale-105 active:scale-95",
                            inputValue.trim() && !isTyping
                              ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-blue-200"
                              : "bg-gray-200 text-gray-400 cursor-not-allowed"
                          )}
                        >
                          <Send className="h-5 w-5" />
                        </Button>
                      </div>

                      <div className="mt-4 text-center">
                        <p className="text-xs text-gray-500">
                          Press Enter to send • Shift + Enter for new line
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Animated Robot Assistant */}
        {/* <AnimatedRobot /> */}
      </div>

      <FundUtilizationFilterDialog
        open={false}
        onOpenChange={() => {}}
        onSubmit={() => {}}
      />

      {/* Voice Mode Modal */}
      <VoiceMode
        isOpen={voiceModeOpen}
        onClose={() => setVoiceModeOpen(false)}
        language={language}
        sessionId={sessionId}
        messages={messages}
        setMessages={setMessages}
      />
    </>
  )
}