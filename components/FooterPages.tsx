
import React, { useState } from 'react';
import { ArrowLeft, Mail, MapPin, Phone, Shield, FileText, Users, Send } from 'lucide-react';

interface PageProps {
  onBack: () => void;
}

// Reusable Layout Component
const PageLayout: React.FC<{ title: string; subtitle: string; icon: React.ReactNode; onBack: () => void; children: React.ReactNode; withNavbar?: boolean }> = ({ title, subtitle, icon, onBack, children, withNavbar = false }) => (
  <div className="min-h-screen bg-black text-white pt-24 pb-12 px-6 md:px-12">
    <button 
      onClick={onBack}
      className={`fixed left-6 z-50 flex items-center gap-2 px-5 py-2.5 bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all group ${withNavbar ? 'top-24 md:top-28' : 'top-6'}`}
    >
      <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
      <span className="text-sm font-medium">Back</span>
    </button>

    <div className="max-w-4xl mx-auto animate-[fadeIn_0.5s_ease-out]">
      <div className="mb-12 text-center">
        <div className="w-16 h-16 mx-auto bg-neutral-900 rounded-2xl flex items-center justify-center mb-6 text-blue-500">
            {icon}
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">{title}</h1>
        <p className="text-neutral-400 text-lg">{subtitle}</p>
      </div>
      
      <div className="bg-neutral-900/30 border border-neutral-800 rounded-2xl p-8 md:p-12 text-neutral-300 leading-relaxed space-y-6">
        {children}
      </div>
    </div>
  </div>
);

export const PrivacyPolicy: React.FC<PageProps> = ({ onBack }) => (
  <PageLayout title="Privacy Policy" subtitle="How we handle and protect your data." icon={<Shield size={32} />} onBack={onBack}>
    <h3 className="text-xl font-bold text-white">1. Information We Collect</h3>
    <p>We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, request customer support, or otherwise communicate with us. This may include: Name, Email Address, Payment Information, and Usage Data.</p>
    
    <h3 className="text-xl font-bold text-white">2. How We Use Your Information</h3>
    <p>We use the information we collect to provide, maintain, and improve our services, including to process transactions, send you technical notices, and respond to your comments and questions.</p>
    
    <h3 className="text-xl font-bold text-white">3. Data Security</h3>
    <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing, accidental loss, destruction, or damage.</p>
    
    <h3 className="text-xl font-bold text-white">4. Cookies</h3>
    <p>We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
  </PageLayout>
);

export const TermsOfService: React.FC<PageProps> = ({ onBack }) => (
  <PageLayout title="Terms of Service" subtitle="The rules and regulations for using Webhub." icon={<FileText size={32} />} onBack={onBack}>
    <h3 className="text-xl font-bold text-white">1. Acceptance of Terms</h3>
    <p>By accessing or using our website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
    
    <h3 className="text-xl font-bold text-white">2. Use License</h3>
    <p>Permission is granted to temporarily download one copy of the materials (information or software) on Webhub's website for personal, non-commercial transitory viewing only.</p>
    
    <h3 className="text-xl font-bold text-white">3. Disclaimer</h3>
    <p>The materials on Webhub's website are provided on an 'as is' basis. Webhub makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability.</p>
    
    <h3 className="text-xl font-bold text-white">4. Limitations</h3>
    <p>In no event shall Webhub or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Webhub's website.</p>
  </PageLayout>
);

export const AboutPage: React.FC<PageProps> = ({ onBack }) => (
  <PageLayout title="About Us" subtitle="Pioneering the future of digital craftsmanship." icon={<Users size={32} />} onBack={onBack} withNavbar={true}>
    <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
        <div>
            <p className="text-lg mb-4">
                Founded by <strong className="text-white">Meet Gadhavi</strong>, Webhub began with a simple mission: to bridge the gap between complex backend engineering and elegant frontend experiences.
            </p>
            <p className="text-lg">
                We are a team of passionate developers, designers, and strategists who believe that code is an art form. We don't just build software; we craft digital ecosystems that scale, perform, and delight users.
            </p>
        </div>
        <div className="relative h-64 rounded-xl overflow-hidden">
             <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="Team" className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-blue-500/20 mix-blend-overlay"></div>
        </div>
    </div>
    
    <h3 className="text-xl font-bold text-white mb-4">Our Values</h3>
    <div className="grid md:grid-cols-3 gap-6">
        <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl">
            <h4 className="text-white font-bold mb-2">Innovation</h4>
            <p className="text-sm">Pushing boundaries with AI and Web3 technologies.</p>
        </div>
        <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl">
            <h4 className="text-white font-bold mb-2">Minimalism</h4>
            <p className="text-sm">Clean code, clean design, clutter-free user experiences.</p>
        </div>
        <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl">
            <h4 className="text-white font-bold mb-2">Performance</h4>
            <p className="text-sm">Speed is a feature. We optimize for milliseconds.</p>
        </div>
    </div>
  </PageLayout>
);

export const ContactPage: React.FC<PageProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a nicely formatted email body
    const emailBody = `Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}

--
Sent from Webhub Contact Form`;

    const subject = encodeURIComponent(formData.subject || "Project Inquiry");
    const body = encodeURIComponent(emailBody);

    // Trigger the mailto link
    window.location.href = `mailto:nova.officialm63@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <PageLayout title="Contact Us" subtitle="Get in touch with our team." icon={<Mail size={32} />} onBack={onBack} withNavbar={true}>
     <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
            <h3 className="text-2xl font-bold text-white">Let's talk business</h3>
            <p>Whether you have a question about features, pricing, need a demo, or anything else, our team is ready to answer all your questions.</p>
            
            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500"><Mail size={18} /></div>
                    <div>
                        <p className="text-xs text-neutral-500 uppercase font-bold">Email</p>
                        <p className="text-white">nova.officialm63@gmail.com</p>
                    </div>
                </div>
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500"><MapPin size={18} /></div>
                    <div>
                        <p className="text-xs text-neutral-500 uppercase font-bold">Location</p>
                        <p className="text-white">Vadodara</p>
                    </div>
                </div>
            </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs uppercase text-neutral-500 font-bold mb-2">Name</label>
                    <input 
                        type="text" 
                        required
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500" 
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-xs uppercase text-neutral-500 font-bold mb-2">Email</label>
                    <input 
                        type="email" 
                        required
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500" 
                        placeholder="john@example.com" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                </div>
            </div>
            <div>
                <label className="block text-xs uppercase text-neutral-500 font-bold mb-2">Subject</label>
                <input 
                    type="text" 
                    required
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500" 
                    placeholder="Project Inquiry" 
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                />
            </div>
            <div>
                <label className="block text-xs uppercase text-neutral-500 font-bold mb-2">Message</label>
                <textarea 
                    rows={4} 
                    required
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500" 
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
                <Send size={18} /> Send Message
            </button>
        </form>
     </div>
  </PageLayout>
  );
};
