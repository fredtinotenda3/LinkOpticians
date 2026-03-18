// app/(public)/terms-of-service/page.tsx
import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen">
      {/* Simple Header */}
      <div className="border-b border-dark-500 bg-dark-400">
        <div className="mx-auto max-w-4xl px-[5%] py-6">
          <Link href="/" className="text-green-400 hover:text-green-300 transition">
            ← Back to home
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-[5%] py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Terms of Service</h1>
        
        <div className="prose prose-invert prose-green max-w-none">
          <p className="text-white/70 text-lg mb-8">Last updated: February 2026</p>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-white/70 mb-4">
              By accessing or using the Link Opticians website and services, you agree to be bound 
              by these Terms of Service. If you do not agree, please do not use our services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">2. Professional Services</h2>
            <p className="text-white/70 mb-4">
              Link Opticians provides optometry services in accordance with the Pharmacists Council 
              of Zimbabwe regulations. All services are provided by registered optometrists and 
              dispensing opticians.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">3. Appointments</h2>
            <p className="text-white/70 mb-4">By booking an appointment, you agree to:</p>
            <ul className="list-disc pl-6 text-white/70 space-y-2 mb-4">
              <li>Provide accurate personal and medical information</li>
              <li>Arrive on time for your appointment</li>
              <li>Provide at least 2 hours notice for cancellations</li>
              <li>Pay for services not covered by medical aid</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">4. Medical Aid Claims</h2>
            <p className="text-white/70 mb-4">
              We process medical aid claims on your behalf. However, coverage depends on your 
              individual plan. You are responsible for any amounts not covered by your medical aid.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">5. Product Sales</h2>
            <p className="text-white/70 mb-4">
              All eyewear products require a valid prescription. Prescription verification is 
              required before dispensing. Products may be returned within 14 days if unworn and 
              in original packaging, subject to inspection.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">6. Website Use</h2>
            <p className="text-white/70 mb-4">You agree to:</p>
            <ul className="list-disc pl-6 text-white/70 space-y-2 mb-4">
              <li>Use the website for lawful purposes only</li>
              <li>Not attempt to disrupt or compromise site security</li>
              <li>Not use automated tools to access or copy content</li>
              <li>Not impersonate others or provide false information</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">7. Limitation of Liability</h2>
            <p className="text-white/70 mb-4">
              To the extent permitted by law, Link Opticians shall not be liable for any indirect, 
              incidental, or consequential damages arising from use of our services or website.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">8. Changes to Terms</h2>
            <p className="text-white/70 mb-4">
              We may update these terms from time to time. Continued use of our services after 
              changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">9. Contact Information</h2>
            <p className="text-white/70 mb-4">
              For questions about these terms:<br />
              Email: <a href="mailto:info@linkopticians.co.zw" className="text-green-400 hover:underline">info@linkopticians.co.zw</a><br />
              Phone: <a href="tel:+263242700000" className="text-green-400 hover:underline">+263 242 700 000</a>
            </p>
          </section>

          <div className="mt-16 pt-8 border-t border-dark-500">
            <Link href="/" className="text-green-400 hover:text-green-300 transition">
              ← Return to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}