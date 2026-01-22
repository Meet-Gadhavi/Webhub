
import React, { useState } from 'react';
import { User, DirectMessage } from '../types';
import { LogOut, Calendar, Bug, MessageSquare, Download, Clock, CheckCircle, Send, Star } from 'lucide-react';

interface UserDashboardProps {
  user: User;
  onLogout: () => void;
  onSubmitFeedback: (text: string) => void;
  messages: DirectMessage[];
  onSendMessage: (text: string) => void;
  addNotification: (msg: string, type: 'success' | 'error' | 'info') => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ 
    user, onLogout, onSubmitFeedback, messages, onSendMessage, addNotification 
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'bugs' | 'messages'>('overview');
  const [feedback, setFeedback] = useState('');
  const [bugDesc, setBugDesc] = useState('');
  const [msgInput, setMsgInput] = useState('');

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitFeedback(feedback);
    setFeedback('');
    addNotification('Feedback submitted successfully!', 'success');
  };

  const handleBugSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBugDesc('');
    addNotification('Bug report sent to support team', 'success');
  };

  const handleSendMsg = (e: React.FormEvent) => {
    e.preventDefault();
    if(!msgInput.trim()) return;
    onSendMessage(msgInput);
    setMsgInput('');
  };

  const handleDownloadInvoice = () => {
     addNotification('Downloading invoice...', 'info');
     setTimeout(() => addNotification('Download Complete', 'success'), 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-neutral-900 border-r border-neutral-800 p-6 flex flex-col">
        <div className="mb-10">
            <h1 className="text-xl font-bold tracking-tighter">NOVABIT <span className="text-blue-500">CLIENT</span></h1>
        </div>
        
        <nav className="flex-1 space-y-2">
            <button 
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'overview' ? 'bg-blue-600 text-white' : 'text-neutral-400 hover:bg-neutral-800'}`}
            >
                <CheckCircle size={18} /> Overview
            </button>
            <button 
                onClick={() => setActiveTab('messages')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'messages' ? 'bg-blue-600 text-white' : 'text-neutral-400 hover:bg-neutral-800'}`}
            >
                <MessageSquare size={18} /> Messages
            </button>
            <button 
                onClick={() => setActiveTab('bugs')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'bugs' ? 'bg-blue-600 text-white' : 'text-neutral-400 hover:bg-neutral-800'}`}
            >
                <Bug size={18} /> Support / Bugs
            </button>
        </nav>

        <div className="pt-6 border-t border-neutral-800">
             <div className="flex items-center gap-3 mb-4">
                 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold">
                     {user.name.charAt(0)}
                 </div>
                 <div className="overflow-hidden">
                     <p className="text-sm font-bold truncate">{user.name}</p>
                     <p className="text-xs text-neutral-500 truncate">{user.email}</p>
                 </div>
             </div>
             <button onClick={onLogout} className="w-full flex items-center justify-center gap-2 text-red-500 hover:bg-red-500/10 py-2 rounded-lg transition-colors text-sm font-medium">
                 <LogOut size={16} /> Logout
             </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        {activeTab === 'overview' && (
            <div className="max-w-4xl mx-auto space-y-8">
                <header>
                    <h2 className="text-3xl font-bold mb-2">Dashboard</h2>
                    <p className="text-neutral-400">Manage your subscription and feedback.</p>
                </header>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-green-500/20 text-green-500 rounded-lg"><CheckCircle size={24} /></div>
                            <span className="bg-green-500 text-black text-xs font-bold px-2 py-1 rounded">ACTIVE</span>
                        </div>
                        <h3 className="text-2xl font-bold">Pro Plan</h3>
                        <p className="text-neutral-500 text-sm mt-1">Next billing: Oct 24, 2025</p>
                    </div>
                    
                    <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
                         <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-blue-500/20 text-blue-500 rounded-lg"><Calendar size={24} /></div>
                        </div>
                        <h3 className="text-2xl font-bold">365 Days</h3>
                        <p className="text-neutral-500 text-sm mt-1">Subscription Validity</p>
                    </div>

                    <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl cursor-pointer hover:border-neutral-700 transition-colors" onClick={handleDownloadInvoice}>
                         <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-purple-500/20 text-purple-500 rounded-lg"><Download size={24} /></div>
                        </div>
                        <h3 className="text-2xl font-bold">Invoices</h3>
                        <p className="text-neutral-500 text-sm mt-1">Download PDF</p>
                    </div>
                </div>

                <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-xl">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Star size={20} className="text-yellow-500"/> Give Feedback</h3>
                    <p className="text-neutral-400 text-sm mb-6">Your feedback helps us improve and will be featured on our main page!</p>
                    <form onSubmit={handleFeedbackSubmit} className="flex gap-4">
                        <input 
                            type="text" 
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder="Write your feedback..." 
                            className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg px-4 text-white focus:outline-none focus:border-blue-500"
                        />
                        <button type="submit" className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg font-bold transition-colors">Submit</button>
                    </form>
                </div>
            </div>
        )}

        {activeTab === 'messages' && (
            <div className="max-w-4xl mx-auto h-[80vh] flex flex-col bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-neutral-800 bg-neutral-950">
                    <h3 className="font-bold">Support Chat</h3>
                    <p className="text-xs text-neutral-400">Direct line to admin</p>
                </div>
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    {messages.filter(m => m.senderId === user.id || (m.isAdmin)).map(msg => (
                        <div key={msg.id} className={`flex flex-col ${msg.senderId === user.id ? 'items-end' : 'items-start'}`}>
                            <div className={`max-w-[80%] p-3 rounded-xl text-sm ${msg.senderId === user.id ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-neutral-800 text-white rounded-tl-none'}`}>
                                {msg.text}
                            </div>
                            <span className="text-[10px] text-neutral-500 mt-1">{msg.senderName}</span>
                        </div>
                    ))}
                    {messages.length === 0 && <div className="text-center text-neutral-500 mt-10">No messages yet. Start a conversation!</div>}
                </div>
                <form onSubmit={handleSendMsg} className="p-4 border-t border-neutral-800 bg-neutral-950 flex gap-2">
                    <input 
                        type="text" 
                        value={msgInput}
                        onChange={(e) => setMsgInput(e.target.value)}
                        placeholder="Type a message..." 
                        className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                    />
                    <button type="submit" className="p-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors"><Send size={20} /></button>
                </form>
            </div>
        )}

        {activeTab === 'bugs' && (
             <div className="max-w-2xl mx-auto">
                 <h2 className="text-3xl font-bold mb-6">Report an Issue</h2>
                 <form onSubmit={handleBugSubmit} className="space-y-6">
                     <div>
                         <label className="block text-sm font-bold text-neutral-400 mb-2">Describe the bug/issue</label>
                         <textarea 
                             required
                             rows={6}
                             value={bugDesc}
                             onChange={(e) => setBugDesc(e.target.value)}
                             className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-white focus:outline-none focus:border-red-500"
                             placeholder="I found a bug on the dashboard page..."
                         />
                     </div>
                     <button type="submit" className="bg-red-600 hover:bg-red-500 text-white font-bold py-4 px-8 rounded-xl w-full flex items-center justify-center gap-2">
                         <Bug size={20} /> Report Bug
                     </button>
                 </form>
             </div>
        )}
      </main>
    </div>
  );
};

export default UserDashboard;
