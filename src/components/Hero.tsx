
import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowRight, Sparkles } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const sparklesRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

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
      <div
        ref={textRef}
        className="container mx-auto px-6 md:px-20 relative z-10 pt-20"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="max-w-2xl">
          <h1 className="animate-text text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
            Fashion That <span className="text-orange-400">Defines</span> Your Style
          </h1>
          <p className="animate-text text-xl text-gray-600/100 mb-8">
            Discover our latest collection of trendsetting garments that combine comfort,
            quality and contemporary designs for the modern lifestyle.
          </p>
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
            <Button
              className="group text-sm md:text-base px-6 py-6 bg-orange-600 hover:bg-orange-700 text-white rounded-md transition-all duration-300 transform hover:scale-[1.03] hover:shadow-lg relative overflow-hidden"
              onClick={scrollToCollections}
            >
              <span className="mr-2 relative z-10">EXPLORE COLLECTION</span>
              <ArrowRight className="w-4 h-4 inline-block group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
              <span className="absolute inset-0 bg-gradient-to-r from-orange-700 to-orange-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></span>
            </Button>
            <Button
              className="text-sm md:text-base px-6 py-6 bg-transparent border-2 border-white text-gray-600 hover:text-orange-400 hover:border-orange-400 transition-all duration-300"
              variant="outline"
            >
              Shop Now
            </Button>
          </div>
        </div>

        {/* Animated badge/sparkles element */}
        {/* <div
          ref={sparklesRef}
          className="absolute top-24 md:top-10 right-8 md:right-20 bg-white/10 backdrop-blur-md p-3 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-300"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-orange-400 animate-pulse" />
            <span className="text-white text-sm font-medium">New Arrivals</span>
          </div>
        </div> */}



        <button
          onClick={scrollToCollections}
          className="hero-scroll-indicator"
        >
          <ChevronDown className="text-fashion-charcoal w-8 h-8" />
        </button>
      </div>
      </div>
      );
};

      export default Hero;
