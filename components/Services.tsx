
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Monitor, Share2, MapPin, Zap, Settings, Plus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const servicesList = [
  {
    icon: <Monitor size={32} />,
    title: "Website Development",
    description: "Custom, high-performance websites tailored to your brand. From landing pages to complex e-commerce platforms.",
    features: ["Responsive Design", "SEO Optimized", "Fast Loading", "Secure Hosting"]
  },
  {
    icon: <Share2 size={32} />,
    title: "Social Media Management",
    description: "Grow your online presence with strategic content creation and community engagement across all platforms.",
    features: ["Content Strategy", "Graphic Design", "Reels/Shorts", "Analytics Reporting"]
  },
  {
    icon: <MapPin size={32} />,
    title: "Google Business Setup",
    description: "Dominate local search results. We optimize your GMB profile to ensure customers find you first.",
    features: ["Profile Verification", "Review Management", "Local SEO", "Photo Updates"]
  },
  {
    icon: <Zap size={32} />,
    title: "Business Automation",
    description: "Save time and reduce errors by automating repetitive tasks like invoicing, emails, and inventory.",
    features: ["WhatsApp Bots", "Email Sequences", "CRM Integration", "Inventory Sync"]
  },
  {
    icon: <Settings size={32} />,
    title: "Website Maintenance",
    description: "Keep your digital assets running smoothly with our monthly support and security packages.",
    features: ["Security Updates", "Content Edits", "Daily Backups", "Performance Checks"]
  },
  {
    icon: <Plus size={32} />,
    title: "Add-on Services",
    description: "Enhance your digital ecosystem with our specialized additional services.",
    features: ["Logo Design", "Copywriting", "Video Editing", "Consultation"]
  }
];

const Services: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".service-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });
      
      // Floating animation for background blobs
      gsap.to(".service-blob-1", {
        y: -30,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      
      gsap.to(".service-blob-2", {
        y: 30,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-20 md:py-24 px-4 md:px-10 overflow-hidden bg-neutral-950/50">
      {/* Background Effects */}
      <div className="service-blob-1 absolute top-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-blue-600/5 rounded-full blur-[80px] md:blur-[100px] pointer-events-none z-0 translate-x-1/3 -translate-y-1/3" />
      <div className="service-blob-2 absolute bottom-0 left-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-purple-600/5 rounded-full blur-[80px] md:blur-[100px] pointer-events-none z-0 -translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16">
            <h2 className="text-blue-500 font-bold tracking-widest uppercase mb-4 text-sm">Our Expertise</h2>
            <h3 className="text-4xl md:text-6xl font-bold text-white mb-6">Comprehensive Digital Solutions</h3>
            <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
            We provide end-to-end services to transform your local business into a digital powerhouse.
            </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {servicesList.map((service, index) => (
            <div key={index} className="service-card group bg-neutral-900/80 backdrop-blur-sm border border-neutral-800 p-8 rounded-2xl hover:border-blue-500/50 transition-colors duration-300 shadow-xl">
                <div className="w-14 h-14 bg-neutral-800 rounded-xl flex items-center justify-center text-blue-500 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 group-hover:scale-110">
                {service.icon}
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">{service.title}</h4>
                <p className="text-neutral-400 mb-6 h-auto md:h-20">{service.description}</p>
                <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-neutral-500 group-hover:text-neutral-300">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover:scale-125 transition-transform"></span>
                    {feature}
                    </li>
                ))}
                </ul>
            </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
        