import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Star, TrendingUp } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

gsap.registerPlugin(ScrollTrigger);

// Enhanced trends with more detailed information
const trends = [
  {
    title: "Bold Botanicals",
    img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=900",
    desc: "Botanic prints and vibrant greens infuse playful energy.",
    popularity: 92,
    tag: "Trending",
    accent: "bg-emerald-500"
  },
  {
    title: "Soft Pastels",
    img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=900",
    desc: "Serene hues in lavender, mint, and blush are in vogue.",
    popularity: 87,
    tag: "Popular",
    accent: "bg-violet-400"
  },
  {
    title: "Relaxed Tailoring",
    img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=900",
    desc: "Perfectly tailored, yet effortless fits for any occasion.",
    popularity: 95,
    tag: "Featured",
    accent: "bg-amber-500"
  }
];

const SeasonalTrends = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const popularityBarsRef = useRef<HTMLDivElement[]>([]);
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    // Title animation with gradient reveal
    const titleTl = gsap.timeline({
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 90%",
        toggleActions: "play none none reverse"
      }
    });

    titleTl.fromTo(
      titleRef.current?.querySelectorAll('.animate-text'),
      { y: 30, opacity: 0, filter: 'blur(4px)' },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        stagger: 0.12,
        duration: 0.8,
        ease: "power2.out"
      }
    );

    // Cards animation with enhanced effects
    if (cardsRef.current) {
      // Main cards animation
      gsap.fromTo(
        cardsRef.current.children,
        {
          x: isMobile ? 0 : 40,
          y: isMobile ? 26 : 0,
          opacity: 0,
          scale: isMobile ? 0.92 : 0.95,
          rotationY: isMobile ? 0 : -5
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 1.05,
          stagger: isMobile ? 0.14 : 0.25,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: isMobile ? "top 98%" : "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate card images separately with parallax effect
      cardsRef.current.querySelectorAll('.trend-image').forEach((image, i) => {
        gsap.fromTo(
          image,
          { scale: 1.15, filter: 'brightness(0.8) blur(3px)' },
          {
            scale: 1,
            filter: 'brightness(1) blur(0px)',
            duration: 1.3,
            delay: isMobile ? 0.2 * i : 0.3 * i,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: image,
              start: "top 90%"
            }
          }
        );
      });

      // Animate popularity bars automatically when scrolled into view
      popularityBarsRef.current.forEach((barRef, index) => {
        if (barRef) {
          gsap.fromTo(
            barRef,
            { scaleX: 0 },
            {
              scaleX: trends[index].popularity / 100,
              duration: 1.5,
              delay: 0.5 + (index * 0.2),
              ease: "power2.out",
              scrollTrigger: {
                trigger: barRef.parentElement,
                start: "top 85%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }
      });

      // Auto-scroll animation for small screens
      if (isMobile) {
        // Create an auto-scroll effect that pans through trends
        gsap.to(cardsRef.current, {
          scrollTo: { x: "max" },
          duration: 12,
          ease: "none",
          repeat: -1,
          repeatDelay: 1,
          yoyo: true,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top bottom",
            end: "bottom top",
            toggleActions: "play pause resume pause"
          }
        });
      }
    }

    // Background parallax effect
    gsap.to(".trends-bg-element", {
      y: -50,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.8
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isMobile]);

  // Method to set ref for each popularity bar
  const setPopularityBarRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      popularityBarsRef.current[index] = el;
    }
  };

  return (
    <section ref={sectionRef} className="py-16 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="trends-bg-element absolute top-10 -right-20 w-80 h-80 rounded-full bg-fashion-sage/5 filter blur-3xl"></div>
      <div className="trends-bg-element absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-fashion-terracotta/5 filter blur-3xl"></div>

      <div className="container mx-auto px-4" data-animate>
        <div ref={titleRef} className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-light text-center mb-2">
            <span className="animate-text inline-block font-semibold">Seasonal</span>{" "}
            <span className="animate-text inline-block bg-gradient-to-r from-fashion-terracotta to-fashion-sage bg-clip-text text-transparent">Trends</span>
          </h2>
          <p className="animate-text text-center text-fashion-charcoal/70">
            Discover this season's must-have pieces and styling inspirations.
          </p>
        </div>

        <div
          ref={cardsRef}
          className={`flex gap-6 md:gap-12 ${isMobile ? "overflow-x-auto pb-6 no-scrollbar snap-x snap-mandatory scroll-x-momentum" : "overflow-visible"}`}
          style={{
            WebkitOverflowScrolling: 'touch',
            scrollBehavior: 'smooth'
          }}
        >
          {trends.map((trend, idx) => (
            <div
              key={idx}
              className="min-w-[280px] md:min-w-[340px] flex-shrink-0 relative bg-white rounded-xl hover:shadow-xl transition-shadow duration-500 cursor-pointer group snap-center transform transition-transform duration-300"
              style={{
                boxShadow: activeIndex === idx ? '0 15px 30px rgba(0,0,0,0.12)' : '0 5px 15px rgba(0,0,0,0.08)'
              }}
              onMouseEnter={() => setActiveIndex(idx)}
              onMouseLeave={() => setActiveIndex(null)}
              tabIndex={0}
            >
              {/* Trend tag */}
              <div className={`absolute top-4 left-4 z-10 ${trend.accent} px-3 py-1 rounded-full flex items-center gap-1.5 text-white text-xs font-semibold shadow-lg transform transition-transform duration-300 ${activeIndex === idx ? 'scale-110' : ''}`}>
                <TrendingUp className="w-3 h-3" />
                <span>{trend.tag}</span>
              </div>

              {/* Image container with hover effect */}
              <div className="overflow-hidden rounded-t-xl relative">
                <div className={`absolute inset-0 ${trend.accent} opacity-20 mix-blend-overlay`}></div>
                <img
                  src={trend.img}
                  alt={trend.title}
                  className="trend-image w-full h-60 md:h-64 object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-6">
                <h3 className="text-base md:text-xl font-semibold mb-2 group-hover:text-fashion-terracotta transition-colors duration-300">{trend.title}</h3>
                <p className="text-fashion-charcoal/70 text-sm mb-4">{trend.desc}</p>

                {/* Popularity meter - now autofills on scroll */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="text-xs text-fashion-charcoal/60">Popularity</div>
                  <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      ref={(el) => setPopularityBarRef(el, idx)}
                      className={`popularity-bar h-full ${trend.accent} rounded-full transform origin-left transition-transform duration-1000`}
                      style={{ transform: 'scaleX(0)' }} // Initial state, animation handled by GSAP
                    ></div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span className="text-xs font-medium">{trend.popularity}%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center text-fashion-terracotta font-medium group-hover:underline transition-all duration-300">
                    Shop Collection
                    <ArrowRight className="ml-2 w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </div>

              {/* Decorative accent */}
              <div className={`absolute -bottom-0 left-0 right-0 h-1 ${trend.accent} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
            </div>
          ))}
        </div>

        {/* Section indicator dots for mobile */}
        {isMobile && (
          <div className="flex justify-center gap-2 mt-6">
            {trends.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${idx === activeIndex ? 'bg-fashion-terracotta' : 'bg-gray-300'}`}
              ></div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SeasonalTrends;
