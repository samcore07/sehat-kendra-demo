import React from 'react';
import { useVoiceAssistance } from '../../hooks/useVoiceAssistance';
import { useLanguage } from '../../hooks/useLanguage';

export const AudioAssist = ({ text, language, label, className = '' }) => {
  const { speak, stop, isSpeaking, supported, voiceAvailable, voiceUnavailableMessage } = useVoiceAssistance();
  const { t } = useLanguage();

  if (!supported) return null;

  const displayLabel = label || t('common.listen', 'Listen');
  const stopLabel = t('common.stop', 'Stop');

  if (!voiceAvailable) {
    return (
      <span
        className={`audio-assist-unavailable ${className}`.trim()}
        title={voiceUnavailableMessage}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '12px',
          color: 'var(--color-on-surface-variant)',
          background: 'var(--color-surface-container-high)',
          border: '1px dashed var(--color-outline-variant, #ccc)',
          padding: '4px 10px',
          borderRadius: 'var(--radius-full)',
          cursor: 'help'
        }}
        role="status"
        aria-label={voiceUnavailableMessage}
      >
        <span className="icon icon-sm" aria-hidden="true" style={{ fontSize: '15px' }}>
          volume_off
        </span>
        <span style={{ fontSize: '11px', fontWeight: 500 }}>
          {t('common.listen', 'Voice')} {t('status.pending', 'Unavailable')}
        </span>
      </span>
    );
  }

  return (
    <button
      type="button"
      className={`btn btn-sm ${isSpeaking ? 'btn-primary' : 'btn-surface'} ${className}`.trim()}
      onClick={() => (isSpeaking ? stop() : speak(text, language))}
      aria-label={isSpeaking ? `${stopLabel}: ${displayLabel}` : `${displayLabel}`}
      title={isSpeaking ? stopLabel : displayLabel}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
    >
      <span className={`icon icon-sm ${isSpeaking ? 'animate-pulse' : ''}`} aria-hidden="true">
        {isSpeaking ? 'volume_off' : 'volume_up'}
      </span>
      <span>{isSpeaking ? stopLabel : displayLabel}</span>
    </button>
  );
};
