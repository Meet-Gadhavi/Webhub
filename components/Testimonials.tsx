
import React, { useEffect, useRef } from 'react';
import { Star, Quote } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const testimonials = [
  {
    id: 1,
    name: "Rahul Patel",
    role: "Owner, FitZone Gym",
    text: "Novabit transformed our gym's online presence. We saw a 40% increase in membership inquiries within the first month of launching the new site.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Manager, Elegance Salon",
    text: "The booking system they integrated is a lifesaver. Our customers love how easy it is to schedule appointments. Highly recommended!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 3,
    name: "Vikram Singh",
    role: "Director, Royal Inn Hotel",
    text: "Professional, timely, and bilingual support made the process smooth. They understood our local market needs perfectly.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
  }
];

const Testimonials: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
        gsap.from(".testimonial-card", {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
            }
        });
        
        // Background subtle movement
        gsap.to(".bg-gradient-move", {
            backgroundPosition: "200% 50%",
            duration: 20,
            repeat: -1,
            ease: "linear"
        });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 bg-neutral-900/30 border-y border-neutral-800 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] bg-gradient-move pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-10 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Client Success Stories</h2>
          <p className="text-neutral-400">Don't just take our word for it.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="testimonial-card bg-neutral-950/80 backdrop-blur-md border border-neutral-800 p-8 rounded-2xl relative hover:border-neutral-700 transition-colors shadow-lg hover:shadow-xl group">
              <Quote className="absolute top-8 right-8 text-neutral-800 group-hover:text-blue-900/30 transition-colors duration-500" size={48} />
              
              <div className="flex gap-1 mb-6">
                {[1,2,3,4,5].map(s => <Star key={s} size={16} className="text-yellow-500 fill-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.4)]" />)}
              </div>
              
              <p className="text-neutral-300 text-lg mb-8 leading-relaxed relative z-10">"{t.text}"</p>
              
              <div className="flex items-center gap-4">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover border border-neutral-700 group-hover:border-blue-500 transition-colors" />
                <div>
                  <h4 className="text-white font-bold">{t.name}</h4>
                  <p className="text-blue-500 text-xs uppercase font-bold tracking-wide">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
