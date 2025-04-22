import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugins once
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/**
 * Refresh ScrollTrigger with debounce control for better performance
 */
let refreshTimeout: ReturnType<typeof setTimeout> | null = null;
export const refreshScrollTrigger = () => {
    if (refreshTimeout) clearTimeout(refreshTimeout);
    refreshTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 200);
};

/**
 * Clean up all ScrollTrigger instances
 */
export const cleanupScrollTrigger = () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
};

/**
 * Configure animations for mobile devices
 * @param isMobile Whether the device is mobile
 */
export const configureMobileAnimations = (isMobile: boolean) => {
    if (isMobile) {
        // Reduce motion on mobile for better performance
        gsap.defaults({
            duration: 0.7,
            ease: "power2.out"
        });

        // Force hardware acceleration for smoother animations on mobile
        document.body.style.transform = 'translateZ(0)';

        // Kill any potentially heavy animations on mobile
        const heavyAnimatedElements = document.querySelectorAll('.heavy-animation');
        heavyAnimatedElements.forEach(el => {
            (el as HTMLElement).style.transform = 'none';
            (el as HTMLElement).style.transition = 'none';
        });
    } else {
        // Desktop defaults
        gsap.defaults({
            duration: 1,
            ease: "power3.out"
        });
    }
};

/**
 * Apply performance-optimized animations to elements that should animate on scroll
 * @param elements Elements to animate
 * @param isMobile Whether the device is mobile
 */
export const setupScrollAnimations = (elements: HTMLElement[], isMobile: boolean) => {
    elements.forEach((element, idx) => {
        gsap.fromTo(
            element,
            {
                y: isMobile ? 15 : 30,
                opacity: 0,
                scale: isMobile ? 0.98 : 0.97,
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: isMobile ? 0.5 : 0.8,
                delay: isMobile ? Math.min(0.03 * idx, 0.2) : Math.min(0.05 * idx, 0.3), // Cap delay time to improve performance
                scrollTrigger: {
                    trigger: element,
                    start: 'top 92%',
                    toggleActions: isMobile ? 'play none none none' : 'play none none reverse',
                }
            }
        );
    });
};

/**
 * Optimize horizontal scrolling sections for mobile
 * @param containerSelector CSS selector for the horizontal scroll containers
 */
export const optimizeHorizontalScrolling = (containerSelector: string) => {
    const containers = document.querySelectorAll(containerSelector);
    containers.forEach((container) => {
        const element = container as HTMLElement;

        // Add scroll snap for better mobile experience
        element.style.scrollSnapType = "x mandatory";
        element.style.scrollBehavior = "smooth";
        element.style.webkitOverflowScrolling = "touch";

        // Add scroll indicators
        addScrollIndicators(element);
    });
};

/**
 * Add scroll indicators to horizontal scroll containers
 * @param container The container element
 */
const addScrollIndicators = (container: HTMLElement) => {
    const items = container.children;
    if (items.length <= 1) return;

    // Create indicator container
    const indicatorContainer = document.createElement('div');
    indicatorContainer.className = 'flex justify-center gap-2 mt-4';

    // Create indicator dots
    for (let i = 0; i < items.length; i++) {
        const dot = document.createElement('div');
        dot.className = 'w-2 h-2 rounded-full bg-gray-300 transition-colors duration-300';
        if (i === 0) dot.classList.add('bg-orange-600');
        indicatorContainer.appendChild(dot);
    }

    // Add indicators after the container
    if (container.parentNode) {
        container.parentNode.appendChild(indicatorContainer);

        // Update active indicator on scroll
        container.addEventListener('scroll', () => {
            const scrollPosition = container.scrollLeft;
            const containerWidth = container.clientWidth;
            const activeIndex = Math.round(scrollPosition / containerWidth);

            const dots = indicatorContainer.children;
            for (let i = 0; i < dots.length; i++) {
                if (i === activeIndex) {
                    dots[i].classList.add('bg-orange-600');
                    dots[i].classList.remove('bg-gray-300');
                } else {
                    dots[i].classList.add('bg-gray-300');
                    dots[i].classList.remove('bg-orange-600');
                }
            }
        });
    }
};

export default {
    refreshScrollTrigger,
    cleanupScrollTrigger,
    configureMobileAnimations,
    setupScrollAnimations,
    optimizeHorizontalScrolling,
};