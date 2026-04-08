// components/sections/products/ProductsHeroSection.tsx
import Image from "next/image";
import Link from "next/link";

interface Category {
  id: string;
  label: string;
}

interface ProductsHeroSectionProps {
  title: string;
  titleHighlight: string;
  description: string;
  badge: string;
  categories: Category[];
}

export const ProductsHeroSection = ({
  title,
  titleHighlight,
  description,
  badge,
  categories,
}: ProductsHeroSectionProps) => {
  return (
    <section className="relative min-h-[85vh] w-full overflow-hidden flex items-center">

      {/* Background with cinematic overlay */}
      <div className="absolute inset-0">
        <Image
          src="/assets/images/products-hero.jpg"
          alt="Premium eyewear collection at Link Opticians"
          fill
          className="object-cover object-center scale-105"
          priority
          quality={100}
        />
        {/* Multi-layered gradient for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#000d1a]/95 via-[#000d1a]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000d1a] via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-[5%] py-32 w-full">
        <div className="max-w-3xl space-y-10">

          {/* Breadcrumb - Clean & Minimal */}
          <nav className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
            <Link href="/" className="hover:text-sky-400 transition-colors duration-300">
              Home
            </Link>
            <span className="size-1 rounded-full bg-white/20" />
            <span className="text-white/80">Collections</span>
          </nav>

          {/* Headline - Deep Ocean & Sky Blue */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-sky-500" />
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/90">{badge}</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter">
              {title}
              <br />
              <span className="text-sky-400">{titleHighlight}</span>
            </h1>

            <p className="text-lg md:text-xl text-white/40 max-w-xl leading-relaxed font-medium">
              {description}
            </p>
          </div>

          {/* Category Anchor Pills */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="group flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-sky-500/50 hover:bg-sky-500/10 transition-all duration-500"
              >
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 group-hover:text-white">
                  {category.label}
                </span>
                <svg className="size-3 text-white/20 group-hover:text-sky-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            ))}
          </div>

        </div>
      </div>

      {/* Vertical Scroll Indicator */}
      <div className="absolute bottom-12 right-[5%] hidden lg:flex flex-col items-center gap-4">
        <span className="[writing-mode:vertical-lr] text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
          Discover More
        </span>
        <div className="w-[2px] h-20 bg-white/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-sky-500 animate-[scroll-down_2s_ease-in-out_infinite]" />
        </div>
      </div>

    </section>
  );
};