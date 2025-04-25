import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Truck, RefreshCw, Shield, Clock } from 'lucide-react';
gsap.registerPlugin(ScrollTrigger);
export const FeaturesSection = () => {
  const sectionRef = useRef(null);
  useEffect(() => {
    gsap.from('.feature-item', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom-=100'
      },
      opacity: 0,
      y: 30,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power2.out'
    });
  }, []);
  const features = [{
    icon: <Truck size={32} />,
    title: 'Free Shipping',
    description: 'On orders over Rs.500'
  }, {
    icon: <RefreshCw size={32} />,
    title: 'Easy Returns',
    description: '30-day return policy'
  }, {
    icon: <Shield size={32} />,
    title: 'Secure Shopping',
    description: '100% secure checkout'
  }, {
    icon: <Clock size={32} />,
    title: '24/7 Support',
    description: 'Always here to help'
  }];
  return <section ref={sectionRef} className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => <div key={index} className="feature-item group flex flex-col items-center text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors duration-300">
              <div className="mb-4 text-gray-600 group-hover:text-rose-500 transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>)}
        </div>
      </div>
    </section>;
};