import React, { useRef } from 'react';
import { ShoppingBagIcon, HeartIcon } from 'lucide-react';
import { gsap } from 'gsap';
interface ProductCardProps {
  image: string;
  name: string;
  price: string;
  originalPrice?: string;
  isNew?: boolean;
  isSale?: boolean;
}
export const ProductCard: React.FC<ProductCardProps> = ({
  image,
  name,
  price,
  originalPrice,
  isNew,
  isSale
}) => {
  const cardRef = useRef(null);
  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      y: -10,
      duration: 0.3,
      ease: 'power2.out'
    });
  };
  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      duration: 0.3,
      ease: 'power2.out'
    });
  };
  return <div ref={cardRef} className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="relative h-80 overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && <span className="bg-blue-500 text-white text-xs font-medium px-2.5 py-1 rounded">
              New
            </span>}
          {isSale && <span className="bg-rose-500 text-white text-xs font-medium px-2.5 py-1 rounded">
              Sale
            </span>}
        </div>
        {/* Quick actions */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex space-x-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <button title='i' className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
              <ShoppingBagIcon size={20} />
            </button>
            <button title='u' className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
              <HeartIcon size={20} />
            </button>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-gray-800 font-medium mb-1 truncate">{name}</h3>
        <div className="flex items-center">
          <span className="text-gray-900 font-semibold">{price}</span>
          {originalPrice && <span className="ml-2 text-gray-500 text-sm line-through">
              {originalPrice}
            </span>}
        </div>
      </div>
    </div>;
};