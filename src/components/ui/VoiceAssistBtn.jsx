import React from 'react';
import { useVoiceAssistance } from '../../hooks/useVoiceAssistance';
import { useLanguage } from '../../hooks/useLanguage';

export const VoiceAssistBtn = ({ text, label }) => {
  const { speak, stop, isSpeaking, supported, voiceAvailable, voiceUnavailableMessage } = useVoiceAssistance();
  const { t } = useLanguage();

  if (!supported) return null;

  const displayLabel = label || t('common.listen', 'Listen');
  const stopLabel = t('common.stop', 'Stop');

  if (!voiceAvailable) {
    return (
      <span
        className="text-muted"
        title={voiceUnavailableMessage}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '11px',
          color: 'var(--color-on-surface-variant)',
          padding: '2px 6px',
          borderRadius: '4px',
          background: 'var(--color-surface-container-high)',
          border: '1px dashed var(--color-outline-variant, #ccc)'
        }}
        role="status"
        aria-label={voiceUnavailableMessage}
      >
        <span className="icon icon-sm" aria-hidden="true" style={{ fontSize: '13px' }}>
          volume_off
        </span>
        <span>{t('common.listen', 'Voice')} {t('status.pending', 'Unavailable')}</span>
      </span>
    );
  }

  return (
    <button
      type="button"
      className={`btn btn-sm ${isSpeaking ? 'btn-primary' : 'btn-surface'}`}
      onClick={() => (isSpeaking ? stop() : speak(text))}
      aria-label={isSpeaking ? `${stopLabel}: ${displayLabel}` : `${displayLabel}`}
      title={isSpeaking ? stopLabel : displayLabel}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
    >
      <span className={`icon icon-sm ${isSpeaking ? 'animate-pulse' : ''}`} aria-hidden="true">
        {isSpeaking ? 'volume_off' : 'volume_up'}
      </span>
      <span>{isSpeaking ? stopLabel : displayLabel}</span>
    </button>
  );
};
