import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProductCard } from './ProductCard';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
gsap.registerPlugin(ScrollTrigger);
export const TrendingSection = () => {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);
  const trendingProducts = [{
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=720&q=80',
    name: 'Floral Summer Dress',
    price: '$79.99',
    isNew: true
  }, {
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=720&q=80',
    name: 'Denim Jacket',
    price: '$129.99',
    isSale: true,
    originalPrice: '$159.99'
  }, {
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=720&q=80',
    name: 'Classic Blazer',
    price: '$199.99'
  }, {
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=720&q=80',
    name: 'Casual Sweater',
    price: '$89.99',
    isNew: true
  }];
  useEffect(() => {
    gsap.from(sectionRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom'
      },
      opacity: 0,
      y: 50,
      duration: 0.8
    });
  }, []);
  const scroll = (direction: 'left' | 'right') => {
    const container = sliderRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      gsap.to(container, {
        scrollLeft: `+=${scrollAmount}`,
        duration: 0.8,
        ease: 'power2.out'
      });
    }
  };
  return <section ref={sectionRef} className="py-16 md:py-24 bg-neutral-50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trending Now
            </h2>
            <p className="text-gray-600">
              Discover what's hot in fashion right now
            </p>
          </div>
          <div className="hidden md:flex space-x-4">
            <button title='left' onClick={() => scroll('left')} className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors">
              <ChevronLeftIcon size={24} />
            </button>
            <button title='right' onClick={() => scroll('right')} className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors">
              <ChevronRightIcon size={24} />
            </button>
          </div>
        </div>
        <div ref={sliderRef} className="flex space-x-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4" style={{
        scrollBehavior: 'smooth'
      }}>
          {trendingProducts.map((product, index) => <div key={index} className="flex-none w-[280px]">
              <ProductCard {...product} />
            </div>)}
        </div>
      </div>
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-100 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full filter blur-3xl"></div>
      </div>
    </section>;
};