
import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Lock, ArrowRight } from 'lucide-react';
import { User as UserType } from '../types';

interface AuthProps {
  onLogin: (user: UserType) => void;
  onBack: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin, onBack }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth
    const user: UserType = {
      id: Date.now().toString(),
      name: name || 'User',
      email: email,
      role: 'user',
      hasSubscription: false
    };
    onLogin(user);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <button 
          onClick={onBack}
          className="absolute top-8 left-8 flex items-center gap-2 px-5 py-2.5 bg-neutral-900/50 backdrop-blur-md border border-neutral-800 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 hover:border-neutral-700 transition-all z-20 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
        <span className="text-sm font-medium">Back to Site</span>
      </button>

      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
          <p className="text-neutral-400 text-sm">Join Novabit to manage your services</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-500 uppercase">Full Name</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-4 pl-10 text-white focus:border-blue-500 focus:outline-none"
                  placeholder="John Doe"
                  required={!isLogin}
                />
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-500 uppercase">Email Address</label>
            <div className="relative">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-4 pl-10 text-white focus:border-blue-500 focus:outline-none"
                placeholder="you@example.com"
                required
              />
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-500 uppercase">Password</label>
            <div className="relative">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-4 pl-10 text-white focus:border-blue-500 focus:outline-none"
                placeholder="••••••••"
                required
              />
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            </div>
          </div>

          <button type="submit" className="w-full bg-white text-black font-bold py-4 rounded-lg mt-6 hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 group">
            {isLogin ? 'Sign In' : 'Sign Up'}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-neutral-500 text-sm hover:text-white transition-colors"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
