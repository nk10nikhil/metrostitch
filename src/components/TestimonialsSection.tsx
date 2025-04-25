import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';
gsap.registerPlugin(ScrollTrigger);
export const TestimonialsSection = () => {
  const sectionRef = useRef(null);
  const testimonials = [{
    name: 'Sarah Johnson',
    role: 'Fashion Blogger',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
    text: "The quality of their clothes is outstanding. Every piece I've purchased has become a staple in my wardrobe.",
    rating: 5
  }, {
    name: 'Michael Chen',
    role: 'Professional Stylist',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
    text: 'As a stylist, I appreciate their attention to detail and commitment to staying ahead of trends.',
    rating: 5
  }, {
    name: 'Emma Davis',
    role: 'Customer',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
    text: 'The shopping experience is seamless, and their customer service is exceptional. Highly recommended!',
    rating: 5
  }];
  useEffect(() => {
    gsap.from('.testimonial-card', {
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
  return <section ref={sectionRef} className="py-16 md:py-24 bg-neutral-50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover why fashion enthusiasts choose us for their style needs
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => <div key={index} className="testimonial-card bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover mr-4" />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => <Star key={i} size={16} className="fill-current text-yellow-400" />)}
              </div>
              <p className="text-gray-600">{testimonial.text}</p>
            </div>)}
        </div>
      </div>
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-rose-100 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-50 rounded-full filter blur-3xl"></div>
      </div>
    </section>;
};