"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, User, Search, Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight relative group"
        >
          <span className="relative z-10">MODA</span>
          <span className="absolute -bottom-1 left-0 w-0 h-1 bg-accent group-hover:w-full transition-all duration-300" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {['Home', 'Shop', 'Collections', 'About'].map((item) => (
            <Link
              key={item}
              href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
              className="relative font-medium group"
            >
              <span>{item}</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </nav>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="hover:bg-primary rounded-full">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-primary rounded-full">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-primary rounded-full relative">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-semibold h-5 w-5 flex items-center justify-center rounded-full">3</span>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="hover:bg-primary rounded-full relative">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-semibold h-5 w-5 flex items-center justify-center rounded-full">3</span>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-primary rounded-full">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[80vw] sm:w-[385px]">
              <div className="flex flex-col h-full">
                <div className="py-6">
                  <div className="text-2xl font-bold mb-8">MODA</div>
                  <nav className="flex flex-col space-y-6">
                    {['Home', 'Shop', 'Collections', 'About'].map((item) => (
                      <Link
                        key={item}
                        href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                        className="text-xl font-medium hover:text-accent transition-colors"
                      >
                        {item}
                      </Link>
                    ))}
                  </nav>
                </div>
                <div className="mt-auto border-t pt-6 flex flex-col space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <User className="mr-2 h-4 w-4" />
                    <span>Account</span>
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Search className="mr-2 h-4 w-4" />
                    <span>Search</span>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
