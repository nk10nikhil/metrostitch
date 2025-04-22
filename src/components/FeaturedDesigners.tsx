
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Image } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const designers = [
  {
    name: "Sophie Liang",
    img: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=facearea&w=400&q=80",
    desc: "Melding East and West aesthetics for minimalist luxury."
  },
  {
    name: "Elias Kosta",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=facearea&w=400&q=80",
    desc: "Greek-inspired forms with a focus on nature and movement."
  },
  {
    name: "Maya Patel",
    img: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=facearea&w=400&q=80",
    desc: "Celebrating bold textures and vibrant color palettes."
  }
];

const FeaturedDesigners = () => {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
        { scale: 0.92, opacity: 0, y: 40 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.2,
          ease: "power1.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
          }
        }
      );
    }
  }, []);

  return (
    <section className="py-16 bg-fashion-cream">
      <div className="container mx-auto px-4" data-animate>
        <h2 className="text-2xl md:text-3xl font-light text-center mb-1">
          <span className="font-semibold">Featured</span> Designers
        </h2>
        <p className="text-center text-fashion-charcoal/70 mb-10">
          Meet the visionaries behind this season's most coveted looks.
        </p>
        <div ref={cardsRef} className="flex flex-col md:flex-row gap-7 md:gap-12 items-center justify-center">
          {designers.map((d, idx) => (
            <div
              key={idx}
              className="relative group bg-white rounded-lg shadow-md p-7 w-full max-w-xs flex flex-col items-center hover-scale duration-500"
              style={{
                boxShadow: "0 8px 24px 0 rgba(68,68,68,0.07)"
              }}
            >
              <div className="mb-5 -mt-10">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-fashion-terracotta shadow-lg group-hover:scale-105 transition-transform duration-300 animate-float">
                  {d.img ? (
                    <img src={d.img} alt={d.name} className="object-cover w-full h-full" />
                  ) : (
                    <div className="bg-fashion-sand w-full h-full flex items-center justify-center">
                      <Image className="text-fashion-charcoal/40 w-10 h-10" />
                    </div>
                  )}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-fashion-charcoal/90 mb-2">{d.name}</h3>
              <p className="text-fashion-charcoal/70 text-center">{d.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDesigners;
