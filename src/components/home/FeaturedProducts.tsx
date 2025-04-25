"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingBag } from 'lucide-react';

// Sample product data
const products = [
  {
    id: 1,
    name: 'Modern Wool Coat',
    price: 179.99,
    image: 'https://images.unsplash.com/photo-1580682312385-e94d8de1cf3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'Women',
    isNew: true,
  },
  {
    id: 2,
    name: 'Classic Denim Jacket',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'Men',
    isNew: true,
  },
  {
    id: 3,
    name: 'Summer Linen Dress',
    price: 75.00,
    image: 'https://images.unsplash.com/photo-1495385794356-15371f348c31?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'Women',
    isNew: false,
  },
  {
    id: 4,
    name: 'Striped Cotton Shirt',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'Men',
    isNew: false,
  },
  {
    id: 5,
    name: 'Leather Ankle Boots',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'Women',
    isNew: true,
  },
  {
    id: 6,
    name: 'Casual Linen Pants',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'Men',
    isNew: false,
  },
];

export default function FeaturedProducts() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inView && containerRef.current) {
      const elements = containerRef.current.querySelectorAll('.product-card');

      if (elements.length > 0) {
        gsap.fromTo(
          Array.from(elements),
          {
            y: 30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power2.out',
          }
        );
      }
    }
  }, [inView]);

  return (
    <section ref={ref} className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-muted-foreground max-w-2xl">
              Discover our most popular items and latest arrivals. Handpicked for quality and style.
            </p>
          </div>
          <Link href="/shop" className="mt-6 md:mt-0">
            <Button variant="outline" size="lg">View All Products</Button>
          </Link>
        </div>

        <div ref={containerRef} className="mb-10">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {products.map((product) => (
                <CarouselItem key={product.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <Card className="product-card border-none shadow-sm rounded-xl overflow-hidden h-full">
                    <CardContent className="p-0 relative group">
                      <div className="relative h-80 overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                    </CardContent>
                    <CardFooter className="p-4 flex flex-col items-start">
                      <span className="text-sm text-muted-foreground mb-1">{product.category}</span>
                      <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                      <span className="font-medium text-accent">
                        ${product.price.toFixed(2)}
                      </span>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-end gap-2 mt-6">
              <CarouselPrevious className="relative inset-0 translate-y-0 rounded-full" />
              <CarouselNext className="relative inset-0 translate-y-0 rounded-full" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
