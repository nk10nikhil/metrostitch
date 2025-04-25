"use client";

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ParallaxBanner() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      if (sectionRef.current && textRef.current) {
        const sectionElement = sectionRef.current;
        const textElement = textRef.current;

        const ctx = gsap.context(() => {
          // Parallax effect for background
          gsap.to(sectionElement, {
            backgroundPosition: '50% 70%',
            ease: 'none',
            scrollTrigger: {
              trigger: sectionElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            }
          });

          // Text animation
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: sectionElement,
              start: 'top 80%',
              end: 'center center',
              scrub: 1,
            }
          });

          const parallaxTextElements = textElement.querySelectorAll('.parallax-text');
          if (parallaxTextElements.length > 0) {
            timeline.fromTo(
              Array.from(parallaxTextElements),
              { y: 50, opacity: 0 },
              { y: 0, opacity: 1, stagger: 0.2, duration: 1 }
            );
          }
        }, sectionRef);

        return () => ctx.revert();
      }
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 md:py-40 relative bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1544441893-675973e31985?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80)',
        backgroundPosition: '50% 50%'
      }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="container mx-auto px-4 relative z-10">
        <div
          ref={textRef}
          className="max-w-2xl mx-auto text-center text-white"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 parallax-text">
            Summer Collection 2025
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8 parallax-text">
            Embrace the warmth with our new seasonal pieces designed for comfort and style.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 parallax-text">
            <Button size="lg" className="bg-white text-black hover:bg-white/90 hover:text-black">
              Shop The Collection
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/20">
              Watch Lookbook
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
