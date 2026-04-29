// app/(public)/privacy-policy/page.tsx
import Link from "next/link";

export default function PrivacyPolicyPage() {
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
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Privacy Policy</h1>
        
        <div className="prose prose-invert prose-green max-w-none">
          <p className="text-white/70 text-lg mb-8">Last updated: February 2026</p>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
            <p className="text-white/70 mb-4">
              Link Opticians (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is committed to protecting your privacy. 
              This policy explains how we collect, use, and safeguard your personal information 
              when you visit our website or use our services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
            <p className="text-white/70 mb-4">We may collect:</p>
            <ul className="list-disc pl-6 text-white/70 space-y-2 mb-4">
              <li>Name, contact information (phone, email)</li>
              <li>Medical aid details</li>
              <li>Appointment history</li>
              <li>Website usage data (cookies)</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
            <p className="text-white/70 mb-4">We use your information to:</p>
            <ul className="list-disc pl-6 text-white/70 space-y-2 mb-4">
              <li>Schedule and confirm appointments</li>
              <li>Process medical aid claims</li>
              <li>Send appointment reminders (SMS/email)</li>
              <li>Improve our services</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">4. SMS Communications</h2>
            <p className="text-white/70 mb-4">
              By providing your phone number, you consent to receive SMS messages regarding:
            </p>
            <ul className="list-disc pl-6 text-white/70 space-y-2 mb-4">
              <li>Appointment confirmations</li>
              <li>Appointment reminders (24h and 3h before)</li>
              <li>Cancellation notifications</li>
              <li>Follow-up care instructions</li>
            </ul>
            <p className="text-white/70">
              You may opt out at any time by replying &quot;STOP&quot; to any message. 
              Standard message and data rates may apply.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">5. Data Security</h2>
            <p className="text-white/70 mb-4">
              We implement appropriate technical and organizational measures to protect your 
              personal information against unauthorized access, alteration, or destruction.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">6. Your Rights</h2>
            <p className="text-white/70 mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-white/70 space-y-2 mb-4">
              <li>Access your personal information</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt out of marketing communications</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">7. Contact Us</h2>
            <p className="text-white/70 mb-4">
              For privacy-related questions, contact:<br />
              Email: <a href="mailto:privacy@linkopticians.co.zw" className="text-green-400 hover:underline">privacy@linkopticians.co.zw</a><br />
              Phone: <a href="tel:+263242700000" className="text-green-400 hover:underline">0242 757558</a>
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