
import React, { useEffect, useRef } from 'react';
import { Dumbbell, Scissors, Utensils, ShoppingBag, Stethoscope, GraduationCap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const industries = [
    { icon: <Dumbbell size={20} />, name: "Gyms & Fitness Centers" },
    { icon: <Scissors size={20} />, name: "Salons & Spas" },
    { icon: <Utensils size={20} />, name: "Hotels & Restaurants" },
    { icon: <ShoppingBag size={20} />, name: "Retail Shops" },
    { icon: <Stethoscope size={20} />, name: "Clinics & Hospitals" },
    { icon: <GraduationCap size={20} />, name: "Educational Institutes" },
];

const Industries: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".industry-pill", 
                { scale: 0.8, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.05,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 90%",
                    }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-20 px-4 md:px-10 max-w-7xl mx-auto">
             <div className="text-center mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">Industries We Serve</h2>
                <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full"></div>
             </div>
             
             <div className="flex flex-wrap justify-center gap-4">
                {industries.map((ind, i) => (
                    <div key={i} className="industry-pill opacity-0 flex items-center gap-3 px-6 py-4 bg-neutral-900 border border-neutral-800 rounded-full hover:border-blue-500 hover:bg-blue-500/10 hover:text-blue-500 text-neutral-300 transition-all cursor-default group">
                        <span className="group-hover:scale-110 transition-transform duration-300">{ind.icon}</span>
                        <span className="font-bold text-sm md:text-base">{ind.name}</span>
                    </div>
                ))}
             </div>
        </section>
    );
};
export default Industries;
