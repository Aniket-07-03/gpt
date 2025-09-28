
import React, { useEffect } from 'react';
import { useSpeechRecognition } from 'react-speech-kit';
import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VoiceInputProps {
  onTranscript: (transcript: string) => void;
  onListeningChange: (isListening: boolean) => void;
  language?: string;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({ 
  onTranscript, 
  onListeningChange,
  language 
}) => {
  const {
    listen,
    listening,
    stop,
    supported
  } = useSpeechRecognition({
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
        onTranscript(cleanResult);
      }
    },
    onEnd: () => {
      console.log("Speech recognition ended");
    },
    onError: (error: any) => {
      console.error("Speech recognition error:", error);
    },
  });

  useEffect(() => {
    onListeningChange(listening);
  }, [listening, onListeningChange]);

  useEffect(() => {
    // Speech recognition is now handled by the onResult callback in useSpeechRecognition
    // No need to manually set transcript
  }, [listening, onTranscript]);

  // Stop listening when language changes
  useEffect(() => {
    if (listening) {
      stop();
    }
  }, [language, listening, stop]);

const startListening = () => {
  console.log("Starting with language:", language);
  try {
    listen({
      lang: language,
      continuous: false,
      interimResults: false
    });
  } catch (error) {
    console.error("Error starting speech recognition:", error);
  }
};


  const stopListening = () => {
    stop();
  };

  const toggleListening = () => {
    if (listening) {
      stopListening();
    } else {
      startListening();
    }
  };

  if (!supported) {
    return (
      <Button
        type="button"
        variant="ghost"
        size="sm"
        disabled
        className="h-10 w-10 p-0 text-gray-400"
      >
        <MicOff className="h-10 w-10" />
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={toggleListening}
      className={cn(
        "h-8 w-8 p-0  rounded-full transition-all duration-200",
        listening 
          ? "text-red-500 hover:text-red-600" 
          : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
      )}
    >
      {listening ? <Mic className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
    </Button>
  );
};
