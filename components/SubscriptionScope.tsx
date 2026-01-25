
import React, { useEffect, useRef } from 'react';
import { Check, X, Ban, Monitor, Users, Target } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SubscriptionScope: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate plan cards
            gsap.from(".plan-card", {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%"
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const categories = [
        {
            name: "STARTER",
            price: "₹4,999",
            period: "/ year",
            color: "text-green-400",
            bgGradient: "from-green-500/10 to-transparent",
            borderColor: "border-green-500/20",
            iconColor: "text-green-500",
            bestFor: "Individuals & new businesses starting online",
            summary: "Simple, clean, non-complex websites only",
            sections: [
                {
                    title: "Website Types",
                    icon: <Monitor size={16} />,
                    items: ["Landing Page Website", "Portfolio Website", "Basic Business Website", "Personal Brand Website", "Single-Service Website"]
                },
                {
                    title: "Use Cases",
                    icon: <Users size={16} />,
                    items: ["Freelancers", "Small shops", "Consultants", "Startups testing ideas", "Local service providers"]
                },
                {
                    title: "Core Focus",
                    icon: <Target size={16} />,
                    items: ["Online presence", "Contact & inquiry generation", "Simple, fast delivery"]
                }
            ],
            notIncluded: ["Booking systems", "Payment gateways", "E-commerce", "Advanced SEO", "Multi-location support"]
        },
        {
            name: "PROFESSIONAL",
            price: "₹9,999",
            period: "/ year",
            color: "text-blue-400",
            bgGradient: "from-blue-500/10 to-transparent",
            borderColor: "border-blue-500/20",
            iconColor: "text-blue-500",
            bestFor: "Growing businesses needing engagement",
            summary: "Moderate complexity, structured websites",
            sections: [
                {
                    title: "Website Types",
                    icon: <Monitor size={16} />,
                    items: ["Business Website (Multi-page)", "Service-Based Company Website", "Clinic / Gym / Salon Website", "Restaurant Website (no ordering)", "Institute / Coaching Website"]
                },
                {
                    title: "Use Cases",
                    icon: <Users size={16} />,
                    items: ["Businesses with multiple services", "Companies needing galleries & maps", "Brands building credibility"]
                },
                {
                    title: "Core Focus",
                    icon: <Target size={16} />,
                    items: ["User engagement", "Trust building", "Better presentation"]
                }
            ],
            notIncluded: ["Full e-commerce", "Complex custom workflows", "ERP / inventory systems"]
        },
        {
            name: "PREMIUM",
            price: "₹19,999",
            period: "/ year",
            color: "text-purple-400",
            bgGradient: "from-purple-500/10 to-transparent",
            borderColor: "border-purple-500/20",
            iconColor: "text-purple-500",
            bestFor: "Established businesses & automation needs",
            summary: "High functionality, business-critical websites",
            sections: [
                {
                    title: "Website Types",
                    icon: <Monitor size={16} />,
                    items: ["Hotel / Guest House Website", "Appointment-Based Business Website", "Advanced Service Platform", "Restaurant Website w/ booking", "Multi-branch Business Website"]
                },
                {
                    title: "Use Cases",
                    icon: <Users size={16} />,
                    items: ["Hotels & clinics", "Event services", "High-volume service businesses", "Businesses accepting online payments"]
                },
                {
                    title: "Core Focus",
                    icon: <Target size={16} />,
                    items: ["Automation", "Advanced SEO", "Conversion & scalability"]
                }
            ],
            notIncluded: ["Full custom software (ERP, POS)", "Large-scale marketplaces", "Heavy custom logic"]
        }
    ];

    return (
        <section ref={containerRef} className="relative py-24 px-4 md:px-10 overflow-hidden bg-black border-t border-neutral-900">
             {/* Background Glows */}
             <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px]" />
             </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-blue-500 font-bold tracking-widest uppercase mb-4 text-sm">Categories & Scope</h2>
                    <h3 className="text-4xl md:text-6xl font-bold text-white mb-6">Subscription Scope</h3>
                    <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
                        Detailed breakdown of what each tier delivers to ensure perfect alignment with your business goals.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {categories.map((cat, idx) => (
                        <div key={idx} className={`plan-card relative flex flex-col bg-neutral-900/40 backdrop-blur-md rounded-2xl border ${cat.borderColor} overflow-hidden group hover:bg-neutral-900/60 transition-colors duration-300`}>
                            {/* Top Gradient */}
                            <div className={`absolute top-0 left-0 w-full h-32 bg-gradient-to-b ${cat.bgGradient} pointer-events-none`} />
                            
                            <div className="p-8 relative z-10 flex-1 flex flex-col">
                                {/* Header */}
                                <div className="mb-6">
                                    <h3 className={`text-xl font-bold ${cat.color} mb-2 tracking-wide`}>{cat.name}</h3>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-bold text-white">{cat.price}</span>
                                        <span className="text-neutral-500 text-sm">{cat.period}</span>
                                    </div>
                                </div>

                                {/* Best For */}
                                <div className="mb-8 p-4 bg-neutral-950/50 rounded-xl border border-neutral-800/50">
                                    <p className="text-neutral-500 text-xs uppercase font-bold mb-1">Best For</p>
                                    <p className="text-neutral-300 text-sm leading-relaxed">{cat.bestFor}</p>
                                </div>
                                
                                {/* Sections */}
                                <div className="space-y-8 flex-1">
                                    {cat.sections.map((section, sIdx) => (
                                        <div key={sIdx}>
                                            <h4 className={`flex items-center gap-2 font-bold text-sm uppercase tracking-wider mb-3 ${cat.iconColor}`}>
                                                {section.icon} {section.title}
                                            </h4>
                                            <ul className="space-y-2.5">
                                                {section.items.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-sm text-neutral-300">
                                                        <div className={`mt-1.5 w-1 h-1 rounded-full ${cat.iconColor.replace('text-', 'bg-')}`} />
                                                        <span className="leading-relaxed">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}

                                    {/* Not Included */}
                                    <div>
                                        <h4 className="flex items-center gap-2 font-bold text-red-500/80 text-sm uppercase tracking-wider mb-3">
                                            <Ban size={16} /> Not Included
                                        </h4>
                                        <ul className="space-y-2.5">
                                            {cat.notIncluded.map((item, i) => (
                                                <li key={i} className="flex items-start gap-3 text-sm text-neutral-500">
                                                    <X size={12} className="mt-1 text-red-900" />
                                                    <span className="leading-relaxed">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Summary Footer */}
                                <div className={`mt-8 pt-6 border-t border-white/5 text-center font-bold text-sm ${cat.color}`}>
                                    {cat.summary}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SubscriptionScope;
