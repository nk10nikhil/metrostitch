import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "@/hooks/use-mobile";
import { useGsapSectionReveal } from "@/hooks/useGsapSectionReveal";

gsap.registerPlugin(ScrollTrigger);

const LOOKS = [
  {
    src: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=987",
    label: "Urban Summer",
  },
  {
    src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=987",
    label: "Minimalist Classic",
  },
  {
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=987",
    label: "Soft Daylight",
  },
  {
    src: "https://images.unsplash.com/photo-1519864600265-abb2412be0db?q=80&w=987",
    label: "Weekend Style",
  },
  {
    src: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=987",
    label: "Pastel Fit",
  },
  {
    src: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?q=80&w=987",
    label: "Natural Layers",
  },
];

const Lookbook = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useGsapSectionReveal(gridRef, {
    staggerChildren: true,
    useScale: true,
    mobileOnly: false,
  });

  return (
    <section className="py-12 bg-gradient-to-b from-fashion-cream/70 to-fashion-sand/60 overflow-x-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-light text-center mb-1 animate-fade-in">
          <span className="font-semibold">Lookbook</span> Inspiration
        </h2>
        <p className="text-center text-fashion-charcoal/70 mb-8 animate-fade-in">
          Find beautiful outfits curated by our style team—tap to expand for details.
        </p>
        <div
          ref={gridRef}
          className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:gap-7"
        >
          {LOOKS.map((look, i) => (
            <div
              key={i}
              className="lookbook-card relative overflow-hidden rounded-xl min-h-[180px] sm:min-h-[250px] shadow-md group hover:scale-105 transition-transform duration-500 will-change-transform animate-fade-in"
            >
              <img
                src={look.src}
                alt={look.label}
                className="object-cover w-full h-full min-h-[180px] sm:min-h-[250px] group-hover:scale-110 transition-transform duration-500"
                draggable={false}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300">
                <span className="text-sm xs:text-base sm:text-lg text-white font-semibold mb-4 drop-shadow">
                  {look.label}
                </span>
              </div>
            </div>
          ))}
        </div>
        <svg className="block md:hidden absolute left-2 top-2 w-9 h-9 opacity-20 pointer-events-none animate-float" viewBox="0 0 28 28">
          <ellipse cx="14" cy="14" rx="13" ry="11" fill="#C6E3C3" />
        </svg>
      </div>
    </section>
  );
};

export default Lookbook;
