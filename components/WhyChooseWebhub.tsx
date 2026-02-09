
import React, { useEffect, useRef } from 'react';
import { CheckCircle2, Zap, Smartphone, Sliders, LifeBuoy, TrendingUp, MapPin, Layers } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedWebhub from './AnimatedWebhub';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <CheckCircle2 size={32} className="text-green-500" />,
    title: "Clear Pricing, No Confusion",
    subtitle: "What you see is what you get.",
    desc: "Our plans are transparent, well-defined, and designed for real business needs — no hidden costs, no surprise upsells."
  },
  {
    icon: <Zap size={32} className="text-yellow-500" />,
    title: "Fast & Reliable Delivery",
    subtitle: "We respect your time.",
    desc: "With fixed timelines and structured workflows, your website goes live when we promise — not “sometime later”."
  },
  {
    icon: <Smartphone size={32} className="text-blue-500" />,
    title: "Built for Today’s Users",
    subtitle: "Mobile-responsive. Fast. Easy.",
    desc: "Because your customers are already online — mostly on their phones. We optimize for speed and usability."
  },
  {
    icon: <Sliders size={32} className="text-purple-500" />,
    title: "Right Features, Not Overkill",
    subtitle: "Smart, scalable solutions.",
    desc: "We recommend only what your business actually needs. No unnecessary complexity, no heavy systems."
  },
  {
    icon: <LifeBuoy size={32} className="text-red-500" />,
    title: "Support That Actually Helps",
    subtitle: "Quick, clear, and human.",
    desc: "Whether it’s a small update or a technical issue, you’re never left guessing. We're here for you."
  },
  {
    icon: <TrendingUp size={32} className="text-pink-500" />,
    title: "Growth-Ready Approach",
    subtitle: "More than just a website.",
    desc: "From SEO and Google Business setup to social media and automation — Webhub is built to grow with your business."
  },
  {
    icon: <MapPin size={32} className="text-orange-500" />,
    title: "Local Understanding",
    subtitle: "Global standards, local soul.",
    desc: "We understand Indian businesses and local markets — and we deliver with professional global standards."
  },
  {
    icon: <Layers size={32} className="text-cyan-500" />,
    title: "One Partner. Everything Digital.",
    subtitle: "Focus on running your business.",
    desc: "Website. Branding. Social media. Maintenance. Automation. Webhub handles it all."
  }
];

const WhyChooseWebhub: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(".wcw-header", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });

      // Cards Stagger Animation
      gsap.fromTo(".wcw-card", 
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: ".wcw-grid",
            start: "top 85%",
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-20 md:py-32 px-4 md:px-10 relative bg-neutral-950 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-900/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-900/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
            {/* Header Section */}
            <div className="wcw-header text-center mb-16 md:mb-24">
                <h2 className="text-3xl md:text-6xl font-bold text-white mb-4 tracking-tight flex items-center justify-center gap-2 flex-wrap">
                    Why Choose <AnimatedWebhub className="text-3xl md:text-6xl" /> ?
                </h2>
                <div className="flex flex-col items-center gap-4">
                    <p className="font-cursive text-3xl md:text-5xl text-blue-400 rotate-[-2deg]">
                        Creating What’s Next.
                    </p>
                    <p className="text-neutral-400 text-base md:text-xl max-w-2xl mt-4 leading-relaxed px-4">
                        At Webhub, we don’t just build websites — we build digital foundations that help businesses grow.
                    </p>
                </div>
            </div>

            {/* Grid Section */}
            <div className="wcw-grid grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                    <div 
                        key={index} 
                        className="wcw-card group bg-neutral-900/60 backdrop-blur-sm border border-neutral-800 p-8 rounded-2xl hover:bg-neutral-900 hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
                    >
                        <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                            <div className="p-3 bg-neutral-950 rounded-xl w-fit border border-neutral-800 group-hover:border-blue-500/20">
                                {feature.icon}
                            </div>
                        </div>
                        
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                            {feature.title}
                        </h3>
                        
                        <p className="font-cursive text-2xl text-neutral-500 mb-4 block group-hover:text-neutral-300 transition-colors">
                            {feature.subtitle}
                        </p>
                        
                        <p className="text-sm text-neutral-400 leading-relaxed border-t border-neutral-800 pt-4 group-hover:text-neutral-300 transition-colors">
                            {feature.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};

export default WhyChooseWebhub;
        