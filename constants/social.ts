// constants/social.ts
// Social media configuration for Link Opticians

export interface SocialMediaPlatform {
  id: string;
  name: string;
  icon: string;
  url: string;
  color: string;
  description: string;
  primary?: boolean;
}

// ✅ CORRECT INTERNATIONAL NUMBER (NO SPACES, NO LEADING 0)
const WHATSAPP_NUMBER = "263737683090";

export const SOCIAL_MEDIA_LINKS: SocialMediaPlatform[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: '/assets/icons/social/whatsapp.svg',
    url: `https://wa.me/${WHATSAPP_NUMBER}`,
    color: '#25D366',
    description: 'Message us on WhatsApp',
    primary: true
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: '/assets/icons/social/facebook.svg',
    url: 'https://facebook.com/linkopticians',
    color: '#1877F2',
    description: 'Follow us on Facebook'
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: '/assets/icons/social/instagram.svg',
    url: 'https://instagram.com/linkopticians',
    color: '#E4405F',
    description: 'Follow us on Instagram'
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: '/assets/icons/social/youtube.svg',
    url: 'https://youtube.com/@linkopticians',
    color: '#FF0000',
    description: 'Watch our videos on YouTube'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: '/assets/icons/social/linkedin.svg',
    url: 'https://linkedin.com/company/link-opticians',
    color: '#0A66C2',
    description: 'Connect with us on LinkedIn'
  },
  {
    id: 'twitter',
    name: 'Twitter / X',
    icon: '/assets/icons/social/twitter.svg',
    url: 'https://twitter.com/linkopticians',
    color: '#000000',
    description: 'Follow us on Twitter'
  }
];

// ✅ CLEANED CONTACT OBJECT
export const WHATSAPP_CONTACT = {
  phone: WHATSAPP_NUMBER,
  formattedPhone: '073 768 3090',
  url: `https://wa.me/${WHATSAPP_NUMBER}`,
  message: 'Hello Link Opticians, I would like to inquire about...'
};

// ✅ FIXED FUNCTION
export const getWhatsAppUrl = (message?: string) => {
  const defaultMessage = 'Hello Link Opticians, I would like to inquire about your services.';
  const encodedMessage = encodeURIComponent(message || defaultMessage);

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
};

// ==================== ADDED MISSING EXPORTS FOR APPOINTMENT ACTIONS ====================

// SMS Configuration
export const SMS_CONFIG = {
  appointmentReminders: {
    templates: {
      confirmation: (name: string, date: string, time: string, branch: string) =>
        `Hi ${name}, your appointment at ${branch} on ${date} at ${time} is confirmed. Reply HELP for assistance.`,
      
      reminder24h: (name: string, date: string, time: string, branch: string) =>
        `REMINDER: ${name}, your appointment at ${branch} is TOMORROW at ${time}. Reply HELP for assistance.`,
      
      reminder3h: (name: string, date: string, time: string) =>
        `REMINDER: ${name}, your appointment is in 3 hours at ${time}. Reply HELP for assistance.`,
      
      cancelled: (name: string, date: string, time: string) =>
        `Hi ${name}, your appointment scheduled for ${date} at ${time} has been CANCELLED. Reply HELP for assistance.`,
      
      rescheduled: (name: string, oldDate: string, newDate: string) =>
        `Hi ${name}, your appointment has been RESCHEDULED from ${oldDate} to ${newDate}. Reply HELP for assistance.`,
    }
  },
  optIn: {
    help: "Reply HELP for support. Msg & data rates may apply."
  }
};

// Date formatting functions for SMS
export const formatSMSDate = (date: Date): string => {
  return date.toLocaleDateString('en-ZW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatSMSTime = (date: Date): string => {
  return date.toLocaleTimeString('en-ZW', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

// ==================== OTHER CONFIG ====================

export const SOCIAL_MEDIA_CONFIG = {
  footer: ['whatsapp', 'facebook', 'instagram', 'youtube'],
  contactPage: ['whatsapp', 'facebook', 'instagram', 'youtube', 'linkedin'],
  header: ['whatsapp'],
  iconSize: {
    small: 'w-5 h-5',
    medium: 'w-6 h-6',
    large: 'w-8 h-8'
  }
};

export const SIMPLE_SOCIAL_LINKS = [
  { name: 'WhatsApp', url: `https://wa.me/${WHATSAPP_NUMBER}` },
  { name: 'Facebook', url: 'https://facebook.com/linkopticians' },
  { name: 'Instagram', url: 'https://instagram.com/linkopticians' },
  { name: 'YouTube', url: 'https://youtube.com/@linkopticians' },
];