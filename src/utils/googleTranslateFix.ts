// Fix for Google Translate DOM manipulation conflicts with React
// This patches Node.prototype methods to handle Google Translate's DOM operations gracefully

declare global {
  interface Window {
    __googleTranslateFixApplied?: boolean;
  }
}

export function applyGoogleTranslateFix() {
  if (typeof window !== 'undefined' && !window.__googleTranslateFixApplied) {

    // Comprehensive error suppression for Google Translate
    const suppressGoogleTranslateErrors = (error: any, context: string = '') => {
      const errorMessage = error?.message || String(error);
      const isGoogleTranslateError =
        errorMessage.includes('closure_lm_') ||
        errorMessage.includes('Cannot read properties of null') ||
        errorMessage.includes('Cannot read properties of undefined') ||
        errorMessage.includes('google.translate') ||
        errorMessage.includes('goog-te') ||
        (error?.stack && error.stack.includes('translate.google.com'));

      if (isGoogleTranslateError) {
        console.warn(`Google Translate error suppressed (${context}):`, errorMessage);
        return true;
      }
      return false;
    };

    // Patch DOM methods
    const originalRemoveChild = Node.prototype.removeChild;
    Node.prototype.removeChild = function (child) {
      try {
        return originalRemoveChild.call(this, child);
      } catch (error: any) {
        if (suppressGoogleTranslateErrors(error, 'removeChild') || error.name === 'NotFoundError') {
          return child;
        }
        throw error;
      }
    };

    const originalInsertBefore = Node.prototype.insertBefore;
    Node.prototype.insertBefore = function (newNode, referenceNode) {
      try {
        return originalInsertBefore.call(this, newNode, referenceNode);
      } catch (error: any) {
        if (suppressGoogleTranslateErrors(error, 'insertBefore') || error.name === 'NotFoundError') {
          try {
            return this.appendChild(newNode);
          } catch (appendError) {
            if (suppressGoogleTranslateErrors(appendError, 'insertBefore->appendChild')) {
              return newNode;
            }
            throw appendError;
          }
        }
        throw error;
      }
    };

    const originalAppendChild = Node.prototype.appendChild;
    Node.prototype.appendChild = function (child) {
      try {
        return originalAppendChild.call(this, child);
      } catch (error: any) {
        if (suppressGoogleTranslateErrors(error, 'appendChild') ||
            error.name === 'NotFoundError' ||
            error.name === 'HierarchyRequestError') {
          return child;
        }
        throw error;
      }
    };

    // Don't patch Object methods as they interfere with React
    // Instead, rely on global error handlers

    // Global error handlers
    const originalErrorHandler = window.onerror;
    window.onerror = function(message, source, lineno, colno, error) {
      if (suppressGoogleTranslateErrors(error || message, 'window.onerror')) {
        return true;
      }

      if (originalErrorHandler) {
        return originalErrorHandler.call(this, message, source, lineno, colno, error);
      }
      return false;
    };

    // Modern error handler
    const originalUnhandledRejection = window.onunhandledrejection;
    window.addEventListener('unhandledrejection', function(event) {
      if (suppressGoogleTranslateErrors(event.reason, 'unhandledrejection')) {
        event.preventDefault();
        return;
      }

      if (originalUnhandledRejection) {
        originalUnhandledRejection.call(this, event);
      }
    });

    // Don't patch console.error as it might hide important errors

    window.__googleTranslateFixApplied = true;
    console.log('Comprehensive Google Translate error suppression applied');
  }
}
