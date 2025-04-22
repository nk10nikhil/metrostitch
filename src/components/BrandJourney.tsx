
import { useRef } from "react";
import { useGsapSectionReveal } from "@/hooks/useGsapSectionReveal";

const highlights = [
  {
    img: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=900",
    label: "Responsibly Sourced",
    desc: "Every fabric and thread selected for the planet.",
    color: "from-fashion-sage/90 to-white/80"
  },
  {
    img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=900",
    label: "Handcrafted Details",
    desc: "Each piece finished by true artisans.",
    color: "from-fashion-terracotta/90 to-white/70"
  }
];

const BrandJourney = () => {
  const cardsRef = useRef<HTMLDivElement>(null);

  useGsapSectionReveal(cardsRef, {
    staggerChildren: true,
    useScale: true,
    useRotate: true,
    mobileOnly: false,
  });

  return (
    <section className="py-14 md:py-20 relative bg-gradient-to-br from-fashion-sand/80 to-fashion-cream/80 overflow-x-hidden">
      <div className="container mx-auto px-5">
        <h2 className="text-2xl md:text-3xl font-light text-center mb-3 animate-fade-in">
          <span className="font-semibold">A Journey in Every Stitch</span>
        </h2>
        <p className="text-center text-fashion-charcoal/70 mb-8 animate-fade-in">
          Explore the moments that define our craftsmanship.
        </p>
        <div
          ref={cardsRef}
          className="flex flex-col md:flex-row gap-9 md:gap-16 items-center justify-center"
        >
          {highlights.map((item, i) => (
            <div
              key={i}
              className={`journey-card relative group bg-gradient-to-tr ${item.color} rounded-2xl shadow-lg overflow-hidden max-w-sm w-full flex flex-col items-center transform hover:scale-105 transition-transform will-change-transform animate-fade-in`}
              style={{
                boxShadow: "0 8px 28px 0 rgba(66, 66, 66, 0.12)",
                perspective: "800px"
              }}
            >
              <img
                src={item.img}
                alt={item.label}
                className="w-full h-60 object-cover object-center rounded-t-2xl group-hover:scale-110 group-active:scale-100 transition-transform duration-700"
                draggable={false}
                style={{
                  transition: "transform 0.5s"
                }}
              />
              <div className="p-5 flex flex-col items-center">
                <h3 className="text-lg font-semibold text-fashion-navy mb-1 text-center">{item.label}</h3>
                <p className="text-fashion-charcoal/70 text-center text-sm">{item.desc}</p>
              </div>
              <div className="absolute -top-5 right-6 w-8 h-8 bg-fashion-terracotta rounded-full blur-2xl opacity-30 animate-float"></div>
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-20 h-2 bg-fashion-sage/50 rounded-full blur opacity-40"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandJourney;
