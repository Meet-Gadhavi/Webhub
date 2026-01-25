
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown, Phone } from 'lucide-react';
import { Feedback } from '../types';
import { BackgroundBeams } from './BackgroundBeams';
import ParticleBackground from './ParticleBackground';
import FluidText from './FluidText';
import Button from './Button';

interface HeroProps {
    feedbacks: Feedback[];
    onConsult: () => void;
    onOpenConsultation?: () => void;
}

const Hero: React.FC<HeroProps> = ({ feedbacks, onConsult, onOpenConsultation }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subTextRef = useRef<HTMLParagraphElement>(null);
  
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(textRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.2 }
    )
    .fromTo(subTextRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      '-=0.8'
    );
  }, []);

  const handleConsultClick = () => {
    if (onOpenConsultation) {
        onOpenConsultation();
    } else {
        const message = encodeURIComponent("I am interested to make Website for my business, i need to grow more with you let's talk...");
        window.open(`https://wa.me/919033281960?text=${message}`, '_blank');
    }
  };

  const handleCallClick = () => {
      window.open('tel:+918690787870', '_self');
  };

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen flex flex-col justify-center items-center px-4 md:px-10 overflow-hidden bg-neutral-950"
    >
      <BackgroundBeams className="absolute inset-0 z-0 opacity-40" />
      <ParticleBackground className="z-0 opacity-50" />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-950/20 to-neutral-950 z-[1] pointer-events-none" />

      <div className="z-10 text-center max-w-6xl relative">
        <h1 ref={textRef} className="text-4xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tighter text-white">
          Creating <br/>
          <FluidText text="What’s Next." className="pb-2" />
        </h1>
        
        <p ref={subTextRef} className="mt-8 text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
          Webhub empowers businesses like yours with high-performance websites, automation, and strategic growth.
          Led by <span className="text-white font-semibold">Meet Gadhavi</span>.
        </p>
        
        <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center items-center">
            <Button 
                onClick={handleConsultClick}
                variant="primary"
                icon={<ArrowDown size={18} />}
                className="py-4 px-8 text-base"
            >
                Get Free Consultation
            </Button>
            <Button 
                onClick={handleCallClick}
                variant="outline"
                icon={<Phone size={18} />}
                className="py-4 px-8 text-base"
            >
                Call Now
            </Button>
        </div>

        {feedbacks.length > 0 && (
            <div className="mt-16 max-w-3xl mx-auto overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                <div className="flex gap-8 animate-[scroll_30s_linear_infinite] whitespace-nowrap">
                    {feedbacks.concat(feedbacks).map((fb, i) => (
                        <div key={i} className="flex items-center gap-3 bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-lg px-5 py-2">
                             <span className="text-sm text-neutral-300 font-medium">"{fb.text}"</span>
                             <span className="text-xs text-neutral-500 uppercase tracking-wider">{fb.user}</span>
                        </div>
                    ))}
                </div>
            </div>
        )}
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
