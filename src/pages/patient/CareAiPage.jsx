import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { PatientContext } from '../../contexts/PatientContext';
import { AudioAssist } from '../../components/ui/AudioAssist';
import { careAiService } from '../../services/careAiService';
import { CARE_AI_SUGGESTIONS } from '../../data/careAiSuggestions';
import { ROUTES } from '../../constants/routes';

export const CareAiPage = () => {
  const { t } = useLanguage();
  const { intakeData } = useContext(PatientContext);
  const navigate = useNavigate();

  const [messages, setMessages] = useState(() => [
    {
      id: 'welcome-1',
      sender: 'ai',
      text: `Hello ${intakeData.fullName || 'Citizen'}, I am Care AI, your digital healthcare guide at SEHAT KENDRA. I can help explain medical terms, discuss general lifestyle wellness, and help you understand your health history. How may I support you today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: CARE_AI_SUGGESTIONS.slice(0, 4)
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeEmergencyAlert, setActiveEmergencyAlert] = useState(null);

  const messagesEndRef = useRef(null);

  const messageIdCounterRef = useRef(1);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (userText) => {
    const text = (userText || inputPrompt).trim();
    if (!text) return;

    messageIdCounterRef.current += 1;
    const userMsg = {
      id: `user-${messageIdCounterRef.current}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsTyping(true);

    try {
      const aiResponse = await careAiService.sendMessage(text, intakeData);
      setIsTyping(false);
      setMessages((prev) => [...prev, aiResponse]);

      if (aiResponse.isEmergency) {
        setActiveEmergencyAlert({
          message: aiResponse.text,
          actions: aiResponse.emergencyActions
        });
      }
    } catch (err) {
      console.error('Care AI Error:', err);
      setIsTyping(false);
      messageIdCounterRef.current += 1;
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${messageIdCounterRef.current}`,
          sender: 'ai',
          text: 'We are experiencing temporary network congestion. Please consult a qualified doctor for immediate medical queries.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  };

  return (
    <div className="portal-page animate-fade-in" style={{ padding: 'var(--space-lg) var(--gutter-mobile)' }}>
      {/* Top Breadcrumb & Disclaimer Header */}
      <div style={{ maxWidth: '840px', margin: '0 auto', marginBottom: 'var(--space-md)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-xs)' }}>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => navigate(ROUTES.PATIENT_HOME)}
          >
            <span className="icon icon-sm" aria-hidden="true">arrow_back</span>
            <span>{t('ayush.backToHome', 'Back to Patient Home')}</span>
          </button>
          <span className="badge badge-secondary">Public Health Assistant</span>
        </div>

        {/* Prominent Statutory Disclaimer */}
        <div style={{ background: 'var(--color-surface-container-low)', borderLeft: '4px solid var(--color-primary)', borderRadius: 'var(--radius-md)', padding: '10px 14px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
          <span className="icon icon-sm" style={{ color: 'var(--color-primary)', marginTop: '2px' }} aria-hidden="true">info</span>
          <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-on-surface-variant)', lineHeight: 1.5 }}>
            <strong>Statutory Disclaimer:</strong> Care AI provides general health education and terminology guidance. It does <strong>NOT diagnose medical conditions</strong>, prescribe treatments, or substitute for consultation with a qualified doctor.
          </p>
        </div>
      </div>

      {/* Emergency Alert Banner if triggered */}
      {activeEmergencyAlert && (
        <div style={{ maxWidth: '840px', margin: '0 auto var(--space-md)', background: 'var(--color-error-container)', color: 'var(--color-on-error-container)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-md)', border: '2px solid var(--color-error)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <span className="icon icon-lg" style={{ color: 'var(--color-error)' }} aria-hidden="true">emergency</span>
            <div style={{ flex: 1 }}>
              <strong style={{ fontSize: '14px', display: 'block', marginBottom: '4px' }}>
                Urgent Clinical Attention Advised
              </strong>
              <p style={{ margin: '0 0 12px', fontSize: '13px' }}>
                {activeEmergencyAlert.message}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <a
                  href="tel:108"
                  className="btn btn-sm"
                  style={{ background: 'var(--color-error)', color: '#ffffff', textDecoration: 'none' }}
                >
                  <span className="icon icon-sm" aria-hidden="true">call</span>
                  <span>Dial 108 Ambulance</span>
                </a>
                <a
                  href="tel:112"
                  className="btn btn-sm btn-surface"
                  style={{ textDecoration: 'none' }}
                >
                  <span className="icon icon-sm" aria-hidden="true">call</span>
                  <span>Dial 112 National Emergency</span>
                </a>
                <button
                  type="button"
                  className="btn btn-sm btn-surface"
                  onClick={() => navigate(ROUTES.BOOK_APPOINTMENT)}
                >
                  <span className="icon icon-sm" aria-hidden="true">local_hospital</span>
                  <span>Hospital Triage Node</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Chat Container */}
      <div className="card" style={{ maxWidth: '840px', margin: '0 auto', display: 'flex', flexDirection: 'column', height: '68vh', minHeight: '520px', padding: 0, overflow: 'hidden' }}>
        {/* Chat Header */}
        <div style={{ padding: 'var(--space-md) var(--space-lg)', borderBottom: '1px solid var(--color-outline-variant)', background: 'var(--color-surface-container-low)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: 'var(--radius-full)', background: 'var(--color-primary-container)', color: 'var(--color-on-primary-container)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="icon icon-md" aria-hidden="true">support_agent</span>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--color-on-surface)' }}>Care AI Assistant</div>
              <div style={{ fontSize: '12px', color: 'var(--color-tertiary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-tertiary)' }} />
                <span>Verified Public Health Protocol</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-surface btn-sm"
            onClick={() => navigate(ROUTES.BOOK_APPOINTMENT)}
          >
            <span className="icon icon-sm" aria-hidden="true">calendar_month</span>
            <span>Book Doctor</span>
          </button>
        </div>

        {/* Message Stream */}
        <div style={{ flex: 1, padding: 'var(--space-md) var(--space-lg)', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px', background: 'var(--color-surface)' }}>
          {messages.map((msg) => {
            const isAi = msg.sender === 'ai';
            return (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isAi ? 'flex-start' : 'flex-end'
                }}
              >
                <div
                  style={{
                    maxWidth: '82%',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-lg)',
                    background: isAi ? 'var(--color-surface-container-lowest)' : 'var(--color-primary)',
                    color: isAi ? 'var(--color-on-surface)' : 'var(--color-on-primary)',
                    border: isAi ? '1px solid var(--color-outline-variant)' : 'none',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                    fontSize: '14px',
                    lineHeight: 1.55
                  }}
                >
                  <p style={{ margin: 0, whiteSpace: 'pre-line' }}>{msg.text}</p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginTop: '8px', fontSize: '11px', opacity: 0.8 }}>
                    <span>{msg.timestamp}</span>
                    {isAi && (
                      <AudioAssist text={msg.text} label="Listen" className="btn-xs" />
                    )}
                  </div>
                </div>

                {/* AI Follow-up Suggestions */}
                {isAi && msg.suggestions && msg.suggestions.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px', maxWidth: '82%' }}>
                    {msg.suggestions.map((sug, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className="btn btn-surface btn-xs"
                        style={{ borderRadius: 'var(--radius-full)', fontSize: '12px' }}
                        onClick={() => {
                          if (sug.includes('Book') || sug.includes('appointment')) {
                            navigate(ROUTES.BOOK_APPOINTMENT);
                          } else if (sug.includes('Ayurveda')) {
                            navigate(ROUTES.AYUSH);
                          } else {
                            handleSend(sug);
                          }
                        }}
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {isTyping && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-on-surface-variant)', fontSize: '12px', padding: '6px 12px' }}>
              <span className="icon icon-sm animate-spin" aria-hidden="true">sync</span>
              <span>Care AI is consulting medical guidelines...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Tray */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          style={{ padding: 'var(--space-sm) var(--space-lg)', borderTop: '1px solid var(--color-outline-variant)', background: 'var(--color-surface-container-lowest)', display: 'flex', gap: '10px', alignItems: 'center' }}
        >
          <input
            type="text"
            className="form-input"
            style={{ flex: 1 }}
            placeholder="Ask general questions about conditions, terms, or medicines..."
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            disabled={isTyping}
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isTyping || !inputPrompt.trim()}
          >
            <span>Send</span>
            <span className="icon icon-sm" aria-hidden="true">send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
