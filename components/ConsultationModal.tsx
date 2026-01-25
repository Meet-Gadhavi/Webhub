
import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Building2, User, Phone, Briefcase } from 'lucide-react';
import gsap from 'gsap';
import Button from './Button';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  planDetails?: { name: string; price: string } | null;
}

const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose, planDetails }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    userName: '',
    phone: ''
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3 });
      gsap.fromTo(modalRef.current, 
        { scale: 0.9, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
      );
    } else {
      document.body.style.overflow = 'auto';
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
      gsap.to(modalRef.current, { scale: 0.9, opacity: 0, y: 20, duration: 0.3 });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let message = "";

    if (planDetails) {
        // Subscription Message
        message = `Hi Novabit! 👋

I'm interested in the *${planDetails.name} Package (${planDetails.price})* for my business.

Business Name: ${formData.businessName}
Business Type: ${formData.businessType}
Your Name: ${formData.userName}
Phone: ${formData.phone}

I want to grow my business online with Novabit. Let's discuss the next steps! 💼`;
    } else {
        // General Consultation Message
        message = `Hi Novabit! 👋

I'm interested in getting a website for my business and would like to schedule a FREE consultation.

Business Name: ${formData.businessName}
Business Type: ${formData.businessType}
My Name: ${formData.userName}
Phone: ${formData.phone}

Looking forward to discussing how you can help my business grow online! 🚀`;
    }

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/919033281960?text=${encodedMessage}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        ref={overlayRef} 
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm opacity-0"
      />
      
      <div 
        ref={modalRef}
        className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden opacity-0"
      >
        {/* Header */}
        <div className="bg-neutral-950 p-6 border-b border-neutral-800 flex justify-between items-center">
            <div>
                <h3 className="text-xl font-bold text-white">
                    {planDetails ? 'Confirm Plan Details' : 'Free Consultation'}
                </h3>
                <p className="text-sm text-neutral-400">
                    {planDetails ? `Selected: ${planDetails.name}` : 'Tell us about your business'}
                </p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-neutral-800 rounded-full text-neutral-400 hover:text-white transition-colors">
                <X size={20} />
            </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-500 uppercase flex items-center gap-2">
                    <Building2 size={14} /> Business Name
                </label>
                <input 
                    type="text"
                    required
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="e.g. FitZone Gym"
                    value={formData.businessName}
                    onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                />
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-500 uppercase flex items-center gap-2">
                    <Briefcase size={14} /> Business Type
                </label>
                <select 
                    required
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                    value={formData.businessType}
                    onChange={(e) => setFormData({...formData, businessType: e.target.value})}
                >
                    <option value="" disabled>Select Type</option>
                    <option value="Gym">Gym</option>
                    <option value="Salon">Salon</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Retail Shop">Retail Shop</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-neutral-500 uppercase flex items-center gap-2">
                        <User size={14} /> Your Name
                    </label>
                    <input 
                        type="text"
                        required
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="John Doe"
                        value={formData.userName}
                        onChange={(e) => setFormData({...formData, userName: e.target.value})}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-neutral-500 uppercase flex items-center gap-2">
                        <Phone size={14} /> Phone
                    </label>
                    <input 
                        type="tel"
                        required
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="+91..."
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                </div>
            </div>

            <Button 
                type="submit" 
                fullWidth
                variant="primary"
                icon={<Send size={18} />}
                className="mt-4 py-4"
            >
                Continue to WhatsApp
            </Button>
        </form>
      </div>
    </div>
  );
};

export default ConsultationModal;
