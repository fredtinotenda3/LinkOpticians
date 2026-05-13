import Link from "next/link";
import { Product } from "@/constants/products";

interface ProductInfoSectionProps {
  product: Product;
  consultationTitle: string;
  consultationDescription: string;
}

export const ProductInfoSection = ({
  product,
  consultationTitle,
  consultationDescription,
}: ProductInfoSectionProps) => {
  return (
    <div className="space-y-10">

      {/* Header */}
      <div className="space-y-5">

        <div className="flex items-center gap-3">
          <span className="h-[2px] w-10 bg-sky-400" />

          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-400/80">
            {product.type}
          </p>
        </div>

        <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
          {product.name}
        </h1>

        <p className="max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
          {product.description}
        </p>
      </div>

      {/* Features */}
      <div className="space-y-5 border-t border-white/[0.06] pt-8">

        <h2 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/40">
          Product Features
        </h2>

        <ul className="grid gap-4">
          {product.features.map((feature, i) => (
            <li
              key={i}
              className="group flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4 transition-all duration-300 hover:border-sky-400/20 hover:bg-white/[0.05]"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-sky-400/10 bg-sky-400/10">
                <svg
                  className="h-4 w-4 text-sky-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <span className="text-sm font-medium text-white/75">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Materials + Availability */}
      <div className="grid grid-cols-1 gap-8 border-t border-white/[0.06] pt-8 sm:grid-cols-2">

        {product.materials && product.materials.length > 0 && (
          <div className="space-y-4">

            <h2 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/40">
              Materials
            </h2>

            <div className="flex flex-wrap gap-2">
              {product.materials.map((material, i) => (
                <span
                  key={i}
                  className="rounded-full border border-white/[0.06] bg-white/[0.03] px-4 py-2 text-[11px] font-medium text-white/60"
                >
                  {material}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4">

          <h2 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/40">
            Available At
          </h2>

          <div className="flex flex-wrap gap-2">
            {product.availability.map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 rounded-full border border-sky-400/10 bg-sky-400/5 px-4 py-2 text-[11px] font-medium text-sky-300"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Clinical Notice */}
      <div className="flex gap-5 rounded-3xl border border-sky-400/10 bg-sky-400/[0.04] p-6">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-sky-400/10 bg-sky-400/10">
          <svg
            className="h-5 w-5 text-sky-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-white">
            {consultationTitle}
          </h3>

          <p className="text-sm leading-relaxed text-white/65">
            {consultationDescription}
          </p>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col gap-4 pt-2 sm:flex-row">

        <Link
          href={`/book?product=${product.id}`}
          className="group inline-flex flex-1 items-center justify-center gap-3 rounded-full bg-sky-500 px-8 py-5 text-sm font-semibold text-white transition-all duration-300 hover:bg-sky-400"
        >
          Book Fitting

          <svg
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>

        <Link
          href="/locations"
          className="inline-flex flex-1 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] px-8 py-5 text-sm font-semibold text-white/75 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.05] hover:text-white"
        >
          Find in Clinic
        </Link>
      </div>

      {/* Contact */}
      <p className="text-center text-[11px] uppercase tracking-[0.2em] text-white/35">
        Direct Consultation:{" "}
        <a
          href="tel:+263242757558"
          className="text-sky-400 transition-colors duration-300 hover:text-sky-300"
        >
          0242 757558
        </a>
      </p>
    </div>
  );
};