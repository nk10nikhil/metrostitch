
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  useEffect(() => {
    if (!ref.current) return;
    const mm = gsap.matchMedia();
    const { staggerChildren, from, to, useScale, useRotate, useParallax, mobileOnly } = options || {};

    mm.add("(max-width: 767px)", () => {
      // MOBILE animations
      if (staggerChildren) {
        gsap.fromTo(
          ref.current?.children,
          {
            opacity: 0,
            y: 42,
            scale: useScale ? 0.93 : 1,
            rotateZ: useRotate ? 3 : 0,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateZ: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.16,
            scrollTrigger: {
              trigger: ref.current,
              start: "top 94%",
              end: "bottom 40%",
              toggleActions: "play none none reverse",
            }
          }
        );
      } else {
        gsap.fromTo(
          ref.current,
          {
            opacity: 0,
            y: 44,
            ...from
          },
          {
            opacity: 1,
            y: 0,
            ...to,
            duration: 1.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 95%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }

      // Parallax effect (background)
      if (useParallax) {
        gsap.to(ref.current, {
          backgroundPositionY: "45%",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
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
                end: "bottom 60%",
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
  }, [ref, options]);
}
