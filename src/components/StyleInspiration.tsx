import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "@/hooks/use-mobile";

gsap.registerPlugin(ScrollTrigger);

const inspirations = [
  {
    img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=900",
    label: "Natural Textures",
    desc: "Layer muted tones with eco-friendly linen for pure comfort."
  },
  {
    img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.gentlemansgazette.com%2Fwp-content%2Fuploads%2F2017%2F10%2FA-bespoke-suit-boosts-your-confidence-and-elegance.jpg&f=1&nofb=1&ipt=3aa6b649c002fc5083fc5d5d996b72849e5c99eb1b919f08df247702ebdb8a1b",
    label: "Soft Tailoring",
    desc: "New takes on structure, easy and elegant."
  },
  {
    img: "https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?q=80&w=900",
    label: "Monochrome Mood",
    desc: "Minimalist chic in matching hues."
  },
  {
    img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=900",
    label: "Blended Styles",
    desc: "Unexpected pairings for personal expression."
  },
  {
    img: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=900",
    label: "Layered Neutrals",
    desc: "Effortless elegance with a touch of warmth."
  },
  {
    img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdnb.lystit.com%2Fphotos%2Ffarfetch%2Fa5175579%2Fsacai-Black-Aztec-Pattern-Jacket.jpeg&f=1&nofb=1&ipt=c4d78daba05070c3683449e77e124af99205381e35cd37ec43e09c77aa4fe121",
    label: "Bold Patterns",
    desc: "Make a statement with daring prints."
  },
  {
    img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F53%2F6a%2Fb4%2F536ab4d7a2883f88bb235a188e2f0ca8.jpg&f=1&nofb=1&ipt=c8756724fd9b21db47b4e93847ce6de2a260d6fd62b683d1a5bad9579ff74032",
    label: "Relaxed Silhouettes",
    desc: "Comfort meets style in flowing designs."
  },
  {
    img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fblog.polarshade.com%2Fhs-fs%2Fhubfs%2Fbigstock-Layers-Of-Folded-Cotton-Fabric-126671594.jpg%3Fwidth%3D688%26height%3D460%26name%3Dbigstock-Layers-Of-Folded-Cotton-Fabric-126671594.jpg&f=1&nofb=1&ipt=0f763af5e7e494190de02554e0057864962015efe810990bb825f5b2399352e7",
    label: "Artistic Layers",
    desc: "Express yourself with unique combinations."
  },
  {
    img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F3f%2F26%2F4d%2F3f264d304df9714c631d90f2f446269f.jpg&f=1&nofb=1&ipt=99fe3669e6603b3fd21e0d705a71a969b027f454da011aaea0d19a431e86c3a1",
    label: "Eclectic Mix",
    desc: "Combine various styles for a unique look."
  }
];

const StyleInspiration = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (scrollRef.current) {
      // Animate each card
      const cards = scrollRef.current.querySelectorAll('.inspire-card');
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 36, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            delay: 0.13 * i,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Create horizontal scroll animation
      if (!isMobile) {
        gsap.to(scrollRef.current, {
          x: () => -(scrollRef.current!.scrollWidth - scrollRef.current!.offsetWidth),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom top",
            scrub: 1,
          }
        });
      }
    }

    return () => {
      // Clean up ScrollTrigger instances when component unmounts
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === sectionRef.current ||
          trigger.vars.trigger === scrollRef.current) {
          trigger.kill();
        }
      });
    };
  }, [isMobile]);

  // On mobile, add snap points for smooth horizontal scroll
  useEffect(() => {
    if (scrollRef.current && isMobile) {
      const node = scrollRef.current;
      node.style.overflowX = "auto";
      node.style.scrollSnapType = "x mandatory";
      node.style.setProperty("webkitOverflowScrolling", "touch");
      node.style.scrollBehavior = "smooth";
      // On desktop, remove horizontal scrolling
    }
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className="py-14 bg-gradient-to-br from-fashion-sage/20 to-fashion-cream"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-light text-center mb-2 animate-fade-in">
          Style <span className="font-semibold">Inspiration</span>
        </h2>
        <p className="text-center text-fashion-charcoal/70 mb-6 animate-fade-in">
          Find your next look. Discover today’s most-loved style ideas.
        </p>
        <div
          ref={scrollRef}
          className={`scroll-x-momentum flex gap-6 md:gap-10 items-stretch ${isMobile ? 'overflow-x-auto' : ''} pb-2 md:pb-0`}
          tabIndex={0}
          aria-label="Style Inspiration Gallery"
          style={{
            scrollSnapType: isMobile ? "x mandatory" : undefined,
            WebkitOverflowScrolling: isMobile ? "touch" : undefined,
            scrollBehavior: isMobile ? "smooth" : undefined,
          }}
        >
          {inspirations.map((insp, i) => (
            <div
              key={insp.label}
              className="inspire-card relative flex-shrink-0 w-72 md:w-80 bg-white rounded-xl shadow-md overflow-hidden hover-scale transition-all duration-400 will-change-transform"
              tabIndex={0}
              style={{
                scrollSnapAlign: isMobile ? "center" : undefined,
                minWidth: isMobile ? "75vw" : "20rem",
                maxWidth: "20rem"
              }}
            >
              <img
                src={insp.img}
                alt={insp.label}
                className="w-full h-44 object-cover object-center"
                draggable={false}
                style={{
                  borderTopLeftRadius: "0.75rem",
                  borderTopRightRadius: "0.75rem"
                }}
              />
              <div className="p-5 flex flex-col">
                <h3 className="text-lg font-semibold text-fashion-navy mb-1">{insp.label}</h3>
                <p className="text-fashion-charcoal/70 text-sm">{insp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StyleInspiration;
