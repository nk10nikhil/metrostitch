import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { InstagramIcon } from 'lucide-react';
gsap.registerPlugin(ScrollTrigger);
export const InstagramFeed = () => {
  const sectionRef = useRef(null);
  const instagramPosts = [{
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    likes: '2.5k',
    comments: '123'
  }, {
    image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    likes: '1.8k',
    comments: '98'
  }, {
    image: 'https://images.unsplash.com/photo-1475180098004-ca77a66827be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    likes: '3.2k',
    comments: '156'
  }, {
    image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    likes: '4.1k',
    comments: '189'
  }, {
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    likes: '2.9k',
    comments: '134'
  }, {
    image: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    likes: '3.5k',
    comments: '167'
  }];
  useEffect(() => {
    gsap.from('.instagram-item', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom-=100'
      },
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.8
    });
  }, []);
  return <section ref={sectionRef} className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <InstagramIcon size={24} className="text-gray-800" />
            <span className="text-lg font-semibold">@doopebeyond</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Follow Us on Instagram
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get inspired by our latest collections and behind-the-scenes moments
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post, index) => <div key={index} className="instagram-item group relative aspect-square overflow-hidden rounded-xl">
              <img src={post.image} alt={`Instagram post ${index + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center">
                  <p className="font-semibold">{post.likes} likes</p>
                  <p className="text-sm">{post.comments} comments</p>
                </div>
              </div>
            </div>)}
        </div>
        <div className="text-center mt-10">
          <a href="#" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            View More on Instagram
            <InstagramIcon size={20} />
          </a>
        </div>
      </div>
    </section>;
};