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
      label: "Main Branch",
      value: "Robinson House, Harare CBD",
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: "Kensington Booking",
      value: "+263 867 721 2284",
      href: "tel:+2638677212284",
    },
    {
      icon: (
        <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      label: "24/7 Emergency Line",
      value: "+263 77 340 7464",
      href: "tel:+263773407464",
      highlight: true,
    },
  ];

  const quickLinks = FOOTER_DATA.links.slice(0, 7);

  return (
    <footer className="bg-[#000d1a] border-t border-white/5">
      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">

          {/* ── Brand Column ─────────────────────────────────────────────── */}
          <div className="space-y-8">
            <Link href="/" className="inline-block">
              <Image
                src="/assets/logos/link-logo.svg"
                alt="Link Opticians"
                width={160}
                height={50}
                className="h-9 w-auto"
              />
            </Link>

            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Defining the standard of clinical eye care in Zimbabwe. Comprehensive optometry services in Harare, Chipinge, and Chiredzi.
            </p>

            <div className="flex items-center gap-3">
              {footerSocialLinks.map((platform) => (
                <a
                  key={platform.id}
                  href={platform.url}
                  className="size-10 flex items-center justify-center bg-white/5 border border-white/5 rounded-full hover:bg-sky-600 hover:border-sky-500 transition-all duration-300"
                >
                  <Image src={platform.icon} alt={platform.name} width={16} height={16} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Quick Navigation ────────────────────────────────────────── */}
          <div className="space-y-8">
            <h3 className="text-white text-[11px] font-black uppercase tracking-[0.25em]">Navigation</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/40 hover:text-sky-400 text-sm font-medium transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Global Support ────────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-white text-[11px] font-black uppercase tracking-[0.25em]">Clinic Network & Support</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactItems.map((item) => (
                <div
                  key={item.label}
                  className={`p-5 rounded-2xl border transition-all duration-500 ${
                    item.highlight ? "bg-red-500/5 border-red-500/10" : "bg-white/[0.02] border-white/5"
                  }`}
                >
                  <div className={`mb-3 ${item.highlight ? "text-red-500" : "text-sky-500"}`}>
                    {item.icon}
                  </div>
                  <p className="text-white/20 text-[9px] font-black uppercase tracking-widest mb-1">{item.label}</p>
                  <a href={item.href} className="text-white font-bold text-sm hover:text-sky-400 transition-colors">
                    {item.value}
                  </a>
                </div>
              ))}

              {/* WhatsApp Specific Block */}
              <a
                href={SOCIAL_MEDIA_LINKS.find((p) => p.id === "whatsapp")?.url}
                className="flex items-center gap-4 p-5 rounded-2xl bg-[#25D366]/5 border border-[#25D366]/10 group hover:border-[#25D366]/30 transition-all duration-500"
              >
                <div className="size-10 flex items-center justify-center bg-[#25D366] rounded-full text-white shadow-lg shadow-[#25D366]/20 group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.63 1.438h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </div>
                <div>
                  <p className="text-[#25D366] text-xs font-black uppercase tracking-widest">WhatsApp Help</p>
                  <p className="text-white font-bold text-sm">Instant Support</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Legal Bar */}
      <div className="border-t border-white/5 bg-black/20">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-[10px] font-medium tracking-wide">
            © {new Date().getFullYear()} LINK OPTICIANS. ALL RIGHTS RESERVED. REGISTERED WITH THE PHARMACISTS COUNCIL OF ZIMBABWE.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-white/20 hover:text-sky-400 text-[10px] font-bold uppercase tracking-widest transition-colors">Privacy</Link>
            <Link href="/terms" className="text-white/20 hover:text-sky-400 text-[10px] font-bold uppercase tracking-widest transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};