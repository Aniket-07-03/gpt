import { useEffect } from 'react';

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

let scriptLoaded = false;
let translateInitialized = false;

export const useGoogleTranslate = () => {
  useEffect(() => {
    if (scriptLoaded) {
      return;
    }

    // Simple initialization function
    window.googleTranslateElementInit = () => {
      // Prevent multiple initializations
      if (translateInitialized) {
        return;
      }

      // Simple timeout to ensure DOM is ready
      setTimeout(() => {
        const element = document.getElementById('google_translate_element');
        if (element && window.google && window.google.translate && window.google.translate.TranslateElement) {
          // Check if already initialized by looking for existing Google Translate elements
          const existingSelect = element.querySelector('select.goog-te-combo');
          if (existingSelect) {
            translateInitialized = true;
            return;
          }

          // Always clear the element to prevent duplicates
          element.innerHTML = '';

          // Simple constructor call without excessive error handling
          try {
            new window.google.translate.TranslateElement(
              {
                pageLanguage: 'en',
                includedLanguages: 'en,hi,mr',
                layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false,
                multilanguagePage: true,
              },
              'google_translate_element'
            );
            translateInitialized = true;

            // Additional cleanup to prevent text duplication
            setTimeout(() => {
              const selectElement = element.querySelector('select.goog-te-combo') as HTMLSelectElement;
              if (selectElement && selectElement.options) {
                // Clean up duplicate options and fix text duplication
                const seenValues = new Set<string>();
                const seenTexts = new Set<string>();
                const options = Array.from(selectElement.options);

                options.forEach((option: HTMLOptionElement) => {
                  const value = option.value;
                  const text = option.textContent || option.innerText || '';

                  // Remove options with duplicate values or duplicate text content
                  if ((seenValues.has(value) && value !== '') ||
                      (seenTexts.has(text) && text !== '' && text !== 'Select Language')) {
                    option.remove();
                  } else {
                    seenValues.add(value);
                    seenTexts.add(text);

                    // Fix any text duplication within the option itself
                    if (text && text.length > 0) {
                      // Check if text is duplicated (e.g., "EnglishEnglish" or "हिंदीहिंदी")
                      const halfLength = Math.floor(text.length / 2);
                      if (halfLength > 0 && text.substring(0, halfLength) === text.substring(halfLength)) {
                        option.textContent = text.substring(0, halfLength);
                      }
                    }
                  }
                });
              }
            }, 500);

          } catch (error) {
            // Let the global error handlers deal with this
            console.warn('Google Translate initialization failed:', error);
          }
        }
      }, 200);
    };

    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    script.onerror = () => {
      console.error('Failed to load Google Translate script');
      scriptLoaded = false;
    };
    document.body.appendChild(script);

    const style = document.createElement('style');
    style.textContent = `
      .goog-te-banner-frame { display: none !important; }
      body { top: 0 !important; }
      .goog-te-gadget { color: transparent !important; background-color: transparent !important; border: none !important; }
      [id*="google_translate_element"] { display: block !important; }
      .skiptranslate iframe { visibility: hidden !important; display: none !important; }
      .goog-te-balloon-frame { display: none !important; }
      body.VIpgJd-ZVi9od-ORHb { top: 0 !important; margin-top: 0 !important; }
      .goog-te-gadget {
        font-family: 'Arial', sans-serif;
        margin: 0;
        height: auto;
      }
      .goog-te-gadget-simple {
        background-color: white;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        padding: 8px;
        display: flex !important;
        align-items: center;
        width: 100%;
        height: 45px;
      }
      .goog-te-gadget-simple span {
        font-size: 15px;
      }
      .goog-te-gadget-icon {
        background-image: url("https://translate.googleapis.com/translate_static/img/te_ctrl3.gif");
        background-position: -65px 0px;
        width: 24px;
        height: 24px;
        margin-right: 8px;
      }
      #\\:1\\.menuBody table {
        width: 100%;
      }
      .VIpgJd-ZVi9od-vH1Gmf-ibnC6b {
        display: block;
        padding: 12px;
        color: #333;
        text-decoration: none;
        font-size: 16px;
        transition: background-color 0.3s;
        white-space: nowrap;
      }
      .VIpgJd-ZVi9od-vH1Gmf-ibnC6b:hover {
        background-color: #f0f0f0;
        border-radius: 4px;
      }
      .VIpgJd-ZVi9od-vH1Gmf-ibnC6b-gk6SMd {
        display: block;
        padding: 12px;
        color: #333;
        text-decoration: none;
        font-size: 16px;
        background-color: #f0f0f0;
        border-radius: 4px;
      }
      .indicator {
        margin-right: 8px;
      }
      .text {
        font-size: 16px;
      }
      #\\:1\\.menuBody {
        box-sizing: border-box !important;
        width: auto !important;
        height: auto !important;
        min-width: 200px !important;
        background-color: white !important;
        border: 1px solid #e0e0e0 !important;
        border-radius: 8px !important;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2) !important;
        padding: 8px !important;
      }
      #\\:1\\.menuBody table {
        width: 100% !important;
      }
    `;

    document.head.appendChild(style);
    scriptLoaded = true;

    // Function to clean up Google Translate select options
    const cleanupGoogleTranslateOptions = () => {
      const selectElement = document.querySelector('select.goog-te-combo') as HTMLSelectElement;
      if (selectElement && selectElement.options) {
        const seenValues = new Set<string>();
        const seenTexts = new Set<string>();
        const options = Array.from(selectElement.options);

        options.forEach((option: HTMLOptionElement) => {
          const value = option.value;
          const text = option.textContent || option.innerText || '';

          // Remove options with duplicate values or duplicate text content
          if ((seenValues.has(value) && value !== '') ||
              (seenTexts.has(text) && text !== '' && text !== 'Select Language')) {
            option.remove();
          } else {
            seenValues.add(value);
            seenTexts.add(text);

            // Fix any text duplication within the option itself
            if (text && text.length > 0) {
              // Check if text is duplicated (e.g., "EnglishEnglish" or "हिंदीहिंदी")
              const halfLength = Math.floor(text.length / 2);
              if (halfLength > 0 && text.substring(0, halfLength) === text.substring(halfLength)) {
                option.textContent = text.substring(0, halfLength);
              }
            }
          }
        });
      }
    };

    // Set up a mutation observer to clean up duplicate Google Translate elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          // Clean up duplicate Google Translate dropdowns
          const allSelects = document.querySelectorAll('select.goog-te-combo');
          if (allSelects.length > 1) {
            // Keep only the first one, remove the rest
            for (let i = 1; i < allSelects.length; i++) {
              const parent = allSelects[i].closest('.goog-te-gadget-simple');
              if (parent) {
                parent.remove();
              }
            }
          }

          // Clean up options in the remaining select
          setTimeout(cleanupGoogleTranslateOptions, 100);
        }
      });
    });

    // Start observing
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Set up periodic cleanup to catch any text duplication that occurs dynamically
    const periodicCleanup = setInterval(() => {
      cleanupGoogleTranslateOptions();
    }, 3000); // Run every 3 seconds

    // Return cleanup function that doesn't interfere with Google Translate DOM
    return () => {
      observer.disconnect();
      clearInterval(periodicCleanup);
      // Don't remove the script or reset scriptLoaded to avoid conflicts
      // Google Translate manages its own DOM elements
      // The script and styles can persist across route changes
    };

  }, []);
};
