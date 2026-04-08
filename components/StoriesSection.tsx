"use client";

import Image from "next/image";

export type CMSStory = {
  id: string;
  slug: string;
  category: string;
  image: { url: string; alt?: string };
  publishedAt: string;
  title: string;
  excerpt: string;
};

// ── Featured Milestone Card ──────────────────────────────────────────────────
const FeaturedCard = ({ story }: { story: CMSStory }) => (
  <article className="col-span-1 md:col-span-2 relative overflow-hidden rounded-3xl bg-[#002b4d] border border-white/10 h-full min-h-[440px]">
    
    {/* Full-bleed background with professional overlay */}
    <div className="absolute inset-0">
      <Image
        src={story.image.url}
        alt={story.image.alt ?? story.title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover opacity-70"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#001a33] via-[#001a33]/60 to-transparent" />
    </div>

    {/* Primary Milestone Badge */}
    <div className="absolute top-6 left-6 z-10">
      <span className="inline-flex items-center gap-2 bg-sky-600 text-white text-[10px] font-black tracking-[0.2em] uppercase px-4 py-2 rounded-full shadow-lg">
        Key Milestone
      </span>
    </div>

    {/* Content */}
    <div className="absolute bottom-0 left-0 right-0 z-10 p-8">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-sky-400 text-xs font-bold tracking-[0.2em] uppercase">
          {story.category}
        </span>
        <span className="text-white/30 text-xs">•</span>
        <span className="text-white/50 text-xs font-medium">{story.publishedAt}</span>
      </div>
      <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
        {story.title}
      </h3>
      <p className="text-white/70 text-base leading-relaxed max-w-lg">
        {story.excerpt}
      </p>
    </div>
  </article>
);

// ── Standard History Card ─────────────────────────────────────────────────────
const StoryCard = ({ story }: { story: CMSStory }) => (
  <article className="relative overflow-hidden rounded-2xl bg-[#002b4d]/40 border border-white/5 h-full flex flex-col group hover:border-white/20 transition-all duration-300">
    
    <div className="relative aspect-[16/10] overflow-hidden">
      <Image
        src={story.image.url}
        alt={story.image.alt ?? story.title}
        fill
        sizes="(max-width: 768px) 100vw, 25vw"
        className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#001a33] to-transparent" />
      
      <div className="absolute top-4 left-4">
        <span className="px-3 py-1 bg-[#001a33]/80 backdrop-blur-md rounded-full text-[10px] font-bold text-sky-400 border border-white/10 uppercase tracking-wider">
          {story.category}
        </span>
      </div>
    </div>

    <div className="p-6 space-y-3 flex-1">
      <span className="text-white/30 text-[10px] font-bold tracking-widest uppercase">
        {story.publishedAt}
      </span>
      <h3 className="text-lg font-bold text-white leading-snug group-hover:text-sky-300 transition-colors">
        {story.title}
      </h3>
      <p className="text-white/50 text-sm leading-relaxed line-clamp-3">
        {story.excerpt}
      </p>
    </div>
  </article>
);

// ── Main Section ──────────────────────────────────────────────────────────────
export default function StoriesSection({ stories }: { stories?: CMSStory[] }) {
  const fallbackStories: CMSStory[] = [
    {
      id: "1",
      slug: "founding-story",
      category: "History",
      image: { url: "/assets/images/stories/founding.png" },
      publishedAt: "2008",
      title: "Founding & Vision",
      excerpt: "Link Optical was established in 2008 to provide stable eye care services during Zimbabwe's challenging economic period.",
    },
    {
      id: "2",
      slug: "inhouse-lab",
      category: "Innovation",
      image: { url: "/assets/images/stories/stories-lab-conference.png" },
      publishedAt: "2011",
      title: "In-House Optical Laboratory",
      excerpt: "Commissioning our internal lab allowed for precision lens surfacing and significantly reduced patient wait times.",
    },
    {
      id: "3",
      slug: "mobile-community-units",
      category: "Outreach",
      image: { url: "/assets/images/stories/mobile-unit.png" },
      publishedAt: "2015",
      title: "Mobile Diagnostic Units",
      excerpt: "Expansion of our community reach through portable diagnostic equipment for rural patient screenings.",
    },
    {
      id: "4",
      slug: "school-vision-program",
      category: "Outreach",
      image: { url: "/assets/images/stories/school-program.png" },
      publishedAt: "2016",
      title: "Paediatric Screening Program",
      excerpt: "The launch of our national school initiative focused on early detection of refractive errors in students.",
    },
    {
        id: "5",
        slug: "patient-first-initiative",
        category: "Care",
        image: { url: "/assets/images/stories/patient-care.png" },
        publishedAt: "2020",
        title: "Clinical Care Standards",
        excerpt: "Standardization of our comprehensive examination protocols and long-term patient follow-up systems.",
      },
      {
        id: "6",
        slug: "product-diversity",
        category: "Inventory",
        image: { url: "/assets/images/stories/products.png" },
        publishedAt: "2021",
        title: "Therapeutic Lens Expansion",
        excerpt: "Integrating advanced contact lens solutions and therapeutic eyewear into our primary inventory.",
      },
  ];

  const allStories = (stories && stories.length > 0) ? stories : fallbackStories;
  const [featured, ...rest] = allStories;

  return (
    <section className="py-32 bg-[#001a33]">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-[2px] bg-sky-500" />
              <span className="text-sky-500 text-xs font-bold tracking-[0.3em] uppercase">
                Established 2008
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
              Our Journey
            </h2>
          </div>
          <p className="text-white/50 text-lg leading-relaxed max-w-md lg:pb-1">
            Nearly two decades of providing consistent, high-standard optometry services to the Zimbabwean community.
          </p>
        </div>

        {/* Milestone Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured && <FeaturedCard story={featured} />}
          {rest.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>

      </div>
    </section>
  );
}