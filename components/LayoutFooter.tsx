// components/LayoutFooter.tsx
import Link from "next/link";
import Image from "next/image";
import { FOOTER_DATA } from "@/constants/navigation";
import { SOCIAL_MEDIA_LINKS, SOCIAL_MEDIA_CONFIG } from "@/constants/social";

export const LayoutFooter = () => {
  const footerSocialLinks = SOCIAL_MEDIA_LINKS.filter((p) =>
    SOCIAL_MEDIA_CONFIG.footer.includes(p.id)
  );

  const contactItems = [
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: "Main Location",
      value: "Robinson House, Harare CBD",
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: "Clinic Phone",
      value: "+263 242 700 000",
      href: "tel:+263242700000",
    },
    {
      icon: (
        <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: "24/7 Emergency",
      value: "+263 77 340 7464",
      href: "tel:+263773407464",
      highlight: true,
    },
  ];

  const quickLinks = FOOTER_DATA.links.slice(0, 7);
  const legalLinks = FOOTER_DATA.links.slice(7, 10);

  return (
    <footer className="bg-dark-300 border-t border-dark-500">

      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-[5%] py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* ── Brand column ─────────────────────────────────────────────── */}
          <div className="lg:col-span-1 space-y-6">
            <Link href="/" className="group inline-block">
              <Image
                src="/assets/logos/link-logo.svg"
                alt="Link Opticians Logo"
                width={160}
                height={50}
                className="h-10 w-auto transition-opacity duration-300 group-hover:opacity-80"
              />
            </Link>

            <p className="text-white/45 text-sm leading-relaxed">
              Bringing comprehensive eye care to every Zimbabwean — from Harare
              to the most remote communities since 2008.
            </p>

            {/* Social links */}
            <div className="space-y-3">
              <p className="text-white/70 text-xs font-semibold tracking-[0.2em] uppercase">
                Follow us
              </p>
              <div className="flex items-center gap-2">
                {footerSocialLinks.map((platform) => (
                  <a
                    key={platform.id}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${platform.name}`}
                    className="p-2 bg-dark-400 hover:bg-dark-500 border border-dark-500 hover:border-green-500/30 rounded-lg transition-all duration-300 hover:scale-105"
                  >
                    <div className="relative w-4 h-4">
                      <Image
                        src={platform.icon}
                        alt={platform.name}
                        width={16}
                        height={16}
                        className="object-contain"
                      />
                    </div>
                  </a>
                ))}
              </div>
              <p className="text-white/30 text-xs">
                Message us on WhatsApp for quick replies
              </p>
            </div>
          </div>

          {/* ── Quick links ───────────────────────────────────────────────── */}
          <div className="lg:col-span-1 space-y-6">
            <h3 className="text-white text-sm font-semibold tracking-[0.15em] uppercase">
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/45 hover:text-green-400 text-sm transition-colors duration-200 py-1 block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="space-y-2 pt-2 border-t border-dark-500">
              <h4 className="text-white/50 text-xs font-semibold tracking-[0.15em] uppercase">Legal</h4>
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/35 hover:text-green-400 text-xs transition-colors duration-200 block py-0.5"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* ── Contact ───────────────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-white text-sm font-semibold tracking-[0.15em] uppercase">
              Get In Touch
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {contactItems.map((item) => (
                <div
                  key={item.label}
                  className={`p-4 rounded-xl border transition-all duration-300 ${
                    item.highlight
                      ? "bg-red-500/5 border-red-500/20"
                      : "bg-dark-400 border-dark-500"
                  }`}
                >
                  <div className={`mb-2 ${item.highlight ? "text-red-400" : "text-green-500"}`}>
                    {item.icon}
                  </div>
                  <p className="text-white/40 text-[10px] font-semibold uppercase tracking-wider mb-1">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className={`text-sm font-semibold transition-colors duration-200 ${
                        item.highlight
                          ? "text-red-300 hover:text-red-200"
                          : "text-white hover:text-green-400"
                      }`}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-white text-sm font-medium">{item.value}</p>
                  )}
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href={SOCIAL_MEDIA_LINKS.find((p) => p.id === "whatsapp")?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 hover:border-[#25D366]/50 text-[#25D366] px-5 py-3 rounded-xl transition-all duration-300"
            >
              <Image
                src="/assets/icons/social/whatsapp.svg"
                alt="WhatsApp"
                width={20}
                height={20}
              />
              <div>
                <p className="text-sm font-semibold leading-tight">Chat on WhatsApp</p>
                <p className="text-[10px] opacity-70">Typically replies within minutes</p>
              </div>
              <svg className="w-4 h-4 ml-auto transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-dark-500">
        <div className="mx-auto max-w-7xl px-[5%] py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-white/30 text-xs">
              © {new Date().getFullYear()} Link Opticians. All rights reserved. Registered with the Pharmacists Council of Zimbabwe.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/privacy-policy" className="text-white/30 hover:text-green-400 text-xs transition-colors duration-200">Privacy</Link>
              <Link href="/terms-of-service" className="text-white/30 hover:text-green-400 text-xs transition-colors duration-200">Terms</Link>
              {/* Admin — visually discreet */}
              <Link href="/?admin=true" className="text-dark-500 hover:text-white/20 text-xs transition-colors duration-200">·</Link>
            </div>
          </div>

          {/* Healthcare disclaimer — compact */}
          <p className="text-white/20 text-[10px] text-center mt-4 leading-relaxed max-w-3xl mx-auto">
            This website provides information only and does not constitute medical advice.
            For medical concerns, consult a qualified healthcare professional.
            Emergency eye conditions require immediate medical attention.
          </p>
        </div>
      </div>

    </footer>
  );
};
