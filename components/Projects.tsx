
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ProjectsProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
  title?: string;
}

const Projects: React.FC<ProjectsProps> = ({ projects, onProjectClick, title = "Selected Works" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cards = cardsRef.current;
    
    // Refresh ScrollTrigger to ensure positions are calculated correctly after view changes
    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      setTimeout(() => {
         cards.forEach((card, index) => {
          if (!card) return;
          
          gsap.fromTo(card, 
            { 
              y: 50, 
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "top 20%",
                toggleActions: "play none none reverse"
              }
            }
          );
        });
      }, 100);
    }, containerRef);
    
    return () => ctx.revert();
  }, [projects]);

  return (
    <section ref={containerRef} className="py-20 md:py-32 px-4 md:px-10 max-w-7xl mx-auto">
      <div className="mb-16 md:mb-24">
        <h2 className="text-4xl md:text-7xl font-bold mb-6 tracking-tighter text-white">{title}</h2>
        <div className="h-1 w-20 bg-blue-500"></div>
      </div>

      <div className="flex flex-col gap-20 md:gap-32">
        {projects.map((project, index) => (
          <div 
            key={project.id}
            ref={el => { cardsRef.current[index] = el; }}
            onClick={() => onProjectClick(project)}
            className="group grid md:grid-cols-12 gap-8 items-center cursor-pointer"
          >
            {/* Text Side */}
            <div className="md:col-span-5 order-2 md:order-1 flex flex-col justify-center transition-all duration-500">
              <div className="overflow-hidden mb-3">
                 <span className="text-xs font-bold tracking-widest text-blue-500 uppercase inline-block transform translate-y-0 opacity-80 group-hover:opacity-100 transition-all duration-500">
                    {project.category}
                 </span>
              </div>
              
              <h3 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-neutral-200 group-hover:text-white transition-colors duration-300">
                {project.title}
              </h3>
              
              <p className="text-neutral-500 text-base md:text-lg mb-6 md:mb-8 leading-relaxed group-hover:text-neutral-300 transition-colors duration-500 line-clamp-3">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-8 md:mb-10 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                {project.tech.map(t => (
                  <span key={t} className="px-3 py-1 border border-neutral-800 rounded-full text-xs text-neutral-400 bg-neutral-900/30 group-hover:border-neutral-700 transition-colors duration-300">
                    {t}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-4">
                  <button className="inline-flex items-center gap-3 text-base md:text-lg font-medium text-white group-hover:translate-x-2 transition-transform duration-300 w-fit">
                    View Live Demo
                    <span className="bg-neutral-800 text-white rounded-full p-2 group-hover:bg-blue-500 transition-colors duration-300">
                        <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </button>
              </div>
            </div>

            {/* Image/Video Side */}
            <div className="md:col-span-7 order-1 md:order-2">
                <div className="relative overflow-hidden rounded-lg aspect-[16/10] bg-neutral-900 border border-neutral-900 group-hover:border-neutral-800 transition-colors duration-500">
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-700 z-10 pointer-events-none" />
                  
                  {project.videos && project.videos.length > 0 ? (
                    <video
                      src={project.videos[0]}
                      muted
                      loop
                      playsInline
                      autoPlay
                      className="w-full h-full object-cover transform scale-100 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out will-change-transform"
                    />
                  ) : (
                     <img 
                      src={project.images[0]} 
                      alt={project.title} 
                      className="w-full h-full object-cover transform scale-100 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out will-change-transform"
                    />
                  )}
                </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
        