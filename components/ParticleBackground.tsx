
import React, { useEffect, useRef } from 'react';

const ParticleBackground: React.FC<{ className?: string }> = ({ className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const particles: Particle[] = [];
    const particleCount = 80; // Adjusted for performance and aesthetics
    const connectionDistance = 120;
    const mouseDistance = 200;

    let mouse = { x: -1000, y: -1000 };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.3; // Slower, calmer movement
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 2 + 0.5;
      }

      update() {
        // Movement
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x > width || this.x < 0) this.vx *= -1;
        if (this.y > height || this.y < 0) this.vy *= -1;

        // Mouse interaction (Repulsion)
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouseDistance) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const maxDistance = mouseDistance;
            const force = (maxDistance - distance) / maxDistance;
            const directionX = forceDirectionX * force * 2;
            const directionY = forceDirectionY * force * 2;
            
            this.x -= directionX;
            this.y -= directionY;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = 'rgba(59, 130, 246, 0.6)'; // Blue particles
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Connect particles
        for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(59, 130, 246, ${0.15 * (1 - distance/connectionDistance)})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
      }
      requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
        if (!canvas) return;
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
        init();
    };

    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
        mouse.x = -1000;
        mouse.y = -1000;
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
        window.removeEventListener('resize', handleResize);
        if (canvas) {
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
        }
    };
  }, []);

  return <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full pointer-events-auto ${className}`} />;
};

export default ParticleBackground;
