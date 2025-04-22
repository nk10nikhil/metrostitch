import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "@/hooks/use-mobile";
import { useGsapSectionReveal } from "@/hooks/useGsapSectionReveal";
import { Eye, Bookmark, Share2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const LOOKS = [
  {
    src: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=987",
    label: "Urban Summer",
    desc: "Light fabrics with structured silhouettes for warm city days",
    tags: ["casual", "summer", "urban"]
  },
  {
    src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=987",
    label: "Minimalist Classic",
    desc: "Timeless pieces with clean lines and neutral tones",
    tags: ["minimalist", "monochrome", "timeless"]
  },
  {
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=987",
    label: "Soft Daylight",
    desc: "Relaxed fits with gentle textures for everyday elegance",
    tags: ["daywear", "comfort", "versatile"]
  },
  {
    src: "https://images.unsplash.com/photo-1519864600265-abb2412be0db?q=80&w=987",
    label: "Weekend Style",
    desc: "Effortless combinations for relaxed weekend adventures",
    tags: ["casual", "weekend", "comfortable"]
  },
  {
    src: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=987",
    label: "Pastel Fit",
    desc: "Soft colors that create a harmonious and refreshing palette",
    tags: ["pastels", "light", "elegant"]
  },
  {
    src: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?q=80&w=987",
    label: "Natural Layers",
    desc: "Organic textures and thoughtful layering for dimension",
    tags: ["layers", "textures", "organic"]
  },
];

const Lookbook = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [expandedLook, setExpandedLook] = useState<number | null>(null);
  const [savedItems, setSavedItems] = useState<number[]>([]);

  useGsapSectionReveal(gridRef, {
    staggerChildren: true,
    useScale: true,
    mobileOnly: false,
  });

  useEffect(() => {
    // Enhanced title animation
    const titleTl = gsap.timeline({
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 90%",
      }
    });

    titleTl.fromTo(
      titleRef.current?.querySelectorAll('.title-animate'),
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.9,
        ease: "power2.out"
      }
    );

    // Parallax effect on images
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.lookbook-card');
      cards.forEach((card) => {
        const cardImage = card.querySelector('img');

        gsap.fromTo(
          cardImage,
          { scale: 1.2, filter: 'brightness(0.8) blur(2px)' },
          {
            scale: 1,
            filter: 'brightness(1) blur(0px)',
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
            }
          }
        );

        // Create subtle hover parallax effect
        card.addEventListener('mousemove', (e) => {
          if (isMobile) return;

          const rect = (card as HTMLElement).getBoundingClientRect();
          const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
          const mouseY = (e.clientY - rect.top) / rect.height - 0.5;

          gsap.to(cardImage, {
            x: mouseX * 10,
            y: mouseY * 10,
            duration: 0.5
          });
        });

        card.addEventListener('mouseleave', () => {
          if (isMobile) return;

          gsap.to(card.querySelector('img'), {
            x: 0,
            y: 0,
            duration: 0.5
          });
        });
      });
    }

    // Background particles animation
    const particles = document.querySelectorAll('.lookbook-particle');
    particles.forEach((particle) => {
      gsap.to(particle, {
        y: -30,
        x: gsap.utils.random(-15, 15),
        rotation: gsap.utils.random(-15, 15),
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isMobile]);

  const toggleSave = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section ref={sectionRef} className="py-16 bg-gradient-to-b from-fashion-cream/70 to-fashion-sand/60 overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="lookbook-particle absolute top-20 left-10 w-16 h-16 rounded-full border-2 border-dashed border-fashion-terracotta/20 opacity-30"></div>
      <div className="lookbook-particle absolute top-40 right-[10%] w-24 h-24 rounded-full border-2 border-dotted border-fashion-sage/20 opacity-30"></div>
      <div className="lookbook-particle absolute bottom-20 left-[15%] w-20 h-20 rounded-full border border-fashion-navy/10 opacity-20"></div>
      <div className="lookbook-particle absolute bottom-40 right-20 w-12 h-12 rounded-full border border-fashion-pearl/30 opacity-30"></div>

      <div className="container mx-auto px-4">
        <div ref={titleRef} className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-light text-center mb-2">
            <span className="title-animate inline-block font-semibold">Lookbook</span>{" "}
            <span className="title-animate inline-block bg-gradient-to-r from-fashion-navy to-fashion-terracotta bg-clip-text text-transparent">Inspiration</span>
          </h2>
          <p className="title-animate text-center text-fashion-charcoal/70 mb-8">
            Find beautiful outfits curated by our style team—tap to expand for details.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:gap-7"
        >
          {LOOKS.map((look, i) => (
            <div
              key={i}
              className={`lookbook-card relative overflow-hidden rounded-xl min-h-[180px] sm:min-h-[250px] shadow-md cursor-pointer transition-all duration-500 will-change-transform animate-fade-in ${expandedLook === i ? 'ring-2 ring-fashion-terracotta ring-offset-2' : 'hover:scale-[1.03]'}`}
              onClick={() => setExpandedLook(expandedLook === i ? null : i)}
            >
              <img
                src={look.src}
                alt={look.label}
                className={`object-cover w-full h-full min-h-[180px] sm:min-h-[250px] transition-all duration-700 ${expandedLook === i ? 'scale-105' : 'group-hover:scale-110'}`}
                draggable={false}
              />

              {/* Bookmark button */}
              <button
                className={`absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white z-20 ${savedItems.includes(i) ? 'text-fashion-terracotta' : 'text-gray-600'}`}
                onClick={(e) => toggleSave(i, e)}
                aria-label={savedItems.includes(i) ? "Remove from saved" : "Save to collection"}
              >
                <Bookmark className={`h-4 w-4 ${savedItems.includes(i) ? 'fill-fashion-terracotta' : ''}`} />
              </button>

              {/* Regular overlay */}
              <div className={`absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 ${expandedLook === i ? 'opacity-0' : 'opacity-0 group-hover:opacity-90'}`}>
                <span className="text-base xs:text-base sm:text-lg text-white font-semibold mb-4 drop-shadow">
                  {look.label}
                </span>
              </div>

              {/* Expanded overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black/70 to-black/30 flex flex-col justify-between p-4 transition-all duration-300 ${expandedLook === i ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="flex justify-between items-start">
                  <h3 className="text-lg md:text-xl font-semibold text-white">{look.label}</h3>
                  <div className="flex space-x-2">
                    <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                      <Eye className="h-4 w-4 text-white" />
                    </button>
                    <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                      <Share2 className="h-4 w-4 text-white" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-white/90 text-sm">{look.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {look.tags.map((tag, tagIdx) => (
                      <span key={tagIdx} className="px-2 py-1 bg-white/20 rounded-full text-xs text-white">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {expandedLook !== null && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setExpandedLook(null)}
              className="px-4 py-2 bg-fashion-cream hover:bg-fashion-sand text-fashion-navy text-sm rounded-md transition-colors duration-300"
            >
              Close Preview
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Lookbook;
