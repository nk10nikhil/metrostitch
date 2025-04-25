import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MailIcon, ArrowRightIcon } from 'lucide-react';
gsap.registerPlugin(ScrollTrigger);
export const NewsletterSection = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  useEffect(() => {
    gsap.from(sectionRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom-=100'
      },
      opacity: 0,
      y: 50,
      duration: 0.8
    });
    gsap.from(formRef.current, {
      scrollTrigger: {
        trigger: formRef.current,
        start: 'top bottom-=50'
      },
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      delay: 0.2
    });
  }, []);
  return <section ref={sectionRef} className="py-16 md:py-24 bg-gray-900 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-8 inline-block p-3 bg-gray-800 rounded-full">
            <MailIcon size={32} className="text-rose-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            Stay up to date with the latest trends, exclusive offers, and
            fashion insights.
          </p>
          <form ref={formRef} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input type="email" placeholder="Enter your email address" className="flex-grow px-6 py-4 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-400" />
            <button className="px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-full transition-colors duration-300 flex items-center justify-center gap-2 group">
              Subscribe
              <ArrowRightIcon size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </form>
          <p className="text-gray-500 text-sm mt-4">
            By subscribing, you agree to our Privacy Policy and consent to
            receive updates.
          </p>
        </div>
      </div>
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-rose-900/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-900/20 rounded-full filter blur-3xl"></div>
      </div>
    </section>;
};