import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "./use-mobile";

gsap.registerPlugin(ScrollTrigger);

export function useGsapSectionReveal(
  ref: React.RefObject<HTMLElement>,
  options?: {
    staggerChildren?: boolean;
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
    useScale?: boolean;
    useRotate?: boolean;
    useParallax?: boolean;
    mobileOnly?: boolean;
  }
) {
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!ref.current) return;

    const mm = gsap.matchMedia();
    const { staggerChildren, from, to, useScale, useRotate, useParallax, mobileOnly } = options || {};

    mm.add("(max-width: 767px)", () => {
      // MOBILE animations - simplified for better performance
      if (staggerChildren) {
        gsap.fromTo(
          ref.current?.children,
          {
            opacity: 0,
            y: 30, // Reduced movement for mobile
            scale: useScale ? 0.97 : 1, // Less extreme scaling
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8, // Faster animation on mobile
            ease: "power2.out",
            stagger: 0.1, // Smaller stagger value for quicker reveals
            scrollTrigger: {
              trigger: ref.current,
              start: "top 94%",
              toggleActions: "play none none none", // Simplified toggle actions
            }
          }
        );
      } else {
        gsap.fromTo(
          ref.current,
          {
            opacity: 0,
            y: 30, // Reduced movement
            ...from
          },
          {
            opacity: 1,
            y: 0,
            ...to,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 95%",
              toggleActions: "play none none none",
            }
          }
        );
      }

      // Parallax effect (background) - simplified for mobile
      if (useParallax) {
        gsap.to(ref.current, {
          backgroundPositionY: "45%",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5, // Reduced scrub for better performance
          }
        });
      }
    });

    if (!mobileOnly) {
      mm.add("(min-width: 768px)", () => {
        if (staggerChildren) {
          gsap.fromTo(
            ref.current?.children,
            {
              opacity: 0,
              y: 60,
              scale: useScale ? 0.93 : 1,
              rotateZ: useRotate ? 2 : 0,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateZ: 0,
              duration: 0.95,
              ease: "power3.out",
              stagger: 0.14,
              scrollTrigger: {
                trigger: ref.current,
                start: "top 90%",
                toggleActions: "play none none reverse",
              }
            }
          );
        } else {
          gsap.fromTo(
            ref.current,
            {
              opacity: 0,
              y: 56,
              ...from
            },
            {
              opacity: 1,
              y: 0,
              ...to,
              duration: 1.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: ref.current,
                start: "top 92%",
                toggleActions: "play none none reverse",
              }
            }
          );
        }
        if (useParallax) {
          gsap.to(ref.current, {
            backgroundPositionY: "40%",
            scrollTrigger: {
              trigger: ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          });
        }
      });
    }

    return () => {
      mm.revert();
    };
  }, [ref, options, isMobile]);
}
