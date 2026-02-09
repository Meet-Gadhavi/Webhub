
import React, { useState, useEffect } from 'react';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import Projects from './components/Projects';
import ProjectDetail from './components/ProjectDetail';
import Contact from './components/Contact';
import Pricing from './components/Pricing';
import SubscriptionScope from './components/SubscriptionScope';
import NotificationToast from './components/NotificationToast';
import TrustBadges from './components/TrustBadges';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import WhyChooseUs from './components/WhyChooseUs';
import HowItWorks from './components/HowItWorks';
import Industries from './components/Industries';
import ConsultationModal from './components/ConsultationModal';
import Admin from './components/Admin';
import WhyChooseWebhub from './components/WhyChooseWebhub';
import Team from './components/Team';
import AnimatedWebhub from './components/AnimatedWebhub';
import InfoModal from './components/InfoModal';
import { Project, Notification, Feedback, SocialLinks } from './types';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';

const INITIAL_PROJECTS: Project[] = [
  {
    id: 1,
    title: "FitZone Gym",
    category: "Fitness / Web",
    description: "A dynamic gym management website featuring membership portals, class scheduling, and trainer profiles. Helped increase local membership signups by 40%.",
    images: ["https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80"],
    tech: ["React", "Tailwind", "Booking System"],
    link: "#"
  },
  {
    id: 2,
    title: "Elegance Salon",
    category: "Beauty / Booking",
    description: "Premium salon website with an integrated appointment booking system, service gallery, and customer review integration.",
    images: ["https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80"],
    tech: ["Next.js", "Calendly API"],
    link: "#"
  },
  {
    id: 3,
    title: "SugarSketch",
    category: "Inventory / E-Commerce",
    description: "A specialized stationery management system featuring real-time stock tracking, automated sales reporting, and a modern customer ordering interface.",
    images: ["https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?auto=format&fit=crop&w=1200&q=80"],
    tech: ["Python", "React", "FastAPI"],
    link: "https://bookish-63.base44.app/"
  },
  {
    id: 4,
    title: "Novastay",
    category: "Hospitality / Management",
    description: "Full-scale Hotel Management System including room availability tracking, automated guest billing, and staff scheduling modules.",
    images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"],
    tech: ["Django", "PostgreSQL", "React"],
    link: "https://novastay-63.base44.app/"
  }
];

const INITIAL_FEEDBACK: Feedback[] = [
    { id: 1, user: 'Rahul Patel', text: 'FitZone membership grew by 40%!' },
    { id: 2, user: 'Priya Sharma', text: 'Booking system is a lifesaver.' },
    { id: 3, user: 'Vikram Singh', text: 'Best local web agency.' }
];

const INITIAL_SOCIALS: SocialLinks = {
    github: '#',
    twitter: '#',
    linkedin: '#',
    email: 'nova.officialm63@gmail.com'
};

type ViewState = 'home' | 'services' | 'portfolio' | 'pricing' | 'admin';

function App() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [view, setView] = useState<ViewState>('home');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [feedbacks] = useState<Feedback[]>(INITIAL_FEEDBACK);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [socialLinks, setSocialLinks] = useState<SocialLinks>(INITIAL_SOCIALS);

  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{name: string, price: string} | null>(null);
  
  // Info Modal State
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [infoModalTab, setInfoModalTab] = useState('about');
  
  // Mobile Menu State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = React.useRef<HTMLDivElement>(null);

  const addNotification = (message: string, type: 'success' | 'error' | 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
  };

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleOpenConsultation = () => {
      setSelectedPlan(null);
      setIsConsultModalOpen(true);
  };

  const handleOpenPlanConsultation = (name: string, price: string) => {
      setSelectedPlan({ name, price });
      setIsConsultModalOpen(true);
  };

  const openInfoPage = (page: string) => {
      setInfoModalTab(page);
      setIsInfoModalOpen(true);
      setIsMobileMenuOpen(false);
  };

  const handleNavClick = (viewId: ViewState) => {
      setView(viewId);
      setIsMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
        document.body.style.overflow = 'hidden';
        gsap.fromTo(mobileMenuRef.current,
            { x: '100%' },
            { x: '0%', duration: 0.5, ease: 'power3.out' }
        );
        gsap.fromTo('.mobile-nav-item', 
            { x: 50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.2 }
        );
    } else {
        document.body.style.overflow = '';
        gsap.to(mobileMenuRef.current, { x: '100%', duration: 0.4, ease: 'power3.in' });
    }
  }, [isMobileMenuOpen]);

  if (view === 'admin') return (
      <Admin 
        onBack={() => setView('home')} 
        projects={projects}
        onAddProject={(p) => setProjects([p, ...projects])}
        onDeleteProject={(id) => setProjects(projects.filter(p => p.id !== id))}
        onEditProject={() => {}}
        messages={[]} 
        onReplyMessage={() => {}} 
        socialLinks={socialLinks}
        onUpdateSocialLinks={setSocialLinks}
        logoUrl={logoUrl}
        onUpdateLogo={setLogoUrl}
      />
  );

  return (
    <SmoothScroll>
      <CustomCursor />
      <NotificationToast notifications={notifications} removeNotification={removeNotification} />
      
      <nav className="fixed top-0 left-0 w-full px-6 md:px-10 py-5 flex justify-between items-center z-[80] bg-black/80 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
        <div className="relative group cursor-pointer flex items-center gap-3" onClick={() => handleNavClick('home')}>
            {logoUrl && (
                <img src={logoUrl} alt="Webhub Logo" className="h-8 w-auto object-contain relative z-20" />
            )}
            
            <AnimatedWebhub className="text-xl" isHeader={true} />
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 text-xs font-medium text-neutral-300 items-center">
             {[
               { id: 'home', label: 'HOME' },
               { id: 'services', label: 'SERVICES' },
               { id: 'portfolio', label: 'PORTFOLIO' },
               { id: 'pricing', label: 'PRICING' },
             ].map((item) => (
               <button 
                  key={item.id}
                  onClick={() => handleNavClick(item.id as ViewState)}
                  className="relative group px-3 py-1 cursor-pointer"
               >
                  <div className={`absolute top-0 bottom-0 left-0 right-0 bg-yellow-400 rounded-md transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] origin-left ${view === item.id ? 'w-full' : 'w-0 group-hover:w-full'}`}></div>
                  <span className={`relative z-10 transition-colors duration-300 ${view === item.id ? 'text-black' : 'text-neutral-300 group-hover:text-black'}`}>
                      {item.label}
                  </span>
               </button>
             ))}
             {/* Info Pages Buttons */}
             <button onClick={() => openInfoPage('about')} className="hover:text-white transition-colors">ABOUT US</button>
             <button onClick={() => openInfoPage('contact')} className="hover:text-white transition-colors">CONTACT</button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden z-[90]">
             <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                className="text-white p-2"
             >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
             </button>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      <div 
        ref={mobileMenuRef}
        className="fixed inset-0 bg-neutral-950 z-[85] pt-24 px-8 flex flex-col md:hidden transform translate-x-full"
      >
        <div className="flex flex-col gap-6 text-2xl font-bold text-white">
             {[
               { id: 'home', label: 'HOME' },
               { id: 'services', label: 'SERVICES' },
               { id: 'portfolio', label: 'PORTFOLIO' },
               { id: 'pricing', label: 'PRICING' },
             ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => handleNavClick(item.id as ViewState)}
                  className={`mobile-nav-item text-left py-2 border-b border-neutral-800 ${view === item.id ? 'text-blue-500' : 'text-white'}`}
                >
                  {item.label}
                </button>
             ))}
             <button onClick={() => openInfoPage('about')} className="mobile-nav-item text-left py-2 border-b border-neutral-800">ABOUT US</button>
             <button onClick={() => openInfoPage('contact')} className="mobile-nav-item text-left py-2 border-b border-neutral-800">CONTACT</button>
        </div>
        
        <div className="mt-auto mb-10 mobile-nav-item">
             <p className="text-neutral-500 text-sm mb-2">Get in touch</p>
             <p className="text-white text-lg font-bold">+91 9033281960</p>
             <p className="text-white text-lg font-bold">nova.officialm63@gmail.com</p>
        </div>
      </div>

      <main>
        {view === 'home' && (
            <>
                <Hero feedbacks={feedbacks} onConsult={() => openInfoPage('contact')} onOpenConsultation={handleOpenConsultation} />
                <TrustBadges />
                <WhyChooseUs />
                <Services />
                <HowItWorks onNavigate={() => openInfoPage('contact')} />
                <Industries />
                <Projects projects={projects} onProjectClick={setSelectedProject} title="Selected Projects" />
                <Testimonials />
                <WhyChooseWebhub />
                <Team />
                <Pricing onPlanSelect={handleOpenPlanConsultation} onGetStarted={() => openInfoPage('contact')} />
                <SubscriptionScope />
                <Contact onOpenPage={openInfoPage} />
            </>
        )}
        {view !== 'home' && (
            <div className="pt-20 min-h-screen">
                {view === 'services' && <Services />}
                {view === 'portfolio' && <Projects projects={projects} onProjectClick={setSelectedProject} title="Full Portfolio" />}
                {view === 'pricing' && (
                    <>
                        <WhyChooseWebhub />
                        <Pricing onPlanSelect={handleOpenPlanConsultation} onGetStarted={() => openInfoPage('contact')} />
                        <SubscriptionScope />
                    </>
                )}
                <Contact onOpenPage={openInfoPage} />
            </div>
        )}
      </main>

      <ConsultationModal isOpen={isConsultModalOpen} onClose={() => setIsConsultModalOpen(false)} planDetails={selectedPlan} />
      <InfoModal isOpen={isInfoModalOpen} initialTab={infoModalTab} onClose={() => setIsInfoModalOpen(false)} />
      {selectedProject && <ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </SmoothScroll>
  );
}

export default App;
