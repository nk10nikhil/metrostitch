
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote as QuoteIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

gsap.registerPlugin(ScrollTrigger);

// Dummy testimonials
const stories = [
  {
    name: "Alex P.",
    avatar: "https://randomuser.me/api/portraits/men/34.jpg",
    text: "The quality is unreal and I love knowing it's all sustainable. Probably my favorite purchase this year!",
    location: "Los Angeles, CA"
  },
  {
    name: "Sara L.",
    avatar: "https://randomuser.me/api/portraits/women/62.jpg",
    text: "Everything fits perfectly. The fabric feels so good and looks amazing, especially after multiple washes.",
    location: "Austin, TX"
  },
  {
    name: "Chris J.",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
    text: "Super stylish and practical. I get compliments every time I wear my shirt out.",
    location: "Brooklyn, NY"
  }
];


const CustomerStories = () => {
  const cardsRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.story-card');
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 42, scale: 0.93 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            delay: 0.18 * i,
            duration: 0.98,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: isMobile ? "top 92%" : "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }
  }, [isMobile]);

  // Simple touch swipe for mobile: snap points
  useEffect(() => {
    if (cardsRef.current && isMobile) {
      const node = cardsRef.current;
      node.style.overflowX = "auto";
      node.style.scrollSnapType = "x mandatory";
      node.style.WebkitOverflowScrolling = "touch";
      node.style.scrollBehavior = "smooth";
    }
  }, [isMobile]);

  return (
    <section className="py-14 bg-gradient-to-t from-fashion-pearl/90 to-white/60">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-light text-center mb-2 animate-fade-in">
          Customer <span className="font-semibold">Stories</span>
        </h2>
        <p className="text-center text-fashion-charcoal/70 mb-8 animate-fade-in">
          Real words from our community—see what makes us special.
        </p>
        <div
          ref={cardsRef}
          className="flex md:flex-row md:gap-10 items-stretch overflow-x-auto md:overflow-visible gap-5 scroll-x-momentum"
          aria-label="Customer Testimonials"
          tabIndex={0}
          style={{
            scrollSnapType: isMobile ? "x mandatory" : undefined,
            WebkitOverflowScrolling: isMobile ? "touch" : undefined,
            scrollBehavior: isMobile ? "smooth" : undefined,
          }}
        >
          {stories.map((t, i) => (
            <div
              key={t.name}
              className="story-card flex-shrink-0 flex flex-col relative bg-white max-w-xs w-full rounded-2xl shadow-lg px-7 py-8 mb-2 mr-3 border border-fashion-pearl/90 animate-fade-in"
              tabIndex={0}
              style={{
                minWidth: isMobile ? "85vw" : "21rem",
                scrollSnapAlign: isMobile ? "center" : undefined
              }}
            >
              <QuoteIcon className="w-8 h-8 text-fashion-sage mb-2 absolute top-4 right-5 opacity-30" />
              <div className="flex items-center mb-3 gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-fashion-terracotta"
                  draggable={false}
                />
                <div>
                  <div className="font-semibold text-fashion-charcoal">{t.name}</div>
                  <div className="text-xs text-fashion-charcoal/60">{t.location}</div>
                </div>
              </div>
              <p className="italic text-fashion-navy mb-2 relative z-10 leading-relaxed">{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerStories;
