
import React, { useState, useEffect, useRef } from 'react';
import { Plus, Github, ArrowLeft, Video, Image, Lock, LogOut, BarChart3, MessageSquare, Upload, Settings, Trash2, Edit, User, Mail, Palette } from 'lucide-react';
import { Project, DirectMessage, SocialLinks } from '../types';
import gsap from 'gsap';

interface AdminProps {
  onBack: () => void;
  onAddProject: (project: Project) => void;
  messages: DirectMessage[];
  onReplyMessage: (text: string) => void;
  projects: Project[];
  onDeleteProject: (id: number) => void;
  onEditProject: (project: Project) => void;
  socialLinks: SocialLinks;
  onUpdateSocialLinks: (links: SocialLinks) => void;
  logoUrl: string | null;
  onUpdateLogo: (url: string) => void;
}

const Admin: React.FC<AdminProps> = ({ 
    onBack, onAddProject, messages, onReplyMessage, projects, onDeleteProject, onEditProject, socialLinks, onUpdateSocialLinks,
    logoUrl, onUpdateLogo
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [activeTab, setActiveTab] = useState<'projects' | 'analytics' | 'messages' | 'settings'>('projects');
  
  const [socialForm, setSocialForm] = useState<SocialLinks>(socialLinks);
  const [formData, setFormData] = useState({
    title: '', category: '', description: '', images: [] as string[], videos: [] as string[], tech: '', link: '#', github: ''
  });

  useEffect(() => {
    if (password === 'Novabit@2008') { setIsAuthenticated(true); setError(''); }
  }, [password]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Novabit@2008') { setIsAuthenticated(true); } else { setError('Invalid password'); }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
        const url = URL.createObjectURL(e.target.files[0]);
        onUpdateLogo(url);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8"><h1 className="text-2xl font-bold text-white">Novabit Admin</h1></div>
          <form onSubmit={handleLogin} className="space-y-6">
            <input type="password" placeholder="Password" className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-4 text-white" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-lg">Unlock</button>
          </form>
          <button onClick={onBack} className="mt-4 text-neutral-500 text-sm w-full">Back to site</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-neutral-900 border-r border-neutral-800 p-6 flex flex-col">
          <h1 className="text-xl font-bold mb-10">ADMIN <span className="text-blue-500">PANEL</span></h1>
          <nav className="flex-1 space-y-2">
            <button onClick={() => setActiveTab('projects')} className={`w-full text-left px-4 py-3 rounded-lg ${activeTab === 'projects' ? 'bg-blue-600' : 'hover:bg-neutral-800'}`}>Projects</button>
            <button onClick={() => setActiveTab('settings')} className={`w-full text-left px-4 py-3 rounded-lg ${activeTab === 'settings' ? 'bg-blue-600' : 'hover:bg-neutral-800'}`}>Settings & Branding</button>
            <button onClick={() => setActiveTab('analytics')} className={`w-full text-left px-4 py-3 rounded-lg ${activeTab === 'analytics' ? 'bg-blue-600' : 'hover:bg-neutral-800'}`}>Analytics</button>
            <button onClick={onBack} className="w-full text-left px-4 py-3 rounded-lg text-neutral-500">Exit</button>
          </nav>
      </aside>

      <div className="flex-1 p-8 overflow-y-auto">
        {activeTab === 'settings' && (
            <div className="max-w-3xl mx-auto space-y-8">
                <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl shadow-xl">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Palette className="text-blue-500" /> Branding (Logo)</h3>
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="w-32 h-32 bg-black border border-neutral-800 rounded-xl flex items-center justify-center overflow-hidden">
                            {logoUrl ? <img src={logoUrl} alt="Logo Preview" className="max-w-full max-h-full object-contain" /> : <span className="text-neutral-600">No Logo</span>}
                        </div>
                        <div className="flex-1">
                            <p className="text-neutral-400 text-sm mb-4">Upload your brand logo. PNG or SVG with transparent background is recommended for the dark header.</p>
                            <label className="cursor-pointer bg-white text-black font-bold px-6 py-3 rounded-lg inline-block hover:bg-neutral-200 transition-colors">
                                Upload Logo
                                <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                            </label>
                        </div>
                    </div>
                </div>

                <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl">
                    <h3 className="text-xl font-bold mb-6">Social Links</h3>
                    <div className="space-y-4">
                        <div><label className="text-xs text-neutral-500 block mb-1">GitHub</label><input className="w-full bg-neutral-950 border border-neutral-800 rounded p-3" value={socialForm.github} onChange={e => setSocialForm({...socialForm, github: e.target.value})} /></div>
                        <div><label className="text-xs text-neutral-500 block mb-1">Email</label><input className="w-full bg-neutral-950 border border-neutral-800 rounded p-3" value={socialForm.email} onChange={e => setSocialForm({...socialForm, email: e.target.value})} /></div>
                        <button onClick={() => onUpdateSocialLinks(socialForm)} className="bg-blue-600 px-6 py-3 rounded-lg font-bold">Save Socials</button>
                    </div>
                </div>
            </div>
        )}

        {activeTab === 'projects' && (
            <div className="max-w-3xl mx-auto bg-neutral-900 p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-6">Add New Project</h3>
                <div className="space-y-4">
                    <input placeholder="Project Title" className="w-full bg-neutral-950 border border-neutral-800 p-3 rounded" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                    <textarea placeholder="Description" className="w-full bg-neutral-950 border border-neutral-800 p-3 rounded" rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                    <button onClick={() => {
                        onAddProject({ id: Date.now(), ...formData, images: ['https://picsum.photos/800/600'], tech: [] });
                        setFormData({ title: '', category: '', description: '', images: [], videos: [], tech: '', link: '#', github: '' });
                    }} className="bg-blue-600 w-full py-4 rounded font-bold">Add Project</button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
