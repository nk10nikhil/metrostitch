import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote as QuoteIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

gsap.registerPlugin(ScrollTrigger);

// Dummy testimonials
const stories = [
  {
    name: "Akshay Kumar",
    avatar: "https://randomuser.me/api/portraits/men/34.jpg",
    text: "The quality is unreal and I love knowing it's all sustainable. Probably my favorite purchase this year!",
    location: "Mumbai, India"
  },
  {
    name: "Amit Sharma",
    avatar: "https://randomuser.me/api/portraits/men/35.jpg",
    text: "Absolutely love the service and the quality of the products. Highly recommend!",
    location: "Delhi, India"
  },
  {
    name: "Priya Singh",
    avatar: "https://randomuser.me/api/portraits/women/36.jpg",
    text: "The customer support is fantastic and the products are top-notch!",
    location: "Bangalore, India"
  },
  {
    name: "Ravi Kumar",
    avatar: "https://randomuser.me/api/portraits/men/37.jpg",
    text: "A wonderful experience from start to finish. Will definitely be back!",
    location: "Chennai, India"
  },
  {
    name: "Sneha Patel",
    avatar: "https://randomuser.me/api/portraits/women/38.jpg",
    text: "An amazing journey with this brand. Highly satisfied!",
    location: "Hyderabad, India"
  },
  {
    name: "Vikram Singh",
    avatar: "https://randomuser.me/api/portraits/men/39.jpg",
    text: "A great addition to the team, always supportive and helpful!",
    location: "Pune, India"
  },
  {
    name: "Neha Sharma",
    avatar: "https://randomuser.me/api/portraits/women/40.jpg",
    text: "A delightful experience, I would recommend it to everyone!",
    location: "Mumbai, India"
  },
  {
    name: "Anjali Verma",
    avatar: "https://randomuser.me/api/portraits/women/41.jpg",
    text: "A fantastic service that exceeded my expectations!",
    location: "Delhi, India"
  },
];


const CustomerStories = () => {
  const cardsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
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

      // Create automatic horizontal scroll animation for desktop
      if (!isMobile && cardsRef.current) {
        // Clone cards to create seamless infinite loop effect
        const originalCards = Array.from(cards);
        originalCards.forEach(card => {
          const clone = card.cloneNode(true);
          cardsRef.current?.appendChild(clone);
        });

        // Increased scroll speed - 2 seconds per card instead of 5
        const scrollDuration = originalCards.length * 2;

        // Automatic horizontal scroll animation - always playing
        const scroll = gsap.to(cardsRef.current, {
          x: () => -(cardsRef.current!.scrollWidth / 2), // Scroll to the first set of cloned elements
          duration: scrollDuration,
          ease: "none",
          repeat: -1, // Infinite loop
        });

        // Only pause when completely out of view to save resources
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          onLeave: () => scroll.pause(),
          onEnterBack: () => scroll.play(),
        });

        // On hover, slow down slightly but not as much as before
        cardsRef.current.addEventListener("mouseenter", () => {
          gsap.to(scroll, { timeScale: 0.6, duration: 0.5 });
        });
        cardsRef.current.addEventListener("mouseleave", () => {
          gsap.to(scroll, { timeScale: 1, duration: 0.5 });
        });
      }
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
    <section ref={sectionRef} className="py-14 bg-gradient-to-t from-fashion-pearl/90 to-white/60 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-light text-center mb-2 animate-fade-in">
          Customer <span className="font-semibold">Stories</span>
        </h2>
        <p className="text-center text-fashion-charcoal/70 mb-8 animate-fade-in">
          Real words from our community—see what makes us special.
        </p>
        <div
          ref={cardsRef}
          className={`flex md:flex-row md:gap-10 items-stretch ${isMobile ? 'overflow-x-auto' : 'overflow-x-hidden'} gap-5 scroll-x-momentum transition-transform duration-1000`}
          aria-label="Customer Testimonials"
          tabIndex={0}
          style={{
            scrollSnapType: isMobile ? "x mandatory" : undefined,
            WebkitOverflowScrolling: isMobile ? "touch" : undefined,
            scrollBehavior: isMobile ? "smooth" : undefined,
            willChange: "transform"
          }}
        >
          {stories.map((t, i) => (
            <div
              key={`${t.name}-${i}`}
              className="story-card flex-shrink-0 flex flex-col relative bg-white max-w-xs w-full rounded-2xl shadow-lg px-7 py-8 mb-2 mr-3 border border-fashion-pearl/90 animate-fade-in hover:shadow-xl transition-shadow duration-300"
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
