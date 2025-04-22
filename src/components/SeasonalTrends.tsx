
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

gsap.registerPlugin(ScrollTrigger);

const trends = [
  {
    title: "Bold Botanicals",
    img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=900",
    desc: "Botanic prints and vibrant greens infuse playful energy."
  },
  {
    title: "Soft Pastels",
    img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=900",
    desc: "Serene hues in lavender, mint, and blush are in vogue."
  },
  {
    title: "Relaxed Tailoring",
    img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=900",
    desc: "Perfectly tailored, yet effortless fits for any occasion."
  }
];

const SeasonalTrends = () => {
  const cardsRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
        { 
          x: isMobile ? 0 : 32, 
          y: isMobile ? 26 : 0,
          opacity: 0, 
          scale: isMobile ? 0.92 : 1
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.05,
          stagger: isMobile ? 0.14 : 0.19,
          ease: isMobile ? "expo.out" : "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: isMobile ? "top 98%" : "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, [isMobile]);

  // Mobile horizontal snap/momentum
  const mobileClasses = isMobile 
    ? "overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory scroll-x-momentum"
    : "overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory";

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4" data-animate>
        <h2 className="text-2xl md:text-3xl font-light text-center mb-1">
          <span className="font-semibold">Seasonal</span> Trends
        </h2>
        <p className="text-center text-fashion-charcoal/70 mb-10">
          This season's must-haves at a glance.
        </p>
        <div
          ref={cardsRef}
          className={`flex gap-6 md:gap-12 ${mobileClasses}`}
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {trends.map((trend, idx) => (
            <div
              key={idx}
              className="min-w-[265px] md:min-w-[320px] flex-shrink-0 relative bg-fashion-beige rounded-xl hover-scale shadow-lg cursor-pointer group snap-center"
              tabIndex={0}
            >
              <img
                src={trend.img}
                alt={trend.title}
                className="w-full h-52 md:h-60 object-cover object-center rounded-t-xl"
              />
              <div className="p-6">
                <h3 className="text-base md:text-lg font-semibold text-fashion-charcoal/90 mb-2">{trend.title}</h3>
                <p className="text-fashion-charcoal/70 text-sm mb-4">{trend.desc}</p>
                <span className="inline-flex items-center text-fashion-terracotta font-medium group-hover:underline transition-colors duration-200">
                  Shop Trend
                  <ArrowRight className="ml-2 w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SeasonalTrends;
