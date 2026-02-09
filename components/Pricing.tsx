
import React, { useState } from 'react';
import { Check, X, Star, Zap, Shield, Globe, PenTool, Layout, Server, Mail, Code, ChevronDown, ChevronUp, Sparkles, ArrowRight } from 'lucide-react';
import Button from './Button';

interface PricingProps {
    onGetStarted?: () => void;
    onPlanSelect?: (planName: string, price: string) => void;
}

const Pricing: React.FC<PricingProps> = ({ onGetStarted, onPlanSelect }) => {
  const [showComparison, setShowComparison] = useState(false);

  const websitePlans = [
    {
      name: 'STARTER',
      price: '₹4,999',
      period: '/year',
      description: 'Perfect for new businesses looking to establish a digital presence.',
      features: [
        '3-6 Pages Website',
        'Mobile Responsive Design',
        'Contact Form Integration',
        'WhatsApp Link',
        'Social Media Links',
        'Basic SEO Setup',
        '1 Month Physical Support',
        'Online Support (Business Hours)'
      ],
      delivery: '7 Days',
      highlight: false
    },
    {
      name: 'PROFESSIONAL',
      price: '₹9,999',
      period: '/year',
      description: 'Ideal for growing businesses needing more engagement features.',
      features: [
        '7-10 Pages Website',
        'Mobile Responsive Design',
        'WhatsApp Chat Integration',
        'Social Media Links',
        'Google Maps Integration',
        'Photo Gallery (20 images)',
        'Basic SEO Setup',
        '3 Months Physical Support',
        'Online Support (Business Hours)'
      ],
      delivery: '10 Days',
      highlight: true,
      tag: 'MOST POPULAR'
    },
    {
      name: 'PREMIUM',
      price: '₹19,999',
      period: '/year',
      description: 'Full-scale solution for established businesses with advanced needs.',
      features: [
        '8-12+ Pages Website',
        'Advanced SEO Optimization',
        'Booking / Appointment System',
        'Social Media Links',
        'Payment Gateway Option',
        'Photo Gallery (50+ images)',
        'Free Domain & Hosting (1 Yr)',
        '6 Months Physical Support',
        'Online Support (Business Hours)'
      ],
      delivery: '14 Days',
      highlight: false
    }
  ];

  const comparisonData = [
    { feature: "Number of Pages", starter: "3-6", pro: "7-10", premium: "8-12+" },
    { feature: "Mobile Responsive", starter: true, pro: true, premium: true },
    { feature: "Contact Form", starter: true, pro: true, premium: true },
    { feature: "WhatsApp", starter: "Link Only", pro: "Chat Widget", premium: "Chat Widget" },
    { feature: "Social Media Links", starter: true, pro: true, premium: true },
    { feature: "Google Maps", starter: false, pro: true, premium: true },
    { feature: "Photo Gallery", starter: false, pro: "20 Images", premium: "50+ Images" },
    { feature: "Booking System", starter: false, pro: false, premium: true },
    { feature: "Payment Gateway", starter: false, pro: false, premium: true },
    { feature: "SEO Setup", starter: "Basic", pro: "Basic", premium: "Advanced" },
    { feature: "Domain & Hosting", starter: "+₹1000", pro: "+₹1000", premium: "Included" },
    { feature: "Revisions", starter: "2 Rounds", pro: "2 Rounds", premium: "3 Rounds" },
    { feature: "Physical Support", starter: "1 Month", pro: "3 Months", premium: "6 Months" },
    { feature: "Online Support", starter: "Business Hours", pro: "Business Hours", premium: "Business Hours" },
  ];

  const monthlyServices = [
    {
      title: "Social Media Basic",
      price: "₹2,000",
      features: ["5 Posts/mo", "Basic Graphics", "Caption Writing"]
    },
    {
      title: "Social Media Standard",
      price: "₹3,500",
      features: ["10 Posts + 5 Stories", "Custom Graphics", "Hashtag Research"]
    },
    {
      title: "Social Media Premium",
      price: "₹5,000",
      features: ["15 Posts + 10 Stories", "Premium Graphics", "Scheduling & Analytics"]
    },
    {
      title: "Website Maintenance",
      price: "₹1,500",
      features: ["Unlimited Small Updates", "Security Patches", "Daily Backups", "Priority Support"]
    }
  ];

  const oneTimeServices = [
    { name: "Google Business Setup", price: "₹1,500", icon: <Globe size={20} /> },
    { name: "Logo Design", price: "₹1,500", icon: <PenTool size={20} /> },
    { name: "Domain + Hosting (1 Yr)", price: "₹1,000", icon: <Server size={20} /> },
    { name: "Prof. Email Setup", price: "₹800", icon: <Mail size={20} /> },
    { name: "Python Automation", price: "₹2,500+", icon: <Code size={20} /> },
    { name: "Content Writing", price: "₹500/pg", icon: <Layout size={20} /> },
  ];

  const renderCheck = (val: boolean | string) => {
    if (val === true) return <Check size={18} className="text-green-500 mx-auto" />;
    if (val === false) return <X size={18} className="text-neutral-600 mx-auto" />;
    return <span className="text-sm text-neutral-300">{val}</span>;
  };

  const handlePlanClick = (planName: string, price: string) => {
      const name = planName.charAt(0) + planName.slice(1).toLowerCase();
      if (onPlanSelect) {
          onPlanSelect(name, price);
      } else {
          // Fallback
          const message = encodeURIComponent(`I am interested to make Website with ${name} package for my business, i need to grow more with Webhub let's talk..`);
          window.open(`https://wa.me/919033281960?text=${message}`, '_blank');
      }
  };

  return (
    <section className="py-20 md:py-24 px-4 md:px-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-16 md:mb-20 text-center">
        <h2 className="text-sm font-bold text-blue-500 tracking-widest uppercase mb-3">Transparent Pricing</h2>
        <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter text-white">Choose Your Plan</h2>
        <p className="text-neutral-400 max-w-xl mx-auto text-lg">
          No hidden charges. No surprises. Just honest pricing for world-class development.
        </p>
      </div>

      {/* Main Plans */}
      <div className="grid lg:grid-cols-3 gap-8 mb-20 md:mb-24 relative z-10">
        {websitePlans.map((plan, index) => (
          <div 
            key={index} 
            className={`relative p-8 rounded-2xl border flex flex-col transition-all duration-300 ${
              plan.highlight 
                ? 'border-blue-500 bg-blue-950/10 shadow-[0_0_50px_rgba(59,130,246,0.1)] scale-105 z-10' 
                : 'border-neutral-800 bg-neutral-900/50 hover:border-neutral-700'
            }`}
          >
            {plan.highlight && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                {plan.tag}
              </div>
            )}
            
            <h3 className="text-xl font-bold text-neutral-200 mb-2 tracking-wide">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-4">
               <span className="text-4xl font-bold text-white">{plan.price}</span>
               <span className="text-neutral-500">{plan.period}</span>
            </div>
            <p className="text-neutral-400 text-sm mb-8 leading-relaxed h-10">
              {plan.description}
            </p>
            
            <div className="flex-1 space-y-4 mb-8">
              {plan.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-neutral-300">
                  <div className={`mt-0.5 p-0.5 rounded-full ${plan.highlight ? 'bg-blue-500/20 text-blue-400' : 'bg-neutral-800 text-neutral-500'}`}>
                    <Check size={12} />
                  </div>
                  {feature}
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-neutral-800/50 mt-auto">
                <div className="text-xs text-neutral-500 font-bold uppercase tracking-widest mb-4 text-center">
                    Delivery: <span className="text-white">{plan.delivery}</span>
                </div>
                <Button 
                    fullWidth
                    variant={plan.highlight ? 'primary' : 'monochrome'}
                    onClick={() => handlePlanClick(plan.name, plan.price)}
                    className="py-4"
                >
                    Get Started
                </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Table Toggle */}
      <div className="mb-20 md:mb-24">
        <button 
            onClick={() => setShowComparison(!showComparison)}
            className="mx-auto flex items-center gap-2 text-neutral-400 hover:text-white transition-colors border-b border-dashed border-neutral-700 hover:border-white pb-1"
        >
            {showComparison ? 'Hide' : 'View'} Detailed Feature Comparison
            {showComparison ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        <div className={`grid transition-all duration-500 ease-in-out overflow-hidden ${showComparison ? 'grid-rows-[1fr] opacity-100 mt-12' : 'grid-rows-[0fr] opacity-0'}`}>
            <div className="overflow-x-auto min-h-0 bg-neutral-900/30 border border-neutral-800 rounded-2xl pb-4">
                <table className="w-full text-left border-collapse min-w-[600px] md:min-w-[800px]">
                    <thead>
                        <tr className="border-b border-neutral-800">
                            <th className="p-6 text-neutral-500 font-medium text-sm uppercase tracking-wider w-1/4">Feature</th>
                            <th className="p-6 text-white font-bold text-center w-1/4">Starter</th>
                            <th className="p-6 text-blue-400 font-bold text-center w-1/4 bg-blue-900/5">Professional</th>
                            <th className="p-6 text-purple-400 font-bold text-center w-1/4">Premium</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800">
                        {comparisonData.map((row, idx) => (
                            <tr key={idx} className="hover:bg-neutral-800/30 transition-colors">
                                <td className="p-4 px-6 text-neutral-300 font-medium text-sm whitespace-nowrap">{row.feature}</td>
                                <td className="p-4 text-center border-l border-neutral-800">{renderCheck(row.starter)}</td>
                                <td className="p-4 text-center border-l border-neutral-800 bg-blue-900/5">{renderCheck(row.pro)}</td>
                                <td className="p-4 text-center border-l border-neutral-800">{renderCheck(row.premium)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="text-center text-xs text-neutral-600 mt-2 md:hidden">Scroll right to view more</p>
        </div>
      </div>

      {/* Additional Services Grid */}
      <div className="grid lg:grid-cols-2 gap-12 md:gap-16">
          {/* Monthly Services */}
          <div>
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <Zap className="text-yellow-500" /> Monthly Services
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                  {monthlyServices.map((service, idx) => (
                      <div key={idx} className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:border-neutral-700 transition-colors">
                          <h4 className="font-bold text-white mb-1">{service.title}</h4>
                          <p className="text-blue-500 font-bold text-lg mb-4">{service.price}<span className="text-xs text-neutral-500 font-normal">/mo</span></p>
                          <ul className="space-y-2">
                              {service.features.map((f, i) => (
                                  <li key={i} className="text-xs text-neutral-400 flex items-center gap-2">
                                      <div className="w-1 h-1 bg-neutral-500 rounded-full" /> {f}
                                  </li>
                              ))}
                          </ul>
                      </div>
                  ))}
              </div>
          </div>

          {/* One-Time Services */}
          <div>
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <Star className="text-purple-500" /> One-Time Add-ons
              </h3>
              <div className="space-y-3">
                  {oneTimeServices.map((service, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-neutral-900/50 border border-neutral-800 p-4 rounded-xl hover:bg-neutral-900 transition-colors group">
                          <div className="flex items-center gap-4">
                              <div className="p-2 bg-neutral-800 rounded-lg text-neutral-400 group-hover:text-white transition-colors">
                                  {service.icon}
                              </div>
                              <span className="font-medium text-neutral-300">{service.name}</span>
                          </div>
                          <span className="font-bold text-white">{service.price}</span>
                      </div>
                  ))}
              </div>
              
              <div className="mt-8 relative group overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/30 p-8 transition-all hover:border-neutral-700">
                  {/* Background Gradient Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10 flex flex-col items-center text-center">
                      <div className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform duration-300 border border-neutral-700">
                          <Sparkles size={20} className="text-blue-400" />
                      </div>

                      <h4 className="text-xl font-bold text-white mb-2">Need a Custom Solution?</h4>
                      <p className="text-neutral-400 text-sm mb-6 max-w-xs mx-auto leading-relaxed">
                          Need a custom quote for a specific requirement? We specialize in tailored architectures.
                      </p>

                      <Button 
                          onClick={onGetStarted} 
                          variant="monochrome" 
                          className="w-full"
                          icon={<ArrowRight size={16} />}
                      >
                          Contact Sales
                      </Button>
                  </div>
              </div>
          </div>
      </div>
    </section>
  );
};

export default Pricing;
        