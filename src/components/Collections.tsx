import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

gsap.registerPlugin(ScrollTrigger);

const Collections = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const collectionsRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Skip animation setup until references are ready
    if (!sectionRef.current || !titleRef.current || !collectionsRef.current) return;

    // Create timeline for smoother animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      }
    });

    // Animate title - simplified for mobile
    tl.fromTo(
      titleRef.current,
      {
        y: isMobile ? 30 : 50,
        opacity: 0,
        scale: isMobile ? 0.98 : 0.95
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: isMobile ? 0.8 : 1.2,
        ease: 'power3.out',
      }
    );

    // Get all collection cards
    const cards = collectionsRef.current.querySelectorAll('.collection-card');

    if (isMobile) {
      // Simpler animation for mobile - focus on performance
      gsap.fromTo(
        cards,
        {
          y: 40,
          opacity: 0,
          scale: 0.96,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.1, // Small stagger for quicker reveal
          ease: "power2.out",
          scrollTrigger: {
            trigger: collectionsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );

      // Simple image reveal animation
      cards.forEach((card) => {
        gsap.fromTo(
          card.querySelector('img'),
          { scale: 1.1 },
          {
            scale: 1,
            duration: 0.9,
            ease: "power1.out",
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
            }
          }
        );
      });
    } else {
      // Desktop animations can be more elaborate
      cards.forEach((card, index) => {
        // Add directional motion based on position
        const xDirection = index % 2 === 0 ? -20 : 20;

        gsap.fromTo(
          card,
          {
            y: 70,
            x: xDirection,
            opacity: 0,
            scale: 0.92,
          },
          {
            y: 0,
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            delay: 0.25 * index,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse'
            },
          }
        );

        // Animate image separately for a more dynamic feel
        gsap.fromTo(
          card.querySelector('img'),
          { scale: 1.2, filter: 'blur(5px)' },
          {
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.5,
            delay: 0.3 * index,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
            }
          }
        );
      });
    }

    // Clean up ScrollTrigger on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isMobile]);

  const collections = [
    {
      id: 1,
      title: 'Casual Chic',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1020',
      description: 'Effortless styles for everyday elegance',
    },
    {
      id: 2,
      title: 'Summer Essentials',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1170',
      description: 'Light, breezy pieces for warm days',
    },
    {
      id: 3,
      title: 'Evening Attire',
      image: 'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?q=80&w=987',
      description: 'Sophisticated looks for special occasions',
    },
  ];

  return (
    <section id="collections" ref={sectionRef} className="py-16 md:py-20 bg-gradient-to-b from-fashion-cream to-fashion-cream/70">
      <div className="container mx-auto px-4">
        <div ref={titleRef} className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-light mb-4">Our <span className="font-semibold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">Collections</span></h2>
          <p className="text-fashion-charcoal/70 max-w-2xl mx-auto">
            Curated selections that blend timeless style with contemporary trends.
            Each collection tells a unique story through fabric, form, and function.
          </p>
        </div>

        <div
          ref={collectionsRef}
          className={`grid grid-cols-1 ${isMobile ? 'gap-6' : 'md:grid-cols-3 gap-8'}`}
        >
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="collection-card group bg-white p-2 shadow-sm hover:shadow-lg transition-all duration-500 ease-out"
            >
              <div className="overflow-hidden mb-4 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-[300px] md:h-[400px] object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 will-change-transform"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-medium mb-2 group-hover:text-orange-600 transition-colors duration-300">{collection.title}</h3>
              <p className="text-fashion-charcoal/70 mb-4">{collection.description}</p>
              <Button
                className="mt-2 bg-transparent hover:bg-orange-700 text-fashion-charcoal hover:text-white border border-orange-700 rounded-none transition-all duration-300 relative overflow-hidden group-hover:shadow-md"
              >
                <span className="relative z-10">DISCOVER</span>
                <span className="absolute inset-0 bg-orange-600 transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;
