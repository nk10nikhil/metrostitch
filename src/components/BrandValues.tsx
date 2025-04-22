
import { useRef } from "react";
import { Shield, Palette, Tag } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useGsapSectionReveal } from "@/hooks/useGsapSectionReveal";

const values = [
  {
    icon: <Shield className="w-8 h-8 mb-3 text-fashion-terracotta" />,
    title: "Ethical Craft",
    desc: "Responsible sourcing and sustainable production for a better tomorrow.",
    bg: "bg-fashion-pearl"
  },
  {
    icon: <Palette className="w-8 h-8 mb-3 text-fashion-sage" />,
    title: "Inspired Design",
    desc: "Distinctive silhouettes and artistic flair that set you apart.",
    bg: "bg-fashion-sand"
  },
  {
    icon: <Tag className="w-8 h-8 mb-3 text-fashion-navy" />,
    title: "Accessible Luxury",
    desc: "Premium quality and experience at a fair price—for everyone.",
    bg: "bg-fashion-beige"
  }
];

const BrandValues = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useGsapSectionReveal(ref, {
    staggerChildren: true,
    useScale: true,
    useRotate: !isMobile, // subtle on desktop
    mobileOnly: false,
  });

  return (
    <section className="py-16 bg-gradient-to-b from-fashion-pearl/70 to-fashion-cream/80">
      <div className="container mx-auto px-4" data-animate>
        <h2 className="text-2xl md:text-3xl font-light text-center mb-1 animate-fade-in">Our <span className="font-semibold">Values</span></h2>
        <p className="text-center text-fashion-charcoal/70 mb-10 animate-fade-in">
          Passion and responsibility woven into every stitch.
        </p>
        <div ref={ref} className="flex flex-col md:flex-row gap-7 md:gap-12 items-center justify-center">
          {values.map((v, idx) => (
            <div
              key={idx}
              className={`max-w-xs w-full rounded-lg shadow-sm px-8 py-8 mb-2 flex flex-col items-center hover-scale border-2 border-transparent transition-all duration-500 ${v.bg} animate-fade-in will-change-transform`}
              style={{
                willChange: "transform, box-shadow, border-color",
                minHeight: isMobile ? "220px" : "200px",
                boxShadow: isMobile ? "0 6px 20px 0 rgba(214,135,111,0.13)" : "0 8px 28px 0 rgba(66, 66, 66, 0.09)"
              }}
            >
              {v.icon}
              <h4 className="text-lg font-semibold mb-2">{v.title}</h4>
              <p className="text-fashion-charcoal/70 text-center">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandValues;
