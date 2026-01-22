
import React from 'react';
import { Check, X, AlertTriangle } from 'lucide-react';

const SubscriptionScope: React.FC = () => {
    const categories = [
        {
            name: "STARTER",
            price: "₹4,999 / year",
            color: "text-green-400",
            borderColor: "border-green-500/30",
            bgColor: "bg-green-500/5",
            bestFor: "Individuals & new businesses starting online",
            included: ["Landing Page Website", "Portfolio Website", "Basic Business Website", "Personal Brand Website", "Single-Service Website"],
            useCases: ["Freelancers", "Small shops", "Consultants", "Startups testing ideas", "Local service providers"],
            focus: ["Online presence", "Contact & inquiry generation", "Simple, fast delivery"],
            notIncluded: ["Booking systems", "Payment gateways", "E-commerce", "Advanced SEO", "Multi-location support"],
            summary: "Simple, clean, non-complex websites only"
        },
        {
            name: "PROFESSIONAL",
            price: "₹9,999 / year",
            color: "text-blue-400",
            borderColor: "border-blue-500/30",
            bgColor: "bg-blue-500/5",
            bestFor: "Growing businesses needing engagement",
            included: ["Business Website (Multi-page)", "Service-Based Company Website", "Clinic / Gym / Salon Website", "Restaurant Website (no ordering)", "Institute / Coaching Website"],
            useCases: ["Businesses with multiple services", "Companies needing galleries & maps", "Brands building credibility"],
            focus: ["User engagement", "Trust building", "Better presentation"],
            notIncluded: ["Full e-commerce", "Complex custom workflows", "ERP / inventory systems"],
            summary: "Moderate complexity, structured websites"
        },
        {
            name: "PREMIUM",
            price: "₹19,999 / year",
            color: "text-purple-400",
            borderColor: "border-purple-500/30",
            bgColor: "bg-purple-500/5",
            bestFor: "Established businesses & automation needs",
            included: ["Hotel / Guest House Website", "Appointment-Based Business Website", "Advanced Service Platform", "Restaurant Website w/ booking", "Multi-branch Business Website"],
            useCases: ["Hotels & clinics", "Event services", "High-volume service businesses", "Businesses accepting online payments"],
            focus: ["Automation", "Advanced SEO", "Conversion & scalability"],
            notIncluded: ["Full custom software (ERP, POS)", "Large-scale marketplaces", "Heavy custom logic"],
            summary: "High functionality, business-critical websites"
        }
    ];

    return (
        <section className="py-24 px-4 md:px-10 max-w-7xl mx-auto border-t border-neutral-900 bg-black relative">
            <div className="text-center mb-16">
                <h2 className="text-blue-500 font-bold tracking-widest uppercase mb-4 text-sm">Categories & Scope</h2>
                <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">Webhub Subscription Scope</h3>
                <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
                    Understand exactly what is included in each of our subscription tiers to make the right choice for your business.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-24">
                {categories.map((cat, idx) => (
                    <div key={idx} className={`rounded-2xl border ${cat.borderColor} ${cat.bgColor} p-8 flex flex-col h-full hover:bg-opacity-20 transition-colors duration-300`}>
                        <h3 className={`text-2xl font-bold ${cat.color} mb-2`}>{cat.name}</h3>
                        <p className="text-white font-bold text-xl mb-4">{cat.price}</p>
                        <p className="text-neutral-400 text-sm mb-6 border-b border-neutral-800 pb-6">Best for: <span className="text-white">{cat.bestFor}</span></p>
                        
                        <div className="space-y-8 flex-1">
                            <div>
                                <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-3">✅ Website Types Included</h4>
                                <ul className="space-y-2">
                                    {cat.included.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                                            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${cat.color.replace('text-', 'bg-')}`}></span> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                             <div>
                                <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-3">✅ Typical Use Cases</h4>
                                <ul className="space-y-2">
                                    {cat.useCases.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-neutral-400">
                                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 mt-1.5" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-3">✅ Focus</h4>
                                <ul className="space-y-2">
                                    {cat.focus.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                                            <Check size={14} className={`mt-0.5 ${cat.color}`} /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-neutral-500 text-sm uppercase tracking-wider mb-3">❌ Not Included</h4>
                                <ul className="space-y-2">
                                    {cat.notIncluded.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-neutral-500">
                                            <X size={14} className="mt-0.5 text-red-900" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className={`mt-8 pt-6 border-t border-neutral-800 text-center font-bold text-sm ${cat.color} bg-black/40 rounded-lg py-3`}>
                            {cat.summary}
                        </div>
                    </div>
                ))}
            </div>

            <div className="max-w-4xl mx-auto">
                 <h3 className="text-2xl font-bold text-white mb-8 text-center">Quick Comparison</h3>
                 <div className="overflow-x-auto bg-neutral-900/30 border border-neutral-800 rounded-2xl">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                            <tr className="border-b border-neutral-800 bg-neutral-900/80">
                                <th className="p-4 text-neutral-400 font-medium text-sm w-1/4">Feature</th>
                                <th className="p-4 text-green-400 font-bold text-center w-1/4">Starter</th>
                                <th className="p-4 text-blue-400 font-bold text-center w-1/4">Professional</th>
                                <th className="p-4 text-purple-400 font-bold text-center w-1/4">Premium</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800">
                             {[
                                 { name: "Landing / Portfolio", s: "✅", p: "✅", pr: "✅" },
                                 { name: "Business Website", s: "⚠️ Basic", p: "✅", pr: "✅" },
                                 { name: "Booking System", s: "❌", p: "❌", pr: "✅" },
                                 { name: "Payment Gateway", s: "❌", p: "❌", pr: "Optional" },
                                 { name: "SEO Level", s: "Basic", p: "Basic", pr: "Advanced" },
                                 { name: "Complexity Level", s: "Low", p: "Medium", pr: "High" },
                             ].map((row, idx) => (
                                 <tr key={idx} className="hover:bg-neutral-800/30 transition-colors">
                                     <td className="p-4 text-neutral-300 text-sm font-medium">{row.name}</td>
                                     <td className="p-4 text-center text-neutral-400 text-sm">{row.s}</td>
                                     <td className="p-4 text-center text-neutral-400 text-sm">{row.p}</td>
                                     <td className="p-4 text-center text-neutral-400 text-sm">{row.pr}</td>
                                 </tr>
                             ))}
                        </tbody>
                    </table>
                 </div>
            </div>
        </section>
    );
};

export default SubscriptionScope;
