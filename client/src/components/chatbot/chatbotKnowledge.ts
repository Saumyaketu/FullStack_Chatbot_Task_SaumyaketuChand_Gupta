import { UserType } from '../../types';

export interface BotResponseRule {
  intent: string;
  triggerPhrases: string[];
  keywords: string[];
  responseText: string;
  followUpChips?: string[];
  triggerLeadForm?: boolean;
  preselectedUserType?: UserType;
  preselectedService?: string;
}

export const PREDEFINED_QUESTIONS = [
  'What services does DroneTV provide?',
  'What courses / training are available?',
  'How can I contact DroneTV?',
  'How can I register?',
  'I am interested in a service.',
  'I am a student.',
  'I want to speak with someone.',
];

export const BOT_RULES: BotResponseRule[] = [
  {
    intent: 'services_overview',
    triggerPhrases: ['what services does dronetv provide?', 'services', 'what services', 'commercial services'],
    keywords: ['service', 'services', 'survey', 'cinematography', 'mapping', 'inspection', 'spraying', 'agriculture', 'thermal'],
    responseText:
      "🚁 **DroneTV Commercial Drone Services:**\n\n1. **Aerial Surveying & 3D Mapping**: High-precision LiDAR & photogrammetry for construction, highways & urban planning.\n2. **Industrial Asset Inspection**: Thermal & ultrasonic drone diagnostics for solar farms, wind turbines & powerlines.\n3. **Precision Agriculture Spraying**: Targeted nutrient delivery & crop health NDVI multispectral analysis.\n4. **Cinematography & Broadcast**: Cinema-grade FPV and heavy-lifter aerial footage for tourism & media.\n\nWould you like a custom quotation or project estimate?",
    followUpChips: [
      'I am interested in a service.',
      'What courses / training are available?',
      'I want to speak with someone.',
    ],
  },
  {
    intent: 'courses_overview',
    triggerPhrases: ['what courses / training are available?', 'courses', 'training', 'drone pilot course'],
    keywords: ['course', 'courses', 'training', 'pilot', 'dgca', 'license', 'certificate', 'rpc', 'academy', 'learn'],
    responseText:
      "🎓 **DroneTV Flight Academy Programs:**\n\n• **DGCA Remote Pilot Certification (RPC)**: Official license for small/medium commercial drones with simulator & ground school.\n• **Industrial Mapping & Photogrammetry**: Hands-on workflow with Pix4D, DJI Terra & LiDAR processing.\n• **Agricultural Drone Operations**: Certified pesticide handling and precision flight patterns.\n• **FPV Cinema & Aerial Filming**: High-speed manual drone piloting for commercial directors.\n\nWe provide 100% DGCA syllabus compliance, real flight hours, and placement assistance!",
    followUpChips: [
      'I am a student.',
      'How can I register?',
      'How can I contact DroneTV?',
    ],
  },
  {
    intent: 'contact_info',
    triggerPhrases: ['how can i contact dronetv?', 'contact', 'contact info', 'reach out', 'phone number'],
    keywords: ['contact', 'phone', 'email', 'address', 'call', 'reach', 'office', 'location', 'whatsapp'],
    responseText:
      "📞 **Connect with DroneTV:**\n\n• **Direct Phone**: +91 98765 43210 (Mon–Sat, 9 AM – 7 PM)\n• **Official Email**: contact@dronetv.in / admissions@dronetv.in\n• **Headquarters**: Tech Innovation Drone Park, Bangalore, Karnataka, India\n• **Flight Test Hub**: Aero Training Grounds, Pune & Hyderabad\n\nFill out our quick form below or click 'I want to speak with someone' for an immediate callback!",
    followUpChips: [
      'I want to speak with someone.',
      'How can I register?',
      'What services does DroneTV provide?',
    ],
  },
  {
    intent: 'how_to_register',
    triggerPhrases: ['how can i register?', 'how to register', 'enroll', 'sign up', 'apply'],
    keywords: ['register', 'registration', 'enroll', 'enrollment', 'join', 'admission', 'apply'],
    responseText:
      "📝 **Quick Registration Process:**\n\n1. Select your target program (Pilot Certification, Mapping, or Agriculture).\n2. Submit your contact details using the form below.\n3. Our admissions counselor will schedule your document verification (Aadhaar & passport) and confirm your batch dates.\n\nYou can submit your enrollment details right here!",
    followUpChips: ['I am a student.', 'I am interested in a service.', 'I want to speak with someone.'],
    triggerLeadForm: true,
  },
  {
    intent: 'interested_in_service',
    triggerPhrases: ['i am interested in a service.', 'i want a service', 'hire drone', 'service enquiry'],
    keywords: ['interested in a service', 'hire drone', 'quotation', 'enterprise', 'project', 'client'],
    responseText:
      "💼 **Commercial Project Consultation:**\n\nWe would be glad to partner with your organization. Please provide your project requirements below, and our senior drone solutions architect will prepare a customized proposal within 4 business hours.",
    followUpChips: ['What services does DroneTV provide?', 'I want to speak with someone.'],
    triggerLeadForm: true,
    preselectedUserType: 'Customer',
  },
  {
    intent: 'student_inquiry',
    triggerPhrases: ['i am a student.', 'student', 'student admission'],
    keywords: ['student', 'fresher', 'college', 'engineering student', 'career', 'job', 'fee', 'discount'],
    responseText:
      "🎓 **Welcome Future Drone Pilot!**\n\nWe offer special student scholarship vouchers, simulator access, and fast-track DGCA Remote Pilot Certification. Fill out your details below to receive the student brochure and upcoming weekend batch schedule!",
    followUpChips: ['What courses / training are available?', 'How can I register?', 'I want to speak with someone.'],
    triggerLeadForm: true,
    preselectedUserType: 'Student',
  },
  {
    intent: 'speak_with_someone',
    triggerPhrases: ['i want to speak with someone.', 'speak with someone', 'talk to human', 'human agent', 'call me'],
    keywords: ['speak with someone', 'talk to someone', 'representative', 'human', 'callback', 'executive', 'support agent'],
    responseText:
      "👤 **Priority Callback Request:**\n\nOur drone specialists are on standby. Leave your contact number and query below, and our operations coordinator will phone you directly today.",
    followUpChips: ['How can I contact DroneTV?', 'What services does DroneTV provide?'],
    triggerLeadForm: true,
  },
];

export const FALLBACK_RESPONSE = {
  text: "🤖 I am the **DroneTV AI Assistant**. I can help you explore our DGCA pilot courses, commercial drone services, fee structures, and registration details.\n\nPlease choose one of the popular topics below, or leave your enquiry so our team can reach out to you directly!",
  chips: [
    'What services does DroneTV provide?',
    'What courses / training are available?',
    'How can I register?',
    'I want to speak with someone.',
  ],
};

/**
 * Intelligent rule-based & keyword intent matcher
 */
export function matchBotIntent(userInput: string): {
  reply: string;
  chips: string[];
  triggerForm: boolean;
  userType?: UserType;
  service?: string;
} {
  const normalized = userInput.trim().toLowerCase();

  // 1. Direct exact or prefix phrase match
  for (const rule of BOT_RULES) {
    if (
      rule.triggerPhrases.some((phrase) =>
        normalized === phrase.toLowerCase() ||
        normalized.includes(phrase.toLowerCase())
      )
    ) {
      return {
        reply: rule.responseText,
        chips: rule.followUpChips || FALLBACK_RESPONSE.chips,
        triggerForm: !!rule.triggerLeadForm,
        userType: rule.preselectedUserType,
        service: rule.preselectedService,
      };
    }
  }

  // 2. Keyword relevance scoring
  let bestRule: BotResponseRule | null = null;
  let maxScore = 0;

  for (const rule of BOT_RULES) {
    let score = 0;
    for (const keyword of rule.keywords) {
      if (normalized.includes(keyword)) {
        score += 1;
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestRule = rule;
    }
  }

  if (bestRule && maxScore > 0) {
    return {
      reply: bestRule.responseText,
      chips: bestRule.followUpChips || FALLBACK_RESPONSE.chips,
      triggerForm: !!bestRule.triggerLeadForm,
      userType: bestRule.preselectedUserType,
      service: bestRule.preselectedService,
    };
  }

  // 3. Fallback response
  return {
    reply: FALLBACK_RESPONSE.text,
    chips: FALLBACK_RESPONSE.chips,
    triggerForm: false,
  };
}
