import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

gsap.registerPlugin(ScrollTrigger);

const Products = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Product hover state
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  useEffect(() => {
    // Animate section title with split text effect
    const titleElement = titleRef.current;
    if (titleElement) {
      const words = titleElement.textContent?.split(' ') || [];
      titleElement.innerHTML = '';

      words.forEach((word, i) => {
        const wordSpan = document.createElement('span');
        wordSpan.innerHTML = (i > 0 ? ' ' : '') + word;
        wordSpan.className = 'inline-block title-word';
        titleElement.appendChild(wordSpan);
      });

      gsap.fromTo(
        '.title-word',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
          },
        }
      );
    }

    // Animate product cards with masonry-like effect
    const cards = productsRef.current?.querySelectorAll('.product-card');
    cards?.forEach((card, index) => {
      // Alternate animation directions based on position
      const direction = index % 2 === 0 ? 1 : -1;
      const delay = isMobile ? 0.1 * index : 0.15 * index;

      gsap.fromTo(
        card,
        {
          y: 40,
          x: isMobile ? 0 : 15 * direction,
          opacity: 0,
          scale: 0.95
        },
        {
          y: 0,
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: 'top 92%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Animate product image separately
      gsap.fromTo(
        card.querySelector('.product-image'),
        { scale: 1.15, filter: 'brightness(0.8)' },
        {
          scale: 1,
          filter: 'brightness(1)',
          duration: 1.2,
          delay: delay + 0.1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: card,
            start: 'top 92%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isMobile]);

  const products = [
    {
      id: 1,
      name: 'Modern Relaxed Shirt',
      image: 'https://images.unsplash.com/photo-1578932750294-f5075e85f44b?q=80&w=987',
      price: 79.99,
      rating: 4.8,
      reviews: 126,
      sale: false
    },
    {
      id: 2,
      name: 'Classic Denim Jacket',
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1036',
      price: 129.99,
      originalPrice: 169.99,
      rating: 4.9,
      reviews: 84,
      sale: true
    },
    {
      id: 3,
      name: 'Minimalist Linen Dress',
      image: 'https://images.unsplash.com/photo-1495385794356-15371f348c31?q=80&w=1170',
      price: 89.99,
      rating: 4.7,
      reviews: 62,
      sale: false
    },
    {
      id: 4,
      name: 'Urban Trench Coat',
      image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=987',
      price: 199.99,
      originalPrice: 249.99,
      rating: 4.6,
      reviews: 49,
      sale: true
    }
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 ref={titleRef} className="text-3xl md:text-4xl font-light mb-4">
            Featured Products
          </h2>
          <p className="text-fashion-charcoal/70 max-w-xl mx-auto">
            Discover our selection of thoughtfully designed pieces that combine style,
            quality craftsmanship and sustainable practices.
          </p>
        </div>

        <div
          ref={productsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card group relative bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="relative overflow-hidden rounded-t-lg pb-[125%]">
                {product.sale && (
                  <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
                    SALE
                  </div>
                )}

                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 will-change-transform group-hover:scale-105"
                />

                <div className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent transition-opacity duration-300 ${hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'}`} />

                {/* Quick actions overlay */}
                <div className={`absolute bottom-0 left-0 right-0 flex justify-center gap-2 p-4 transform transition-transform duration-300 ${hoveredProduct === product.id ? 'translate-y-0' : 'translate-y-full'}`}>
                  <Button size="icon" variant="secondary" className="h-10 w-10 rounded-full bg-white/90 hover:bg-white shadow-md backdrop-blur-sm">
                    <Eye className="h-5 w-5" />
                  </Button>
                  <Button size="icon" variant="secondary" className="h-10 w-10 rounded-full bg-white/90 hover:bg-white shadow-md backdrop-blur-sm">
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center mb-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'fill-current' : 'fill-none opacity-70'}`}
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-2">{product.reviews} reviews</span>
                </div>
                <h3 className="text-base font-medium mb-1 group-hover:text-orange-600 transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-gray-400 line-through text-sm">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="px-4 pb-4">
                <Button
                  className="w-full bg-fashion-navy hover:bg-fashion-navy/90 text-white flex items-center justify-center gap-2 group overflow-hidden relative"
                  size="sm"
                >
                  <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">Add to Cart</span>
                  <ShoppingBag className="h-4 w-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                  <span className="absolute inset-0 bg-orange-600 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            className="group px-8 py-6 bg-transparent border-2 border-fashion-navy text-fashion-navy hover:bg-fashion-navy hover:text-white transition-all duration-300"
          >
            VIEW ALL PRODUCTS
            <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Products;
