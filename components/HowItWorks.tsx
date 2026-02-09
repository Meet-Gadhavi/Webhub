
import React, { useEffect, useRef } from 'react';
import { MessageCircle, PenTool, Rocket, Headphones, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from './Button';

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        num: "01",
        icon: <MessageCircle size={24} />,
        title: "Free Consultation",
        desc: "We discuss your needs. No payment yet."
    },
    {
        num: "02",
        icon: <PenTool size={24} />,
        title: "Design & Build",
        desc: "See progress every 2 days. Your feedback matters."
    },
    {
        num: "03",
        icon: <Rocket size={24} />,
        title: "Review & Launch",
        desc: "Final approval from you. Website goes live."
    },
    {
        num: "04",
        icon: <Headphones size={24} />,
        title: "Ongoing Support",
        desc: "Free support included. Always here to help."
    }
];

interface HowItWorksProps {
    onNavigate?: () => void;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ onNavigate }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".step-card", 
                { x: -30, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 75%",
                    }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-24 bg-neutral-900 border-y border-neutral-800 overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-900/10 to-transparent pointer-events-none"></div>

            <div className="container mx-auto px-4 md:px-10 relative z-10">
                <div className="flex flex-col md:flex-row gap-16 items-start">
                    {/* Changed sticky to md:sticky to prevent mobile issues */}
                    <div className="md:w-1/3 relative md:sticky md:top-24">
                        <h2 className="text-blue-500 font-bold tracking-widest uppercase mb-4 text-sm">Process</h2>
                        <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">How It Works</h3>
                        <p className="text-neutral-400 text-lg leading-relaxed mb-8">
                            A simple, transparent 4-step process designed to get your business online fast without the headache.
                        </p>
                         <Button 
                            onClick={onNavigate} 
                            variant="monochrome"
                            icon={<ArrowRight size={18} />}
                            className="py-4 px-8 w-full md:w-auto"
                        >
                            Start Your Project
                        </Button>
                    </div>

                    <div className="md:w-2/3 grid sm:grid-cols-2 gap-6">
                        {steps.map((step, i) => (
                            <div key={i} className="step-card opacity-0 relative p-8 border border-neutral-800 rounded-2xl bg-neutral-950 hover:border-neutral-700 transition-colors group">
                                <span className="absolute top-4 right-6 text-6xl font-bold text-neutral-800/20 z-0 group-hover:text-blue-900/20 transition-colors select-none">{step.num}</span>
                                <div className="relative z-10">
                                    <div className="w-12 h-12 bg-neutral-900 border border-neutral-800 text-blue-500 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                                        {step.icon}
                                    </div>
                                    <h4 className="text-xl font-bold text-white mb-3">{step.title}</h4>
                                    <p className="text-neutral-400 text-sm leading-relaxed">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
export default HowItWorks;
