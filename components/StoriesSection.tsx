"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export type CMSStory = {
  id: string;
  slug: string;
  category: string;
  image: { url: string; alt?: string };
  publishedAt: string;
  title: string;
  excerpt: string;
};

export async function fetchStories(): Promise<CMSStory[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CMS_API}/stories`);
    if (!res.ok) throw new Error("Failed to fetch");
    const data = await res.json();
    return data.stories;
  } catch {
    return [];
  }
}

// ── Featured card ─────────────────────────────────────────────────────────────
const FeaturedCard = ({ story }: { story: CMSStory }) => (
  <article className="col-span-1 md:col-span-2 relative overflow-hidden rounded-3xl bg-dark-400 border border-dark-500 h-full min-h-[420px]">

    {/* Full-bleed image */}
    <div className="absolute inset-0">
      <Image
        src={story.image.url}
        alt={story.image.alt ?? story.title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
    </div>

    {/* Featured badge */}
    <div className="absolute top-5 left-5 z-10">
      <span className="inline-flex items-center gap-1.5 bg-green-500 text-white text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        Featured
      </span>
    </div>

    {/* Year */}
    <div className="absolute top-5 right-5 z-10">
      <span className="px-3 py-1 bg-dark-400/80 backdrop-blur-sm rounded-full text-xs text-white/70 border border-dark-500/50">
        {story.publishedAt}
      </span>
    </div>

    {/* Content at bottom */}
    <div className="absolute bottom-0 left-0 right-0 z-10 p-7">
      <span className="text-green-400 text-xs font-semibold tracking-[0.2em] uppercase mb-3 block">
        {story.category}
      </span>
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
        {story.title}
      </h3>
      <p className="text-white/70 text-sm leading-relaxed line-clamp-2">
        {story.excerpt}
      </p>
    </div>
  </article>
);

// ── Standard card ─────────────────────────────────────────────────────────────
const StoryCard = ({ story }: { story: CMSStory }) => (
  <article className="relative overflow-hidden rounded-2xl bg-dark-400 border border-dark-500 h-full">

    {/* Image */}
    <div className="relative aspect-[4/3] overflow-hidden">
      <Image
        src={story.image.url}
        alt={story.image.alt ?? story.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark-400/80 via-transparent to-transparent" />

      {/* Category */}
      <div className="absolute top-3 left-3">
        <span className="px-2.5 py-1 bg-dark-400/85 backdrop-blur-sm rounded-full text-[11px] font-semibold text-green-400 border border-dark-500/60">
          {story.category}
        </span>
      </div>

      {/* Year */}
      <div className="absolute top-3 right-3">
        <span className="px-2.5 py-1 bg-dark-400/85 backdrop-blur-sm rounded-full text-[11px] text-white/60 border border-dark-500/60">
          {story.publishedAt}
        </span>
      </div>
    </div>

    {/* Content */}
    <div className="p-5">
      <h3 className="text-base font-bold text-white mb-2 line-clamp-2">
        {story.title}
      </h3>
      <p className="text-white/55 text-sm leading-relaxed line-clamp-2">
        {story.excerpt}
      </p>
    </div>
  </article>
);

// ── Main section ──────────────────────────────────────────────────────────────
export default function StoriesSection({ stories }: { stories?: CMSStory[] }) {
  const fallbackStories: CMSStory[] = [
    {
      id: "1",
      slug: "founding-story",
      category: "History",
      image: { url: "/assets/images/stories/founding.png" },
      publishedAt: "2008",
      title: "Founded in Crisis",
      excerpt: "Link Optical was founded in 2008 during Zimbabwe's financial crisis.",
    },
    {
      id: "2",
      slug: "inhouse-lab",
      category: "Innovation",
      image: { url: "/assets/images/stories/stories-lab-conference.png" },
      publishedAt: "2011",
      title: "In-House Laboratory",
      excerpt: "Our in-house lab crafts precise lenses quickly, reducing costs for patients.",
    },
    {
      id: "3",
      slug: "mobile-community-units",
      category: "Outreach",
      image: { url: "/assets/images/stories/mobile-unit.png" },
      publishedAt: "2015",
      title: "Mobile Units",
      excerpt: "Mobile eye care units reach rural and marginalized communities.",
    },
    {
      id: "4",
      slug: "school-vision-program",
      category: "Outreach",
      image: { url: "/assets/images/stories/school-program.png" },
      publishedAt: "2016",
      title: "School Vision Program",
      excerpt: "Our school outreach program screens students across Zimbabwe.",
    },
    {
      id: "5",
      slug: "patient-first-initiative",
      category: "Care",
      image: { url: "/assets/images/stories/patient-care.png" },
      publishedAt: "2020",
      title: "Patient-First Philosophy",
      excerpt: "Personalized care and thorough follow-ups for every patient.",
    },
    {
      id: "6",
      slug: "product-diversity",
      category: "Products",
      image: { url: "/assets/images/stories/products.png" },
      publishedAt: "2021",
      title: "Comprehensive Eyewear",
      excerpt: "From sunglasses to advanced contact lenses for every need.",
    },
    {
      id: "7",
      slug: "growth-expansion",
      category: "Growth",
      image: { url: "/assets/images/stories/branches.png" },
      publishedAt: "2023",
      title: "Expanding Across Zimbabwe",
      excerpt: "From a single clinic to multiple branches across the country.",
    },
    {
      id: "8",
      slug: "technology-sustainability",
      category: "Innovation",
      image: { url: "/assets/images/stories/tech-sustainability.jpg" },
      publishedAt: "2024",
      title: "Technology & Sustainability",
      excerpt: "Advanced systems and solar energy for sustainable operations.",
    },
  ];

  const [carouselItems, setCarouselItems] = useState<CMSStory[]>([]);

  useEffect(() => {
    setCarouselItems(stories ?? fallbackStories);
  }, [stories]);

  const allStories = carouselItems.length > 0 ? carouselItems : fallbackStories;
  const [featured, ...rest] = allStories;

  return (
    <section className="py-28 bg-dark-300">
      <div className="mx-auto max-w-7xl px-[5%]">

        {/* ── Section header ─────────────────────────────────────────────── */}
        <div className="space-y-3 max-w-xl mb-14">
          <div className="inline-flex items-center gap-2">
            <span className="w-6 h-px bg-green-500" />
            <span className="text-green-500 text-xs font-semibold tracking-[0.25em] uppercase">
              Since 2008
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Our Story
          </h2>
          <p className="text-white/50 text-base leading-relaxed">
            From a single clinic born in crisis to a network of care spanning Zimbabwe —
            every chapter shaped by our patients.
          </p>
        </div>

        {/* ── Grid ──────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured && <FeaturedCard story={featured} />}
          {rest.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>

      </div>
    </section>
  );
}
