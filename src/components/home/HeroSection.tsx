"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register ScrollTrigger plugin
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    const ctx = gsap.context(() => {
      // Initial animation for hero section elements
      if (textRef.current) {
        const heroTextElements = textRef.current.querySelectorAll('.gsap-hero-text');
        if (heroTextElements.length > 0) {
          gsap.fromTo(
            Array.from(heroTextElements),
            {
              y: 50,
              opacity: 0
            },
            {
              y: 0,
              opacity: 1,
              stagger: 0.2,
              duration: 1,
              ease: 'power3.out'
            }
          );
        }
      }

      // Animate the hero image
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          {
            x: 100,
            opacity: 0
          },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            delay: 0.3
          }
        );

        // Parallax effect on scroll
        gsap.to(imageRef.current, {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });
      }
    }, heroRef);

    return () => ctx.revert(); // Cleanup animation
  }, []);

  return (
    <section
      ref={heroRef}
      className="min-h-screen pt-20 pb-16 flex items-center relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-primary/30 rounded-bl-[200px] -z-10" />
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-accent/10 -z-10 float-animation" />
      <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-primary/40 -z-10 float-animation" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6">
        {/* Text Content */}
        <div ref={textRef} className="flex flex-col justify-center">
          <span className="text-sm md:text-base font-medium text-accent mb-3 gsap-hero-text">New Collection 2025</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 gsap-hero-text">
            Discover Your <br />
            <span className="text-accent">Perfect</span> Style
          </h1>
          <p className="text-muted-foreground mb-8 max-w-md gsap-hero-text">
            Explore our curated collection of contemporary fashion designed for the modern individual. Quality meets style in every piece.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 gsap-hero-text">
            <Button size="lg" className="px-8 font-medium">
              Shop Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="px-8 font-medium">
              Explore Collections
            </Button>
          </div>

          <div className="mt-12 flex items-center space-x-8 gsap-hero-text">
            <div className="text-center">
              <p className="text-3xl font-bold">500+</p>
              <p className="text-sm text-muted-foreground">Products</p>
            </div>
            <div className="h-12 w-px bg-border" />
            <div className="text-center">
              <p className="text-3xl font-bold">10k+</p>
              <p className="text-sm text-muted-foreground">Happy Customers</p>
            </div>
            <div className="h-12 w-px bg-border" />
            <div className="text-center">
              <p className="text-3xl font-bold">30+</p>
              <p className="text-sm text-muted-foreground">Collections</p>
            </div>
          </div>
        </div>

        {/* Image */}
        <div ref={imageRef} className="relative h-[500px] lg:h-[600px] flex items-center justify-center">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-fashion-beige rounded-full -z-10" />
          <Image
            src="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80"
            alt="Fashion Model"
            height={800}
            width={600}
            className="object-cover h-full rounded-2xl"
            priority
          />
        </div>
      </div>
    </section>
  );
}
