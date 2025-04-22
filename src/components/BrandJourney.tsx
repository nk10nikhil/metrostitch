import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "@/hooks/use-mobile";

gsap.registerPlugin(ScrollTrigger);

const journeySteps = [
  {
    id: 1,
    title: "Design Philosophy",
    description: "Our designs emerge from the belief that style and sustainability can coexist. Each piece begins with careful consideration of materials, silhouettes, and longevity.",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1170",
    color: "bg-fashion-sage"
  },
  {
    id: 2,
    title: "Material Sourcing",
    description: "We meticulously select organic, recycled and innovative fabrics that prioritize planetary health without compromising quality or comfort.",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1074",
    color: "bg-fashion-terracotta"
  },
  {
    id: 3,
    title: "Ethical Production",
    description: "Our global network of artisans and manufacturers uphold our commitment to fair wages, safe working conditions, and transparent practices.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1171",
    color: "bg-fashion-navy"
  },
  {
    id: 4,
    title: "Conscious Distribution",
    description: "From minimized packaging to carbon-neutral shipping options, we extend our sustainability commitment to every aspect of getting garments to you.",
    image: "https://images.unsplash.com/photo-1576669801775-ff43c5ab079d?q=80&w=1170",
    color: "bg-fashion-pearl"
  }
];

const BrandJourney = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [activeStep, setActiveStep] = useState<number | null>(null);

  useEffect(() => {
    // Create animation timeline for section title
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 85%",
      }
    });

    // Animate title and subtitle with staggered reveal
    tl.fromTo(
      titleRef.current?.querySelectorAll('.title-animate'),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.9,
        ease: "power2.out"
      }
    );

    // Create animated journey steps with alternating direction
    const steps = stepsRef.current?.querySelectorAll('.journey-step');
    steps?.forEach((step, index) => {
      // Alternate animation direction based on index
      const direction = index % 2 === 0 ? 1 : -1;
      const xOffset = isMobile ? 0 : 50 * direction;

      // Create timeline for each step
      const stepTl = gsap.timeline({
        scrollTrigger: {
          trigger: step,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse"
        }
      });

      // Animate each journey step card
      stepTl.fromTo(
        step,
        {
          x: xOffset,
          y: 30,
          opacity: 0,
          scale: 0.9
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: "power2.out"
        }
      );

      // Image animation with slight delay
      stepTl.fromTo(
        step.querySelector('.journey-image'),
        { scale: 1.1, filter: 'brightness(0.8) blur(5px)' },
        {
          scale: 1,
          filter: 'brightness(1) blur(0px)',
          duration: 1.2,
          ease: "power2.inOut"
        },
        "-=0.7" // Start slightly earlier
      );

      // Line connector animation
      if (!isMobile && index < steps.length - 1) {
        gsap.fromTo(
          `.connector-${index}`,
          { width: "0%" },
          {
            width: "100%",
            duration: 1,
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: step,
              start: "center 60%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    // Create parallax effect for background elements
    gsap.to(".bg-element", {
      y: -80,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-20 bg-gradient-to-br from-white via-fashion-cream/30 to-fashion-pearl/40 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="bg-element absolute -top-20 -left-20 w-64 h-64 rounded-full border-[20px] border-fashion-sage/10 opacity-40 z-0"></div>
      <div className="bg-element absolute right-0 bottom-40 w-80 h-80 rounded-full border-[30px] border-fashion-terracotta/10 opacity-40 z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div ref={titleRef} className="text-center mb-14 md:mb-20">
          <h2 className="title-animate text-2xl md:text-4xl font-light mb-4">
            Our <span className="font-semibold bg-gradient-to-r from-fashion-sage to-fashion-terracotta bg-clip-text text-transparent">Creative Journey</span>
          </h2>
          <p className="title-animate text-fashion-charcoal/70 max-w-xl mx-auto">
            From sketch to your wardrobe, explore how we transform ideas into
            conscious fashion while prioritizing both people and planet.
          </p>
        </div>

        <div ref={stepsRef} className="space-y-16 md:space-y-24">
          {journeySteps.map((step, index) => (
            <div key={step.id} className="relative">
              <div
                className={`journey-step group flex flex-col md:flex-row ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''} items-center gap-6 md:gap-12 transition-all duration-300`}
                onMouseEnter={() => setActiveStep(step.id)}
                onMouseLeave={() => setActiveStep(null)}
              >
                {/* Image container with hover effects */}
                <div className="w-full md:w-1/2 relative overflow-hidden rounded-lg shadow-md">
                  <div className={`absolute inset-0 ${step.color} opacity-30 mix-blend-overlay`}></div>
                  <img
                    src={step.image}
                    alt={step.title}
                    className="journey-image w-full aspect-[4/3] object-cover object-center transform transition-transform duration-700 will-change-transform group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                  {/* Step number badge */}
                  <div
                    className={`absolute top-4 ${index % 2 === 0 ? 'left-4' : 'right-4'} ${step.color} text-white h-10 w-10 flex items-center justify-center rounded-full shadow-lg text-lg font-bold transform transition-transform duration-500 ${activeStep === step.id ? 'scale-125' : 'group-hover:scale-110'}`}
                  >
                    {step.id}
                  </div>
                </div>

                {/* Content container */}
                <div
                  className={`w-full md:w-1/2 p-6 md:p-8 bg-white rounded-lg shadow-sm border border-gray-100 ${activeStep === step.id ? 'shadow-lg' : 'group-hover:shadow-md'} transition-all duration-300`}
                >
                  <h3 className={`text-xl md:text-2xl font-medium mb-3 group-hover:text-fashion-terracotta transition-colors duration-300`}>
                    {step.title}
                  </h3>
                  <p className="text-fashion-charcoal/80 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Decorative accent */}
                  <div className={`h-1 w-16 ${step.color} mt-4 rounded-full transform origin-left transition-all duration-300 ${activeStep === step.id ? 'scale-x-150' : 'group-hover:scale-x-125'}`}></div>
                </div>
              </div>

              {/* Connector lines between steps */}
              {!isMobile && index < journeySteps.length - 1 && (
                <div className={`connector-${index} hidden md:block absolute left-1/2 transform -translate-x-1/2 mt-8 h-16 w-0.5 bg-gradient-to-b from-fashion-terracotta/30 to-fashion-sage/30`}></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandJourney;
