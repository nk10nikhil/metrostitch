import { useEffect } from 'react';
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

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Index = () => {
  const isMobile = useIsMobile();

  useEffect(() => {
    ScrollTrigger.refresh();

    // Enhanced smoother entry fade+scale, more pronounced on mobile
    gsap.utils.toArray<HTMLElement>('[data-animate]').forEach((element, idx) => {
      const baseTimeline = {
        y: isMobile ? 18 : 36,
        opacity: 0,
        scale: isMobile ? 0.97 : 1
      };
      const toTimeline = {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: isMobile ? 0.65 : 1,
        ease: isMobile ? 'expo.out' : 'power3.out',
        delay: isMobile ? 0.06 * idx : 0,
        scrollTrigger: {
          trigger: element,
          start: isMobile ? 'top 92%' : 'top 85%',
          toggleActions: 'play none none reverse'
        }
      };
      gsap.fromTo(element, baseTimeline, toTimeline);
    });

    // Momentum-feel for all horizontal scroll sections on mobile
    if (isMobile) {
      const horizontals = document.querySelectorAll('.scroll-x-momentum');
      horizontals.forEach((node) => {
        (node as HTMLElement).style.scrollSnapType = "x mandatory";
        (node as HTMLElement).style.setProperty("scrollBehavior", "smooth");
      });
    }

    // Set up improved smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href') || "");
        if (target) {
          gsap.to(window, {
            duration: isMobile ? 0.7 : 1,
            scrollTo: {
              y: target,
              offsetY: isMobile ? 56 : 80
            },
            ease: "power3.inOut"
          });
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isMobile]);

  return (
    <div className="overflow-x-hidden">
      <NavBar />
      <Hero />
      <Collections />
      <StyleInspiration />
      <BrandValues />
      <BrandStory />
      <BrandJourney />
      <CustomerStories />
      <Lookbook />
      <EcoMission />
      <FeaturedDesigners />
      <div className="py-12 bg-fashion-cream">
        <div className="container mx-auto px-4 flex flex-col items-center" data-animate>
          <p className="text-xl md:text-3xl font-light text-center max-w-3xl">
            "Style is a way to say who you are without having to speak."
          </p>
          <p className="mt-4 text-fashion-charcoal/70">— Rachel Zoe</p>
        </div>
      </div>
      <SeasonalTrends />
      <Products />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
