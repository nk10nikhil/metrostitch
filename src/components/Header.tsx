import React, { useEffect, useState } from 'react';
import { ShoppingBagIcon, MenuIcon, SearchIcon, UserIcon, XIcon } from 'lucide-react';
import { gsap } from 'gsap';
export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    // Animation for header
    gsap.from('.header', {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo('.mobile-menu', {
        x: '100%'
      }, {
        x: '0%',
        duration: 0.5,
        ease: 'power3.out'
      });
    } else {
      document.body.style.overflow = 'auto';
      gsap.to('.mobile-menu', {
        x: '100%',
        duration: 0.5,
        ease: 'power3.out'
      });
    }
  };
  return <header className={`header fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="text-2xl font-bold">ELEGANCE</div>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <a href="#" className="hover:text-gray-500 transition-colors">
            Home
          </a>
          <a href="#" className="hover:text-gray-500 transition-colors">
            Shop
          </a>
          <a href="#" className="hover:text-gray-500 transition-colors">
            Collections
          </a>
          <a href="#" className="hover:text-gray-500 transition-colors">
            About
          </a>
        </nav>
        {/* Icons */}
        <div className="flex items-center space-x-4">
          <button title='g' className="hover:text-gray-500 transition-colors">
            <SearchIcon size={20} />
          </button>
          <button title='u' className="hover:text-gray-500 transition-colors">
            <UserIcon size={20} />
          </button>
          <button title='b' className="hover:text-gray-500 transition-colors">
            <ShoppingBagIcon size={20} />
          </button>
          <button title='m' className="md:hidden hover:text-gray-500 transition-colors" onClick={toggleMenu}>
            <MenuIcon size={24} />
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`mobile-menu fixed top-0 right-0 h-full w-full md:w-80 bg-white shadow-lg transform translate-x-full transition-transform z-50`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <div className="text-2xl font-bold">ELEGANCE</div>
            <button onClick={toggleMenu}>
              <XIcon size={24} />
            </button>
          </div>
          <nav className="flex flex-col space-y-6">
            <a href="#" className="text-xl hover:text-gray-500 transition-colors">
              Home
            </a>
            <a href="#" className="text-xl hover:text-gray-500 transition-colors">
              Shop
            </a>
            <a href="#" className="text-xl hover:text-gray-500 transition-colors">
              Collections
            </a>
            <a href="#" className="text-xl hover:text-gray-500 transition-colors">
              About
            </a>
          </nav>
        </div>
      </div>
    </header>;
};