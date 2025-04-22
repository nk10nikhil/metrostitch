
import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.fromTo(headingRef.current, 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1 }
    )
    .fromTo(textRef.current, 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1 }, 
      "-=0.6"
    )
    .fromTo(ctaRef.current, 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8 }, 
      "-=0.4"
    );

    // Parallax effect on scroll
    gsap.to(heroRef.current, {
      backgroundPositionY: "30%",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }, []);

  const scrollToCollections = () => {
    const collectionsSection = document.getElementById('collections');
    if (collectionsSection) {
      collectionsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen bg-cover bg-center flex items-center"
      style={{ 
        backgroundImage: "linear-gradient(rgba(248, 245, 240, 0.3), rgba(248, 245, 240, 0.6)), url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070')" 
      }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-lg">
          <h1 
            ref={headingRef}
            className="text-4xl md:text-6xl font-light tracking-tight mb-6 text-fashion-charcoal"
          >
            Summer <span className="font-semibold">Collection</span> 2025
          </h1>
          <p 
            ref={textRef}
            className="text-lg md:text-xl text-fashion-charcoal/80 mb-8"
          >
            Discover timeless elegance with our new summer essentials. 
            Sustainably crafted for the modern wardrobe.
          </p>
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
            <Button 
              className="bg-orange-700 hover:bg-orange-700/90 text-white rounded-none py-6 px-8"
            >
              SHOP NOW
            </Button>
            <Button 
              variant="outline" 
              className="border-fashion-terracotta text-orange-700 hover:bg-fashion-terracotta/10 rounded-none py-6 px-8"
              onClick={scrollToCollections}
            >
              EXPLORE COLLECTIONS
            </Button>
          </div>
        </div>
      </div>
      
      <button 
        onClick={scrollToCollections}
        className="hero-scroll-indicator"
      >
        <ChevronDown className="text-fashion-charcoal w-8 h-8" />
      </button>
      
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-fashion-cream to-transparent"></div>
    </div>
  );
};

export default Hero;
