
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const skills = [
  "Python", "Django", "FastAPI", "React", "Next.js", 
  "AI Solutions", "Cloud Arch", "UI/UX", "Docker", "Kubernetes", "DevOps"
];

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
        // Fade in text
        gsap.fromTo(textRef.current, 
            { opacity: 0, y: 50 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 1, 
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                } 
            }
        );

        // Parallax Image Effect
        if (imageRef.current) {
            gsap.to(imageRef.current, {
                yPercent: 20,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-neutral-900 border-t border-neutral-800 overflow-hidden">
      <style>{`
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 40s linear infinite;
        }
      `}</style>
      
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div ref={textRef} className="about-text relative z-10">
            <h2 className="text-sm font-bold tracking-widest text-blue-500 uppercase mb-4">Who We Are</h2>
            <h3 className="text-3xl md:text-5xl font-medium leading-snug mb-6">
              We bridge the gap between complex backend logic and silky smooth frontend interactions.
            </h3>
            <p className="text-neutral-400 text-lg leading-relaxed mb-6">
              Webhub is a premier software development agency focused on building scalable web applications and interactive digital experiences. 
            </p>
            <p className="text-neutral-400 text-lg leading-relaxed">
              Under the leadership of our CEO, <span className="text-white font-semibold">Meet Gadhavi</span>, we strive for excellence in every line of code. Our philosophy is simple: clean architecture, minimalist design, and maximum performance.
            </p>
          </div>
          
          <div className="relative h-[450px] w-full rounded-2xl overflow-hidden bg-neutral-800 group">
             {/* Parallax Image Container */}
             <div className="absolute inset-0 h-[120%] -top-[10%]">
                 <img 
                    ref={imageRef}
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
                    alt="Webhub Team" 
                    className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700"
                 />
             </div>
             
             {/* Overlay Gradient */}
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
             
             <div className="absolute bottom-6 left-6 z-10 pointer-events-none">
                <p className="text-white text-xl font-bold translate-y-2 group-hover:translate-y-0 transition-transform duration-500">Meet Gadhavi</p>
                <p className="text-blue-400 text-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-75">CEO & Founder, Webhub</p>
             </div>
          </div>
        </div>
      </div>

      {/* Infinite Marquee Skills */}
      <div className="mt-24 overflow-hidden py-12 border-y border-neutral-800 bg-black/20 relative">
        <div className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(to_right,#171717,transparent_10%,transparent_90%,#171717)]"></div>
        <div className="flex w-max animate-infinite-scroll">
           {/* Duplicate content enough times to ensure smooth looping without gaps */}
           {[...skills, ...skills, ...skills, ...skills].map((skill, i) => (
             <span key={i} className="mx-8 text-4xl md:text-6xl font-bold text-neutral-800 uppercase tracking-tight select-none hover:text-blue-500 transition-colors duration-300 cursor-default">
               {skill}
             </span>
           ))}
        </div>
      </div>
    </section>
  );
};

export default About;
