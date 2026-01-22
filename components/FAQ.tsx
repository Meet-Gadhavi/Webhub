
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    q: "How long does it take to build a website?",
    a: "Our average delivery time is between 7 to 14 days for standard business websites. Complex custom applications may take longer."
  },
  {
    q: "Do you provide hosting and domain services?",
    a: "Yes, we offer complete packages that can include domain registration, secure hosting, and SSL certificates so you don't have to worry about the technical details."
  },
  {
    q: "Can you help write content for my site?",
    a: "Absolutely. We offer professional copywriting services to ensure your website's text is engaging, professional, and SEO-optimized."
  },
  {
    q: "What happens if I need changes after the website is live?",
    a: "We provide 1 month of free support after launch. For ongoing updates, we offer affordable monthly maintenance packages."
  },
  {
    q: "Do you work with businesses outside your city?",
    a: "While we specialize in local businesses, we work with clients globally. We use Zoom and Google Meet to maintain seamless communication."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 px-4 md:px-10 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
        <p className="text-neutral-400">Everything you need to know about working with Novabit.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-neutral-800 rounded-xl bg-neutral-900/50 overflow-hidden">
            <button 
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex justify-between items-center p-6 text-left hover:bg-neutral-800/50 transition-colors"
            >
              <span className="text-lg font-medium text-white">{faq.q}</span>
              {openIndex === index ? <ChevronUp className="text-blue-500" /> : <ChevronDown className="text-neutral-500" />}
            </button>
            
            <div className={`transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="p-6 pt-0 text-neutral-400 leading-relaxed border-t border-neutral-800/50">
                {faq.a}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
