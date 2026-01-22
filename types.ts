
export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  images: string[];
  videos?: string[];
  tech: string[];
  link: string;
  github?: string;
}

export interface SocialLinks {
  github: string;
  twitter: string;
  linkedin: string;
  email: string;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isLoading?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  hasSubscription: boolean;
  subscriptionExpiry?: string;
}

export interface Notification {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

export interface Feedback {
  id: number;
  user: string;
  text: string;
}

export interface DirectMessage {
  id: number;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: Date;
  isAdmin: boolean;
}

export const RESUME_DATA = `
Company: Webhub
CEO: Meet Gadhavi
Email: nova.officialm63@gmail.com
Role: Premier Software Development Agency
Expertise: Python (Django/FastAPI), Full Stack Web Development, AI Solutions, Cloud Infrastructure.
About: Webhub is a cutting-edge software development company founded by Meet Gadhavi. We specialize in crafting minimalist, high-performance digital solutions. We bridge the gap between complex backend logic and silky smooth frontend interactions.
Services: Web Development, AI Integration, SaaS Development, UI/UX Design.
Projects:
1. FinDash - An AI-powered financial dashboard.
2. Nebula Stream - Real-time video streaming platform.
3. E-Com V2 - Headless e-commerce solution.
Contact Info:
- WhatsApp (Chat): +91 9033281960
- Phone (Call): +91 8690787870
- Email: nova.officialm63@gmail.com
`;
