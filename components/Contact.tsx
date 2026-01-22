
import React from 'react';
import { Mail, ArrowUp, Phone } from 'lucide-react';
import AnimatedWebhub from './AnimatedWebhub';
import FluidText from './FluidText';

interface ContactProps {
  onNavigate: (page: string) => void;
}

const Contact: React.FC<ContactProps> = ({ onNavigate }) => {
  return (
    <footer className="relative bg-neutral-950 pt-24 pb-12 border-t border-neutral-900 overflow-hidden">
        {/* Decorative Gradients */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-900/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 mb-20">
            <div>
                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
                  Creating<br/>
                  <FluidText text="What’s Next." className="pb-2" />
                </h2>
                <a 
                href="mailto:nova.officialm63@gmail.com" 
                className="text-xl md:text-2xl text-neutral-400 hover:text-white transition-colors border-b border-neutral-800 hover:border-white pb-1"
                >
                nova.officialm63@gmail.com
                </a>
                <div className="mt-4 flex flex-col gap-2 text-neutral-400">
                    <p>WhatsApp: +91 9033281960</p>
                    <p>Call: +91 8690787870</p>
                </div>
            </div>
            
            <div className="flex flex-col justify-end items-start md:items-end gap-6">
                 {/* Elfsight Social Media Icons */}
                 <div className="w-full flex justify-start md:justify-end">
                    <script src="https://elfsightcdn.com/platform.js" async></script>
                    <div className="elfsight-app-e36cd640-482f-4648-8969-c010318c8c18" data-elfsight-app-lazy></div>
                 </div>

                 <button 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="flex items-center gap-2 text-sm text-neutral-500 hover:text-white transition-colors group"
                >
                    Back to Top <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
                 </button>
            </div>
        </div>

        <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-600">
             <div className="flex gap-6 flex-wrap justify-center md:justify-start">
                 <button onClick={() => onNavigate('about')} className="hover:text-neutral-400 transition-colors">About Us</button>
                 <button onClick={() => onNavigate('contact')} className="hover:text-neutral-400 transition-colors">Contact Us</button>
                 <button onClick={() => onNavigate('privacy')} className="hover:text-neutral-400 transition-colors">Privacy Policy</button>
                 <button onClick={() => onNavigate('terms')} className="hover:text-neutral-400 transition-colors">Terms of Service</button>
             </div>
             <p className="text-center md:text-right flex items-center gap-1">© {new Date().getFullYear()} <AnimatedWebhub className="text-xs" />. Founded by Meet Gadhavi.</p>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
