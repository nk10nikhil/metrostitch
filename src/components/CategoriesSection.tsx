import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export const CategoriesSection = () => {
  const sectionRef = useRef(null);
  const categories = [{
    title: "Women's Fashion",
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    items: '286 Items'
  }, {
    title: "Men's Collection",
    image: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    items: '192 Items'
  }, {
    title: 'Accessories',
    image: 'https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    items: '154 Items'
  }];
  useEffect(() => {
    gsap.from('.category-card', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom-=100'
      },
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 0.8
    });
  }, []);
  return <section ref={sectionRef} className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of categories and find exactly what you're
            looking for
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => <div key={index} className="category-card group cursor-pointer">
              <div className="relative h-[400px] overflow-hidden rounded-2xl">
                <img src={category.image} alt={category.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {category.title}
                  </h3>
                  <p className="text-white/80">{category.items}</p>
                  <div className="w-0 group-hover:w-full h-0.5 bg-white mt-4 transition-all duration-300"></div>
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};