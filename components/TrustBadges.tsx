
import React from 'react';
import { CheckCircle, Clock, Globe, Award, Users, Code } from 'lucide-react';

const TrustBadges: React.FC = () => {
  const badges = [
    { icon: <CheckCircle className="text-blue-500" />, text: "15+ Projects Delivered" },
    { icon: <Users className="text-blue-500" />, text: "100% Client Satisfaction" },
    { icon: <Clock className="text-blue-500" />, text: "7-14 Days Avg. Delivery" },
    { icon: <Globe className="text-blue-500" />, text: "Local Business Specialists" },
    { icon: <Code className="text-blue-500" />, text: "Certified Python Developers" },
    { icon: <Award className="text-blue-500" />, text: "Bilingual Support (EN/GU)" },
  ];

  return (
    <div className="w-full bg-neutral-900/50 border-y border-neutral-800 backdrop-blur-sm py-8">
      <div className="container mx-auto px-4 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {badges.map((badge, index) => (
            <div key={index} className="flex flex-col items-center justify-center text-center gap-3 group hover:-translate-y-1 transition-transform duration-300">
              <div className="p-3 bg-neutral-800 rounded-full group-hover:bg-blue-500/20 transition-colors">
                {badge.icon}
              </div>
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wide group-hover:text-white transition-colors">
                {badge.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustBadges;
