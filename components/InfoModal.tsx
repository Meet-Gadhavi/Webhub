
import React, { useEffect, useRef, useState } from 'react';
import { X, Mail, MapPin, Phone, Shield, FileText, Users, HelpCircle, Send, ChevronDown, ChevronUp } from 'lucide-react';
import gsap from 'gsap';
import Button from './Button';
import AnimatedWebhub from './AnimatedWebhub';

interface InfoModalProps {
  isOpen: boolean;
  initialTab: string;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, initialTab, onClose }) => {
  const [activeTab, setActiveTab] = useState(initialTab || 'about');
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      // Prevent background scrolling on body and html
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      
      const tl = gsap.timeline();
      tl.to(overlayRef.current, { opacity: 1, duration: 0.3 })
        .fromTo(modalRef.current, 
          { scale: 0.95, opacity: 0, y: 20 },
          { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.2)' },
          "-=0.1"
        );
    } else {
      // Re-enable scrolling
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';

      const tl = gsap.timeline();
      tl.to(modalRef.current, { scale: 0.95, opacity: 0, y: 20, duration: 0.3 })
        .to(overlayRef.current, { opacity: 0, duration: 0.3 }, "-=0.2");
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen, initialTab]);

  useEffect(() => {
    // Animate content switch
    if (contentRef.current) {
        gsap.fromTo(contentRef.current,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.3 }
        );
    }
  }, [activeTab]);

  if (!isOpen) return null;

  const tabs = [
    { id: 'about', label: 'About', icon: <Users size={16} /> },
    { id: 'contact', label: 'Contact', icon: <Mail size={16} /> },
    { id: 'faq', label: 'FAQ', icon: <HelpCircle size={16} /> },
    { id: 'privacy', label: 'Privacy', icon: <Shield size={16} /> },
    { id: 'terms', label: 'Terms', icon: <FileText size={16} /> },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      <div 
        ref={overlayRef} 
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm opacity-0"
      />
      
      <div 
        ref={modalRef}
        className="relative w-full max-w-4xl h-[85vh] bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col opacity-0"
      >
        {/* Header & Tabs */}
        <div className="bg-neutral-950 border-b border-neutral-800 shrink-0">
            <div className="flex items-center justify-between p-4 md:px-6">
                <h3 className="font-bold text-white flex items-center gap-2">
                    <AnimatedWebhub className="text-lg" />
                    <span className="text-neutral-500">/</span>
                    <span className="text-blue-500 uppercase text-sm tracking-wider">{tabs.find(t => t.id === activeTab)?.label}</span>
                </h3>
                <button 
                    onClick={onClose}
                    className="p-2 hover:bg-neutral-800 rounded-full text-neutral-400 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>
            </div>
            
            {/* Scrollable Tabs for Mobile */}
            <div className="flex overflow-x-auto no-scrollbar border-t border-neutral-900">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors relative ${
                            activeTab === tab.id 
                            ? 'text-white bg-neutral-900' 
                            : 'text-neutral-500 hover:text-neutral-300 hover:bg-neutral-900/50'
                        }`}
                    >
                        {tab.icon}
                        {tab.label}
                        {activeTab === tab.id && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500" />
                        )}
                    </button>
                ))}
            </div>
        </div>

        {/* Scrollable Content */}
        {/* data-lenis-prevent ensures scrolling inside modal doesn't scroll the body */}
        <div 
            className="flex-1 overflow-y-auto p-6 md:p-10 bg-neutral-900/50" 
            ref={contentRef}
            data-lenis-prevent
        >
            {activeTab === 'about' && <AboutContent />}
            {activeTab === 'contact' && <ContactContent />}
            {activeTab === 'faq' && <FAQContent />}
            {activeTab === 'privacy' && <PrivacyContent />}
            {activeTab === 'terms' && <TermsContent />}
        </div>
      </div>
    </div>
  );
};

/* --- Typewriter Effect Component --- */
const Typewriter = ({ text }: { text: string }) => {
    const [displayedText, setDisplayedText] = useState('');
    
    useEffect(() => {
        setDisplayedText('');
        let index = 0;
        const speed = 15; // ms per character (faster for better UX)

        const interval = setInterval(() => {
            if (index < text.length) {
                setDisplayedText((prev) => prev + text.charAt(index));
                index++;
            } else {
                clearInterval(interval);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text]);

    return (
        <span>
            {displayedText}
            <span className="inline-block w-1.5 h-4 bg-blue-500 ml-1 animate-pulse align-middle" />
        </span>
    );
};

/* --- Sub-Components for Content --- */

const AboutContent = () => (
    <div className="max-w-2xl mx-auto space-y-8 animate-[fadeIn_0.3s_ease]">
        <div className="relative rounded-2xl overflow-hidden aspect-[21/9] group">
             <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="Team" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <div>
                    <h2 className="text-2xl font-bold text-white">Crafting Digital Excellence</h2>
                    <p className="text-neutral-300 text-sm">Founded by Meet Gadhavi</p>
                </div>
             </div>
        </div>
        
        <div className="space-y-4 text-neutral-300 leading-relaxed">
            <p>
                <strong className="text-white">Webhub</strong> isn't just a development agency; we are architects of the digital future. We began with a simple mission: to bridge the gap between complex backend engineering and silky-smooth frontend experiences.
            </p>
            <p>
                Our philosophy is rooted in minimalism and performance. We believe that the best software is invisible—it works so seamlessly that the user forgets the technology and focuses on the experience.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl text-center">
                <h4 className="text-blue-500 font-bold text-xl mb-1">15+</h4>
                <p className="text-xs text-neutral-500 uppercase">Projects</p>
            </div>
            <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl text-center">
                <h4 className="text-purple-500 font-bold text-xl mb-1">100%</h4>
                <p className="text-xs text-neutral-500 uppercase">Satisfaction</p>
            </div>
            <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl text-center">
                <h4 className="text-green-500 font-bold text-xl mb-1">24/7</h4>
                <p className="text-xs text-neutral-500 uppercase">Support</p>
            </div>
        </div>
    </div>
);

const ContactContent = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const subject = encodeURIComponent(`Inquiry from ${formState.name}`);
        const body = encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`);
        window.location.href = `mailto:nova.officialm63@gmail.com?subject=${subject}&body=${body}`;
    };

    return (
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 animate-[fadeIn_0.3s_ease]">
            <div className="space-y-6">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Let's Talk Business</h2>
                    <p className="text-neutral-400 text-sm">Ready to start your project? We're here to help.</p>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-neutral-950 border border-neutral-800 rounded-xl hover:border-blue-500/30 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0"><Mail size={18} /></div>
                        <div>
                            <p className="text-xs text-neutral-500 uppercase font-bold">Email Us</p>
                            <p className="text-white text-sm">nova.officialm63@gmail.com</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-neutral-950 border border-neutral-800 rounded-xl hover:border-green-500/30 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 shrink-0"><Phone size={18} /></div>
                        <div>
                            <p className="text-xs text-neutral-500 uppercase font-bold">WhatsApp</p>
                            <p className="text-white text-sm">+91 9033281960</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-neutral-950 border border-neutral-800 rounded-xl hover:border-purple-500/30 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 shrink-0"><MapPin size={18} /></div>
                        <div>
                            <p className="text-xs text-neutral-500 uppercase font-bold">Location</p>
                            <p className="text-white text-sm">Vadodara, Gujarat</p>
                        </div>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 bg-neutral-950/50 p-6 rounded-2xl border border-neutral-800">
                <div>
                    <label className="text-xs font-bold text-neutral-500 uppercase mb-1 block">Your Name</label>
                    <input 
                        required 
                        type="text" 
                        value={formState.name}
                        onChange={e => setFormState({...formState, name: e.target.value})}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                        placeholder="John Doe"
                    />
                </div>
                <div>
                    <label className="text-xs font-bold text-neutral-500 uppercase mb-1 block">Your Email</label>
                    <input 
                        required 
                        type="email" 
                        value={formState.email}
                        onChange={e => setFormState({...formState, email: e.target.value})}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                        placeholder="john@example.com"
                    />
                </div>
                <div>
                    <label className="text-xs font-bold text-neutral-500 uppercase mb-1 block">Message</label>
                    <textarea 
                        required 
                        rows={4}
                        value={formState.message}
                        onChange={e => setFormState({...formState, message: e.target.value})}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                        placeholder="Tell us about your project..."
                    />
                </div>
                <Button fullWidth variant="primary" icon={<Send size={16} />}>
                    Send Message
                </Button>
            </form>
        </div>
    );
};

const FAQContent = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const faqs = [
        { q: "How long does it take to build a website?", a: "Our average delivery time is between 7 to 14 days for standard business websites. Complex custom applications may take longer." },
        { q: "Do you provide hosting and domain services?", a: "Yes, we offer complete packages that can include domain registration, secure hosting, and SSL certificates so you don't have to worry about the technical details." },
        { q: "Can you help write content for my site?", a: "Absolutely. We offer professional copywriting services to ensure your website's text is engaging, professional, and SEO-optimized." },
        { q: "What happens if I need changes after the website is live?", a: "We provide 1 month of free support after launch. For ongoing updates, we offer affordable monthly maintenance packages." },
        { q: "Do you work with businesses outside your city?", a: "While we specialize in local businesses, we work with clients globally using Zoom and Google Meet for seamless communication." }
    ];

    return (
        <div className="max-w-2xl mx-auto space-y-4 animate-[fadeIn_0.3s_ease]">
             <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
                <p className="text-neutral-400 text-sm">Everything you need to know about working with Webhub.</p>
             </div>
             
             {faqs.map((faq, index) => (
                <div key={index} className="border border-neutral-800 rounded-xl bg-neutral-950 overflow-hidden group hover:border-blue-500/30 transition-colors">
                    <button 
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        className="w-full flex justify-between items-center p-5 text-left hover:bg-neutral-900 transition-colors"
                    >
                        <span className={`font-medium transition-colors ${openIndex === index ? 'text-blue-400' : 'text-neutral-200'}`}>{faq.q}</span>
                        <div className={`transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                            {openIndex === index ? <ChevronUp size={18} className="text-blue-500" /> : <ChevronDown size={18} className="text-neutral-500" />}
                        </div>
                    </button>
                    
                    {/* Animated Height Container */}
                    <div className={`transition-all duration-500 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="p-5 pt-0 text-sm text-neutral-400 leading-relaxed border-t border-neutral-800/50">
                            {openIndex === index && <Typewriter text={faq.a} />}
                        </div>
                    </div>
                </div>
             ))}
        </div>
    );
};

const PrivacyContent = () => (
    <div className="max-w-2xl mx-auto text-neutral-300 space-y-6 animate-[fadeIn_0.3s_ease]">
        <div>
            <h2 className="text-2xl font-bold text-white mb-2">Privacy Policy</h2>
            <p className="text-xs text-neutral-500 uppercase">Last Updated: October 2025</p>
        </div>
        
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">1. Information We Collect</h3>
            <p className="text-sm">We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, request customer support, or otherwise communicate with us. This may include: Name, Email Address, Payment Information, and Usage Data.</p>
        </div>

        <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">2. How We Use Your Information</h3>
            <p className="text-sm">We use the information we collect to provide, maintain, and improve our services, including to process transactions, send you technical notices, and respond to your comments and questions.</p>
        </div>

        <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">3. Data Security</h3>
            <p className="text-sm">We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing, accidental loss, destruction, or damage.</p>
        </div>
    </div>
);

const TermsContent = () => (
    <div className="max-w-2xl mx-auto text-neutral-300 space-y-6 animate-[fadeIn_0.3s_ease]">
         <div>
            <h2 className="text-2xl font-bold text-white mb-2">Terms of Service</h2>
            <p className="text-xs text-neutral-500 uppercase">Last Updated: October 2025</p>
        </div>
        
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">1. Acceptance of Terms</h3>
            <p className="text-sm">By accessing or using our website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
        </div>

        <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">2. Use License</h3>
            <p className="text-sm">Permission is granted to temporarily download one copy of the materials (information or software) on Webhub's website for personal, non-commercial transitory viewing only.</p>
        </div>

        <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">3. Disclaimer</h3>
            <p className="text-sm">The materials on Webhub's website are provided on an 'as is' basis. Webhub makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability.</p>
        </div>
    </div>
);

export default InfoModal;
