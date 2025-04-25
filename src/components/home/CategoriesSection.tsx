"use client";

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';

const categories = [
  {
    id: 1,
    name: 'Women',
    img: 'https://imgs.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80',
    link: '/shop/women'
  },
  {
    id: 2,
    name: 'Men',
    img: 'https://imgs.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80',
    link: '/shop/men'
  },
  {
    id: 3,
    name: 'Accessories',
    img: 'https://imgs.unsplash.com/photo-1523206489230-c012c64b2b48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80',
    link: '/shop/accessories'
  },
  {
    id: 4,
    name: 'Collections',
    img: 'https://imgs.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80',
    link: '/collections'
  }
];

export default function CategoriesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView && containerRef.current) {
      const elements = Array.from(containerRef.current.querySelectorAll('.category-item'));

      if (elements.length > 0) {
        gsap.fromTo(
          elements,
          {
            y: 50,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power2.out'
          }
        );
      }
    }
  }, [inView]);

  return (
    <section ref={ref} className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop By Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our curated collections and find the perfect pieces to express your individual style.
          </p>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.link}
              className="category-item group relative overflow-hidden rounded-2xl h-80 bg-primary/10 opacity-0"
            >
              <img
                src={category.img}
                alt={category.name}
                
                className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70 transition-opacity group-hover:opacity-85" />

              <div className="absolute bottom-0 left-0 w-full p-6 transform transition-transform duration-500 ease-out group-hover:translate-y-[-8px]">
                <h3 className="text-white text-2xl font-semibold">{category.name}</h3>
                <div className="mt-2 h-0.5 w-10 bg-accent transition-all duration-300 group-hover:w-20" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
