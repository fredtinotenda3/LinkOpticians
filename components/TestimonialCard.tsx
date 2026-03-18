import Image from "next/image";

interface TestimonialCardProps {
  image: string;
  quote: string;
  name: string;
  location: string;
  rating: number;
}

export const TestimonialCard = ({ image, quote, name, location, rating }: TestimonialCardProps) => {
  return (
    <div className="min-w-[320px] md:min-w-[360px] p-7 rounded-2xl bg-dark-400 border border-dark-500 hover:border-green-500/30 transition-all duration-300 flex flex-col gap-5">

      {/* Decorative quote mark */}
      <svg className="w-8 h-8 text-green-500/30 shrink-0" fill="currentColor" viewBox="0 0 32 32">
        <path d="M10 8C6.686 8 4 10.686 4 14v10h10V14H7.5c0-1.38 1.12-2.5 2.5-2.5V8zm14 0c-3.314 0-6 2.686-6 6v10h10V14h-6.5c0-1.38 1.12-2.5 2.5-2.5V8z" />
      </svg>

      {/* Quote */}
      <p className="text-white/75 text-sm leading-relaxed flex-1">
        {quote}
      </p>

      {/* Footer — avatar + name + stars */}
      <div className="flex items-center justify-between gap-4 pt-4 border-t border-dark-500">

        {/* Avatar + name */}
        <div className="flex items-center gap-3">
          <div className="size-11 rounded-full overflow-hidden border border-dark-500 shrink-0">
            <Image
              src={image}
              alt={name}
              width={44}
              height={44}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <p className="text-white text-sm font-semibold leading-tight">{name}</p>
            <p className="text-white/40 text-xs mt-0.5">{location}</p>
          </div>
        </div>

        {/* SVG stars */}
        <div className="flex items-center gap-0.5 shrink-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={`w-3.5 h-3.5 ${i < rating ? "text-yellow-400" : "text-white/15"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
};
