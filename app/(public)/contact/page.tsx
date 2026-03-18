// app/(public)/contact/page.tsx
import { ContactForm } from "@/components/ui/forms/ContactForm";
import {
  ContactHeroSection,
  ContactMethodsGrid,
  ContactInfoSection,
  LocationsGridSection,
  FAQSection,
  ContactCTASection
} from "@/components/sections/contact";
import { CONTACT_PAGE_CONFIG } from "@/constants/contact-page";

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <ContactHeroSection {...CONTACT_PAGE_CONFIG.hero} />
      <ContactMethodsGrid {...CONTACT_PAGE_CONFIG.contactMethods} />
      
      {/* Pass ContactForm as a child */}
      <ContactInfoSection {...CONTACT_PAGE_CONFIG.contactInfo}>
        <ContactForm />
      </ContactInfoSection>
      
      <LocationsGridSection {...CONTACT_PAGE_CONFIG.locations} />
      <FAQSection {...CONTACT_PAGE_CONFIG.faq} />
      <ContactCTASection {...CONTACT_PAGE_CONFIG.cta} />
    </div>
  );
}