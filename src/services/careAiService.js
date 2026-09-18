import { EMERGENCY_TRIGGERS } from '../data/careAiSuggestions';

export const careAiService = {
  /**
   * Evaluates if the message contains severe or life-threatening symptoms
   */
  detectEmergency(message = '') {
    const text = message.toLowerCase();
    return EMERGENCY_TRIGGERS.some((trigger) => text.includes(trigger));
  },

  /**
   * Generates a conversational, educational, non-diagnostic response.
   * Abstracted so backend AI APIs can seamlessly plug in.
   */
  async sendMessage(userMessage, patientContext = {}) {
    // Simulate brief network / typing latency
    await new Promise((resolve) => setTimeout(resolve, 650));

    const isEmergency = this.detectEmergency(userMessage);
    const lower = userMessage.toLowerCase();

    if (isEmergency) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        isEmergency: true,
        text: "URGENT MEDICAL ADVISORY: The symptoms you described may indicate a severe or life-threatening condition that requires immediate clinical evaluation. Please seek urgent emergency medical attention right now.",
        emergencyActions: [
          { label: 'Call 108 (National Emergency Ambulance)', action: 'call:108', primary: true },
          { label: 'Call 112 (National Unified Emergency)', action: 'call:112' },
          { label: 'Find Nearest Emergency Hospital Triage', action: 'route:/patient/book-appointment' }
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: [
          'What should I tell the emergency responder?',
          'How do I find the nearest government hospital?'
        ]
      };
    }

    // Contextual Educational Responses
    let responseText = '';
    let suggestions = [];

    if (lower.includes('condition') || lower.includes('blood pressure') || lower.includes('diabetes') || lower.includes('hypertension')) {
      const conditions = [];
      if (patientContext.hypertension) conditions.push('High Blood Pressure (Hypertension)');
      if (patientContext.diabetes) conditions.push('Type 2 Diabetes Mellitus');
      const conditionList = conditions.length > 0 ? conditions.join(' and ') : 'chronic health management';

      responseText = `In general health education, conditions such as ${conditionList} involve chronic metabolic and vascular regulation. Hypertension means the force of blood against artery walls is consistently elevated, while Diabetes involves how effectively your body regulates blood glucose. Both conditions are best managed with regular medical reviews, consistent adherence to your physician's prescribed medicines, balanced hydration, and low-sodium nutrition.`;
      suggestions = [
        'Help me understand my medicine',
        'When should I consult a doctor?',
        'General wellness guidance'
      ];
    } else if (lower.includes('medicine') || lower.includes('metformin') || lower.includes('amlodipine') || lower.includes('drug')) {
      responseText = `Medicines like Metformin are generally prescribed by physicians to help improve insulin sensitivity and manage blood sugar levels, often taken with or after meals to minimize stomach upset. Amlodipine is a calcium channel blocker commonly used to relax blood vessels and lower blood pressure. It is crucial to take all medicines exactly at the times and dosages prescribed by your doctor and never alter your dosage without medical guidance.`;
      suggestions = [
        'When should I consult a doctor?',
        'What lifestyle practices help blood pressure?',
        'Explain my medical condition'
      ];
    } else if (lower.includes('when') && lower.includes('consult') || lower.includes('doctor')) {
      responseText = `You should consult a healthcare professional whenever:
1. You experience new, persistent, or worsening symptoms lasting more than a few days.
2. You notice significant fluctuations in home blood pressure or blood sugar readings.
3. You experience unexpected side effects from prescribed medications.
4. It is time for your scheduled routine follow-up or diagnostic lab check.
Remember, early clinical review helps prevent complications.`;
      suggestions = [
        'Book an appointment now',
        'What is the difference between Allopathy and Ayurveda?',
        'General wellness guidance'
      ];
    } else if (lower.includes('report') || lower.includes('lab') || lower.includes('test')) {
      responseText = `Medical diagnostic reports (such as Complete Blood Count, HbA1c, or Lipid Profile) display reference ranges established for general population averages. A value slightly outside the reference range does not automatically indicate illness; it must always be interpreted by your doctor in the context of your symptoms, medical history, and clinical examination.`;
      suggestions = [
        'Book an appointment now',
        'Explain my medical condition',
        'Help me understand my medicine'
      ];
    } else if (lower.includes('ayurveda') || lower.includes('allopathy') || lower.includes('pathway') || lower.includes('difference')) {
      responseText = `Both General Medicine (Allopathy) and Ayurveda/AYUSH are recognized within India's national healthcare framework:
• General Medicine focuses on evidence-based modern pharmacotherapy, acute disease management, and standard surgical or clinical interventions.
• Ayurveda / AYUSH emphasizes holistic constitutional balance (Prakriti), preventive daily lifestyle routines (Dinacharya), yoga, and traditional wellness formulations.
Patients may consult both systems according to their personal health needs and doctor recommendations.`;
      suggestions = [
        'Explore Ayurveda / AYUSH Centre',
        'Book Appointment',
        'General wellness guidance'
      ];
    } else {
      responseText = `Thank you for sharing. As your Care AI healthcare assistant, I can help explain medical terms, provide health education, and discuss lifestyle wellness habits. However, I do not provide medical diagnoses or prescribe medications. If you have specific physical symptoms, I encourage you to schedule an appointment with a verified healthcare professional.`;
      suggestions = [
        'Explain my medical condition',
        'Help me understand my medicine',
        'When should I consult a doctor?',
        'General wellness guidance'
      ];
    }

    return {
      id: `ai-${Date.now()}`,
      sender: 'ai',
      isEmergency: false,
      text: responseText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions
    };
  }
};
