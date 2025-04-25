"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Instagram, Facebook, Twitter, Youtube, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary/30 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo and About */}
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-bold tracking-tight mb-6 inline-block">
              MODA
            </Link>
            <p className="text-muted-foreground mt-4 mb-6 max-w-xs">
              Contemporary fashion for the modern individual. Sustainable and ethically made clothing for all.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-accent/20 text-accent-foreground">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-accent/20 text-accent-foreground">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-accent/20 text-accent-foreground">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-accent/20 text-accent-foreground">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Shop</h3>
            <ul className="space-y-4">
              {['All Products', 'New Arrivals', 'Best Sellers', 'Sale'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/shop/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-muted-foreground hover:text-accent transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Company</h3>
            <ul className="space-y-4">
              {['About Us', 'Careers', 'Store Locations', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-muted-foreground hover:text-accent transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Newsletter</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow bg-background py-2 px-4 rounded-l-md border border-border focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <Button className="rounded-l-none">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} MODA. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <Link href="/privacy-policy" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-accent transition-colors">Terms of Service</Link>
            <Link href="/shipping-policy" className="hover:text-accent transition-colors">Shipping Policy</Link>
            <Link href="/refund-policy" className="hover:text-accent transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
