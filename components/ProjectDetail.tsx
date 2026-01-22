
import React, { useEffect, useRef, useState } from 'react';
import { X, ExternalLink, ChevronRight, ChevronLeft } from 'lucide-react';
import { Project } from '../types';
import gsap from 'gsap';

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  // Combine videos and images for the main carousel
  const media = [
    ...(project.videos || []).map(src => ({ type: 'video', src })),
    ...project.images.map(src => ({ type: 'image', src }))
  ];

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline();
    tl.fromTo(containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 }
    )
    .fromTo(contentRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
      '-=0.3'
    );

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleClose = () => {
    gsap.to(containerRef.current, { 
      opacity: 0, 
      duration: 0.4, 
      onComplete: onClose 
    });
  };

  const nextMedia = () => {
    setActiveMediaIndex((prev) => (prev + 1) % media.length);
  };

  const prevMedia = () => {
    setActiveMediaIndex((prev) => (prev - 1 + media.length) % media.length);
  };

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl overflow-y-auto"
      data-lenis-prevent
    >
      <button 
        onClick={handleClose}
        className="fixed top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-md"
      >
        <X size={24} />
      </button>

      <div ref={contentRef} className="min-h-screen p-6 md:p-12 lg:p-20 max-w-7xl mx-auto">
        <div className="mb-12 pt-10">
            <h2 className="text-blue-500 font-bold tracking-widest uppercase mb-4 text-sm">{project.category}</h2>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter">{project.title}</h1>
            
            <div className="flex flex-wrap gap-4 mb-8">
                {project.tech.map((t) => (
                    <span key={t} className="px-4 py-2 border border-neutral-800 rounded-full text-sm text-neutral-300">
                        {t}
                    </span>
                ))}
            </div>

            <div className="flex gap-4">
                 <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-neutral-200 transition-colors">
                    Visit Live <ExternalLink size={16} />
                 </a>
            </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
            {/* Main Media Carousel */}
            <div className="lg:col-span-8 space-y-6">
                <div className="relative rounded-2xl overflow-hidden border border-neutral-800 aspect-video bg-neutral-900 shadow-2xl group">
                    {media[activeMediaIndex].type === 'video' ? (
                        <video 
                            src={media[activeMediaIndex].src} 
                            autoPlay loop muted playsInline 
                            className="w-full h-full object-cover" 
                        />
                    ) : (
                        <img 
                            src={media[activeMediaIndex].src} 
                            alt={project.title} 
                            className="w-full h-full object-cover" 
                        />
                    )}
                    
                    {media.length > 1 && (
                        <>
                            <button onClick={prevMedia} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all">
                                <ChevronLeft size={24} />
                            </button>
                            <button onClick={nextMedia} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all">
                                <ChevronRight size={24} />
                            </button>
                        </>
                    )}
                    
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {media.map((_, idx) => (
                            <div 
                                key={idx} 
                                className={`w-2 h-2 rounded-full transition-all ${idx === activeMediaIndex ? 'bg-white w-4' : 'bg-white/50'}`} 
                            />
                        ))}
                    </div>
                </div>

                {/* Thumbnails Grid */}
                {media.length > 1 && (
                    <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                        {media.map((m, idx) => (
                            <div 
                                key={idx}
                                onClick={() => setActiveMediaIndex(idx)}
                                className={`rounded-lg overflow-hidden aspect-square border cursor-pointer transition-all ${idx === activeMediaIndex ? 'border-blue-500 opacity-100' : 'border-neutral-800 opacity-60 hover:opacity-100'}`}
                            >
                                {m.type === 'video' ? (
                                    <video src={m.src} className="w-full h-full object-cover" muted />
                                ) : (
                                    <img src={m.src} alt="thumb" className="w-full h-full object-cover" />
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Sidebar Details */}
            <div className="lg:col-span-4">
                <div className="sticky top-24 space-y-10">
                    <div>
                        <h3 className="text-2xl font-bold mb-6 text-white border-b border-neutral-800 pb-4">Project Overview</h3>
                        <p className="text-neutral-400 text-lg leading-relaxed">
                            {project.description}
                        </p>
                    </div>

                    <div className="p-6 bg-neutral-900 rounded-xl border border-neutral-800">
                        <h4 className="font-bold mb-4 text-white uppercase text-xs tracking-wider">Key Features</h4>
                        <ul className="space-y-3 text-neutral-400 text-sm">
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                Advanced Architecture
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                Real-time Optimization
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                Mobile Responsive
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                Seamless Animations
                            </li>
                        </ul>
                    </div>
                    
                    <div className="bg-neutral-950 p-6 rounded-xl border border-neutral-900">
                         <p className="text-xs text-neutral-500 italic">
                             "This project represents a major milestone in digital innovation, combining robust backend engineering with elegant frontend design."
                         </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
  );
};

export default ProjectDetail;
