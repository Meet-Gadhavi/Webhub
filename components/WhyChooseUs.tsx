
import React, { useEffect, useRef } from 'react';
import { Wallet, Zap, MapPin, Languages } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParticleBackground from './ParticleBackground';
import AnimatedWebhub from './AnimatedWebhub';

gsap.registerPlugin(ScrollTrigger);

const features = [
    {
        icon: <Wallet className="text-green-500" size={32} />,
        title: "Affordable Pricing",
        line1: "Business-friendly rates",
        line2: "40% cheaper than agencies"
    },
    {
        icon: <Zap className="text-yellow-500" size={32} />,
        title: "Fast Delivery",
        line1: "7-14 days guaranteed",
        line2: "Not 30-45 days"
    },
    {
        icon: <MapPin className="text-red-500" size={32} />,
        title: "Local Service",
        line1: "Face-to-face meetings",
        line2: "Based in Ahmedabad" 
    },
    {
        icon: <Languages className="text-blue-500" size={32} />,
        title: "Bilingual Support",
        line1: "English & Gujarati",
        line2: "Better communication"
    }
];

const WhyChooseUs: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".why-card", 
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section className="relative w-full border-t border-neutral-900 bg-neutral-950 overflow-hidden">
             {/* Interactive Background */}
             <ParticleBackground className="z-0 opacity-80" />
             
             {/* Gradient Overlay for seamless blending */}
             <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-transparent to-neutral-950 pointer-events-none z-0" />

             <div ref={containerRef} className="relative z-10 py-24 px-4 md:px-10 max-w-7xl mx-auto">
                 <div className="text-center mb-16">
                    <h2 className="text-blue-500 font-bold tracking-widest uppercase mb-4 text-sm">Businesses Trust Webhub</h2>
                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 flex items-center justify-center flex-wrap gap-2">The Advantage of <AnimatedWebhub className="text-4xl md:text-5xl" /></h3>
                    <p className="text-neutral-400 max-w-2xl mx-auto text-lg">We combine the quality of a premium agency with the agility and affordability of a freelancer.</p>
                 </div>
                 
                 <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((f, i) => (
                        <div key={i} className="why-card opacity-0 bg-neutral-900/80 backdrop-blur-sm border border-neutral-800 p-8 rounded-2xl hover:bg-neutral-900 hover:border-blue-500/30 transition-all duration-300 group shadow-lg">
                            <div className="mb-6 p-4 bg-neutral-950 rounded-full w-fit group-hover:scale-110 transition-transform border border-neutral-800 group-hover:border-blue-500/30">
                                {f.icon}
                            </div>
                            <h4 className="text-xl font-bold text-white mb-4">{f.title}</h4>
                            <div className="flex flex-col gap-1">
                                <p className="text-white font-medium">{f.line1}</p>
                                <p className="text-neutral-400 text-sm">{f.line2}</p>
                            </div>
                        </div>
                    ))}
                 </div>
             </div>
        </section>
    );
};
export default WhyChooseUs;
