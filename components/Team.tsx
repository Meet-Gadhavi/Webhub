
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Share2, Video, PenTool, Lightbulb } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Team: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(".team-header", 
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      );

      // Cards Animation
      const cards = gsap.utils.toArray('.team-card');
      gsap.fromTo(cards, 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".team-grid-start",
            start: "top 85%", 
          }
        }
      );

      // Background pulse animation
      gsap.to(".team-bg-pulse", {
        scale: 1.1,
        opacity: 0.15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-4 md:px-10 bg-neutral-950 border-t border-neutral-900 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="team-bg-pulse absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-900/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-purple-900/5 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="team-header opacity-0 text-center mb-20">
          <h2 className="text-blue-500 font-bold tracking-widest uppercase mb-4 text-sm">The Minds Behind Webhub</h2>
          <h3 className="text-4xl md:text-6xl font-bold text-white mb-6">Our Proud Team</h3>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Small team. Big vision. Real execution. Driven by passion, creativity, and purpose.
          </p>
        </div>

        <div className="team-grid-start flex flex-col gap-12">
            
          {/* 1. FOUNDER (Center, Large) */}
          <div className="flex justify-center">
             <div className="team-card opacity-0 w-full max-w-3xl bg-neutral-900/60 backdrop-blur-sm border border-yellow-500/20 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden group hover:border-yellow-500/40 transition-all duration-500 hover:shadow-[0_0_50px_rgba(234,179,8,0.1)]">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50" />
                
                {/* Avatar */}
                <div className="w-24 h-24 mx-auto mb-6 relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-yellow-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                    <div className="relative w-full h-full bg-neutral-900 border border-yellow-500/30 rounded-full flex items-center justify-center text-yellow-500 group-hover:scale-105 transition-transform duration-500">
                        <Code size={32} />
                    </div>
                </div>

                <h4 className="text-3xl font-bold text-white mb-2">MEET GADHAVI</h4>
                <p className="text-yellow-500 font-bold tracking-wider text-sm uppercase mb-6">Founder & Lead Developer</p>
                <p className="text-neutral-400 leading-relaxed max-w-xl mx-auto">
                    Vision-driven founder responsible for strategy, development, and technical execution. Building scalable digital solutions with a strong focus on quality, performance, and real business impact.
                </p>
             </div>
          </div>

          {/* 2. CORE TEAM (3 Columns) */}
          <div className="grid md:grid-cols-3 gap-6">
              
              {/* Dev Patni */}
              <div className="team-card opacity-0 bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-2xl p-8 text-center hover:border-blue-500/30 transition-all duration-300 group hover:bg-neutral-900/80">
                  <div className="w-16 h-16 mx-auto mb-6 relative flex items-center justify-center">
                        <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
                        <div className="relative w-full h-full bg-neutral-950 border border-blue-500/30 rounded-full flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                            <Share2 size={24} />
                        </div>
                  </div>
                  <h5 className="text-xl font-bold text-white mb-1">DEV PATNI</h5>
                  <p className="text-blue-400 text-xs font-bold uppercase mb-4 tracking-wide">Co-Founder | Service Exec</p>
                  <p className="text-neutral-500 text-sm leading-relaxed">
                      Handles client communication, service execution, and social media strategy. Ensures smooth operations and delivery.
                  </p>
              </div>

              {/* Aarav Shah */}
              <div className="team-card opacity-0 bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-2xl p-8 text-center hover:border-purple-500/30 transition-all duration-300 group hover:bg-neutral-900/80">
                  <div className="w-16 h-16 mx-auto mb-6 relative flex items-center justify-center">
                        <div className="absolute inset-0 bg-purple-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
                        <div className="relative w-full h-full bg-neutral-950 border border-purple-500/30 rounded-full flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                            <Video size={24} />
                        </div>
                  </div>
                  <h5 className="text-xl font-bold text-white mb-1">AARAV SHAH</h5>
                  <p className="text-purple-400 text-xs font-bold uppercase mb-4 tracking-wide">Video Editor & Graphic Designer</p>
                  <p className="text-neutral-500 text-sm leading-relaxed">
                      Creative mind behind visual storytelling. Specializes in video editing, brand creatives, and engaging digital visuals.
                  </p>
              </div>

              {/* Nihar Vasava */}
              <div className="team-card opacity-0 bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-2xl p-8 text-center hover:border-emerald-500/30 transition-all duration-300 group hover:bg-neutral-900/80">
                  <div className="w-16 h-16 mx-auto mb-6 relative flex items-center justify-center">
                        <div className="absolute inset-0 bg-emerald-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
                        <div className="relative w-full h-full bg-neutral-950 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                            <PenTool size={24} />
                        </div>
                  </div>
                  <h5 className="text-xl font-bold text-white mb-1">NIHAR VASAVA</h5>
                  <p className="text-emerald-400 text-xs font-bold uppercase mb-4 tracking-wide">Co-Developer & Figma Designer</p>
                  <p className="text-neutral-500 text-sm leading-relaxed">
                      Focused on UI/UX design and frontend development. Bridges design and development for clean experiences.
                  </p>
              </div>

          </div>

          {/* 3. MENTOR (Center, Large, Calm) */}
          <div className="flex justify-center mt-4">
             <div className="team-card opacity-0 w-full max-w-3xl bg-neutral-900/30 backdrop-blur-sm border border-neutral-800 rounded-2xl p-8 md:p-10 text-center relative hover:border-neutral-700 transition-all duration-300">
                
                {/* Avatar */}
                <div className="w-20 h-20 mx-auto mb-6 relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-indigo-400 blur-2xl opacity-10" />
                    <div className="relative w-full h-full bg-neutral-900 border border-neutral-700 rounded-full flex items-center justify-center text-neutral-300">
                        <Lightbulb size={28} />
                    </div>
                </div>

                <h4 className="text-2xl font-bold text-neutral-200 mb-2">PRASHANT GADHAVI</h4>
                <p className="text-neutral-500 font-bold tracking-wider text-xs uppercase mb-6">Mentor & Guide</p>
                <p className="text-neutral-400 italic font-light text-lg leading-relaxed max-w-xl mx-auto">
                    “We are building and running this agency under experienced elder guidance ensuring strong values, long-term vision, and disciplined growth.”
                </p>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Team;
