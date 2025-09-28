/**
 * Text-to-Speech utility functions
 * Supports multiple languages with appropriate voice selection
 */

export interface TTSOptions {
  input: string;
  voice?: string;
  speed?: string;
}

// Track currently playing audio so we can stop it when needed
let currentAudio: HTMLAudioElement | null = null;
let currentPlaybackPromise: Promise<void> | null = null;

/**
 * Stops any ongoing TTS audio playback and cleans up resources
 */
export const stopSpeech = (): void => {
  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      const src = currentAudio.src;
      if (src && src.startsWith('blob:')) {
        try {
          URL.revokeObjectURL(src);
        } catch (e) {
          console.warn('Failed to revoke object URL', e);
        }
      }
    } catch (e) {
      console.warn('Error stopping TTS audio', e);
    } finally {
      currentAudio = null;
      currentPlaybackPromise = null;
    }
  }
};

/**
 * Detects the language of the input text
 * @param text - The text to analyze
 * @returns The detected language code
 */
export const detectLanguage = (text: string): string => {
  const hasDevanagari = /[\u0900-\u097F]/.test(text);
  if (!hasDevanagari) {
    return 'en-US';
  }

  // Heuristic: characters more common/unique in Marathi
  const marathiChars = /[ळऱऴॲऑऍय़]/;
  if (marathiChars.test(text)) {
    return 'mr-IN';
  }

  // Heuristic keywords
  const hindiKeywords = [
    'है', 'क्या', 'क्यों', 'यह', 'और', 'कहाँ', 'कब', 'कैसे', 'ठीक', 'आप', 'मैं', 'नहीं', 'मेरा', 'तुम', 'फिर'
  ];
  const marathiKeywords = [
    'आहे', 'काय', 'का', 'येथे', 'आणि', 'कुठे', 'कधी', 'कसे', 'ठीक आहे', 'तुम्ही', 'मी', 'नाही', 'माझे', 'तू', 'मग', 'होय', 'नमस्कार'
  ];

  const countMatches = (arr: string[]) => arr.reduce((acc, kw) => acc + (text.includes(kw) ? 1 : 0), 0);
  const hiScore = countMatches(hindiKeywords);
  const mrScore = countMatches(marathiKeywords);

  if (mrScore > hiScore) return 'mr-IN';
  return 'hi-IN';
};

/**
 * Gets the appropriate voice for the detected language
 * @param language - The language code
 * @returns The voice identifier
 */
export const getVoiceForLanguage = (language: string): string => {
  switch (language) {
    case 'mr-IN':
      return 'mr-IN-ManoharNeural';
    case 'hi-IN':
      return 'hi-IN-MadhurNeural';
    case 'en-US':
    default:
      return 'en-IN-NeerjaNeural';
  }
};

/**
 * Converts text to speech using the TTS API
 * @param options - TTS options including input text and voice preferences
 * @returns Promise that resolves when audio finishes playing
 */
export const textToSpeech = async (options: TTSOptions): Promise<void> => {
  const { input, speed = '1.0' } = options;

  if (!input.trim()) {
    console.warn('No text provided for TTS');
    return;
  }

  const detectedLanguage = detectLanguage(input);
  const voice = options.voice || getVoiceForLanguage(detectedLanguage);

  try {
    const response = await fetch('https://n8n.onpointsoft.com/webhook/tts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: input.trim(),
        voice,
        speed,
      }),
    });

    if (!response.ok) {
      throw new Error(`TTS API error: ${response.status} ${response.statusText}`);
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);

    // Stop any existing TTS playback before starting a new one
    stopSpeech();

    // Create and track the current audio instance
    currentAudio = new Audio(audioUrl);

    // Create a promise that resolves when audio finishes or errors
    currentPlaybackPromise = new Promise<void>((resolve, reject) => {
      if (!currentAudio) {
        reject(new Error('Audio instance not available'));
        return;
      }

      // Clean up the object URL and resolve promise when audio finishes
      currentAudio.onended = () => {
        try {
          URL.revokeObjectURL(audioUrl);
        } catch (e) {
          console.warn('Failed to revoke URL on ended:', e);
        } finally {
          currentAudio = null;
          currentPlaybackPromise = null;
          resolve();
        }
      };

      // Handle audio errors
      currentAudio.onerror = (error) => {
        console.error('Audio playback error:', error);
        try {
          URL.revokeObjectURL(audioUrl);
        } catch (e) {
          console.warn('Failed to revoke URL on error:', e);
        } finally {
          currentAudio = null;
          currentPlaybackPromise = null;
          reject(new Error('Audio playback failed'));
        }
      };

      // Handle if audio is stopped/paused externally
      currentAudio.onpause = () => {
        if (currentAudio && currentAudio.currentTime === 0) {
          // Audio was stopped (currentTime reset to 0)
          try {
            URL.revokeObjectURL(audioUrl);
          } catch (e) {
            console.warn('Failed to revoke URL on pause:', e);
          } finally {
            currentAudio = null;
            currentPlaybackPromise = null;
            resolve();
          }
        }
      };

      // Start playing
      currentAudio.play().catch((error) => {
        console.error('Failed to start audio playback:', error);
        try {
          URL.revokeObjectURL(audioUrl);
        } catch (e) {
          console.warn('Failed to revoke URL on play error:', e);
        } finally {
          currentAudio = null;
          currentPlaybackPromise = null;
          reject(error);
        }
      });
    });

    return currentPlaybackPromise;
  } catch (error) {
    console.error('TTS Error:', error);
    throw error;
  }
};

/**
 * Speaks the given text with automatic language detection
 * @param text - The text to speak
 * @param speed - Playback speed (default: 1.0)
 * @returns Promise that resolves when audio finishes playing
 */
export const speakText = async (text: string, speed: string = '1.0'): Promise<void> => {
  return textToSpeech({ input: text, speed });
};

/**
 * Speaks text with a specific voice
 * @param text - The text to speak
 * @param voice - The voice to use
 * @param speed - Playback speed (default: 1.0)
 * @returns Promise that resolves when audio finishes playing
 */
export const speakWithVoice = async (text: string, voice: string, speed: string = '1.0'): Promise<void> => {
  return textToSpeech({ input: text, voice, speed });
};

/**
 * Check if TTS is currently playing
 * @returns boolean indicating if audio is currently playing
 */
export const isSpeaking = (): boolean => {
  return currentAudio !== null && !currentAudio.paused && !currentAudio.ended;
};

/**
 * Get current playback promise
 * @returns Current playback promise or null
 */
export const getCurrentPlaybackPromise = (): Promise<void> | null => {
  return currentPlaybackPromise;
};