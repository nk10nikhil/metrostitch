import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { useIsMobile } from "@/hooks/use-mobile";

gsap.registerPlugin(ScrollTrigger, Draggable);

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
  },
  {
    img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1064",
    label: "Seasonal Accessories",
    desc: "Perfect complements for every outfit."
  },
  {
    img: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=1170",
    label: "Modern Classics",
    desc: "Timeless pieces with contemporary touches."
  },
  {
    img: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?q=80&w=1171",
    label: "Urban Fusion",
    desc: "Streetwear meets high fashion sensibility."
  },
  {
    img: "https://images.unsplash.com/photo-1517256673644-36ad11246d21?q=80&w=1887",
    label: "Texture Play",
    desc: "Mix fabrics for depth and visual interest."
  },
  {
    img: "https://images.unsplash.com/photo-1589363660787-2b5f2a9ecf4d?q=80&w=1015",
    label: "Sustainable Chic",
    desc: "Eco-conscious fashion that doesn't compromise on style."
  },
  {
    img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=988",
    label: "Statement Pieces",
    desc: "Conversation-starting garments that elevate any wardrobe."
  }
];

const StyleInspiration = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const dragInstanceRef = useRef<any>(null);
  const isMobile = useIsMobile();
  const [isDragging, setIsDragging] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

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

      // Setup manual dragging functionality for desktop and mobile
      setupDraggableScroll();

      // Check for scroll arrows visibility
      updateArrowVisibility();
    }

    return () => {
      // Clean up ScrollTrigger instances and draggable when component unmounts
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === sectionRef.current ||
          trigger.vars.trigger === scrollRef.current) {
          trigger.kill();
        }
      });

      if (dragInstanceRef.current) {
        dragInstanceRef.current.kill();
      }
    };
  }, [isMobile]);

  // Setup draggable functionality
  const setupDraggableScroll = () => {
    if (!scrollRef.current) return;

    // Kill any existing draggable instance
    if (dragInstanceRef.current) {
      dragInstanceRef.current.kill();
    }

    // Create a new draggable instance
    dragInstanceRef.current = Draggable.create(scrollRef.current, {
      type: "x",
      inertia: true,
      bounds: {
        minX: -(scrollRef.current.scrollWidth - scrollRef.current.offsetWidth),
        maxX: 0
      },
      edgeResistance: 0.85,
      onDragStart: () => setIsDragging(true),
      onDragEnd: () => {
        setIsDragging(false);
        updateArrowVisibility();
      },
      onUpdate: function () {
        setScrollPosition(this.x);
        updateArrowVisibility();
      }
    })[0];
  };

  // Update visibility of scroll arrows
  const updateArrowVisibility = () => {
    if (!scrollRef.current) return;

    const element = scrollRef.current;
    const currentPosition = dragInstanceRef.current ? dragInstanceRef.current.x : 0;
    const maxScroll = -(element.scrollWidth - element.offsetWidth);

    setShowLeftArrow(currentPosition < -10);
    setShowRightArrow(currentPosition > maxScroll + 10);
  };

  // Scroll to direction (left/right)
  const scrollTo = (direction: 'left' | 'right') => {
    if (!scrollRef.current || !dragInstanceRef.current) return;

    const cardWidth = 320; // Approximate card width including margin
    const currentX = dragInstanceRef.current.x;
    const targetX = direction === 'left'
      ? Math.min(0, currentX + (cardWidth * 2))
      : Math.max(-(scrollRef.current.scrollWidth - scrollRef.current.offsetWidth), currentX - (cardWidth * 2));

    gsap.to(scrollRef.current, {
      x: targetX,
      duration: 0.8,
      ease: "power3.out",
      onUpdate: () => {
        if (dragInstanceRef.current) {
          dragInstanceRef.current.update();
        }
      },
      onComplete: updateArrowVisibility
    });
  };

  // On mobile, add snap points for smooth horizontal scroll
  useEffect(() => {
    if (scrollRef.current && isMobile) {
      const node = scrollRef.current;
      node.style.overflowX = "auto";
      node.style.scrollSnapType = "x mandatory";
      node.style.setProperty("webkitOverflowScrolling", "touch");
      node.style.scrollBehavior = "smooth";
    }
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className="py-14 bg-gradient-to-br from-fashion-sage/20 to-fashion-cream relative"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-light text-center mb-2 animate-fade-in">
          Style <span className="font-semibold">Inspiration</span>
        </h2>
        <p className="text-center text-fashion-charcoal/70 mb-6 animate-fade-in">
          Find your next look. Discover today's most-loved style ideas.
        </p>

        <div className="relative">
          {/* Navigation Arrows for Desktop */}
          {!isMobile && (
            <>
              <button
                className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-md rounded-full p-2 backdrop-blur-sm transition-opacity duration-300 ${showLeftArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => scrollTo('left')}
                aria-label="Scroll left"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-md rounded-full p-2 backdrop-blur-sm transition-opacity duration-300 ${showRightArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => scrollTo('right')}
                aria-label="Scroll right"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </>
          )}

          <div
            ref={scrollRef}
            className={`scroll-x-momentum flex gap-6 md:gap-10 items-stretch ${isMobile ? 'overflow-x-auto' : ''} pb-2 md:pb-0 cursor-grab active:cursor-grabbing`}
            tabIndex={0}
            aria-label="Style Inspiration Gallery"
            style={{
              scrollSnapType: isMobile ? "x mandatory" : undefined,
              WebkitOverflowScrolling: isMobile ? "touch" : undefined,
              scrollBehavior: isMobile ? "smooth" : undefined,
              userSelect: 'none',
              touchAction: 'pan-y',
            }}
          >
            {inspirations.map((insp, i) => (
              <div
                key={i}
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

          {/* Scroll progress indicator */}
          {!isMobile && (
            <div className="hidden md:block w-full h-1 bg-gray-100 mt-6 rounded-full overflow-hidden">
              <div
                className="h-full bg-fashion-sage rounded-full transition-transform duration-300 ease-out"
                style={{
                  transform: `translateX(${scrollPosition}px) scaleX(${scrollRef.current ? scrollRef.current.offsetWidth / scrollRef.current.scrollWidth : 0})`,
                  transformOrigin: 'left'
                }}
              ></div>
            </div>
          )}
        </div>

        {/* Mobile instructions */}
        {isMobile && (
          <p className="text-center text-fashion-charcoal/50 text-xs mt-4 animate-fade-in">
            Swipe left or right to explore more styles
          </p>
        )}

        {/* Desktop instructions */}
        {!isMobile && (
          <p className="text-center text-fashion-charcoal/50 text-xs mt-4 animate-fade-in">
            Click and drag or use arrows to explore more styles
          </p>
        )}
      </div>
    </section>
  );
};

export default StyleInspiration;
