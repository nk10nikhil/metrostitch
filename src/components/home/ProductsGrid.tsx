"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { Heart, ShoppingBag } from 'lucide-react';

// Sample product data with more items
const allProducts = [
  {
    id: 1,
    name: 'Modern Wool Coat',
    price: 179.99,
    image: 'https://images.unsplash.com/photo-1580682312385-e94d8de1cf3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'Women',
    isNew: true,
    tags: ['outerwear', 'winter']
  },
  {
    id: 2,
    name: 'Classic Denim Jacket',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'Men',
    isNew: true,
    tags: ['outerwear', 'casual']
  },
  {
    id: 3,
    name: 'Summer Linen Dress',
    price: 75.00,
    image: 'https://images.unsplash.com/photo-1495385794356-15371f348c31?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'Women',
    isNew: false,
    tags: ['dresses', 'summer']
  },
  {
    id: 4,
    name: 'Striped Cotton Shirt',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'Men',
    isNew: false,
    tags: ['tops', 'summer']
  },
  {
    id: 5,
    name: 'Leather Ankle Boots',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'Women',
    isNew: true,
    tags: ['footwear', 'winter']
  },
  {
    id: 6,
    name: 'Casual Linen Pants',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'Men',
    isNew: false,
    tags: ['bottoms', 'summer']
  },
  {
    id: 7,
    name: 'Floral Maxi Dress',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'Women',
    isNew: false,
    tags: ['dresses', 'summer']
  },
  {
    id: 8,
    name: 'Slim Fit Chinos',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1604176424472-37e31ddd3eac?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'Men',
    isNew: false,
    tags: ['bottoms', 'casual']
  }
];

// Available filters
const filters = [
  { id: 'all', label: 'All Products' },
  { id: 'new', label: 'New Arrivals' },
  { id: 'women', label: 'Women' },
  { id: 'men', label: 'Men' },
  { id: 'summer', label: 'Summer Collection' },
  { id: 'winter', label: 'Winter Collection' }
];

export default function ProductsGrid() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const containerRef = useRef<HTMLDivElement>(null);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Filter products based on the active filter
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredProducts(allProducts);
    } else if (activeFilter === 'new') {
      setFilteredProducts(allProducts.filter(product => product.isNew));
    } else if (activeFilter === 'women' || activeFilter === 'men') {
      setFilteredProducts(allProducts.filter(product =>
        product.category.toLowerCase() === activeFilter
      ));
    } else {
      setFilteredProducts(allProducts.filter(product =>
        product.tags.includes(activeFilter)
      ));
    }
  }, [activeFilter]);

  // Animation function used when filter changes or initially
  const animateProducts = useCallback(() => {
    if (containerRef.current) {
      const productCards = containerRef.current.querySelectorAll('.product-item');

      if (productCards.length > 0) {
        gsap.fromTo(
          Array.from(productCards),
          {
            y: 20,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.5,
            ease: 'power2.out'
          }
        );
      }
    }
  }, []);

  // Run animation when products change
  // We use activeFilter as dependency since it's the cause of filteredProducts changes
  useEffect(() => {
    // Small delay to ensure DOM has updated with new filtered products
    const timer = setTimeout(() => {
      animateProducts();
    }, 10);

    return () => clearTimeout(timer);
  }, [activeFilter, animateProducts]);

  // Initial animation when section comes into view
  useEffect(() => {
    if (inView && containerRef.current) {
      const heading = containerRef.current.querySelector('h2');
      const filterButtons = containerRef.current.querySelectorAll('.filter-btn');
      const productItems = containerRef.current.querySelectorAll('.product-item');

      if (heading && filterButtons.length > 0) {
        const tl = gsap.timeline();

        tl.fromTo(
          heading,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 }
        );

        if (filterButtons.length > 0) {
          tl.fromTo(
            Array.from(filterButtons),
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.1, duration: 0.5 },
            "-=0.3"
          );
        }

        if (productItems.length > 0) {
          tl.fromTo(
            Array.from(productItems),
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.1, duration: 0.6 },
            "-=0.2"
          );
        }
      }
    }
  }, [inView]);

  return (
    <section ref={ref} className="py-20 bg-primary/10">
      <div ref={containerRef} className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Shop Our Products</h2>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              className={`filter-btn ${activeFilter === filter.id ? 'bg-accent text-white' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="product-item group"
            >
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  {product.isNew && (
                    <span className="absolute top-3 left-3 bg-accent text-white text-xs px-2 py-1 rounded font-medium">
                      NEW
                    </span>
                  )}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex justify-between">
                      <Button size="sm" className="bg-white text-foreground hover:bg-primary">
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button size="icon" variant="outline" className="bg-white/90 border-none h-8 w-8 hover:bg-primary">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <span className="font-medium text-accent">${product.price.toFixed(2)}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{product.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View more button */}
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="px-8">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
}
