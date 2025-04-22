
import { useEffect, useRef } from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-fashion-charcoal text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-medium mb-4">ELEGANCE</h3>
            <p className="text-white/60 mb-6">
              Timeless styles for the modern individual. Sustainably crafted with attention to detail.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/80 hover:text-fashion-terracotta transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white/80 hover:text-fashion-terracotta transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white/80 hover:text-fashion-terracotta transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-4 uppercase tracking-wider">Shop</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/60 hover:text-fashion-terracotta transition-colors">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-fashion-terracotta transition-colors">
                  Women
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-fashion-terracotta transition-colors">
                  Men
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-fashion-terracotta transition-colors">
                  Accessories
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-fashion-terracotta transition-colors">
                  Sale
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/60 hover:text-fashion-terracotta transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-fashion-terracotta transition-colors">
                  Sustainability
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-fashion-terracotta transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-fashion-terracotta transition-colors">
                  Press
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-4 uppercase tracking-wider">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/60 hover:text-fashion-terracotta transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-fashion-terracotta transition-colors">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-fashion-terracotta transition-colors">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-fashion-terracotta transition-colors">
                  FAQs
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 text-white/40 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>© 2025 ELEGANCE. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-fashion-terracotta transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-fashion-terracotta transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-fashion-terracotta transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
