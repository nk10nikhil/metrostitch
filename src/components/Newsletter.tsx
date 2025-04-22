import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Send, CheckCircle, Mail } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

gsap.registerPlugin(ScrollTrigger);

const Newsletter = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: "play none none reverse"
      }
    });

    // Staggered title and text reveal with blur effect
    tl.fromTo(
      contentRef.current?.querySelectorAll('.animate-text'),
      { y: 30, opacity: 0, filter: 'blur(4px)' },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out"
      }
    );

    // Form animation with bounce effect
    tl.fromTo(
      formRef.current,
      { y: 20, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: "back.out(1.5)"
      },
      "-=0.3"
    );

    // Floating decorative elements animation
    const particles = document.querySelectorAll('.newsletter-particle');
    particles.forEach((particle) => {
      gsap.to(particle, {
        y: gsap.utils.random(-15, -30),
        x: gsap.utils.random(-10, 10),
        rotation: gsap.utils.random(-10, 10),
        duration: gsap.utils.random(3, 5),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || email.trim() === '') return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Successfully subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setIsSubmitting(false);
      setIsSubscribed(true);

      // Animate success state
      gsap.to(formRef.current, {
        backgroundColor: '#D2E3CD30',
        borderColor: '#D2E3CD',
        duration: 0.3,
      });

      // Clear form after success
      setTimeout(() => {
        setEmail('');
        setIsSubscribed(false);
        gsap.to(formRef.current, {
          backgroundColor: 'transparent',
          borderColor: 'rgba(17, 24, 39, 0.2)',
          duration: 0.5,
        });
      }, 3000);
    }, 800);
  };

  const handleFocus = () => {
    gsap.to(formRef.current, {
      boxShadow: '0 0 0 2px rgba(214,135,111,0.25)',
      borderColor: 'rgba(214,135,111,0.5)',
      duration: 0.3,
    });
  };

  const handleBlur = () => {
    gsap.to(formRef.current, {
      boxShadow: 'none',
      borderColor: 'rgba(17, 24, 39, 0.2)',
      duration: 0.3,
    });
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-fashion-sage/15 clip-path-slant relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="newsletter-particle absolute top-10 left-[10%] w-16 h-16 rounded-full bg-fashion-terracotta/5 filter blur-xl"></div>
      <div className="newsletter-particle absolute bottom-20 right-[15%] w-24 h-24 rounded-full bg-fashion-sage/10 filter blur-xl"></div>
      <div className="newsletter-particle absolute top-1/4 right-[20%] w-10 h-10 rounded-full border-2 border-dashed border-fashion-terracotta/20 opacity-40"></div>
      <div className="newsletter-particle absolute bottom-1/3 left-[25%] w-12 h-12 rounded-full border border-fashion-sage/20 opacity-30"></div>

      <div className="container mx-auto px-4">
        <div
          ref={contentRef}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="animate-text text-3xl md:text-4xl font-light mb-4">
            <span className="font-semibold bg-gradient-to-r from-fashion-terracotta to-fashion-sage bg-clip-text text-transparent">Subscribe</span> to Our Newsletter
          </h2>
          <p className="animate-text text-fashion-charcoal/70 mb-8">
            Be the first to know about new collections, special offers, and exclusive events.
            Join our community of fashion enthusiasts.
          </p>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto p-1 border border-fashion-charcoal/20 rounded-md transition-all duration-300 bg-white/50 backdrop-blur-sm"
          >
            <div className="flex-grow relative">
              <Input
                ref={inputRef}
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                required
                className="border-none shadow-none bg-transparent focus:ring-0 pl-9"
                disabled={isSubmitting || isSubscribed}
              />
              <Mail className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-fashion-charcoal/50" />
            </div>

            <Button
              type="submit"
              className={`bg-fashion-terracotta hover:bg-fashion-terracotta/90 text-white rounded-md transition-all duration-300 ${isSubmitting ? 'opacity-80' : ''}`}
              disabled={isSubmitting || isSubscribed}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  SUBSCRIBING
                </span>
              ) : isSubscribed ? (
                <span className="flex items-center">
                  <CheckCircle className="mr-1 h-4 w-4" />
                  SUBSCRIBED
                </span>
              ) : (
                <span className="flex items-center">
                  SUBSCRIBE
                  <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
          </form>

          <p className="animate-text text-xs text-fashion-charcoal/50 mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive our promotional emails.
          </p>
        </div>
      </div>

      {/* Bottom decorative curved line */}
      <svg className="absolute bottom-0 left-0 w-full" height="70" viewBox="0 0 1440 70" fill="none" preserveAspectRatio="none">
        <path d="M0,70 C240,35 720,0 1440,70 L1440,70 L0,70 Z" fill="white" opacity="0.2"></path>
      </svg>
    </section>
  );
};

export default Newsletter;
