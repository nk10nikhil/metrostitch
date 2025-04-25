"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Emma Thompson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    position: 'Fashion Designer',
    quote: 'The quality of the clothes is exceptional. I love the attention to detail and the sustainable approach to fashion.',
    rating: 5
  },
  {
    id: 2,
    name: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    position: 'Photographer',
    quote: 'MODA has completely transformed my wardrobe. The pieces are versatile, stylish, and made to last.',
    rating: 5
  },
  {
    id: 3,
    name: 'Sophia Garcia',
    avatar: 'https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    position: 'Marketing Executive',
    quote: 'I keep coming back to MODA for their incredible customer service and the timeless styles they offer.',
    rating: 4
  }
];

export default function TestimonialsSection() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inView && containerRef.current) {
      const testimonialCards = containerRef.current.querySelectorAll('.testimonial-card');

      if (testimonialCards.length > 0) {
        // Convert NodeList to Array to satisfy gsap typings
        gsap.fromTo(
          Array.from(testimonialCards),
          {
            y: 50,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.2,
            duration: 0.8,
            ease: 'back.out(1.2)'
          }
        );
      }
    }
  }, [inView]);

  return (
    <section ref={ref} className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover why our customers love shopping with us.
          </p>
        </div>

        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="testimonial-card bg-white p-8 rounded-xl shadow-sm border border-border relative"
            >
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-1 shadow-sm">
                <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-primary/20">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={64}
                    height={64}
                    className="object-cover h-full w-full"
                  />
                </div>
              </div>

              <div className="pt-10 text-center">
                <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{testimonial.position}</p>

                <div className="flex justify-center mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={`star-${testimonial.id}-${i}`}
                      className={`h-4 w-4 ${
                        i < testimonial.rating ? 'fill-accent text-accent' : 'text-muted'
                      }`}
                    />
                  ))}
                </div>

                <blockquote className="text-center italic">
                  "{testimonial.quote}"
                </blockquote>
              </div>

              <div className="absolute -z-10 top-10 right-10 opacity-10">
                <svg width="60" height="50" viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 50V37.5C0 33.5 0.833333 29.5833 2.5 25.75C4.16667 21.9167 6.66667 18.3333 10 15C13.3333 11.6667 17.5 8.75 22.5 6.25C27.5 3.75 33.3333 1.66667 40 0L42.5 7.5C38.5 8.33333 34.5833 9.58333 30.75 11.25C26.9167 12.9167 23.3333 15 20 17.5C16.6667 20 13.75 22.9167 11.25 26.25C8.75 29.5833 6.66667 33.3333 5 37.5H20V50H0ZM35 50V37.5C35 33.5 35.8333 29.5833 37.5 25.75C39.1667 21.9167 41.6667 18.3333 45 15C48.3333 11.6667 52.5 8.75 57.5 6.25C62.5 3.75 68.3333 1.66667 75 0L77.5 7.5C73.5 8.33333 69.5833 9.58333 65.75 11.25C61.9167 12.9167 58.3333 15 55 17.5C51.6667 20 48.75 22.9167 46.25 26.25C43.75 29.5833 41.6667 33.3333 40 37.5H55V50H35Z" fill="currentColor"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
