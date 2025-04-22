import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapSectionReveal } from "@/hooks/useGsapSectionReveal";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    year: "2017",
    title: "Brand Founded",
    desc: "Our story begins with a passion for ethical fashion and a mission to inspire conscious style.",
    color: "bg-fashion-sage"
  },
  {
    year: "2019",
    title: "First Collection",
    desc: "Launched sustainable collection, earning love for timeless silhouettes and honest materials.",
    color: "bg-fashion-terracotta"
  },
  {
    year: "2023",
    title: "Expanding Horizons",
    desc: "International pop-ups showcase design innovation and diversity.",
    color: "bg-fashion-pearl"
  }
];

const BrandStory = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  useGsapSectionReveal(timelineRef, {
    staggerChildren: true,
    useScale: true,
    useRotate: true,
    useParallax: true,
    mobileOnly: false,
  });

  return (
    <section className="py-16 relative bg-gradient-to-b from-fashion-sand/80 via-white to-fashion-pearl/80 overflow-x-hidden">
      <div className="container mx-auto px-4 md:px-6" data-animate>
        <h2 className="text-2xl md:text-3xl font-light text-center mb-3 animate-fade-in">
          <span className="font-semibold">Our Brand Story</span>
        </h2>
        <p className="text-center text-fashion-charcoal/70 mb-10 animate-fade-in">
          Trace our journey from vision to wardrobe.
        </p>
        <div
          ref={timelineRef}
          className="flex flex-col md:flex-row items-center md:justify-center gap-10 md:gap-6 mt-6"
        >
          {milestones.map((item, idx) => (
            <div
              key={idx}
              className={`story-milestone group relative flex-1 w-full max-w-xs rounded-xl shadow-lg ${item.color} px-8 py-8 mb-2 flex flex-col items-center animate-fade-in will-change-transform`}
              style={{
                border: "2px solid #e5e7eb",
                boxShadow: "0 8px 28px 0 rgba(214,135,111,0.08)",
                transition: "box-shadow 0.4s, transform 0.4s"
              }}
            >
              <span className="mb-1 px-4 py-1 bg-white/70 text-fashion-charcoal/80 font-semibold rounded-full text-xs shadow animate-fade-in pulse">
                {item.year}
              </span>
              <h4 className="text-lg font-bold mb-1 text-center leading-snug">{item.title}</h4>
              <p className="text-sm text-fashion-charcoal/70 text-center">{item.desc}</p>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-fashion-terracotta/60 to-fashion-pearl/30 rounded-full opacity-50 group-hover:scale-110 transition-all"></div>
            </div>
          ))}
        </div>
      </div>
      <svg className="hidden md:block absolute left-2 top-10 w-12 h-12 opacity-40 pointer-events-none" viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="14" fill="#D2E3CD" />
      </svg>
      <svg className="block md:hidden absolute right-3 top-24 w-10 h-10 opacity-30 pointer-events-none animate-float" viewBox="0 0 32 32">
        <rect width="32" height="32" rx="16" fill="#F7E1DB" />
      </svg>
    </section>
  );
};

export default BrandStory;
