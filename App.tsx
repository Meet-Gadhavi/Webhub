
import React, { useState } from 'react';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import ProjectDetail from './components/ProjectDetail';
import Contact from './components/Contact';
import Pricing from './components/Pricing';
import SubscriptionScope from './components/SubscriptionScope';
import AIChat from './components/AIChat';
import NotificationToast from './components/NotificationToast';
import TrustBadges from './components/TrustBadges';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import WhyChooseUs from './components/WhyChooseUs';
import HowItWorks from './components/HowItWorks';
import Industries from './components/Industries';
import ConsultationModal from './components/ConsultationModal';
import Admin from './components/Admin';
import WhyChooseWebhub from './components/WhyChooseWebhub';
import AnimatedWebhub from './components/AnimatedWebhub';
import { PrivacyPolicy, TermsOfService, AboutPage, ContactPage } from './components/FooterPages';
import { Project, Notification, Feedback, SocialLinks } from './types';

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

type ViewState = 'home' | 'services' | 'portfolio' | 'pricing' | 'about' | 'contact' | 'privacy' | 'terms' | 'admin';

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

  if (view === 'privacy') return <PrivacyPolicy onBack={() => setView('home')} />;
  if (view === 'terms') return <TermsOfService onBack={() => setView('home')} />;
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
      
      <nav className="fixed top-0 left-0 w-full px-4 md:px-10 py-5 flex justify-between items-center z-50 bg-black/80 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
        <div className="relative group cursor-pointer flex items-center gap-3" onClick={() => setView('home')}>
            {logoUrl && (
                <img src={logoUrl} alt="Webhub Logo" className="h-8 w-auto object-contain relative z-20" />
            )}
            
            <AnimatedWebhub className="text-xl" isHeader={true} />
        </div>
        
        <div className="hidden md:flex gap-6 text-xs font-medium text-neutral-300 items-center">
             {[
               { id: 'home', label: 'HOME' },
               { id: 'services', label: 'SERVICES' },
               { id: 'portfolio', label: 'PORTFOLIO' },
               { id: 'pricing', label: 'PRICING' },
               { id: 'about', label: 'ABOUT US' },
               { id: 'contact', label: 'CONTACT' },
             ].map((item) => (
               <button 
                  key={item.id}
                  onClick={() => setView(item.id as ViewState)}
                  className="relative group px-3 py-1 cursor-pointer"
               >
                  {/* Yellow Box Background - Expands from 0 to 100% on hover */}
                  <div className={`absolute top-0 bottom-0 left-0 right-0 bg-yellow-400 rounded-md transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] origin-left ${view === item.id ? 'w-full' : 'w-0 group-hover:w-full'}`}></div>
                  
                  {/* Text - Switches to black when hover or active (because background becomes yellow) */}
                  <span className={`relative z-10 transition-colors duration-300 ${view === item.id ? 'text-black' : 'text-neutral-300 group-hover:text-black'}`}>
                      {item.label}
                  </span>
               </button>
             ))}
        </div>

        <div className="md:hidden">
             <button onClick={() => setView('contact')} className="text-white text-sm border border-white/20 px-3 py-1 rounded-full">Menu</button>
        </div>
      </nav>

      <main>
        {view === 'home' && (
            <>
                <Hero feedbacks={feedbacks} onConsult={() => setView('contact')} onOpenConsultation={handleOpenConsultation} />
                <TrustBadges />
                <WhyChooseUs />
                <Services />
                <HowItWorks onNavigate={() => setView('services')} />
                <Industries />
                <Projects projects={projects} onProjectClick={setSelectedProject} title="Selected Projects" />
                <Testimonials />
                <WhyChooseWebhub />
                <Pricing onPlanSelect={handleOpenPlanConsultation} />
                <SubscriptionScope />
                <FAQ />
                <Contact onNavigate={(page) => setView(page as ViewState)} />
            </>
        )}
        {view !== 'home' && (
            <div className="pt-20 min-h-screen">
                {view === 'services' && <Services />}
                {view === 'portfolio' && <Projects projects={projects} onProjectClick={setSelectedProject} title="Full Portfolio" />}
                {view === 'pricing' && (
                    <>
                        <WhyChooseWebhub />
                        <Pricing onPlanSelect={handleOpenPlanConsultation} />
                        <SubscriptionScope />
                    </>
                )}
                {view === 'about' && <AboutPage onBack={() => setView('home')} />}
                {view === 'contact' && <ContactPage onBack={() => setView('home')} />}
                <Contact onNavigate={(page) => setView(page as ViewState)} />
            </div>
        )}
      </main>

      <AIChat />
      <ConsultationModal isOpen={isConsultModalOpen} onClose={() => setIsConsultModalOpen(false)} planDetails={selectedPlan} />
      {selectedProject && <ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </SmoothScroll>
  );
}

export default App;
