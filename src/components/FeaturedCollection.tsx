import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export const FeaturedCollection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef(null);
  useEffect(() => {
    gsap.from(headingRef.current, {
      scrollTrigger: {
        trigger: headingRef.current,
        start: 'top bottom',
        end: 'bottom bottom',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out'
    });
    const cards = document.querySelectorAll('.collection-item');
    cards.forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top bottom-=100',
          end: 'bottom bottom',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        rotation: index % 2 === 0 ? 5 : -5,
        duration: 1,
        ease: 'power3.out',
        delay: index * 0.2
      });
    });
  }, []);
  const collections = [{
    title: 'Summer Collection',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=720&q=80',
    items: '24 Items'
  }, {
    title: 'Autumn Essentials',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=720&q=80',
    items: '18 Items'
  }, {
    title: 'Casual Wear',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=720&q=80',
    items: '32 Items'
  }];
  return <section ref={sectionRef} className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div ref={headingRef} className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Featured Collections
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            Explore our carefully curated collections designed to keep you
            stylish throughout the seasons.
          </p>
        </div>
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {collections.map((collection, index) => <div key={index} className="collection-item group relative overflow-hidden rounded-2xl cursor-pointer transform transition-all duration-500 hover:-translate-y-2">
              <div className="h-[300px] sm:h-[400px] overflow-hidden">
                <img src={collection.image} alt={collection.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 transform transition-transform duration-300">
                <h3 className="text-2xl font-semibold mb-2 text-white transform group-hover:translate-y-0 translate-y-4 transition-transform duration-300">
                  {collection.title}
                </h3>
                <p className="text-sm text-white/80 transform group-hover:translate-y-0 translate-y-4 transition-transform duration-300 delay-75">
                  {collection.items}
                </p>
                <div className="w-0 group-hover:w-full h-0.5 bg-white mt-2 transition-all duration-300"></div>
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};