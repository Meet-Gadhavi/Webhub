
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import gsap from 'gsap';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi there! 👋 I'm Weby AI, your guide to digital growth. Ask me how Webhub can transform your business, or let's chat about your project ideas!" }
  ]);
  const [loading, setLoading] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(24);

  const modalRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(modalRef.current, 
        { scale: 0.9, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: 'back.out(1.7)' }
      );
    }
  }, [isOpen]);

  // Scroll listener to avoid footer overlap
  useEffect(() => {
    let ticking = false;

    const updatePosition = () => {
      const footer = document.querySelector('footer');
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Check if footer is in viewport
        if (footerRect.top < viewportHeight) {
          // Calculate offset to sit above footer with 24px margin
          const newOffset = (viewportHeight - footerRect.top) + 24;
          setBottomOffset(Math.max(24, newOffset));
        } else {
          setBottomOffset(24);
        }
      } else {
          setBottomOffset(24);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updatePosition);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    // Initial calculation
    updatePosition();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const responseText = await sendMessageToGemini(input, messages);

    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ bottom: `${bottomOffset}px` }}
        className="fixed right-6 w-14 h-14 bg-white text-black rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-[60] group duration-100 ease-out"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        {!isOpen && (
             <span className="absolute right-16 bg-neutral-800 text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Chat with Weby AI
             </span>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div 
            ref={modalRef}
            style={{ bottom: `${bottomOffset + 72}px` }}
            className="fixed right-6 w-[90vw] md:w-[400px] h-[500px] bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col z-[60] overflow-hidden duration-100 ease-out"
        >
            {/* Header */}
            <div className="p-4 border-b border-neutral-800 bg-neutral-950 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center">
                    <Bot size={16} className="text-white" />
                </div>
                <div>
                    <h3 className="font-bold text-sm">Weby AI</h3>
                    <p className="text-xs text-neutral-400">Powered by Gemini 2.5 Flash</p>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'model' ? 'bg-neutral-800' : 'bg-white'}`}>
                            {msg.role === 'model' ? <Bot size={14} /> : <User size={14} className="text-black" />}
                        </div>
                        <div className={`p-3 rounded-2xl text-sm max-w-[80%] ${
                            msg.role === 'model' 
                            ? 'bg-neutral-800 text-neutral-200 rounded-tl-none' 
                            : 'bg-white text-black rounded-tr-none'
                        }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center">
                            <Bot size={14} />
                        </div>
                        <div className="bg-neutral-800 p-3 rounded-2xl rounded-tl-none flex items-center">
                            <Loader2 size={16} className="animate-spin text-neutral-400" />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-neutral-950 border-t border-neutral-800">
                <div className="relative">
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask about our services..."
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-full py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-neutral-600 transition-colors"
                    />
                    <button 
                        onClick={handleSend}
                        disabled={loading || !input.trim()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors disabled:opacity-50"
                    >
                        <Send size={16} />
                    </button>
                </div>
            </div>
        </div>
      )}
    </>
  );
};

export default AIChat;
