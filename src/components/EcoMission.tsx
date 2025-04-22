
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Leaf, Recycle, Droplet } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <Leaf className="w-8 h-8 text-fashion-sage mb-2" />,
    title: "Organic Materials",
    desc: "All garments made with certified natural fibers and dyes.",
    direction: "left",
  },
  {
    icon: <Recycle className="w-8 h-8 text-fashion-terracotta mb-2" />,
    title: "Recycling Program",
    desc: "Send back old items for upcycling & get special rewards.",
    direction: "right",
  },
  {
    icon: <Droplet className="w-8 h-8 text-fashion-navy mb-2" />,
    title: "Water Saving",
    desc: "95% less water usage vs. industry average—not just a claim.",
    direction: "left",
  },
];

const EcoMission = () => {
  const cardRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  const isMobile = useIsMobile();

  useEffect(() => {
    cardRefs.forEach((ref, i) => {
      if (ref.current) {
        gsap.fromTo(
          ref.current,
          { 
            x: isMobile ? 0 : (features[i].direction === "left" ? -40 : 40), 
            y: isMobile ? 30 : 0,
            opacity: 0 
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            delay: 0.1 * i,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });
  }, [isMobile]);

  return (
    <section className="py-16 bg-gradient-to-br from-fashion-pearl/90 to-fashion-cream/95">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-light mb-1">
            <span className="font-semibold">Our Eco Mission</span>
          </h2>
          <p className="text-fashion-charcoal/70">
            We lead with responsibility. See how our commitment shapes every piece.
          </p>
        </div>
        <div className="flex flex-col gap-8 md:flex-row md:gap-10 items-center justify-center">
          {features.map((f, i) => (
            <div
              key={f.title}
              ref={cardRefs[i]}
              className="w-full max-w-xs bg-white rounded-2xl px-7 py-8 flex flex-col items-center shadow-md hover-scale"
            >
              {f.icon}
              <h4 className="text-lg font-bold text-fashion-charcoal mb-1">{f.title}</h4>
              <p className="text-fashion-charcoal/70 text-center text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EcoMission;
