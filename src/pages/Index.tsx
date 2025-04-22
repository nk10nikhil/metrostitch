import { useEffect, useRef } from 'react';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import Collections from '@/components/Collections';
import Products from '@/components/Products';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import BrandValues from '@/components/BrandValues';
import BrandStory from '@/components/BrandStory';
import BrandJourney from '@/components/BrandJourney';
import FeaturedDesigners from '@/components/FeaturedDesigners';
import SeasonalTrends from '@/components/SeasonalTrends';
import Lookbook from '@/components/Lookbook';
import EcoMission from '@/components/EcoMission';
import StyleInspiration from '@/components/StyleInspiration';
import CustomerStories from '@/components/CustomerStories';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useIsMobile } from '@/hooks/use-mobile';
import animationUtils from '@/lib/animation-utils';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Index = () => {
  const isMobile = useIsMobile();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Configure global animation settings based on device type
    animationUtils.configureMobileAnimations(isMobile);

    // Delay ScrollTrigger refresh to ensure all content is properly loaded
    const refreshTimer = setTimeout(() => {
      animationUtils.refreshScrollTrigger();
    }, 500);

    if (isMobile) {
      // Reset any previous scroll position when the page loads on mobile
      window.scrollTo(0, 0);

      // Apply optimized animations to elements with data-animate attribute
      const animatedElements = gsap.utils.toArray<HTMLElement>('[data-animate]');
      animationUtils.setupScrollAnimations(animatedElements, true);

      // Optimize horizontal scrolling sections for mobile
      animationUtils.optimizeHorizontalScrolling('.scroll-x-momentum');
    } else {
      // Desktop animations
      const animatedElements = gsap.utils.toArray<HTMLElement>('[data-animate]');
      animationUtils.setupScrollAnimations(animatedElements, false);
    }

    // Improved smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSelector = anchor.getAttribute('href') || "";
        const target = document.querySelector(targetSelector);

        if (target) {
          gsap.to(window, {
            duration: isMobile ? 0.5 : 0.8, // Faster on mobile
            scrollTo: {
              y: target,
              offsetY: isMobile ? 56 : 80,
              autoKill: true // Auto-kill for better performance
            },
            ease: "power2.inOut" // Simpler easing function
          });
        }
      });
    });

    return () => {
      clearTimeout(refreshTimer);
      animationUtils.cleanupScrollTrigger();
    };
  }, [isMobile]);

  return (
    <div className="overflow-x-hidden" ref={pageRef}>
      <NavBar />
      
      <Hero />
      <Collections />
      <Products />
      <BrandStory />


      <BrandValues />
      <div className="pb-12 bg-fashion-cream">
        <div className="container mx-auto px-4 flex flex-col items-center" data-animate>
          <p className="text-xl md:text-3xl font-light text-center max-w-3xl">
            "Style is a way to say who you are without having to speak."
          </p>
          <p className="mt-4 text-fashion-charcoal/70">— Dope Beyond</p>
        </div>
      </div>
      <StyleInspiration />
      {/* <BrandJourney /> */}
      

      {/* <Lookbook /> */}
      <SeasonalTrends />
      <CustomerStories />
      <EcoMission />
      
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
