import { useState, useEffect } from 'react';
import { Menu, Search, ShoppingCart, User, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobile) {
      if (mobileMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen, isMobile]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
          ? 'bg-white/95 shadow-sm backdrop-blur-sm py-3'
          : 'bg-transparent py-5'
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="font-jost text-2xl font-semibold tracking-tight text-fashion-charcoal">
            <img src="/logo.png" alt="Logo" className="h-12" />
          </a>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="hidden md:flex space-x-8">
              <a href="#" className="text-fashion-charcoal hover:text-orange-700 transition-colors">
                NEW ARRIVALS
              </a>
              <a href="#" className="text-fashion-charcoal hover:text-orange-700 transition-colors">
                WOMEN
              </a>
              <a href="#" className="text-fashion-charcoal hover:text-orange-700 transition-colors">
                MEN
              </a>
              <a href="#collections" className="text-fashion-charcoal hover:text-orange-700 transition-colors">
                COLLECTIONS
              </a>
              <a href="#products" className="text-fashion-charcoal hover:text-orange-700 transition-colors">
                SHOP
              </a>
            </div>
          )}

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button title='search' className="text-fashion-charcoal hover:text-fashion-terracotta transition-colors">
              <Search size={20} />
            </button>
            <button title='user' className="text-fashion-charcoal hover:text-fashion-terracotta transition-colors">
              <User size={20} />
            </button>
            <button
              title="Shopping Cart"
              className="text-fashion-charcoal hover:text-fashion-terracotta transition-colors relative"
            >
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-orange-700 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                0
              </span>
            </button>
            {isMobile && (
              <button
                title='menu'
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-fashion-charcoal"
              >
                <Menu size={24} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && (
        <div
          className={`fixed inset-0 bg-white z-50 transform transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
            }`}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <a href="/" className="font-jost text-xl font-semibold text-fashion-charcoal">
                <img src="/logo.png" alt="Logo" className="h-10" />
              </a>
              <button
                title="Close Menu"
                onClick={closeMobileMenu}
                className="text-fashion-charcoal hover:text-orange-700 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col space-y-6">
              <a
                href="#"
                onClick={closeMobileMenu}
                className="text-fashion-charcoal text-xl py-2 border-b border-gray-100"
              >
                NEW ARRIVALS
              </a>
              <a
                href="#"
                onClick={closeMobileMenu}
                className="text-fashion-charcoal text-xl py-2 border-b border-gray-100"
              >
                WOMEN
              </a>
              <a
                href="#"
                onClick={closeMobileMenu}
                className="text-fashion-charcoal text-xl py-2 border-b border-gray-100"
              >
                MEN
              </a>
              <a
                href="#collections"
                onClick={closeMobileMenu}
                className="text-fashion-charcoal text-xl py-2 border-b border-gray-100"
              >
                COLLECTIONS
              </a>
              <a
                href="#products"
                onClick={closeMobileMenu}
                className="text-fashion-charcoal text-xl py-2 border-b border-gray-100"
              >
                SHOP
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
