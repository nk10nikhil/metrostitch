import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapSectionReveal } from "@/hooks/useGsapSectionReveal";
import { useIsMobile } from "@/hooks/use-mobile";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    year: "2017",
    title: "Brand Founded",
    desc: "Our story begins with a passion for ethical fashion and a mission to inspire conscious style.",
    color: "bg-fashion-sage",
    icon: "🌱"
  },
  {
    year: "2019",
    title: "First Collection",
    desc: "Launched sustainable collection, earning love for timeless silhouettes and honest materials.",
    color: "bg-fashion-terracotta",
    icon: "✨"
  },
  {
    year: "2023",
    title: "Expanding Horizons",
    desc: "International pop-ups showcase design innovation and diversity.",
    color: "bg-fashion-pearl",
    icon: "🌍"
  }
];

const BrandStory = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useGsapSectionReveal(timelineRef, {
    staggerChildren: true,
    useScale: true,
    useRotate: true,
    useParallax: true,
    mobileOnly: false,
  });

  useEffect(() => {
    // Animate title with reveal effect
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: titleRef.current,
        start: 'top 85%',
      }
    });

    tl.fromTo(
      titleRef.current?.querySelectorAll('.title-span'),
      { y: 50, opacity: 0, filter: 'blur(4px)' },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out'
      }
    );

    // Create a "drawing" timeline connector between milestones for desktop
    if (!isMobile && sectionRef.current) {
      gsap.fromTo(
        '.timeline-connector',
        { width: '0%' },
        {
          width: '100%',
          duration: 1.5,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
            end: 'bottom 60%',
            scrub: 1,
          }
        }
      );
    }

    // Create 3D tilt effect for milestone cards
    const cards = document.querySelectorAll('.story-milestone');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xPercent = x / rect.width - 0.5;
        const yPercent = y / rect.height - 0.5;

        gsap.to(card, {
          rotationY: xPercent * 8,
          rotationX: yPercent * -8,
          transformPerspective: 1000,
          duration: 0.5,
          ease: 'power1.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotationY: 0,
          rotationX: 0,
          duration: 0.6,
          ease: 'power2.out'
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className="py-16 relative bg-gradient-to-b from-fashion-sand/80 via-white to-fashion-pearl/80 overflow-x-hidden"
    >
      <div className="container mx-auto px-4 md:px-6" data-animate>
        <div ref={titleRef} className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-light text-center mb-3">
            <span className="title-span inline-block">Our</span>{" "}
            <span className="title-span inline-block font-semibold bg-gradient-to-r from-fashion-terracotta to-fashion-sage bg-clip-text text-transparent">Brand Story</span>
          </h2>
          <p className="title-span text-center text-fashion-charcoal/70 mb-10 max-w-xl mx-auto">
            Trace our journey from vision to wardrobe, built on sustainable practices and timeless style.
          </p>
        </div>

        <div className="relative">
          {/* Timeline connector for desktop */}
          {!isMobile && (
            <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gray-100">
              <div className="timeline-connector h-full bg-gradient-to-r from-fashion-sage via-fashion-terracotta to-fashion-pearl"></div>
            </div>
          )}

          <div
            ref={timelineRef}
            className="flex flex-col md:flex-row items-center md:justify-center gap-10 md:gap-6 mt-6 relative z-10"
          >
            {milestones.map((item, idx) => (
              <div
                key={idx}
                className={`story-milestone group relative flex-1 w-full max-w-xs rounded-xl shadow-lg ${item.color} px-8 py-8 mb-2 flex flex-col items-center will-change-transform transition-all duration-500`}
                style={{
                  border: "2px solid #e5e7eb",
                  boxShadow: activeIndex === idx ? "0 15px 35px rgba(214,135,111,0.15)" : "0 8px 28px 0 rgba(214,135,111,0.08)",
                  transform: activeIndex === idx ? "translateY(-5px)" : "translateY(0)",
                }}
                onMouseEnter={() => setActiveIndex(idx)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div className="flex flex-col items-center justify-center mb-3">
                  <span className="inline-block text-2xl mb-2">{item.icon}</span>
                  <span className="px-4 py-1 bg-white/70 text-fashion-charcoal/80 font-semibold rounded-full text-xs shadow pulse">
                    {item.year}
                  </span>
                </div>

                <h4 className="text-lg font-bold mb-2 text-center leading-snug">{item.title}</h4>
                <p className="text-sm text-fashion-charcoal/70 text-center">{item.desc}</p>

                <div
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-fashion-terracotta/60 to-fashion-pearl/30 rounded-full opacity-50 group-hover:scale-110 group-hover:opacity-100 transition-all duration-300"
                ></div>

                {/* Milestone connector dots */}
                {!isMobile && (
                  <div className="hidden md:block absolute -top-[30px] left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-white border-2 border-gray-200 shadow-sm z-20 group-hover:border-fashion-terracotta transition-all duration-300"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <svg className="hidden md:block absolute left-2 top-10 w-12 h-12 opacity-40 pointer-events-none animate-pulse" viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="14" fill="#D2E3CD" />
      </svg>
      <svg className="block md:hidden absolute right-3 top-24 w-10 h-10 opacity-30 pointer-events-none animate-float" viewBox="0 0 32 32">
        <rect width="32" height="32" rx="16" fill="#F7E1DB" />
      </svg>
      <svg className="hidden md:block absolute right-20 bottom-10 w-16 h-16 opacity-20 pointer-events-none" viewBox="0 0 32 32">
        <polygon points="16,2 2,30 30,30" fill="#F7E1DB" />
      </svg>
    </section>
  );
};

export default BrandStory;
