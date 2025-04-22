import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile } from '@/hooks/use-mobile';

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    title: "Sustainable Production",
    description: "We source eco-friendly materials and employ ethical production methods to minimize environmental impact.",
    icon: "♻️",
    color: "bg-fashion-sage/20",
    iconBg: "bg-fashion-sage",
    highlight: "78% recycled materials"
  },
  {
    title: "Timeless Quality",
    description: "Our designs prioritize longevity and versatility, transcending seasonal trends for lasting style.",
    icon: "⭐",
    color: "bg-fashion-terracotta/20",
    iconBg: "bg-fashion-terracotta",
    highlight: "Built to last 5+ years"
  },
  {
    title: "Ethical Relationships",
    description: "We foster fair partnerships with artisans and suppliers, ensuring equitable treatment throughout our supply chain.",
    icon: "🤝",
    color: "bg-fashion-pearl/30",
    iconBg: "bg-fashion-pearl",
    highlight: "Fair wage certified"
  },
  {
    title: "Conscious Innovation",
    description: "We continuously explore new materials and methods to enhance sustainability without compromising style.",
    icon: "💡",
    color: "bg-fashion-navy/10",
    iconBg: "bg-fashion-navy",
    highlight: "Award-winning designs"
  }
];

const BrandValues = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [activeValue, setActiveValue] = useState<number | null>(null);

  useEffect(() => {
    // Create timeline for header animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: titleRef.current,
        start: 'top 85%',
      }
    });
    // Animate header with text reveal
    tl.fromTo(
      titleRef.current?.children,
      { y: 40, opacity: 0, filter: 'blur(4px)' },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        stagger: 0.15,
        duration: 0.9,
        ease: 'power2.out'
      }
    );

    // Animate value cards with staggered entrance
    const cards = valuesRef.current?.querySelectorAll('.value-card');
    cards?.forEach((card, index) => {
      // Create alternating animation direction based on index
      const offset = index % 2 === 0 ? -20 : 20;

      gsap.fromTo(
        card,
        {
          y: 50,
          x: isMobile ? 0 : offset,
          opacity: 0,
          scale: 0.9
        },
        {
          y: 0,
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: isMobile ? 0.1 * index : 0.2 * index,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
          }
        }
      );
    });

    // Create subtle parallax effect for background patterns
    const patterns = document.querySelectorAll('.bg-pattern');
    patterns.forEach((pattern) => {
      gsap.to(pattern, {
        y: isMobile ? 20 : 40,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 relative bg-gradient-to-br from-fashion-cream to-white overflow-hidden"
    >
      {/* Background patterns */}
      <div className="bg-pattern absolute top-0 left-0 w-48 h-48 rounded-full bg-fashion-sage/10 blur-3xl opacity-50"></div>
      <div className="bg-pattern absolute bottom-20 right-10 w-64 h-64 rounded-full bg-fashion-terracotta/10 blur-3xl opacity-60"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-light mb-4">
            Our <span className="font-semibold bg-gradient-to-r from-fashion-terracotta to-fashion-navy bg-clip-text text-transparent">Core Values</span>
          </h2>
          <p className="text-fashion-charcoal/70 max-w-xl mx-auto">
            The principles that guide our designs, practices and relationships.
            Every decision we make is anchored in these foundational values.
          </p>
        </div>

        <div
          ref={valuesRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {values.map((value, i) => (
            <div
              key={i}
              className={`value-card group relative bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 will-change-transform ${activeValue === i ? 'shadow-xl scale-[1.02]' : 'hover:shadow-md hover:scale-[1.01]'}`}
              onMouseEnter={() => setActiveValue(i)}
              onMouseLeave={() => setActiveValue(null)}
            >
              {/* Decorative top border */}
              <div
                className={`${value.color} h-1 w-full absolute top-0 left-0 z-10`}
              />

              <div className="p-6 md:p-7">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`${value.iconBg} text-white p-3 rounded-full shadow-sm flex items-center justify-center transform transition-transform duration-500 ${activeValue === i ? 'rotate-12 scale-110' : 'group-hover:rotate-6 group-hover:scale-105'}`}>
                    <span className="text-2xl">{value.icon}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-fashion-navy pt-2">{value.title}</h3>
                </div>

                <p className="text-fashion-charcoal/80 text-sm mb-5 leading-relaxed">
                  {value.description}
                </p>

                <div className={`inline-block px-4 py-2 rounded-full text-xs font-medium ${value.color} text-fashion-navy/80`}>
                  {value.highlight}
                </div>

                {/* Hidden hover effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-fashion-navy/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                />

                {/* Animated corner accent */}
                <div className={`absolute -bottom-2 -right-2 w-16 h-16 transform rotate-45 translate-x-8 translate-y-8 ${value.iconBg} opacity-10 group-hover:translate-x-6 group-hover:translate-y-6 transition-all duration-500`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandValues;
