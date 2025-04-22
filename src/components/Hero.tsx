import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowRight, Sparkles } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const sparklesRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Initial animation sequence
    const tl = gsap.timeline();

    // Animate gradient overlay
    tl.fromTo(
      overlayRef.current,
      { opacity: 0.95 },
      { opacity: 0.65, duration: 1.5, ease: "power2.inOut" }
    );

    // Animate text elements with staggered effect
    tl.fromTo(
      textRef.current?.querySelectorAll('.animate-text'),
      { y: 50, opacity: 0, filter: 'blur(8px)' },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        stagger: 0.15,
        duration: 1.2,
        ease: 'power3.out'
      },
      "-=0.8"
    );

    // Animate CTA with bounce effect
    tl.fromTo(
      ctaRef.current,
      { y: 30, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' },
      "-=0.4"
    );

    // Sparkles animation
    tl.fromTo(
      sparklesRef.current,
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'power1.out' },
      "-=0.3"
    );

    // Enhanced parallax effect on scroll
    gsap.to(heroRef.current, {
      backgroundPositionY: "30%",
      backgroundSize: isMobile ? "180%" : "130%",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // Text slightly moves up faster than background (creates depth)
    gsap.to(textRef.current, {
      y: -60,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.8
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isMobile]);

  const scrollToCollections = () => {
    const collectionsSection = document.getElementById('collections');
    if (collectionsSection) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: {
          y: collectionsSection,
          offsetY: 80
        },
        ease: "power3.inOut"
      });
    }
  };

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen bg-cover bg-center flex items-center overflow-hidden"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070')",
        backgroundSize: "120%"
      }}
    >
      {/* Animated gradient overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-br from-fashion-navy/80 to-transparent"
        style={{
          background: `linear-gradient(135deg, 
            rgba(17, 24, 39, ${isHovered ? '0.8' : '0.7'}), 
            rgba(76, 29, 149, ${isHovered ? '0.6' : '0.5'}), 
            rgba(30, 58, 138, ${isHovered ? '0.55' : '0.45'})
          )`,
          transition: 'background 0.6s ease-out'
        }}
      />

      <div
        ref={textRef}
        className="container mx-auto px-6 md:px-20 relative z-10 pt-20"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="max-w-2xl">
          <h1 className="animate-text text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Fashion That <span className="text-orange-400">Defines</span> Your Style
          </h1>
          <p className="animate-text text-xl text-gray-100 mb-8">
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
              className="text-sm md:text-base px-6 py-6 bg-transparent border-2 border-white text-white hover:text-orange-400 hover:border-orange-400 transition-all duration-300"
              variant="outline"
            >
              LEARN MORE
            </Button>
          </div>
        </div>

        {/* Animated badge/sparkles element */}
        <div
          ref={sparklesRef}
          className="absolute top-24 md:top-10 right-8 md:right-20 bg-white/10 backdrop-blur-md p-3 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-300"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-orange-400 animate-pulse" />
            <span className="text-white text-sm font-medium">New Arrivals</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <span className="text-white/80 text-sm mb-2">Scroll</span>
          <ArrowDown className="w-5 h-5 text-white/80 animate-bounce" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
