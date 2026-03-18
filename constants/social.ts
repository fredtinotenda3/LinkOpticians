// constants/social.ts
// Social media configuration for Link Opticians

export interface SocialMediaPlatform {
  id: string;
  name: string;
  icon: string;
  url: string;
  color: string;
  description: string;
  primary?: boolean; // For WhatsApp as primary contact method
}

export const SOCIAL_MEDIA_LINKS: SocialMediaPlatform[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: '/assets/icons/social/whatsapp.svg', // You'll need to add this icon
    url: 'https://wa.me/263773407464', // Using the emergency number from the code
    color: '#25D366',
    description: 'Message us on WhatsApp',
    primary: true // WhatsApp is primary for African markets
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: '/assets/icons/social/facebook.svg', // You'll need to add this icon
    url: 'https://facebook.com/linkopticians',
    color: '#1877F2',
    description: 'Follow us on Facebook'
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: '/assets/icons/social/instagram.svg', // You'll need to add this icon
    url: 'https://instagram.com/linkopticians',
    color: '#E4405F',
    description: 'Follow us on Instagram'
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: '/assets/icons/social/youtube.svg', // You'll need to add this icon
    url: 'https://youtube.com/@linkopticians',
    color: '#FF0000',
    description: 'Watch our videos on YouTube'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: '/assets/icons/social/linkedin.svg', // You'll need to add this icon
    url: 'https://linkedin.com/company/link-opticians',
    color: '#0A66C2',
    description: 'Connect with us on LinkedIn'
  },
  {
    id: 'twitter',
    name: 'Twitter / X',
    icon: '/assets/icons/social/twitter.svg', // You'll need to add this icon
    url: 'https://twitter.com/linkopticians',
    color: '#000000',
    description: 'Follow us on Twitter'
  }
];

// WhatsApp contact info (separate for easy access)
export const WHATSAPP_CONTACT = {
  phone: '+263 77 340 7464',
  formattedPhone: '263773407464',
  url: 'https://wa.me/263773407464',
  message: 'Hello Link Opticians, I would like to inquire about...'
};

// Helper function to generate WhatsApp URL with pre-filled message
export const getWhatsAppUrl = (message?: string) => {
  const defaultMessage = 'Hello Link Opticians, I would like to inquire about your services.';
  const encodedMessage = encodeURIComponent(message || defaultMessage);
  return `https://wa.me/263773407464?text=${encodedMessage}`;
};

// Social media display configuration
export const SOCIAL_MEDIA_CONFIG = {
  // Which platforms to show in different sections
  footer: ['whatsapp', 'facebook', 'instagram', 'youtube'],
  contactPage: ['whatsapp', 'facebook', 'instagram', 'youtube', 'linkedin'],
  header: ['whatsapp'], // Optional: Only WhatsApp in header if space is limited
  
  // Size options for icons
  iconSize: {
    small: 'w-5 h-5',
    medium: 'w-6 h-6',
    large: 'w-8 h-8'
  }
};

// Alternative: If you want simple array format without icons
export const SIMPLE_SOCIAL_LINKS = [
  { name: 'WhatsApp', url: 'https://wa.me/263773407464' },
  { name: 'Facebook', url: 'https://facebook.com/linkopticians' },
  { name: 'Instagram', url: 'https://instagram.com/linkopticians' },
  { name: 'YouTube', url: 'https://youtube.com/@linkopticians' },
];

// ADD TO EXISTING constants/social.ts file:

// ==================== SMS CONFIGURATION ====================
export interface SMSReminderConfig {
  enabled: boolean;
  reminderTimes: number[]; // hours before appointment
  templates: {
    confirmation: (name: string, date: string, time: string, branch: string) => string;
    reminder24h: (name: string, date: string, time: string, branch: string) => string;
    reminder3h: (name: string, date: string, time: string) => string; // Removed branch parameter
    cancelled: (name: string, date: string, time: string) => string;
    rescheduled: (name: string, oldDate: string, newDate: string, newTime: string) => string;
  };
}

export const SMS_CONFIG = {
  appointmentReminders: {
    enabled: true,
    // Reminder times (hours before appointment)
    reminderTimes: [24, 3], // 24 hours and 3 hours before
    // Message templates
    templates: {
      confirmation: (name: string, date: string, time: string, branch: string) => 
        `Hello ${name}, your appointment at Link Opticians is confirmed for ${date} at ${time} at ${branch}. Please arrive 10 minutes early.`,
      
      reminder24h: (name: string, date: string, time: string, branch: string) =>
        `Reminder: Your Link Opticians appointment is tomorrow (${date}) at ${time} at ${branch}. Call +263242700000 for changes.`,
      
      reminder3h: (name: string, date: string, time: string) => // Removed unused branch parameter
        `Reminder: Your Link Opticians appointment is today at ${time}. Please bring medical aid card if applicable.`,
      
      cancelled: (name: string, date: string, time: string) =>
        `Dear ${name}, your Link Opticians appointment on ${date} at ${time} has been cancelled. Call +263242700000 to reschedule.`,
      
      rescheduled: (name: string, oldDate: string, newDate: string, newTime: string) =>
        `Hello ${name}, your Link Opticians appointment has been rescheduled to ${newDate} at ${newTime} (was ${oldDate}).`
    }
  },
  
  // SMS opt-in messages
  optIn: {
    welcome: "Thank you for opting into SMS reminders from Link Opticians. You'll receive appointment confirmations and reminders.",
    help: "Reply STOP to unsubscribe. Standard SMS rates may apply.",
    stop: "You have been unsubscribed from Link Opticians SMS reminders. Reply START to resubscribe."
  }
};

// Helper function to format date for SMS (Zimbabwe format)
export const formatSMSDate = (date: Date): string => {
  return date.toLocaleDateString('en-ZW', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

// Helper function to format time for SMS (Zimbabwe format)  
export const formatSMSTime = (date: Date): string => {
  return date.toLocaleTimeString('en-ZW', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

// Type for SMS reminder data
export interface SMSReminderData {
  patientName: string;
  patientPhone: string;
  appointmentId: string;
  appointmentDate: Date;
  branchName?: string;
  status: 'pending' | 'schedule' | 'cancelled'; // Using your Status type
  smsOptIn: boolean;
}