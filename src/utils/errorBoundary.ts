// Lightweight Google Translate error suppression
export function createGoogleTranslateErrorBoundary() {
  // Only handle specific Google Translate errors, don't interfere with React
  const isGoogleTranslateError = (error: any): boolean => {
    const errorMessage = error?.message || String(error);
    const stack = error?.stack || '';

    return (
      errorMessage.includes('closure_lm_') ||
      errorMessage.includes('goog-te') ||
      stack.includes('translate.google.com') ||
      stack.includes('translate_a/element.js') ||
      (errorMessage.includes('Cannot read properties of null') && stack.includes('google'))
    );
  };

  // Only override setTimeout/setInterval for Google Translate specific callbacks
  const originalSetTimeout = window.setTimeout;
  const originalSetInterval = window.setInterval;

  window.setTimeout = function(callback: any, delay?: number, ...args: any[]) {
    // Only wrap if this looks like a Google Translate callback
    if (typeof callback === 'function') {
      const callbackString = callback.toString();
      if (callbackString.includes('goog') || callbackString.includes('closure') || callbackString.includes('translate')) {
        const wrappedCallback = function() {
          try {
            callback.apply(this, args);
          } catch (error: any) {
            if (isGoogleTranslateError(error)) {
              console.warn('Google Translate setTimeout error suppressed:', error.message);
              return;
            }
            throw error;
          }
        };
        return originalSetTimeout.call(this, wrappedCallback, delay);
      }
    }
    // For non-Google Translate callbacks, use original setTimeout
    return originalSetTimeout.call(this, callback, delay, ...args);
  };

  window.setInterval = function(callback: any, delay?: number, ...args: any[]) {
    // Only wrap if this looks like a Google Translate callback
    if (typeof callback === 'function') {
      const callbackString = callback.toString();
      if (callbackString.includes('goog') || callbackString.includes('closure') || callbackString.includes('translate')) {
        const wrappedCallback = function() {
          try {
            callback.apply(this, args);
          } catch (error: any) {
            if (isGoogleTranslateError(error)) {
              console.warn('Google Translate setInterval error suppressed:', error.message);
              return;
            }
            throw error;
          }
        };
        return originalSetInterval.call(this, wrappedCallback, delay);
      }
    }
    // For non-Google Translate callbacks, use original setInterval
    return originalSetInterval.call(this, callback, delay, ...args);
  };

  // Don't override addEventListener as it's too intrusive
  // Instead, rely on the global error handlers in googleTranslateFix.ts
}

// Initialize the lightweight error boundary
if (typeof window !== 'undefined') {
  createGoogleTranslateErrorBoundary();
}
