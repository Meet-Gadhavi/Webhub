
import React, { useEffect, useRef } from 'react';

export const BackgroundBeams: React.FC<{ className?: string }> = ({ className = "" }) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.width = canvas.offsetWidth;
    let h = canvas.height = canvas.offsetHeight;
    
    // Configuration for beams
    const beamCount = 12;
    const beams = Array.from({ length: beamCount }).map((_, i) => ({
      x: Math.random() * w,
      width: Math.random() * 200 + 100, // Wide soft beams
      speed: (Math.random() * 0.5 + 0.2) * (Math.random() > 0.5 ? 1 : -1),
      opacity: Math.random() * 0.08 + 0.02,
      angle: (Math.random() * 15 - 7.5) * (Math.PI / 180), // Slight tilt
      color: i % 2 === 0 ? '59, 130, 246' : '168, 85, 247' // Blue and Purple
    }));

    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      // Use screen blending for light mixing
      ctx.globalCompositeOperation = 'screen';

      beams.forEach(beam => {
         ctx.save();
         
         // Translate to beam position (pivot at vertical center)
         ctx.translate(beam.x, h / 2);
         ctx.rotate(beam.angle);
         
         // Create a gradient that fades out at top and bottom
         const grad = ctx.createLinearGradient(0, -h, 0, h);
         
         // Fade in/out logic
         grad.addColorStop(0, `rgba(${beam.color}, 0)`);
         grad.addColorStop(0.2, `rgba(${beam.color}, ${beam.opacity * 0.5})`);
         grad.addColorStop(0.5, `rgba(${beam.color}, ${beam.opacity})`);
         grad.addColorStop(0.8, `rgba(${beam.color}, ${beam.opacity * 0.5})`);
         grad.addColorStop(1, `rgba(${beam.color}, 0)`);
         
         ctx.fillStyle = grad;
         
         // Draw a rectangle that is the beam
         // We draw it very tall to cover the rotation
         ctx.fillRect(-beam.width / 2, -h * 1.5, beam.width, h * 3);
         
         ctx.restore();
         
         // Update position
         beam.x += beam.speed;
         
         // Wrap around
         if (beam.x > w + 400) beam.x = -400;
         if (beam.x < -400) beam.x = w + 400;
         
         // Pulse opacity slightly
         beam.opacity += (Math.random() - 0.5) * 0.001;
         beam.opacity = Math.max(0.01, Math.min(0.12, beam.opacity));
      });

      animationId = requestAnimationFrame(render);
    };

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', resize);
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    }
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden bg-neutral-950 ${className}`}>
        {/* Radial gradient overlay for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,0)_0%,rgba(5,5,5,1)_100%)] z-10 pointer-events-none" />
        <canvas ref={ref} className="w-full h-full opacity-100" />
    </div>
  );
};
