import { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from './useLanguage';

export const useVoiceAssistance = () => {
  const { lang, currentLangMeta, t } = useLanguage();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const [voices, setVoices] = useState([]);
  const currentUtteranceRef = useRef(null);

  // Initialize SpeechSynthesis voice list
  useEffect(() => {
    if (supported) {
      const updateVoices = () => {
        try {
          const list = window.speechSynthesis.getVoices() || [];
          setVoices(list);
        } catch {
          setVoices([]);
        }
      };

      updateVoices();
      if (typeof window.speechSynthesis.addEventListener === 'function') {
        window.speechSynthesis.addEventListener('voiceschanged', updateVoices);
      } else {
        window.speechSynthesis.onvoiceschanged = updateVoices;
      }

      return () => {
        if (typeof window.speechSynthesis.removeEventListener === 'function') {
          window.speechSynthesis.removeEventListener('voiceschanged', updateVoices);
        } else if (window.speechSynthesis.onvoiceschanged === updateVoices) {
          window.speechSynthesis.onvoiceschanged = null;
        }
      };
    }
  }, [supported]);

  // Cancel any ongoing speech immediately when the language changes
  useEffect(() => {
    if (supported) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }
  }, [lang, supported]);

  // Robust voice matching algorithm respecting the strict zero-English fallback rule
  const findMatchingVoice = useCallback((targetSpeechCode, targetLangPrefix) => {
    if (!voices || voices.length === 0) return null;

    const normalizedTarget = (targetSpeechCode || '').toLowerCase().replace('_', '-');
    const prefix = (targetLangPrefix || normalizedTarget.slice(0, 2)).toLowerCase();

    // STRICT RULE: If the target language is NOT English, we must ONLY search among voices
    // for that specific regional language. NEVER match or fall back to an English voice!
    const isRegional = prefix !== 'en';

    if (isRegional) {
      // 1. Exact match e.g. 'bn-in', 'hi-in', 'ta-in', 'mr-in', 'or-in'
      const exactMatch = voices.find(v => (v.lang || '').toLowerCase().replace('_', '-') === normalizedTarget);
      if (exactMatch) return exactMatch;

      // 2. Language-prefix match with Indian locale e.g. 'bn-IN', 'hi-IN'
      const regionalMatch = voices.find(v => {
        const vl = (v.lang || '').toLowerCase().replace('_', '-');
        return vl.startsWith(prefix) && (vl.includes('-in') || vl.includes('india'));
      });
      if (regionalMatch) return regionalMatch;

      // 3. Any voice matching language-prefix (e.g. 'bn-BD', 'hi')
      const anyLangMatch = voices.find(v => {
        const vl = (v.lang || '').toLowerCase().replace('_', '-');
        return vl.startsWith(prefix);
      });
      if (anyLangMatch) return anyLangMatch;

      // NO MATCH FOUND FOR THIS REGIONAL LANGUAGE. Return null!
      return null;
    }

    // Target IS English
    // Prefer Indian English 'en-IN'
    const enInMatch = voices.find(v => {
      const vl = (v.lang || '').toLowerCase().replace('_', '-');
      return vl === 'en-in' || (vl.startsWith('en') && (vl.includes('-in') || vl.includes('india')));
    });
    if (enInMatch) return enInMatch;

    // Fallback to any English voice (e.g. en-US, en-GB)
    const enMatch = voices.find(v => (v.lang || '').toLowerCase().startsWith('en'));
    if (enMatch) return enMatch;

    // Fallback to default voice if available
    return voices.find(v => v.default) || voices[0] || null;
  }, [voices]);

  const activeSpeechCode = currentLangMeta?.speechCode || 'en-IN';
  const activeLangPrefix = lang || 'en';
  const matchedVoice = findMatchingVoice(activeSpeechCode, activeLangPrefix);

  // Is voice available for the current language?
  // For regional languages, it's available ONLY if matchedVoice is non-null.
  const isRegional = activeLangPrefix !== 'en';
  const voiceAvailable = !isRegional || matchedVoice !== null;

  const speak = (text, customLangCode) => {
    if (!supported || !text) return false;

    const targetCode = customLangCode || activeSpeechCode;
    const targetPrefix = customLangCode ? customLangCode.slice(0, 2) : activeLangPrefix;
    const targetVoice = findMatchingVoice(targetCode, targetPrefix);

    // ZERO-ENGLISH FALLBACK RULE:
    // If user selected regional language and no voice exists for it, DO NOT SPEAK!
    if (targetPrefix !== 'en' && !targetVoice) {
      console.warn(`[SEHAT KENDRA Audio] Voice not installed on this device for ${currentLangMeta?.name || targetCode}. Suppressing fallback to English.`);
      setIsSpeaking(false);
      return false;
    }

    try {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = targetVoice ? targetVoice.lang : targetCode;
      if (targetVoice) {
        utterance.voice = targetVoice;
      }
      utterance.rate = 0.95;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = (e) => {
        if (e.error !== 'interrupted') {
          console.warn('[SEHAT KENDRA Audio] Speech error:', e);
        }
        setIsSpeaking(false);
      };

      currentUtteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      return true;
    } catch (err) {
      console.warn('[SEHAT KENDRA Audio] Speech synthesis failed:', err);
      setIsSpeaking(false);
      return false;
    }
  };

  const stop = () => {
    if (supported && typeof window !== 'undefined') {
      try {
        window.speechSynthesis.cancel();
      } catch {}
      setIsSpeaking(false);
    }
  };

  // Localized message when voice is not available
  const langDisplayName = currentLangMeta?.name || lang.toUpperCase();
  const voiceUnavailableMessage = t(
    'audio.voiceUnavailable',
    `${langDisplayName} voice is not available on this device.`
  );

  return {
    speak,
    stop,
    isSpeaking,
    supported,
    voiceAvailable,
    voiceUnavailableMessage,
    currentLang: lang,
    matchedVoice
  };
};
