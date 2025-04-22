
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

gsap.registerPlugin(ScrollTrigger);

const Newsletter = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    // Animate content
    gsap.fromTo(
      contentRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Successfully subscribed!",
      description: "Thank you for subscribing to our newsletter.",
    });
  };

  return (
    <section 
      ref={sectionRef} 
      className="py-20 bg-fashion-sage/15 clip-path-slant"
    >
      <div className="container mx-auto px-4">
        <div 
          ref={contentRef} 
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-light mb-4">
            <span className="font-semibold">Subscribe</span> to Our Newsletter
          </h2>
          <p className="text-fashion-charcoal/70 mb-8">
            Be the first to know about new collections, special offers, and exclusive events.
            Join our community of fashion enthusiasts.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Your email address" 
              required
              className="flex-grow rounded-none border-fashion-charcoal/30 focus:border-fashion-terracotta focus:ring-fashion-terracotta"
            />
            <Button 
              type="submit"
              className="bg-fashion-terracotta hover:bg-fashion-terracotta/90 text-white rounded-none"
            >
              SUBSCRIBE
            </Button>
          </form>
          
          <p className="text-xs text-fashion-charcoal/50 mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive our promotional emails.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
