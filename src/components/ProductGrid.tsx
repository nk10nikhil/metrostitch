import React, { useEffect, useRef } from 'react';
import { ProductCard } from './ProductCard';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRightIcon } from 'lucide-react';
gsap.registerPlugin(ScrollTrigger);
export const ProductGrid = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const productsRef = useRef(null);
  useEffect(() => {
    gsap.from(headingRef.current, {
      scrollTrigger: {
        trigger: headingRef.current,
        start: 'top bottom-=100',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 50,
      duration: 0.8
    });
    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach((item, index) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top bottom-=50',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        scale: 0.95,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power3.out'
      });
    });
    gsap.to(sectionRef.current, {
      backgroundPosition: '50% 100%',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  }, []);
  const products = [{
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=720&q=80',
    name: 'Cotton Summer Dress',
    price: '$89.99',
    isNew: true
  }, {
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=720&q=80',
    name: 'Classic White Shirt',
    price: '$59.99',
    originalPrice: '$79.99',
    isSale: true
  }, {
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=720&q=80',
    name: 'Slim Fit Jeans',
    price: '$69.99'
  }, {
    image: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=720&q=80',
    name: 'Casual Denim Jacket',
    price: '$129.99',
    isNew: true
  }, {
    image: 'https://images.unsplash.com/photo-1618354691551-44de113f0164?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=720&q=80',
    name: 'Summer Floral Top',
    price: '$49.99',
    originalPrice: '$69.99',
    isSale: true
  }, {
    image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=720&q=80',
    name: 'Classic Black Heels',
    price: '$99.99'
  }, {
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=720&q=80',
    name: 'Patterned Summer Shorts',
    price: '$45.99'
  }, {
    image: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=720&q=80',
    name: 'Leather Crossbody Bag',
    price: '$149.99',
    originalPrice: '$189.99',
    isSale: true
  }];
  return <section ref={sectionRef} className="py-16 md:py-24 bg-neutral-50 relative overflow-hidden" style={{
    willChange: 'background-position'
  }}>
      <div className="container mx-auto px-4">
        <div ref={headingRef} className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              Our Latest Products
            </h2>
            <p className="text-gray-600 text-base md:text-lg">
              Discover our newest arrivals and bestsellers, carefully selected
              for quality and style.
            </p>
          </div>
          <button className="mt-6 md:mt-0 group flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 active:scale-95">
            View All
            <ArrowRightIcon size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
        <div ref={productsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {products.map((product, index) => <div key={index} className="product-item" style={{
          willChange: 'transform, opacity'
        }}>
              <ProductCard {...product} />
            </div>)}
        </div>
      </div>
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-rose-100 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-50 rounded-full filter blur-3xl"></div>
      </div>
    </section>;
};