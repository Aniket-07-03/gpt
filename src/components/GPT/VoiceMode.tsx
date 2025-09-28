import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { X, Mic, MicOff, Volume2, VolumeX, Globe } from "lucide-react";
import { speakText, stopSpeech } from "@/lib/ttsUtils";
import { useSpeechRecognition } from "react-speech-kit";

// Define the Message interface
export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  status: string;
}

interface VoiceModeProps {
  isOpen: boolean;
  onClose: () => void;
  language: string;
  sessionId: string | null;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const languageData: Record<string, { name: string; nativeName: string; country: string }> = {
  "en-US": { name: "English", nativeName: "Eng", country: "en-US" },
  "hi-IN": { name: "हिन्दी", nativeName: "हिन्दी", country: "hi-IN" },
  "mr-IN": { name: "मराठी", nativeName: "मराठी", country: "mr-IN" },
};

// Language detection patterns
const languagePatterns: Record<string, RegExp> = {
  "hi-IN": /[\u0900-\u097F]/,  // Devanagari script
  "mr-IN": /[\u0900-\u097F]/,  // Devanagari script (same as Hindi)
  "en-US": /^[a-zA-Z\s.,!?'"()-]+$/  // English characters
};

// Common words for better detection
const languageKeywords: Record<string, string[]> = {
  "hi-IN": ["हैलो", "नमस्ते", "क्या", "कैसे", "है", "मैं", "आप", "यह", "वह"],
  "mr-IN": ["नमस्कार", "काय", "कसे", "आहे", "मी", "तुम्ही", "हे", "ते"],
  "en-US": ["hello", "hi", "what", "how", "is", "are", "i", "you", "this", "that"]
};

const VoiceMode = ({
  isOpen,
  onClose,
  language,
  sessionId,
  messages,
  setMessages,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState("");
  const [lastResponse, setLastResponse] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [conversationActive, setConversationActive] = useState(false);
  const [detectedLanguage, setDetectedLanguage] = useState(language);
  const [isDetectingLanguage, setIsDetectingLanguage] = useState(false);
  
  const speechTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const recognitionRef = useRef<any>(null);
  const shouldListenRef = useRef(false);
  const languageDetectionRef = useRef<{ [key: string]: number }>({});

  // Auto language detection function
  const detectLanguage = (text: string): string => {
    const cleanText = text.toLowerCase().trim();
    const scores: { [key: string]: number } = {};
    
    // Initialize scores
    Object.keys(languageData).forEach(lang => {
      scores[lang] = 0;
    });

    // Script-based detection (high weight)
    Object.entries(languagePatterns).forEach(([lang, pattern]) => {
      if (pattern.test(text)) {
        scores[lang] += 10;
      }
    });

    // Keyword-based detection
    Object.entries(languageKeywords).forEach(([lang, keywords]) => {
      keywords.forEach(keyword => {
        if (cleanText.includes(keyword.toLowerCase())) {
          scores[lang] += 5;
        }
      });
    });

    // Find language with highest score
    let detectedLang = language; // Default to current language
    let maxScore = 0;
    
    Object.entries(scores).forEach(([lang, score]) => {
      if (score > maxScore) {
        maxScore = score;
        detectedLang = lang;
      }
    });

    // Update detection history for better accuracy
    if (maxScore > 0) {
      languageDetectionRef.current[detectedLang] = 
        (languageDetectionRef.current[detectedLang] || 0) + 1;
    }

    return detectedLang;
  };

  // Get most frequently detected language
  const getMostDetectedLanguage = (): string => {
    const history = languageDetectionRef.current;
    let maxCount = 0;
    let mostDetected = language;
    
    Object.entries(history).forEach(([lang, count]) => {
      if (count > maxCount) {
        maxCount = count;
        mostDetected = lang;
      }
    });
    
    return mostDetected;
  };

  // Switch recognition language
  const switchRecognitionLanguage = (newLanguage: string) => {
    if (recognitionRef.current && newLanguage !== detectedLanguage) {
      console.log(`Switching language from ${detectedLanguage} to ${newLanguage}`);
      setDetectedLanguage(newLanguage);
      
      // Stop current recognition
      if (isListening) {
        recognitionRef.current.stop();
        // Restart with new language after a short delay
        setTimeout(() => {
          if (shouldListenRef.current && conversationActive) {
            initializeRecognition(newLanguage);
            startListening();
          }
        }, 500);
      } else {
        // Just update the recognition object for next use
        initializeRecognition(newLanguage);
      }
    }
  };

  // Initialize speech recognition with specific language
  const initializeRecognition = (lang: string) => {
    if ('webkitSpeechRecognition' in window) {
      // Stop existing recognition
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }

      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = lang;

      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        const currentText = (finalTranscript || interimTranscript).trim();
        if (currentText) {
          setCurrentTranscript(currentText);
          
          // Auto-detect language from speech
          if (currentText.length > 5) {
            setIsDetectingLanguage(true);
            const detected = detectLanguage(currentText);
            
            setTimeout(() => {
              setIsDetectingLanguage(false);
            }, 1000);
            
            // Switch language if detection is confident and different
            if (detected !== detectedLanguage && 
                (languageDetectionRef.current[detected] || 0) >= 2) {
              switchRecognitionLanguage(detected);
            }
          }
          
          // Clear existing timeout
          if (speechTimeoutRef.current) {
            clearTimeout(speechTimeoutRef.current);
          }
          
          // Only set timeout for final results or if interim is substantial
          if (finalTranscript || currentText.length > 10) {
            speechTimeoutRef.current = setTimeout(() => {
              if (currentText.length > 3 && shouldListenRef.current) {
                processUserSpeech(currentText);
              }
            }, finalTranscript ? 500 : 2000);
          }
        }
      };

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onend = () => {
        setIsListening(false);
        // Restart listening if conversation is active and we should be listening
        if (conversationActive && shouldListenRef.current && !isSpeaking && !isProcessing) {
          setTimeout(() => {
            startListening();
          }, 100);
        }
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
        
        // Restart listening after error if conversation is active
        if (conversationActive && shouldListenRef.current && !isSpeaking && !isProcessing) {
          setTimeout(() => {
            startListening();
          }, 1000);
        }
      };

      recognitionRef.current = recognition;
    }
  };

  // Initialize speech recognition
  useEffect(() => {
    initializeRecognition(detectedLanguage);

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [detectedLanguage, conversationActive, isSpeaking, isProcessing]);

  const processUserSpeech = async (transcript: string) => {
    if (!transcript.trim() || !shouldListenRef.current) return;
    
    // Stop listening immediately to prevent echo
    shouldListenRef.current = false;
    setIsListening(false);
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    
    setIsProcessing(true);
    setCurrentTranscript("");

    // Add user message to chat history
    const userMessage: Message = {
      id: Date.now().toString(),
      content: transcript,
      sender: 'user',
      timestamp: new Date(),
      status: 'delivered'
    };
    
    // Update messages in parent component
    setMessages(prevMessages => [...prevMessages, userMessage]);

    try {
      const requestBody = {
        query: transcript,
        sessionId,
        timestamp: Date.now(),
        language: detectedLanguage, // Use detected language
        detectedLanguage: getMostDetectedLanguage(),
      };

      // Mock API call - replace with your actual endpoint
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
      
      // Add assistant message to chat history
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: reply,
        sender: 'assistant',
        timestamp: new Date(),
        status: 'delivered'
      };
      
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
      setLastResponse(reply);
      setIsProcessing(false);
      
      if (!isMuted) {
        setIsSpeaking(true);
        try {
          // Wait for TTS to completely finish before resuming listening
          await speakText(reply, "1.0");
          setIsSpeaking(false);
          
          // Extra delay to ensure audio has fully stopped
          if (conversationActive) {
            setTimeout(() => {
              shouldListenRef.current = true;
              startListening();
            }, 1500); // Increased delay
          }
        } catch (error) {
          console.error("TTS error:", error);
          setIsSpeaking(false);
          if (conversationActive) {
            setTimeout(() => {
              shouldListenRef.current = true;
              startListening();
            }, 1000);
          }
        }
      } else {
        // If muted, resume listening immediately
        if (conversationActive) {
          setTimeout(() => {
            shouldListenRef.current = true;
            startListening();
          }, 500);
        }
      }
    } catch (error) {
      console.error("Error processing speech:", error);
      setIsProcessing(false);
      setLastResponse("Sorry, I couldn't process that. Please try again.");
      
      if (conversationActive) {
        setTimeout(() => {
          shouldListenRef.current = true;
          startListening();
        }, 1000);
      }
    }
  };

  const startListening = () => {
    if (!recognitionRef.current || isSpeaking || isProcessing) {
      return;
    }

    try {
      recognitionRef.current.start();
    } catch (error) {
      console.error("Error starting speech recognition:", error);
    }
  };

  const stopListening = () => {
    shouldListenRef.current = false;
    setIsListening(false);
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    if (speechTimeoutRef.current) {
      clearTimeout(speechTimeoutRef.current);
    }
  };

  const toggleConversation = () => {
    if (conversationActive) {
      setConversationActive(false);
      stopListening();
      setIsSpeaking(false);
      setCurrentTranscript("");
    } else {
      setConversationActive(true);
      shouldListenRef.current = true;
      setTimeout(() => {
        startListening();
      }, 500);
    }
  };

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    
    if (newMutedState && isSpeaking) {
      setIsSpeaking(false);
      if (conversationActive) {
        setTimeout(() => {
          shouldListenRef.current = true;
          startListening();
        }, 500);
      }
    }
  };

  // Cleanup function to stop all speech and recognition
  const cleanupSpeech = () => {
    // Stop any ongoing speech synthesis
    stopSpeech();
    
    // Stop speech recognition
    stopListening();
    
    // Clear any pending timeouts
    if (speechTimeoutRef.current) {
      clearTimeout(speechTimeoutRef.current);
      speechTimeoutRef.current = null;
    }
    
    // Reset states
    setIsSpeaking(false);
    setCurrentTranscript("");
    setLastResponse("");
    setConversationActive(false);
    shouldListenRef.current = false;
  };

  useEffect(() => {
    if (isOpen) {
      setConversationActive(true);
      shouldListenRef.current = true;
      setTimeout(() => {
        startListening();
      }, 500);
    } else {
      cleanupSpeech();
      languageDetectionRef.current = {};
    }

    // Cleanup on unmount
    return () => {
      cleanupSpeech();
    };
  }, [isOpen]);

  useEffect(() => {
    if (isSpeaking) {
      shouldListenRef.current = false;
      stopListening();
    }
  }, [isSpeaking]);

  if (!isOpen) return null;

  const getStatusText = () => {
    if (isProcessing) return "Thinking...";
    if (isSpeaking) return "Speaking";
    if (isListening) return "Listening...";
    if (conversationActive) return "Tap to speak";
    return "Voice chat paused";
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="text-white text-lg sm:text-xl font-medium">Voice Chat</div>
          {detectedLanguage !== language && (
            <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full backdrop-blur-sm">
              <div className="w-4 h-4">
                <iframe 
                  src="https://lottie.host/embed/38f508ae-e755-4b33-a3eb-35c37d68b9ec/KGmc2AV2IN.lottie"
                  className="w-full h-full border-0"
                  title="Language Detection"
                />
              </div>
              <span className="text-sm text-blue-300 font-medium">
                {languageData[detectedLanguage]?.nativeName}
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            className={cn(
              "w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-colors",
              "border border-white/20 backdrop-blur-sm",
              isMuted 
                ? "bg-red-500/20 text-red-400 hover:bg-red-500/30" 
                : "bg-white/10 text-white hover:bg-white/20"
            )}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
          <button
            onClick={onClose}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-colors border border-white/20 backdrop-blur-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 py-8">
        {/* Central Orb */}
        <div className="relative mb-8 sm:mb-12">
          {/* Language detection indicator */}
          {isDetectingLanguage && (
            <div className="absolute -top-3 -right-3 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center animate-bounce shadow-lg">
              <div className="w-5 h-5">
                <iframe 
                  src="https://lottie.host/embed/38f508ae-e755-4b33-a3eb-35c37d68b9ec/KGmc2AV2IN.lottie"
                  className="w-full h-full border-0"
                  title="Language Detection"
                />
              </div>
            </div>
          )}

          {/* Main orb */}
          <div
            className={cn(
              "relative w-48 h-48 sm:w-64 sm:h-64  ",
              "overflow-hidden"
            )}
            onClick={toggleConversation}
          >
            {/* Lottie Animation Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              {(isListening || isSpeaking || isProcessing) ? (
                <div className="w-full h-full">
                  <iframe 
                    src="https://lottie.host/embed/38f508ae-e755-4b33-a3eb-35c37d68b9ec/KGmc2AV2IN.lottie"
                    className="w-full h-full border-0"
                    title="Voice Assistant Animation"
                  />
                </div>
              ) : (
                <div className="w-32 h-32 sm:w-40 sm:h-40">
                  <iframe 
                    src="https://lottie.host/embed/38f508ae-e755-4b33-a3eb-35c37d68b9ec/KGmc2AV2IN.lottie"
                    className="w-full h-full border-0"
                    title="Voice Assistant Idle"
                  />
                </div>
              )}
            </div>

            {/* State-specific overlay effects */}
            {/* {isListening && (
              <div className="absolute inset-0 bg-blue-500/10 rounded-full animate-pulse" />
            )}
            {isSpeaking && (
              <div className="absolute inset-0 bg-green-500/10 rounded-full animate-pulse" />
            )}
            {isProcessing && (
              <div className="absolute inset-0 bg-purple-500/10 rounded-full animate-pulse" />
            )} */}

            {/* Ripple effect for active states */}
            {/* {(isListening || isSpeaking) && (
              <div className="absolute inset-0 rounded-full bg-white/5 animate-ping" />
            )} */}
          </div>
        </div>

        {/* Status Text */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">
            {getStatusText()}
          </h2>
          {detectedLanguage !== language && (
            <p className="text-blue-300 text-sm">
              Auto-detected: {languageData[detectedLanguage]?.name}
            </p>
          )}
        </div>

        {/* Conversation Display */}
        <div className="w-full max-w-2xl mx-auto space-y-4">
          {/* Uncomment these sections if you want to show conversation history */}
          {/* User's current speech */}
          {/* {currentTranscript && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <p className="text-blue-300 text-sm font-medium mb-1">You</p>
              <p className="text-white">{currentTranscript}</p>
            </div>
          )} */}

          {/* AI's last response */}
          {/* {lastResponse && !currentTranscript && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <p className="text-green-300 text-sm font-medium mb-1">AI Assistant</p>
              <p className="text-white leading-relaxed">{lastResponse}</p>
            </div>
          )} */}
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="p-4 sm:p-6 text-center">
        <div className="flex flex-col items-center gap-2">
          <p className="text-white/70 text-sm">
            {conversationActive ? "Tap the orb to pause" : "Tap the orb to start"}
          </p>
          {isMuted && (
            <p className="text-red-400 text-xs">Audio output is muted</p>
          )}
          {!('webkitSpeechRecognition' in window) && (
            <p className="text-red-400 text-xs">Speech recognition not supported in this browser</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceMode;